/**
 * Roma İmparatorluğu Ansiklopedisi - Yapılandırılmış Veri Üretim Betiği
 * 
 * Bu betik, Google Gemini API'sini doğrudan REST üzerinden çağırarak Roma İmparatorluğu
 * alt başlıkları için detaylı, yapılandırılmış ansiklopedik verileri (.json) üretir.
 * 
 * ÖNEMLİ ÖZELLİKLER:
 * 1. Resumable (Kaldığı Yerden Devam Edebilir): Daha önce üretilmiş konuları otomatik
 *    olarak atlar, böylece yarıda kesilirse kaldığı yerden devam eder.
 * 2. Öncelikli Sıralama: Tarihsel ve medeniyet açısından kritik öneme sahip ~25 konuyu
 *    ilk çalıştırmada öncelikli olarak işler, ardından diğer konulara geçer.
 * 3. Bağımsız Çalışma: Node.js yerleşik modülleri ve yerleşik fetch() API'si dışında
 *    hiçbir harici npm paketine (dotenv vb.) ihtiyaç duymaz.
 * 4. Güvenli REST Çağrısı: Next.js derleme süreçlerini bozan ağır Google SDK'ları yerine
 *    doğrudan fetch() ile REST API çağrısı yapar ve Gemini'ın resmi JSON modunu kullanır.
 */

const fs = require("fs");
const pathMod = require("path");

// Node.js Sürüm Kontrolü (fetch API desteği için Node 18+ gereklidir)
if (typeof global.fetch !== "function") {
  console.error("\x1b[31m%s\x1b[0m", "HATA: Yerleşik 'fetch' API'si bulunamadı.");
  console.error("Bu betik Node.js 18 veya daha yeni bir sürüm gerektirir.");
  console.error(`Mevcut Node.js sürümünüz: ${process.version}`);
  console.error("Lütfen Node.js sürümünüzü güncelleyin veya Termux'ta 'pkg upgrade nodejs' çalıştırın.");
  process.exit(1);
}

// .env.local Dosyasını El Yordamıyla Ayrıştırma (Harici dotenv paketi gerektirmemesi için)
function loadLocalEnv() {
  try {
    const envPath = pathMod.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.substring(0, eqIdx).trim();
          const val = trimmed.substring(eqIdx + 1).trim();
          // Eğer ortam değişkeni zaten set edilmemişse .env.local'den yükle
          if (!process.env[key]) {
            // Varsa tırnak işaretlerini temizle
            process.env[key] = val.replace(/^['"]|['"]$/g, "");
          }
        }
      }
    }
  } catch (err) {
    console.warn("Uyarı: .env.local dosyası okunurken bir hata oluştu, ortam değişkenleri yüklenemedi:", err.message);
  }
}

// Çevre değişkenlerini yükle
loadLocalEnv();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("\x1b[31m%s\x1b[0m", "HATA: GEMINI_API_KEY bulunamadı.");
  console.error("Lütfen proje kök dizininde .env.local dosyası oluşturup anahtarınızı ekleyin:");
  console.error("GEMINI_API_KEY=your_api_key_here");
  console.error("\nAlternatif olarak terminalinizde şu komutla geçici olarak tanımlayabilirsiniz:");
  console.error("export GEMINI_API_KEY=your_api_key_here");
  process.exit(1);
}

// Gemini REST API Yapılandırması
const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

// CLI Argümanlarını Ayrıştırma (Basit Eşleştirme)
let batchSize = 12; // Varsayılan batch boyutu
let forceOnlySlugs = null; // --only=slug1,slug2 gibi zorunlu çalıştırma listesi

process.argv.forEach((arg) => {
  if (arg.startsWith("--batch-size=")) {
    const parsedSize = parseInt(arg.split("=")[1], 10);
    if (!isNaN(parsedSize) && parsedSize > 0) {
      batchSize = parsedSize;
    }
  } else if (arg.startsWith("--only=")) {
    const slugsStr = arg.split("=")[1];
    if (slugsStr) {
      forceOnlySlugs = slugsStr.split(",").map((s) => s.trim().toLowerCase());
    }
  }
});

// Yardımcı Gecikme Fonksiyonu (Rate Limit aşımını önlemek için)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ana Veri Üretim Fonksiyonu
 */
