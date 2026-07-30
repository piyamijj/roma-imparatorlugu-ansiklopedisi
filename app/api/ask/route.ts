import { NextResponse } from "next/server";

// NOTE: Bu rota, Google Gemini API'sini doğrudan fetch() kullanarak REST üzerinden çağırır.
// Herhangi bir Node SDK'sı (@google/generative-ai veya @google/genai) KULLANILMAZ.
// Önceki projede tecrübe edildiği üzere, bu SDK'lar gaxios ve google-auth-library gibi
// ağır bağımlılık zincirlerini çeker. Bu bağımlılıklar, Next.js/Vercel derleme (build)
// aşamasında (özellikle Terser minification ve Babel/SWC aşamalarında) private class field
// sözdizimi nedeniyle derleme hatalarına yol açar. Doğrudan REST çağrısı yapmak bu sorunu kökten çözer.

// NOTE: Sabit model kimlikleri (örn: gemini-2.0-flash veya gemini-2.5-flash) Google tarafından
// çok hızlı bir şekilde emekliye ayrılabilmekte veya yeni kullanıcılara kapatılabilmektedir.
// Bu durum uygulamanın aniden 404 hatası vermesine neden olur. Bu riski önlemek için her zaman
// en güncel aktif Flash modeline yönlendirilen dinamik "gemini-flash-latest" takma adı (alias) kullanılır.
const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, topicTitle } = body;

    // 1. Soru Doğrulaması
    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "Lütfen geçerli bir soru metni girin." },
        { status: 400 }
      );
    }

    // 2. API Anahtarı Doğrulaması
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası: Yapay zeka asistanı şu anda aktif değil." },
        { status: 500 }
      );
    }

    // 3. Sistem Talimatı (System Prompt) İnşası
    // Tamamen Roma İmparatorluğu'na odaklanmış, akademik ve tarafsız bir asistan kimliği.
    const systemPrompt = `Sen, Antik Roma medeniyeti, Roma Krallığı, Roma Cumhuriyeti, Roma İmparatorluğu (Principatus ve Dominat dönemleri), Batı Roma'nın çöküşü ve Doğu Roma (Bizans) sürekliliği konularında uzmanlaşmış, son derece bilgili ve akademik bir ansiklopedik yapay zeka asistanısın.
Sana sorulan soruları tamamen Türkçe olarak, detaylı, anlaşılır, tarafsız ve akademik bir dille yanıtlamalısın.

Lütfen şu kurallara kesinlikle uy:
1. Yanıtlarını tamamen Türkçe olarak yaz. Türkçe imla kurallarına ve diyakritik işaretlere (ş, ç, ğ, ı, ü, ö, İ) tam olarak dikkat et.
2. Ansiklopedik, akademik ve saygın bir dil kullan. Ciddiyetten uzak, aşırı samimi veya gayriresmi ifadelerden kaçın.
3. Önemli terimleri, tarihleri, Latince kavramları veya tarihi şahsiyetleri vurgulamak için hafif markdown kalın yazı stilini (**kalın**) kullanabilirsin. Yanıtını paragraflara, maddelere veya numaralandırılmış listelere bölerek okunabilirliği artır.
4. Hassas veya tartışmalı konular (sınır anlaşmazlıkları, tarihi çatışmalar, dini zulümler, kölelik, rejim değişiklikleri veya tartışmalı imparatorlar) hakkında soru sorulduğunda KESİNLİKLE tarafsız kal. Herhangi bir siyasi, ulusal veya ideolojik tarafgirlik yapma. Birden fazla akademik perspektif veya birincil kaynaklar (Tacitus, Livius, Suetonius vb.) arasında çelişkiler varsa, bunları nesnel ve dengeli bir şekilde, akademik kaynaklara atıfta bulunarak sun (örn. "X kaynağı bu durumu ... olarak aktarırken, modern tarihçiler ise ... olduğunu savunmaktadır").
5. Yanıtlarında spekülatif veya doğrulanmamış bilgilere yer verme. Bilgi sahibi olmadığın veya kesinlik taşımayan konularda bunu açıkça belirt. Efsanevi/mitolojik anlatıları (örn. Romulus ve Remus efsanesi) tarihi gerçeklerden net bir şekilde ayırarak sun.
6. Eğer kullanıcı tamamen Roma İmparatorluğu ve Antik Roma dışındaki alakasız modern konular hakkında soru sorarsa (örn. modern yazılım dilleri, güncel magazin olayları vb.), kullanıcıyı nazikçe Roma tarihi, kültürü, dini, askeri yapısı veya hukuku ile ilgili konulara yönlendir, ancak bunu yaparken kaba olma ve varsa dolaylı bir tarihi bağlantı kurarak yanıtla.
7. Karmaşık LaTeX formülleri kullanma. Gerekirse düz metin veya basit matematiksel semboller kullan.`;

    // Eğer soru belirli bir konu bağlamında sorulmuşsa, prompt'a bu bağlamı ekle
    let fullPrompt = systemPrompt;
    if (topicTitle && typeof topicTitle === "string" && topicTitle.trim()) {
      fullPrompt += `\n\nÖNEMLİ BAĞLAM: Kullanıcının sorusu özellikle Antik Roma'nın "${topicTitle.trim()}" konusu hakkındadır. Yanıtını bu konunun bağlamını, tarihsel arka planını ve ilgili durumunu göz önünde bulundurarak özelleştir ve derinleştir.`;
    }

    fullPrompt += `\n\nKullanıcı Sorusu: ${question.trim()}`;

    // 4. Gemini REST API İstek Gövdesi (Request Body) Hazırlığı
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ],
    };

    // 5. API Çağrısı
    const geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const geminiData = await geminiResponse.json();

    // 6. Hata Yönetimi
    if (!geminiResponse.ok) {
      const apiError = geminiData?.error;
      console.error("Gemini REST API Error:", {
        httpStatus: geminiResponse.status,
        code: apiError?.code,
        status: apiError?.status,
        message: apiError?.message,
      });

      let clientMessage =
        "Yapay zeka asistanından yanıt alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.";

      const apiStatus: string = (apiError?.status || "").toString();
      const apiMsg: string = (apiError?.message || "").toString();

      if (/PERMISSION_DENIED|UNAUTHENTICATED/i.test(apiStatus) || /api key/i.test(apiMsg)) {
        clientMessage =
          "Yapay zeka asistanı bağlantı hatası: API anahtarı geçersiz veya yetkilendirme başarısız oldu.";
      } else if (/RESOURCE_EXHAUSTED/i.test(apiStatus) || geminiResponse.status === 429) {
        clientMessage =
          "Çok fazla istek gönderildi. Yapay zeka asistanı şu anda yoğun, lütfen birkaç saniye bekleyip tekrar deneyin.";
      }

      return NextResponse.json(
        { error: clientMessage },
        { status: geminiResponse.status || 500 }
      );
    }

    // 7. Başarılı Yanıtı Ayıkla ve Döndür
    const answerText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answerText || typeof answerText !== "string" || !answerText.trim()) {
      return NextResponse.json(
        { error: "Yapay zeka asistanından boş bir yanıt döndü. Lütfen sorunuzu tekrar sorun." },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: answerText });

  } catch (err) {
    console.error("Unexpected error in /api/ask route:", err);
    return NextResponse.json(
      { error: "Beklenmedik bir sunucu hatası oluştu. Lütfen sorunuzu tekrar göndermeyi deneyin." },
      { status: 500 }
    );
  }
}