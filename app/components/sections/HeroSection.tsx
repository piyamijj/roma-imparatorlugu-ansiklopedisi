"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Flame,
  Users,
  Coins,
  Scale,
  Shield,
} from "lucide-react";
import { LaurelWreathIcon, SPQRBanner } from "../roman/RomanMotifs";
import { NAV_SECTIONS } from "@/lib/navigation";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax values for background depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const wreathY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // Filter out Homepage and Q&A for the quick entry grid
  const gridSections = NAV_SECTIONS.filter(
    (sec) => sec.slug !== "anasayfa" && sec.slug !== "soru-cevap"
  );

  // Map section slugs to verified, classic Lucide icons to avoid build failures
  const getSectionIcon = (slug: string) => {
    switch (slug) {
      case "zaman-cizelgesi":
        return <Clock className="w-8 h-8 text-gold-500" />;
      case "din-mitoloji":
        return <Flame className="w-8 h-8 text-gold-500" />;
      case "kultur-toplum":
        return <Users className="w-8 h-8 text-gold-500" />;
      case "ekonomi":
        return <Coins className="w-8 h-8 text-gold-500" />;
      case "siyaset-hukuk":
        return <Scale className="w-8 h-8 text-gold-500" />;
      case "askeri":
        return <Shield className="w-8 h-8 text-gold-500" />;
      default:
        return <Shield className="w-8 h-8 text-gold-500" />;
    }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col overflow-x-hidden">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[92vh] w-full flex flex-col items-center justify-center overflow-hidden porphyry-surface px-4 sm:px-6 lg:px-8 py-20">
        {/* Parallax Background Layers */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none opacity-20"
        >
          {/* Subtle Roman Column Silhouette Watermark */}
          <div className="absolute inset-0 flex justify-around items-end px-10">
            <div className="w-12 h-[80%] border-x border-marble-300/20 relative">
              <div className="absolute top-0 left-0 right-0 h-4 bg-marble-300/20" />
            </div>
            <div className="w-12 h-[90%] border-x border-marble-300/20 relative hidden md:block">
              <div className="absolute top-0 left-0 right-0 h-4 bg-marble-300/20" />
            </div>
            <div className="w-12 h-[90%] border-x border-marble-300/20 relative hidden md:block">
              <div className="absolute top-0 left-0 right-0 h-4 bg-marble-300/20" />
            </div>
            <div className="w-12 h-[80%] border-x border-marble-300/20 relative">
              <div className="absolute top-0 left-0 right-0 h-4 bg-marble-300/20" />
            </div>
          </div>
        </motion.div>

        {/* Giant Laurel Wreath Watermark */}
        <motion.div
          style={{ y: wreathY }}
          className="absolute pointer-events-none flex items-center justify-center z-0 opacity-15"
        >
          <LaurelWreathIcon size={320} color="#d9b84a" />
        </motion.div>

        {/* Foreground Content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 px-2"
        >
          {/* SPQR Banner */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SPQRBanner size={140} />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="inscription-text gold-foil-text animate-shimmer text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide sm:tracking-wider leading-tight w-full max-w-full break-words"
          >
            ROMA İMPARATORLUĞU
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-xl sm:text-2xl md:text-3xl font-serif italic text-marble-100 font-medium tracking-wide"
          >
            Bin Yıllık Bir Medeniyetin Tarihi, Dini, Kültürü ve Mirası
          </motion.p>

          {/* Short Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-marble-300/90 max-w-2xl leading-relaxed font-body"
          >
            Kuruluş efsanelerinden Cumhuriyetin yükselişine, Sezarların mutlak 
            iktidarından lejyonların fihristine kadar Antik Roma dünyasını 
            derinlemesine inceleyen, görsel açıdan zenginleştirilmiş dijital anıt.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 w-full sm:w-auto justify-center"
          >
            <Link href="/zaman-cizelgesi" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(201,162,39,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700 text-ink font-inscription text-sm font-bold tracking-widest shadow-lg border border-gold-300/30 flex items-center justify-center gap-2 transition-all"
              >
                Zaman Çizelgesini Keşfet
                <ArrowRight size={16} />
              </motion.button>
            </Link>

            <Link href="/sor" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(243,228,176,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-gold-500/60 text-gold-300 font-inscription text-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                Yapay Zekaya Sor
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center gap-1 pointer-events-none z-10">
          <span className="text-[10px] font-inscription tracking-widest text-marble-300/50 uppercase">
            Keşfetmek için kaydırın
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-gold-500/70"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </section>

      {/* Column Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="column-divider">
          <span className="column-divider-ornament" />
        </div>
      </div>

      {/* 2. Quick Entry Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-inscription tracking-widest text-gold-700 uppercase font-bold">
            MEDENİYETİN SÜTUNLARI
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-porphyry-900 tracking-wide">
            Ana Araştırma Alanları
          </h2>
          <p className="text-sm sm:text-base text-ink/60 max-w-xl mx-auto font-body">
            Roma dünyasını şekillendiren yedi temel başlığı ve her birinin ardındaki 
            tarihsel derinliği keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridSections.map((section, idx) => (
            <Link key={section.slug} href={section.href} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(42,38,32,0.15)" }}
                className="marble-surface h-full p-6 sm:p-8 rounded-xl border border-marble-300/40 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle background laurel wreath watermark on hover */}
                <div className="absolute -right-6 -bottom-6 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none">
                  <LaurelWreathIcon size={120} color="#8c6239" />
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-porphyry-900/5 rounded-lg w-fit group-hover:bg-porphyry-900/10 transition-colors duration-300">
                    {getSectionIcon(section.slug)}
                  </div>
                  <h3 className="font-inscription text-lg font-bold text-porphyry-900 tracking-wider group-hover:text-gold-700 transition-colors duration-200">
                    {section.label}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed font-body">
                    {section.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-inscription tracking-widest text-gold-700 font-bold pt-6 group-hover:translate-x-1 transition-transform duration-300">
                  İNCELE
                  <ArrowRight size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}