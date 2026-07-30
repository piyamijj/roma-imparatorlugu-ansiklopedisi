import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Crimson_Pro } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

// Load Cinzel for inscription-style headings
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inscription",
  display: "swap",
});

// Load Cormorant Garamond for display headings (with Turkish character support)
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Load Crimson Pro for body text (with Turkish character support)
const crimsonPro = Crimson_Pro({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roma İmparatorluğu Ansiklopedisi",
  description: "Antik Roma'nın görkemli tarihini, dinini, mitolojisini, kültürünü, ekonomisini, siyasetini, hukukunu ve askeri yapısını derinlemesine inceleyen, görsel açıdan zenginleştirilmiş dijital ansiklopedi.",
  openGraph: {
    title: "Roma İmparatorluğu Ansiklopedisi",
    description: "Antik Roma'nın görkemli tarihini, dinini, mitolojisini, kültürünü, ekonomisini, siyasetini, hukukunu ve askeri yapısını derinlemesine inceleyen, görsel açıdan zenginleştirilmiş dijital ansiklopedi.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${cinzel.variable} ${cormorant.variable} ${crimsonPro.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-marble-100 text-ink">
        <SiteHeader />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}