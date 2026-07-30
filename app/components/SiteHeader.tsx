"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AquilaIcon } from "./roman/RomanMotifs";
import { NAV_SECTIONS } from "@/lib/navigation";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Filter out Homepage from navigation links (already represented by the logo)
  const navLinks = NAV_SECTIONS.filter((section) => section.slug !== "anasayfa");

  return (
    <>
    <header className="sticky top-0 z-50 w-full porphyry-surface border-b border-gold-700/40 shadow-lg backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <AquilaIcon size={36} />
          </div>
          <div className="flex flex-col">
            <span className="inscription-text gold-foil-text animate-shimmer text-lg sm:text-xl font-bold tracking-wider leading-none">
              ROMA İMPARATORLUĞU
            </span>
            <span className="text-[10px] sm:text-xs font-inscription tracking-widest text-marble-300/80 uppercase mt-1">
              ANSİKLOPEDİSİ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((section) => {
            const active = isActive(section.href);
            return (
              <Link
                key={section.slug}
                href={section.href}
                className="relative px-3 py-2 text-sm font-inscription tracking-wider uppercase transition-colors duration-200 group"
              >
                <span
                  className={`relative z-10 ${
                    active
                      ? "text-gold-300 font-semibold"
                      : "text-marble-100 hover:text-gold-100"
                  }`}
                >
                  {section.shortLabel || section.label}
                </span>
                
                {/* Active Underline */}
                {active && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Underline (for inactive links) */}
                {!active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gold-300/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-marble-100 hover:text-gold-300 hover:bg-porphyry-700/50 transition-colors focus:outline-none"
            aria-label="Menüyü Aç/Kapat"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Navigation Panel — rendered as a SIBLING of <header>, not a
        descendant. This is required because backdrop-blur on <header>
        creates a new CSS containing block, which would otherwise trap a
        `position: fixed` descendant inside the header's own small box
        (causing the panel to render empty/clipped on real mobile browsers). */}
    <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-x-0 top-20 bottom-0 z-40 w-full marble-surface flex flex-col overflow-y-auto border-t border-gold-700/20"
          >
            <div className="flex-grow px-4 py-6 sm:px-6 space-y-3">
              {/* Add Homepage link back in for mobile */}
              {NAV_SECTIONS.map((section) => {
                const active = isActive(section.href);
                return (
                  <Link
                    key={section.slug}
                    href={section.href}
                    className={`block px-4 py-3 rounded-lg border transition-all duration-200 ${
                      active
                        ? "bg-porphyry-900 border-gold-500 text-gold-300 shadow-md"
                        : "bg-marble-50/50 border-marble-300/30 text-porphyry-900 hover:bg-marble-200/50"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-inscription tracking-wider uppercase text-sm font-bold">
                        {section.label}
                      </span>
                      <span className={`text-xs mt-1 line-clamp-1 ${active ? "text-marble-300" : "text-ink/60"}`}>
                        {section.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Footer Ornament */}
            <div className="p-6 border-t border-marble-300/30 flex flex-col items-center justify-center gap-2 bg-marble-100/50">
              <div className="w-1.5 h-1.5 bg-gold-500 rotate-45" />
              <span className="text-[10px] font-inscription tracking-widest text-ink/40 uppercase">
                SENATUS POPULUSQUE ROMANUS
              </span>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}