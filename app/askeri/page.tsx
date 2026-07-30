import type { Metadata } from "next";
import { getTopicsBySection, getGeneratedSlugsBySection } from "@/lib/topics";
import SectionLandingPage from "../components/sections/SectionLandingPage";

export const metadata: Metadata = {
  title: "Askeri Tarih | Roma İmparatorluğu Ansiklopedisi",
  description: "Roma lejyonlarının yapısı, silahları, savaş taktikleri, Pön Savaşları ve Galya fetihleri gibi ünlü seferler, Pretorian Muhafızları ve ordunun siyasi gücü.",
};

export default function AskeriPage() {
  const topics = getTopicsBySection("askeri");
  const generatedSlugs = getGeneratedSlugsBySection("askeri");
  const categories = Array.from(new Set(topics.map((t) => t.category)));

  return (
    <SectionLandingPage
      sectionSlug="askeri"
      title="Askeri Tarih"
      latinMotto="Si Vis Pacem, Para Bellum"
      description="Marius reformlarıyla profesyonelleşen lejyon yapısından Gladius, Pilum ve Scutum gibi ikonik teçhizatlara; Testudo (kaplumbağa) düzeni ve kuşatma mühendisliğinden Hannibal'e karşı verilen Pön Savaşları ve Sezar'ın Galya fetihlerine; Teutoburg felaketinden imparatorları tahta çıkaran Pretorian Muhafızlarına ve ordunun siyasi güçle olan ölümcül ilişkisine uzanan askeri deha."
      topics={topics}
      generatedSlugs={generatedSlugs}
      categories={categories}
    />
  );
}