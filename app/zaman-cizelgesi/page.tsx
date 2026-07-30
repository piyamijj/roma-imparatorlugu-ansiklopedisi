import type { Metadata } from "next";
import { getTopicsBySection, getGeneratedSlugsBySection } from "@/lib/topics";
import SectionLandingPage from "../components/sections/SectionLandingPage";

export const metadata: Metadata = {
  title: "Tarihsel Zaman Çizelgesi | Roma İmparatorluğu Ansiklopedisi",
  description: "Roma'nın efsanevi kuruluşundan krallığa, cumhuriyetin yükselişinden imparatorluğun ihtişamına ve Bizans'ın devamlılığına uzanan kronolojik bir tarih yolculuğu.",
};

export default function ZamanCizelgesiPage() {
  const topics = getTopicsBySection("zaman-cizelgesi");
  const generatedSlugs = getGeneratedSlugsBySection("zaman-cizelgesi");
  const categories = Array.from(new Set(topics.map((t) => t.category)));

  return (
    <SectionLandingPage
      sectionSlug="zaman-cizelgesi"
      title="Tarihsel Zaman Çizelgesi"
      latinMotto="Ab Urbe Condita"
      description="M.Ö. 753 yılındaki efsanevi kuruluştan başlayarak Krallık, Cumhuriyet, Principat, 3. Yüzyıl Krizi, Dominat, Batı'nın Çöküşü ve Doğu Roma (Bizans) sürekliliğine uzanan bin yıllık görkemli tarihsel serüven."
      topics={topics}
      generatedSlugs={generatedSlugs}
      categories={categories}
    />
  );
}