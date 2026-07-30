import type { Metadata } from "next";
import { getTopicsBySection, getGeneratedSlugsBySection } from "@/lib/topics";
import SectionLandingPage from "../components/sections/SectionLandingPage";

export const metadata: Metadata = {
  title: "Din ve Mitoloji | Roma İmparatorluğu Ansiklopedisi",
  description: "Roma panteonu, devlet dini, kutsal rahiplikler, gizem kültleri ve Hristiyanlığın zulümlerden devlet dinine yükselişinin inançsal serüveni.",
};

export default function DinMitolojiPage() {
  const topics = getTopicsBySection("din-mitoloji");
  const generatedSlugs = getGeneratedSlugsBySection("din-mitoloji");
  const categories = Array.from(new Set(topics.map((t) => t.category)));

  return (
    <SectionLandingPage
      sectionSlug="din-mitoloji"
      title="Din ve Mitoloji"
      latinMotto="Deorum Voluntas"
      description="Jüpiter liderliğindeki devlet tanrılarından ve Yunan mitolojisiyle sentezden, Pontifex Maximus ve Vesta Bakireleri gibi resmi rahipliklere; Mithra ve İsis gibi gizemli doğu kültlerinden, Hristiyanlığın zulümlerden sıyrılarak imparatorluğun resmi inancı haline gelmesine uzanan inanç dünyası."
      topics={topics}
      generatedSlugs={generatedSlugs}
      categories={categories}
    />
  );
}