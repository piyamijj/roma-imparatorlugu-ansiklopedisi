"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { SectionSlug, TopicListEntry } from "@/lib/types";
import { ColumnIcon, LaurelDividerRow } from "../roman/RomanMotifs";

interface SectionLandingPageProps {
  sectionSlug: SectionSlug;
  title: string;
  latinMotto?: string;
  description: string;
  topics: TopicListEntry[];
  generatedSlugs: string[];
  categories: string[];
}

export default function SectionLandingPage({
  sectionSlug,
  title,
  latinMotto,
  description,
  topics,
  generatedSlugs,
  categories,
}: SectionLandingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");

  // Filter topics based on selected category
  const filteredTopics = selectedCategory === "Tümü"
    ? topics
    : topics.filter((t) => t.category === selectedCategory);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Section Hero Band */}
      <section className="relative porphyry-surface py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-gold-700/30 shadow-md">
        {/* Flanking Columns Watermark */}
        <div className="absolute inset-y-0 left-6 w-12 opacity-5 pointer-events-none hidden md:block">
          <ColumnIcon size={40} height={180} />
        </div>
        <div className="absolute inset-y-0 right-6 w-12 opacity-5 pointer-events-none hidden md:block">
          <ColumnIcon size={40} height={180} />
        </div>

        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          {latinMotto && (
            <span className="inscription-text gold-foil-text text-xs sm:text-sm font-bold tracking-widest block">
              {latinMotto}
            </span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inscription-text text-3xl sm:text-4xl md:text-5xl font-bold text-marble-50 tracking-wider leading-tight"
          >
            {title}
          </motion.h1>
          <p className="text-sm sm:text-base text-marble-300/90 leading-relaxed font-body max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Laurel Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <LaurelDividerRow />
      </div>

      {/* 2. Category Filter Chips */}
      {categories.length > 1 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 scrollbar-none mask-gradient-r">
            <button
              onClick={() => setSelectedCategory("Tümü")}
              className={`px-4 py-2 rounded-full font-inscription text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-200 flex-shrink-0 border ${
                selectedCategory === "Tümü"
                  ? "bg-porphyry-900 border-gold-500 text-gold-300 shadow-sm"
                  : "bg-marble-50 border-marble-300/40 text-ink/70 hover:bg-marble-200/50"
              }`}
            >
              Tümü
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-inscription text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-200 flex-shrink-0 border ${
                  selectedCategory === cat
                    ? "bg-porphyry-900 border-gold-500 text-gold-300 shadow-sm"
                    : "bg-marble-50 border-marble-300/40 text-ink/70 hover:bg-marble-200/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 3. Topics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 text-ink/40 font-body">
            Bu kategoride henüz konu tanımlanmamış.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTopics.map((topic, idx) => {
              const isReady = generatedSlugs.includes(topic.slug);
              return (
                <Link key={topic.slug} href={`/${sectionSlug}/${topic.slug}`} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.6), ease: "easeOut" }}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(42,38,32,0.12)" }}
                    className="marble-surface h-full p-6 rounded-xl border border-marble-300/40 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      {/* Card Header Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-inscription tracking-widest text-gold-700 font-bold uppercase">
                          {topic.category}
                        </span>
                        
                        {/* Status Badge */}
                        {isReady ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-laurel-300/10 border border-laurel-300/20 text-laurel text-[9px] font-inscription font-bold tracking-wider uppercase">
                            <CheckCircle2 className="w-2.5 h-2.5 text-laurel" />
                            HAZIR
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-bronze-500/5 border border-bronze-500/10 text-bronze-700 text-[9px] font-inscription font-bold tracking-wider uppercase">
                            <Clock className="w-2.5 h-2.5 text-bronze-500" />
                            YAZILIYOR
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-porphyry-900 text-lg sm:text-xl group-hover:text-gold-700 transition-colors duration-200">
                        {topic.title_tr}
                      </h3>

                      {/* Teaser Description */}
                      <p className="text-sm text-ink/70 leading-relaxed font-body line-clamp-3">
                        {topic.short_desc}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-marble-300/20 mt-4">
                      {topic.era_tag ? (
                        <span className="px-2 py-0.5 rounded bg-marble-200/60 text-ink/50 text-[9px] font-inscription tracking-wider uppercase">
                          {topic.era_tag}
                        </span>
                      ) : (
                        <span />
                      )}
                      
                      <div className="flex items-center gap-1 text-[10px] font-inscription tracking-widest text-gold-700 font-bold group-hover:translate-x-1 transition-transform duration-300">
                        {isReady ? "OKU" : "AI'YA SOR"}
                        <ArrowRight size={10} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}