"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, AlertCircle, Calendar, Users, BookOpen, Info } from "lucide-react";
import { GeneratedTopicFile } from "@/lib/types";
import { LaurelDividerRow } from "../roman/RomanMotifs";

interface TopicContentViewProps {
  data: GeneratedTopicFile;
  relatedTopicsResolved?: { slug: string; title_tr: string; href: string }[];
}

export default function TopicContentView({
  data,
  relatedTopicsResolved = [],
}: TopicContentViewProps) {
  const { content, title_tr, section } = data;

  // Format ISO date to readable Turkish date
  const formatGenDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "";
    }
  };

  // Map section slug to Turkish label and href for breadcrumbs
  const getSectionMeta = (secSlug: string) => {
    switch (secSlug) {
      case "zaman-cizelgesi":
        return { label: "Tarihsel Zaman Çizelgesi", href: "/zaman-cizelgesi" };
      case "din-mitoloji":
        return { label: "Din ve Mitoloji", href: "/din-mitoloji" };
      case "kultur-toplum":
        return { label: "Kültür ve Toplum", href: "/kultur-toplum" };
      case "ekonomi":
        return { label: "Ekonomi", href: "/ekonomi" };
      case "siyaset-hukuk":
        return { label: "Siyaset ve Hukuk", href: "/siyaset-hukuk" };
      case "askeri":
        return { label: "Askeri Tarih", href: "/askeri" };
      default:
        return { label: "Bölümler", href: "/" };
    }
  };

  const secMeta = getSectionMeta(section);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumbs & Meta Header */}
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-xs font-inscription tracking-widest text-ink/50 uppercase">
          <Link href="/" className="hover:text-gold-700 transition-colors">
            ROMA
          </Link>
          <span>/</span>
          <Link href={secMeta.href} className="hover:text-gold-700 transition-colors">
            {secMeta.label}
          </Link>
        </nav>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="px-3 py-1 rounded-full bg-gold-100 border border-gold-300/30 text-gold-900 font-inscription text-[10px] font-bold tracking-widest uppercase">
            {content.keyTerms?.[0]?.term || "ANSİKLOPEDİ"}
          </span>
          {data.content.timeline?.[0]?.era && (
            <span className="px-3 py-1 rounded-full bg-porphyry-900/5 border border-porphyry-900/10 text-porphyry-900 font-inscription text-[10px] font-bold tracking-widest uppercase">
              {data.content.timeline[0].era}
            </span>
          )}
        </div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-porphyry-900 tracking-wide leading-tight"
        >
          {title_tr}
        </motion.h1>
      </div>

      {/* Overview Callout */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="marble-surface rounded-xl border-l-4 border-l-gold-500 border-y border-r border-marble-300/40 p-6 sm:p-8 shadow-md"
      >
        <p className="text-lg sm:text-xl font-serif italic text-ink/90 leading-relaxed">
          {content.overview}
        </p>
      </motion.div>

      {/* Laurel Divider */}
      <LaurelDividerRow />

      {/* Body Subsections */}
      <div className="space-y-10">
        {content.body.map((sub, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-marble-300/30 pb-2">
              <div className="w-2 h-2 bg-gold-500 rotate-45 flex-shrink-0 shadow-sm" />
              <h2 className="font-inscription text-xl sm:text-2xl font-bold text-porphyry-900 tracking-wider">
                {sub.heading}
              </h2>
            </div>
            <div className="space-y-4 text-base sm:text-lg text-ink/85 leading-relaxed font-body">
              {sub.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Timeline Section */}
      {content.timeline && content.timeline.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 pt-6"
        >
          <div className="flex items-center gap-3 border-b border-marble-300/30 pb-2">
            <Calendar className="w-5 h-5 text-gold-700" />
            <h2 className="font-inscription text-xl sm:text-2xl font-bold text-porphyry-900 tracking-wider">
              Kronoloji
            </h2>
          </div>

          <div className="relative border-l-2 border-gold-500/30 ml-4 pl-6 space-y-8 py-2">
            {content.timeline.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative space-y-1.5"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-marble-100 border-2 border-gold-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-700" />
                </div>

                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-inscription text-sm font-bold text-gold-700 tracking-wider">
                    {event.year}
                  </span>
                  {event.era && (
                    <span className="text-[10px] font-inscription tracking-widest text-ink/40 uppercase">
                      ({event.era})
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-bold text-porphyry-900 text-base sm:text-lg">
                  {event.title}
                </h3>
                <p className="text-sm sm:text-base text-ink/70 leading-relaxed font-body">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Key Figures Section */}
      {content.keyFigures && content.keyFigures.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 pt-6"
        >
          <div className="flex items-center gap-3 border-b border-marble-300/30 pb-2">
            <Users className="w-5 h-5 text-gold-700" />
            <h2 className="font-inscription text-xl sm:text-2xl font-bold text-porphyry-900 tracking-wider">
              Önemli Şahsiyetler
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.keyFigures.map((figure, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="marble-surface rounded-xl border border-marble-300/40 p-5 sm:p-6 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="font-serif font-bold text-porphyry-900 text-lg">
                      {figure.name}
                    </h3>
                    {figure.lifespan && (
                      <span className="text-xs text-ink/50 font-body italic">
                        {figure.lifespan}
                      </span>
                    )}
                  </div>
                  <span className="block text-[10px] font-inscription tracking-widest text-gold-700 font-bold uppercase">
                    {figure.role}
                  </span>
                  <p className="text-sm text-ink/70 leading-relaxed font-body pt-2">
                    {figure.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Key Terms / Glossary Section */}
      {content.keyTerms && content.keyTerms.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 pt-6"
        >
          <div className="flex items-center gap-3 border-b border-marble-300/30 pb-2">
            <BookOpen className="w-5 h-5 text-gold-700" />
            <h2 className="font-inscription text-xl sm:text-2xl font-bold text-porphyry-900 tracking-wider">
              Önemli Terimler
            </h2>
          </div>

          <div className="marble-surface rounded-xl border border-marble-300/40 p-6 divide-y divide-marble-300/20 shadow-sm">
            {content.keyTerms.map((term, idx) => (
              <div
                key={idx}
                className={`py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-2 sm:gap-6`}
              >
                <div className="sm:w-1/3 flex-shrink-0">
                  <span className="font-inscription text-sm font-bold text-porphyry-900 tracking-wider block">
                    {term.term}
                  </span>
                </div>
                <div className="sm:w-2/3">
                  <p className="text-sm sm:text-base text-ink/75 leading-relaxed font-body">
                    {term.definition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Did You Know Section */}
      {content.didYouKnow && content.didYouKnow.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gold-100/40 border border-gold-300/30 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm"
        >
          <div className="flex items-center gap-2.5 text-gold-900">
            <Lightbulb className="w-5 h-5 text-gold-700 flex-shrink-0" />
            <h3 className="font-inscription text-sm font-bold tracking-widest uppercase">
              Biliyor muydunuz?
            </h3>
          </div>
          <ul className="space-y-3 text-sm sm:text-base text-ink/80 font-body leading-relaxed">
            {content.didYouKnow.map((fact, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 bg-gold-500 rotate-45 mt-2 flex-shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Disputed Points Section */}
      {content.disputedPoints && content.disputedPoints.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-2 border-dashed border-bronze-500/30 bg-marble-50/50 rounded-xl p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5 text-porphyry-900">
            <AlertCircle className="w-5 h-5 text-bronze-700 flex-shrink-0" />
            <h3 className="font-inscription text-sm font-bold tracking-widest uppercase">
              Tarihsel Tartışmalar ve Belirsizlikler
            </h3>
          </div>
          <div className="space-y-3 text-sm sm:text-base text-ink/70 font-body leading-relaxed italic">
            {content.disputedPoints.map((point, idx) => (
              <p key={idx} className="relative pl-4 border-l border-bronze-500/40">
                {point.note}
              </p>
            ))}
          </div>
        </motion.section>
      )}

      {/* Related Topics Section */}
      {relatedTopicsResolved && relatedTopicsResolved.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4 pt-4"
        >
          <div className="flex items-center gap-2 text-ink/40">
            <Info className="w-4 h-4" />
            <h4 className="font-inscription text-xs font-bold tracking-widest uppercase">
              İlişkili Konular
            </h4>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {relatedTopicsResolved.map((topic) => (
              <Link key={topic.slug} href={topic.href}>
                <span className="inline-block px-4 py-2 rounded-lg bg-marble-50 border border-marble-300/30 text-porphyry-900 font-inscription text-xs font-bold tracking-wider hover:bg-porphyry-900 hover:text-gold-300 hover:border-gold-500 transition-all duration-200 shadow-sm">
                  {topic.title_tr}
                </span>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Article Footer Meta */}
      <div className="border-t border-marble-300/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/40 font-body">
        <p>
          Yayınlanma Tarihi: {formatGenDate(data.generatedAt)}
        </p>
        <p className="italic">
          İçerik yapay zeka desteğiyle üretilmiş ve gözden geçirilmiştir.
        </p>
      </div>
    </article>
  );
}