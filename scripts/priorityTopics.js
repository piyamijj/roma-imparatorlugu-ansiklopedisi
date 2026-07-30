/**
 * priorityTopics.js
 * 
 * Bu modül, içerik üretim betiği (generateContent.js) tarafından ilk olarak işlenecek
 * öncelikli konu başlıklarının listesini içerir. Bu sayede, tüm konuların üretilmesi
 * beklenmeden, ilk çalıştırmada en popüler ve temel 25 konu hazır hale getirilir ve
 * erken/kısmi bir canlıya çıkışta sitenin en önemli kısımları dolu görünür.
 */

const PRIORITY_TOPIC_SLUGS = [
  // Zaman Çizelgesi (Tarihsel Dönemler)
  "roma-nin-kurulusu-ve-efsanesi",
  "cumhuriyetin-kurulusu",
  "pon-savaslari",
  "augustus-ve-principatin-dogusu",
  "pax-romana",
  "ucuncu-yuzyil-krizi",
  "bati-roma-nin-cokusu",

  // Din ve Mitoloji
  "jupiter",
  "mars",
  "venus",
  "devlet-dini-ve-pontifex-maximus",
  "hristiyanligin-yukselisi-ve-zulumler",

  // Kültür ve Toplum
  "roma-toplumsal-siniflari",
  "gladyator-oyunlari",
  "roma-mimarisi-kolezyum",
  "roma-mimarisi-pantheon",
  "roma-muhendisligi-su-kemerleri-ve-yollar",

  // Ekonomi
  "roma-para-birimi-ve-nane",
  "roma-ticaret-aglari",

  // Siyaset ve Hukuk
  "roma-senatosu",
  "oniki-levha-kanunlari",
  "julius-sezar",
  "augustus", // Not: Bu hem siyaset hem zaman çizelgesiyle kesişen ana figürdür

  // Askeri Tarih
  "roma-lejyon-yapisi",
  "pon-savaslari-hannibal"
];

module.exports = { PRIORITY_TOPIC_SLUGS };