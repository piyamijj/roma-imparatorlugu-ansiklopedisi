import type { Metadata } from "next";
import { getTopicsBySection, getGeneratedSlugsBySection } from "@/lib/topics";
import SectionLandingPage from "../components/sections/SectionLandingPage";

export const metadata: Metadata = {
  title: "Kültür ve Toplum | Roma İmparatorluğu Ansiklopedisi",
  description: "Antik Roma'da günlük yaşam, toplumsal sınıflar, kölelik, aile yapısı, gladyatör oyunları, Latin edebiyatı ve mühendislik harikası mimari yapılar.",
};

export default function KulturToplumPage() {
  const topics = getTopicsBySection("kultur-toplum");
  const generatedSlugs = getGeneratedSlugsBySection("kultur-toplum");
  const categories = Array.from(new Set(topics.map((t) => t.category)));

  return (
    <SectionLandingPage
      sectionSlug="kultur-toplum"
      title="Kültür ve Toplum"
      latinMotto="Panem et Circenses"
      description="Patriciler ve Plebler arasındaki sınıfsal mücadeleden kölelerin ve azatlıların dünyasına; Pater Familias otoritesindeki aile yapısından hamamlar, şölenler ve gladyatör dövüşlerine; Virgil, Ovidius ve Cicero gibi Latin edebiyatı devlerinden Kolezyum, Pantheon ve su kemerleri gibi mühendislik harikası anıtsal mimariye uzanan zengin Roma kültürü."
      topics={topics}
      generatedSlugs={generatedSlugs}
      categories={categories}
    />
  );
}