async function main() {
  try {
    // 1. Master Konu Listesini ve Öncelikli Konuları Yükle
    const listPath = pathMod.join(process.cwd(), "data", "topicList.json");
    const priorityPath = pathMod.join(process.cwd(), "scripts", "priorityTopics.js");

    if (!fs.existsSync(listPath)) {
      console.error("\x1b[31m%s\x1b[0m", `HATA: Master konu listesi bulunamadı: ${listPath}`);
      process.exit(1);
    }

    const topicsList = JSON.parse(fs.readFileSync(listPath, "utf-8"));
    let prioritySlugs = [];
    if (fs.existsSync(priorityPath)) {
      prioritySlugs = require(priorityPath).PRIORITY_TOPIC_SLUGS || [];
    }

    // Hedef klasörü oluştur
    const outputDir = pathMod.join(process.cwd(), "data", "topics");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 2. İşlem Kuyruğunu (Queue) İnşa Et
    let queue = [];

    if (forceOnlySlugs) {
      // Eğer --only parametresi verilmişse, sadece o konuları sıraya al (mevcut olsalar bile zorla üret)
      queue = forceOnlySlugs.filter(slug => topicsList.some(t => t.slug.toLowerCase() === slug));
      console.log(`\x1b[33m%s\x1b[0m`, `Zorunlu Çalıştırma Modu: Sadece şu ${queue.length} konu işlenecek: ${queue.join(", ")}`);
    } else {
      // Normal Mod: Önce öncelikli konular, sonra kalanlar
      const allSlugs = topicsList.map((t) => t.slug.toLowerCase());
      
      // Öncelikli listedekileri sıraya ekle
      prioritySlugs.forEach((slug) => {
        const lower = slug.toLowerCase();
        if (allSlugs.includes(lower) && !queue.includes(lower)) {
          queue.push(lower);
        }
      });

      // Kalan diğer tüm konuları sıraya ekle
      allSlugs.forEach((slug) => {
        if (!queue.includes(slug)) {
          queue.push(slug);
        }
      });

      // Zaten üretilmiş olan dosyaları kuyruktan çıkar (Resumable/Incremental özelliği)
      const totalBeforeFiltering = queue.length;
      queue = queue.filter((slug) => {
        const filePath = pathMod.join(outputDir, `${slug}.json`);
        return !fs.existsSync(filePath);
      });

      const completedCount = totalBeforeFiltering - queue.length;
      console.log(`\x1b[32m%s\x1b[0m`, `İlerleme Durumu: ${topicsList.length} konudan ${completedCount} tanesi zaten hazır.`);
    }

    // Kuyruk boşsa tamamlandı mesajı ver ve çık
    if (queue.length === 0) {
      console.log("\x1b[32m%s\x1b[0m", "Tüm konular için veri zaten üretilmiş! 🎉 Yapılacak başka bir şey yok.");
      process.exit(0);
    }

    // 3. Bu Çalıştırmadaki Batch'i Belirle
    const currentBatch = queue.slice(0, batchSize);
    const remainingInQueue = queue.length - currentBatch.length;

    console.log("\n==================================================");
    console.log(`\x1b[36m%s\x1b[0m`, `YENİ BATCH BAŞLATILIYOR (Boyut: ${currentBatch.length})`);
    console.log(`Sırada bekleyen toplam konu: ${queue.length}`);
    console.log(`Bu çalıştırmada işlenecek: ${currentBatch.map(s => s.toUpperCase()).join(", ")}`);
    
    // Tahmini süre hesabı (ortalama 10 saniye API çağrısı + 2 saniye gecikme = 12 saniye/konu)
    const estMin = Math.ceil((currentBatch.length * 12) / 60);
    console.log(`Tahmini tamamlanma süresi: ~${estMin} dakika`);
    console.log("==================================================\n");

    let successCount = 0;
    let failCount = 0;
    const failedTopics = [];

    // 4. Batch Döngüsü (Sıralı İşleme - Rate Limit Dostu)
    for (let i = 0; i < currentBatch.length; i++) {
      const slug = currentBatch[i];
      const topicMeta = topicsList.find((t) => t.slug.toLowerCase() === slug);
      const progressStr = `[${i + 1}/${currentBatch.length}]`;

      console.log(`\x1b[33m%s\x1b[0m`, `${progressStr} ${topicMeta.title_tr} (${topicMeta.category}) için veri üretiliyor...`);

      try {
        // Gemini için detaylı Türkçe prompt inşası
        const prompt = `Sana temel bilgileri verilen Antik Roma konusu hakkında, belirtilen JSON şemasına birebir uyan, son derece detaylı, akademik, ansiklopedik ve tarafsız bir veri seti üretmelisin.
        
Bu çalışma, Wikipedia'dan çok daha derin, görsel olarak zenginleştirilmiş bir dijital anıt için hazırlanmaktadır. Bu yüzden yüzeysel özetlerden kaçın, her alt başlığı derinlemesine, tarihsel kanıtlar ve akademik tartışmalarla birlikte ele al.

KONU BİLGİLERİ:
- Türkçe Başlık: ${topicMeta.title_tr}
- Bölüm: ${topicMeta.section}
- Kategori: ${topicMeta.category}
- Kısa Açıklama: ${topicMeta.short_desc}
- Tarihsel Dönem Etiketi: ${topicMeta.era_tag || "Döneme Özgü Değil"}
- Konu Kodu (Slug): ${topicMeta.slug}

LÜTFEN ŞU KURALLARA KESİNLİKLE UY:
1. Tüm metinsel içerikleri, açıklamaları, başlıkları ve özetleri akıcı, akademik ve saygın bir TÜRKÇE ile yaz. Türkçe imla kurallarına ve diyakritik işaretlere (ş, ç, ğ, ı, ü, ö, İ) tam olarak dikkat et.
2. Hassas tarihi olaylar, rejim değişiklikleri, dini zulümler, kölelik veya askeri çatışmalar hakkında yazarken KESİNLİKLE tarafsız, nesnel ve ansiklopedik bir dil kullan. Herhangi bir tarafı övme veya yerme; birden fazla bakış açısı veya tarihsel belirsizlik varsa bunları dengeli bir şekilde sun.
3. Tarihsel belirsizlikleri, birincil kaynaklar (Tacitus, Livius, Suetonius vb.) arasındaki çelişkileri veya modern tarihçilerin tartışmalarını "disputedPoints" alanında mutlaka belirt. Bu, ansiklopedimizin akademik kalitesini gösteren en önemli kısımdır.
4. JSON şemasındaki tüm alanları eksiksiz doldur. "TBD", "bilinmiyor", "yakında" gibi geçici veya kaçamak ifadeler KULLANMA. Gerçekçi, tarihsel olarak tutarlı ve zengin veriler üret.
5. "body" dizisi içinde en az 3, en fazla 5 adet detaylı alt başlık (subsection) oluştur. Her alt başlığın "paragraphs" dizisinde en az 2, en fazla 4 adet uzun, bilgi dolu ve akıcı paragraf bulunmalıdır. Yüzeysel tek cümlelik paragraflar yazma.

ÜRETİLECEK JSON ŞEMASI (Bu şemaya birebir uymalıdır):
{
  "overview": "Konu hakkında genel, tarihsel önemini ve yapısını özetleyen 3-5 cümlelik akademik giriş metni.",
  "body": [
    {
      "heading": "Alt başlığın Türkçe adı (örn: 'Marius Reformları'nın Askeri Etkileri' veya 'Panteondaki Hiyerarşik Düzen')",
      "paragraphs": [
        "Alt başlığa dair ilk detaylı paragraf (en az 4-5 cümlelik, akademik ve bilgi yoğunluğu yüksek).",
        "Alt başlığa dair ikinci detaylı paragraf (varsa üçüncü ve dördüncü paragrafları da ekle)."
      ]
    }
    // En az 3, en fazla 5 alt başlık ekle. Her biri konunun farklı bir yönünü (sosyal, ekonomik, askeri, hukuki vb.) derinlemesine incelemelidir.
  ],
  "timeline": [
    {
      "year": "Olayın yılı veya aralığı (örn: 'M.Ö. 753', 'M.S. 313', 'M.Ö. 44')",
      "title": "Olayın kısa Türkçe başlığı",
      "description": "Olayın bu konu bağlamındaki detaylı açıklaması (2-3 cümle)",
      "era": "Dönem etiketi (örn: 'Cumhuriyet', 'Principat', 'Dominat')"
    }
    // Eğer konu kronolojik olaylar içeriyorsa en az 3, en fazla 8 önemli tarihsel olay ekle. Kronolojik olmayan soyut konular için de konunun gelişim aşamalarını gösteren tarihler ekle.
  ],
  "keyFigures": [
    {
      "name": "Tarihsel figürün adı (örn: 'Julius Caesar', 'Scipio Africanus')",
      "role": "Figürün rolü/unvanı (örn: 'Konsül, General', 'Vestal Rahibesi')",
      "lifespan": "Yaşam yılları (örn: 'M.Ö. 100 - M.Ö. 44')",
      "description": "Bu figürün doğrudan BU KONU ile olan ilişkisi ve tarihteki önemi (2-3 cümle)."
    }
    // Konuyla doğrudan ilişkili en az 2, en fazla 5 önemli tarihi şahsiyeti ekle.
  ],
  "keyTerms": [
    {
      "term": "Latince veya teknik terim (örn: 'Cursus Honorum', 'Pater Familias', 'Gladius')",
      "definition": "Terimin Türkçe detaylı açıklaması ve bu konu içindeki önemi."
    }
    // Konu içinde geçen veya konuyu anlamak için kritik olan en az 2, en fazla 6 Latince/teknik terimi ve açıklamasını ekle.
  ],
  "didYouKnow": [
    "Konuyla ilgili şaşırtıcı, az bilinen veya ilginç bir tarihi gerçek (1-2 cümle).",
    "İkinci ilginç gerçek."
    // En az 2, en fazla 4 adet 'Biliyor muydunuz?' maddesi ekle.
  ],
  "disputedPoints": [
    {
      "note": "Tarihçiler arasındaki tartışma konusu veya birincil kaynaklardaki çelişki (örn: 'Livius ve Dionysios'un kuruluş tarihlerine dair farklı anlatıları...' veya 'Sezar'ın son sözlerinin gerçekten Latince mi yoksa Yunanca mı olduğu tartışmalıdır...')."
    }
    // Varsa konuyla ilgili en az 1, en fazla 3 akademik tartışma veya belirsizlik noktasını ekle. Eğer kesinlikle hiçbir tartışma yoksa boş dizi [] bırakabilirsin ama zorla da olsa kaynak çelişkilerini bulmaya çalış.
  ],
  "relatedTopicSlugs": [
    "ilgili-konu-slug-1", "ilgili-konu-slug-2"
    // data/topicList.json dosyasında yer alan diğer konulardan bu konuyla en çok ilişkili olan en az 2, en fazla 5 tanesinin tam slug'ını ekle (uydurma slug yazma, sadece gerçek listedeki slug'ları kullan).
  ]
}`;

        // API İstek Gövdesi (Request Body)
        const requestBody = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json", // Resmi JSON modu - temiz çıktı garantiler
          },
        };

        // İstek Zaman Aşımı (Timeout) Kontrolü (60 saniye)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(GEMINI_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          const apiError = data?.error;
          console.error("\x1b[31m%s\x1b[0m", `API HATASI [HTTP ${response.status}]: ${apiError?.message || "Bilinmeyen Hata"}`);
          failCount++;
          failedTopics.push(slug);
          continue;
        }

        // Yanıt metnini ayıkla ve temizle
        let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error("API boş içerik döndürdü.");
        }

        // JSON Ayrıştırma (Parse) Kontrolü
        let parsedContent;
        try {
          parsedContent = JSON.parse(text);
        } catch (parseErr) {
          console.error("\x1b[31m%s\x1b[0m", `HATA: Gemini'dan gelen metin geçerli bir JSON değil. Ayrıştırma hatası: ${parseErr.message}`);
          // Hatalı metni hata ayıklama için yazdır
          console.log("Gelen hatalı metin örneği:", text.substring(0, 200) + "...");
          failCount++;
          failedTopics.push(slug);
          continue;
        }

        // Nihai Dosya Yapısını Oluştur
        const finalData = {
          slug: slug,
          section: topicMeta.section,
          title_tr: topicMeta.title_tr,
          generatedAt: new Date().toISOString(),
          content: parsedContent,
        };

        // Dosyayı diske yaz
        const outputPath = pathMod.join(outputDir, `${slug}.json`);
        fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), "utf-8");

        console.log("\x1b[32m%s\x1b[0m", `✓ BAŞARILI: ${topicMeta.title_tr} verisi üretildi ve kaydedildi. ${progressStr}`);
        successCount++;

      } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", `HATA: ${topicMeta.title_tr} işlenirken beklenmedik bir hata oluştu: ${err.message}`);
        failCount++;
        failedTopics.push(slug);
      }

      // Rate limit aşımını önlemek için istekler arasında 2 saniye bekle (son istek hariç)
      if (i < currentBatch.length - 1) {
        await sleep(2000);
      }
    }

    // 5. Batch Sonu Özet Raporu
    console.log("\n==================================================");
    console.log(`\x1b[36m%s\x1b[0m`, "BATCH ÇALIŞMASI TAMAMLANDI");
    console.log(`Başarılı Üretim: \x1b[32m${successCount}\x1b[0m`);
    console.log(`Başarısız Üretim: \x1b[31m${failCount}\x1b[0m`);
    
    if (failedTopics.length > 0) {
      console.log(`\x1b[31m%s\x1b[0m`, `Başarısız Konular: ${failedTopics.map(s => s.toUpperCase()).join(", ")}`);
      console.log("Öneri: Başarısız olan konular için betiği tekrar çalıştırabilirsiniz. Kaldığı yerden devam edecektir.");
    }

    if (remainingInQueue > 0) {
      console.log(`\nKuyrukta bekleyen daha \x1b[33m${remainingInQueue}\x1b[0m konu var.`);
      console.log("Bir sonraki batch'i başlatmak için şu komutu tekrar çalıştırın:");
      console.log(`\x1b[36m%s\x1b[0m`, `npm run generate-data -- --batch-size=${batchSize}`);
    } else {
      console.log("\n\x1b[32m%s\x1b[0m", "Tebrikler! Tüm konuların içerikleri başarıyla üretildi ve tamamlandı. 🎉");
    }
    console.log("==================================================\n");

  } catch (globalErr) {
    console.error("\x1b[31m%s\x1b[0m", `KRİTİK SİSTEM HATASI: ${globalErr.message}`);
    process.exit(1);
  }
}

// Betiği çalıştır
main();