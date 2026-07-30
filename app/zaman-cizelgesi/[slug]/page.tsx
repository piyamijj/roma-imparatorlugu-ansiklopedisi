import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTopicMeta, getGeneratedTopicContent } from "@/lib/topics";
import TopicContentView from "../../components/topic/TopicContentView";
import TopicComingSoon from "../../components/topic/TopicComingSoon";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = getTopicMeta(params.slug);
  if (!meta) {
    return {
      title: "Konu Bulunamadı | Roma İmparatorluğu Ansiklopedisi",
    };
  }
  return {
    title: `${meta.title_tr} | Roma İmparatorluğu Ansiklopedisi`,
    description: meta.short_desc,
  };
}

export default function TopicPage({ params }: PageProps) {
  const meta = getTopicMeta(params.slug);
  
  // Ensure topic exists and belongs to this section
  if (!meta || meta.section !== "zaman-cizelgesi") {
    notFound();
  }

  const generatedContent = getGeneratedTopicContent(params.slug);

  if (!generatedContent) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center">
        <TopicComingSoon
          title={meta.title_tr}
          sectionHref="/zaman-cizelgesi"
          sectionLabel="Tarihsel Zaman Çizelgesi"
        />
      </div>
    );
  }

  // Resolve related topics for cross-linking
  const relatedTopicsResolved = (generatedContent.content.relatedTopicSlugs || [])
    .map((slug) => {
      const relatedMeta = getTopicMeta(slug);
      if (!relatedMeta) return null;
      return {
        slug,
        title_tr: relatedMeta.title_tr,
        href: `/${relatedMeta.section}/${relatedMeta.slug}`,
      };
    })
    .filter((item): item is { slug: string; title_tr: string; href: string } => item !== null);

  return (
    <div className="min-h-screen bg-marble-100/30">
      <TopicContentView
        data={generatedContent}
        relatedTopicsResolved={relatedTopicsResolved}
      />
    </div>
  );
}