import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { ColumnIcon } from "../roman/RomanMotifs";

interface TopicComingSoonProps {
  title: string;
  sectionHref: string;
  sectionLabel: string;
}

export default function TopicComingSoon({
  title,
  sectionHref,
  sectionLabel,
}: TopicComingSoonProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="marble-surface rounded-2xl border border-marble-300/40 p-8 sm:p-12 flex flex-col items-center text-center space-y-8 shadow-xl">
        {/* Muted Column Motif */}
        <div className="text-bronze-500/30 animate-pulse">
          <ColumnIcon size={48} height={120} />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="text-xs font-inscription tracking-widest text-gold-700 uppercase font-bold">
            MONUMENTUM INCOMPLETUM
          </span>
          <h1 className="font-inscription text-2xl sm:text-3xl font-bold text-porphyry-900 tracking-wider">
            İçerik Hazırlanıyor
          </h1>
        </div>

        {/* Body Text */}
        <div className="space-y-4 max-w-lg text-ink/70 font-body text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-porphyry-900 font-serif font-semibold">
              &ldquo;{title}&rdquo;
            </strong>{" "}
            başlığı altındaki detaylı ansiklopedik içerik şu anda tarihçilerimiz ve 
            yapay zeka asistanımız tarafından hazırlanmaktadır.
          </p>
          <p className="text-xs sm:text-sm italic text-ink/50">
            Bu yazıt henüz tercüme edilmemiştir. Ancak bu konu hakkında hemen şimdi 
            yapay zeka asistanımıza soru sorabilir veya ilgili bölümdeki diğer hazır 
            başlıkları inceleyebilirsiniz.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto justify-center">
          <Link href={`/sor?konu=${encodeURIComponent(title)}`} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-gold-700 to-gold-500 text-ink font-inscription text-xs font-bold tracking-widest shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-ink" />
              Bu Konuyu Yapay Zekaya Sor
            </button>
          </Link>

          <Link href={sectionHref} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-bronze-500/40 text-bronze-700 font-inscription text-xs font-bold tracking-widest hover:bg-marble-200/50 transition-all flex items-center justify-center gap-2">
              <ArrowLeft size={14} />
              {sectionLabel} Bölümüne Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}