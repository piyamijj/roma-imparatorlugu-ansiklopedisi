import type { Metadata } from "next";
import { getTopicsBySection, getGeneratedSlugsBySection } from "@/lib/topics";
import SectionLandingPage from "../components/sections/SectionLandingPage";

export const metadata: Metadata = {
  title: "Siyaset ve Hukuk | Roma İmparatorluğu Ansiklopedisi",
  description: "Roma'da krallıktan cumhuriyete ve imparatorluğa yönetim biçimlerinin evrimi, Senato, konsüller, Oniki Levha Kanunları ve modern hukukun temeli olan Roma hukuku mirası.",
};

export default function SiyasetHukukPage() {
  const topics = getTopicsBySection("siyaset-hukuk");
  const generatedSlugs = getGeneratedSlugsBySection("siyaset-hukuk");
  const categories = Array.from(new Set(topics.map((t) => t.category)));

  return (
    <SectionLandingPage
      sectionSlug="siyaset-hukuk"
      title="Siyaset ve Hukuk"
      latinMotto="Senatus Populusque Romanus"
      description="Krallık döneminin ilk dengelerinden Cumhuriyetin Senato, konsüller ve Cursus Honorum hiyerarşisine dayalı anayasal yapısına; Julius Caesar ve Augustus ile başlayan mutlak imparatorluk (Principat ve Dominat) otokrasisinden Oniki Levha Kanunları ve Iustinianus derlemeleriyle modern Kıta Avrupası hukukunun temelini atan muazzam Roma hukuku mirası."
      topics={topics}
      generatedSlugs={generatedSlugs}
      categories={categories}
    />
  );
}