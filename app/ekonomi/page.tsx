import type { Metadata } from "next";
import { getTopicsBySection, getGeneratedSlugsBySection } from "@/lib/topics";
import SectionLandingPage from "../components/sections/SectionLandingPage";

export const metadata: Metadata = {
  title: "Ekonomi | Roma İmparatorluğu Ansiklopedisi",
  description: "Antik Roma'da para birimleri, darphaneler, Akdeniz ticaret ağları, tarım, vergilendirme, kölelik ekonomisi ve geç imparatorluk dönemindeki ekonomik çöküş.",
};

export default function EkonomiPage() {
  const topics = getTopicsBySection("ekonomi");
  const generatedSlugs = getGeneratedSlugsBySection("ekonomi");
  const categories = Array.from(new Set(topics.map((t) => t.category)));

  return (
    <SectionLandingPage
      sectionSlug="ekonomi"
      title="Ekonomi"
      latinMotto="Pecunia Non Olet"
      description="Denarius ve Aureus gibi sikkelerin basımından Akdeniz'i bir iç göle dönüştüren küresel ticaret ağlarına; latifundia çiftliklerindeki tarımsal üretimden eyaletlerden toplanan vergilere; köle emeğinin ekonomik rolünden 3. Yüzyıl Krizi'ndeki hiperenflasyona ve geç imparatorluk dönemindeki ekonomik feodalleşmeye uzanan finansal ve ticari yapı."
      topics={topics}
      generatedSlugs={generatedSlugs}
      categories={categories}
    />
  );
}