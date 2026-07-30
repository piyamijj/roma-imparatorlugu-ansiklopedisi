import React from "react";
import Link from "next/link";
import { LaurelWreathIcon } from "./roman/RomanMotifs";
import { NAV_SECTIONS } from "@/lib/navigation";

export default function SiteFooter() {
  // Filter sections for the footer links
  const contentSections = NAV_SECTIONS.filter(
    (sec) => sec.slug !== "anasayfa" && sec.slug !== "soru-cevap"
  );

  return (
    <footer className="porphyry-surface border-t-2 border-gold-700/60 shadow-2xl mt-auto">
      {/* Top Decorative Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="column-divider">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-gold-500/60" />
            <LaurelWreathIcon size={44} color="#d9b84a" />
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-gold-500/60" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="inscription-text gold-foil-text text-lg font-bold tracking-wider">
              ROMA İMPARATORLUĞU
            </span>
            <span className="text-[10px] font-inscription tracking-widest text-marble-300/60 uppercase mt-0.5">
              ANSİKLOPEDİSİ
            </span>
          </div>
          <p className="text-sm text-marble-300/80 leading-relaxed font-body">
            Antik Roma medeniyetinin kuruluşundan yıkılışına kadar uzanan görkemli tarihini, 
            kültürünü, askeri yapısını ve hukuk sistemini Türkçe kaynak olarak en derin 
            ayrıntılarıyla sunan dijital anıt.
          </p>
          <div className="pt-2">
            <span className="inscription-text text-xs text-gold-300/90 tracking-widest">
              S•P•Q•R
            </span>
          </div>
        </div>

        {/* Sections Column */}
        <div className="space-y-4">
          <h3 className="font-inscription text-sm font-bold tracking-wider text-gold-300 uppercase border-b border-gold-700/20 pb-2">
            Bölümler
          </h3>
          <ul className="space-y-2.5 text-sm font-inscription tracking-wide">
            {contentSections.map((section) => (
              <li key={section.slug}>
                <Link
                  href={section.href}
                  className="text-marble-300 hover:text-gold-300 transition-colors duration-200 block"
                >
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore Column */}
        <div className="space-y-4">
          <h3 className="font-inscription text-sm font-bold tracking-wider text-gold-300 uppercase border-b border-gold-700/20 pb-2">
            Keşfet
          </h3>
          <ul className="space-y-2.5 text-sm font-inscription tracking-wide">
            <li>
              <Link
                href="/"
                className="text-marble-300 hover:text-gold-300 transition-colors duration-200 block"
              >
                Anasayfa
              </Link>
            </li>
            <li>
              <Link
                href="/sor"
                className="text-marble-300 hover:text-gold-300 transition-colors duration-200 block font-semibold"
              >
                Yapay Zekaya Sor (Q&A)
              </Link>
            </li>
            <li className="text-marble-300/40 text-xs font-body pt-2 leading-relaxed">
              Roma hukuku, lejyon taktikleri, mitolojik figürler ve günlük yaşam hakkında 
              istediğiniz her şeyi yapay zeka asistanımıza sorabilirsiniz.
            </li>
          </ul>
        </div>

        {/* About / Disclaimer Column */}
        <div className="space-y-4">
          <h3 className="font-inscription text-sm font-bold tracking-wider text-gold-300 uppercase border-b border-gold-700/20 pb-2">
            Hakkında & Feragatname
          </h3>
          <div className="space-y-3 text-xs text-marble-300/70 leading-relaxed font-body">
            <p>
              Bu platformda sunulan içerikler, yapay zeka destekli tarihsel sentez ve akademik 
              kaynakların derlenmesiyle oluşturulmuştur. Eğitim ve genel kültür amaçlıdır.
            </p>
            <p>
              Akademik çalışmalarınızda birincil tarihi kaynakları (Tacitus, Livius, Suetonius vb.) 
              ve hakemli modern literatürü referans almanız önemle tavsiye edilir.
            </p>
            <p className="text-gold-300/60 italic">
              Tarihsel belirsizlikler ve tartışmalı konular metinlerde açıkça belirtilmiştir.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold-700/20 bg-porphyry-950/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-marble-300/50 font-body">
          <p>
            © 2026 Roma İmparatorluğu Ansiklopedisi. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-gold-500 rotate-45" />
            <p>Eğitim ve bilgilendirme amaçlı hazırlanmış bir dijital anıttır.</p>
            <span className="w-1 h-1 bg-gold-500 rotate-45" />
          </div>
        </div>
      </div>
    </footer>
  );
}