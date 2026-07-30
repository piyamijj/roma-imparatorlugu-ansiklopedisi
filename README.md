# Roma İmparatorluğu Ansiklopedisi

Antik Roma medeniyetinin kuruluşundan yıkılışına kadar uzanan görkemli tarihini, dinini, mitolojisini, kültürünü, ekonomisini, siyasetini, hukukunu ve askeri yapısını derinlemesine inceleyen, görsel açıdan zenginleştirilmiş ve animasyonlarla donatılmış dijital ansiklopedi. Bu proje, tek bir konuyu (Roma İmparatorluğu) Wikipedia'dan daha derin, daha görsel ve daha akıcı bir kullanıcı deneyimiyle sunmayı amaçlayan, Türkçe dilinde hazırlanmış bir dijital anıttır.

Proje, **Termux (Android Terminal) -> GitHub -> Vercel -> DuckDNS** hattı üzerinden sorunsuz bir şekilde dağıtılmak üzere optimize edilmiş, hafif ve modern bir mimariye sahiptir.

---

## 🚀 Teknolojik Altyapı (Tech Stack)

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Stil/Tasarım:** Tailwind CSS (Özel Roma mermer, altın, bronz ve porfir renk paleti)
- **Animasyonlar:** Framer Motion (Fresco-reveal kaydırma animasyonları, mozaik geçişleri)
- **Grafikler:** Recharts (Ekonomik ve bilimsel göstergeler için)
- **İkonlar:** Lucide React (Uzun süredir kararlı olan klasik ikon setleri)
- **Yapay Zeka:** Google Gemini API (Doğrudan REST fetch() çağrıları ile, ağır SDK'lar kullanılmadan Next.js derleme süreçlerini bozmayacak şekilde entegre edilmiştir)

---

## 📂 Proje Yapısı (Project Structure)

```text
roma-imparatorlugu/
├── app/                  # Next.js App Router sayfaları ve bileşenleri
│   ├── api/              # API rotaları (Gemini Q&A rotası)
│   │   └── ask/
│   ├── components/       # Yeniden kullanılabilir UI bileşenleri
│   │   ├── sections/     # Sayfa bölümleri (Hero, vb.)
│   │   ├── roman/        # Özel SVG Roman motifleri (Eagle, Laurel, Column)
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   ├── globals.css       # Mermer dokuları ve özel CSS sınıfları
│   ├── layout.tsx        # Yazı tipleri (Cinzel, Cormorant, Crimson Pro) ve meta veriler
│   └── page.tsx          # Anasayfa (Hero ve hızlı erişim paneli)
├── data/                 # Ansiklopedik içeriklerin JSON dosyaları
│   ├── eras/             # Tarihsel dönemlerin yapılandırılmış verileri
│   └── topics/           # Detaylı alt başlıkların verileri
├── lib/                  # Yardımcı fonksiyonlar, tipler ve sabitler
│   ├── navigation.ts     # Site içi navigasyon yapısı
│   └── types.ts          # TypeScript tip tanımlamaları
├── scripts/              # Veri üretim betikleri
│   └── generateContent.js # Gemini API ile otomatik içerik üretim betiği
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🛠️ Kurulum ve Çalıştırma (Setup)

### 1. Bağımlılıkları Yükleyin
Proje dizininde terminalinizi açın ve bağımlılıkları yükleyin:
```bash
npm install
```

### 2. Çevre Değişkenlerini Ayarlayın
Proje kök dizininde `.env.example` dosyasını `.env.local` olarak kopyalayın ve Google AI Studio'dan aldığınız Gemini API anahtarınızı ekleyin:
```bash
cp .env.example .env.local
```
Dosya içeriği şu şekilde olmalıdır:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Yerel Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızdan `http://localhost:3000` adresine giderek projeyi canlı olarak görüntüleyebilirsiniz.

---

## 🤖 Yapılandırılmış İçerik Üretimi (Content Generation)

Proje, yaklaşık 60-80 arası detaylı Roma alt başlığı için derinlemesine, akademik ve tarafsız Türkçe içerikleri otomatik olarak üretmek üzere tasarlanmış bir Node.js betiği içerir.

### Betiği Çalıştırma:
```bash
npm run generate-data
```

### Önemli Özellikler:
- **Resumable (Kaldığı Yerden Devam Edebilir):** Betik, daha önce üretilmiş olan JSON dosyalarını otomatik olarak algılar ve atlar. Yarıda kesilirse kaldığı yerden devam eder.
- **Hız Sınırı (Rate Limit) Dostu:** API limitlerini aşmamak için istekler arasında otomatik gecikmeler (sleep) uygular.
- **Özelleştirilebilir Parametreler:**
  - `--batch-size=X`: Tek seferde kaç konunun üretileceğini belirler (Varsayılan: 15).
  - `--only=slug1,slug2`: Sadece belirtilen belirli konuların verilerini zorla (yeniden) üretir.

Örnek:
```bash
npm run generate-data -- --batch-size=5 --only=julius-caesar,pax-romana
```

---

## 🏛️ İçerik Kapsamı (Content Scope)

Site, Antik Roma medeniyetini yedi ana sütun üzerinde inceler:

1. **Tarihsel Zaman Çizelgesi:** Kuruluş/Krallık, Cumhuriyet, Erken İmparatorluk (Principate), Üçüncü Yüzyıl Krizi, Geç İmparatorluk (Dominate), Batı'nın Çöküşü ve Bizans devamlılığı.
2. **Din ve Mitoloji:** Roma panteonu, devlet dini, gizem kültleri (Mithraizm, Isis) ve Hristiyanlığın yükselişi.
3. **Kültür ve Toplum:** Toplumsal sınıflar (Patrician/Plebeian), aile yapısı, eğlence (Gladyatör oyunları, araba yarışları), edebiyat, sanat ve mimari/mühendislik (Kolezyum, Pantheon, su kemerleri).
4. **Ekonomi:** Para birimleri, ticaret ağları, tarım, vergilendirme ve köleliğin ekonomik rolü.
5. **Siyaset ve Hukuk:** Yönetim biçimlerinin evrimi, Roma Hukuku mirası (12 Levha Kanunları, Justinianus Kanunları) ve önemli siyasi figürler.
6. **Askeri Tarih:** Lejyon yapısı, savaş taktikleri, ünlü seferler/savaşlar ve ordunun siyasi gücü.
7. **Yapay Zeka Soru-Cevap:** Kullanıcıların Roma hakkında merak ettiği her şeyi sorabileceği, Gemini destekli derinlemesine ve akademik Türkçe yanıtlar üreten interaktif sayfa.

---

## 📜 Lisans ve Feragatname

Bu proje eğitim ve genel kültür amaçlı bir dijital anıt olarak tasarlanmıştır. İçerikler yapay zeka senteziyle oluşturulduğundan, akademik çalışmalarda birincil tarihi kaynakların (Tacitus, Livius, Suetonius vb.) referans alınması tavsiye edilir. Tarihsel belirsizlikler ve tartışmalı konular metinlerde tarafsız bir dille sunulmuştur.