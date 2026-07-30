export interface NavSection {
  slug: string;
  label: string;
  shortLabel?: string;
  description: string;
  href: string;
}

export const SITE_NAME = "Roma İmparatorluğu Ansiklopedisi";
export const SITE_TAGLINE = "SPQR — Senatus Populusque Romanus";

export const NAV_SECTIONS: NavSection[] = [
  {
    slug: "anasayfa",
    label: "Anasayfa",
    description: "Giriş ve genel bakış",
    href: "/"
  },
  {
    slug: "zaman-cizelgesi",
    label: "Tarihsel Zaman Çizelgesi",
    shortLabel: "Zaman Çizelgesi",
    description: "Kuruluştan Bizans'a Roma tarihinin büyük dönemleri",
    href: "/zaman-cizelgesi"
  },
  {
    slug: "din-mitoloji",
    label: "Din ve Mitoloji",
    shortLabel: "Din & Mitoloji",
    description: "Roma panteonu, devlet dini, gizem kültleri ve Hristiyanlığın yükselişi",
    href: "/din-mitoloji"
  },
  {
    slug: "kultur-toplum",
    label: "Kültür ve Toplum",
    shortLabel: "Kültür & Toplum",
    description: "Günlük yaşam, toplumsal sınıflar, eğlence, edebiyat, sanat ve mimari",
    href: "/kultur-toplum"
  },
  {
    slug: "ekonomi",
    label: "Ekonomi",
    description: "Para birimi, ticaret ağları, tarım, vergilendirme ve kölelik",
    href: "/ekonomi"
  },
  {
    slug: "siyaset-hukuk",
    label: "Siyaset ve Hukuk",
    shortLabel: "Siyaset & Hukuk",
    description: "Krallıktan Cumhuriyete, İmparatorluğa: yönetim ve hukukun evrimi",
    href: "/siyaset-hukuk"
  },
  {
    slug: "askeri",
    label: "Askeri Tarih",
    shortLabel: "Askeri",
    description: "Lejyonlar, büyük savaşlar, komutanlar ve ordunun siyasi rolü",
    href: "/askeri"
  },
  {
    slug: "soru-cevap",
    label: "Yapay Zekaya Sor",
    shortLabel: "Soru-Cevap",
    description: "Roma hakkında istediğiniz her şeyi sorun, yapay zeka yanıtlasın",
    href: "/sor"
  }
];