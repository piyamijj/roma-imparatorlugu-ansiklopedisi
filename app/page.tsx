import type { Metadata } from "next";
import HeroSection from "./components/sections/HeroSection";

export const metadata: Metadata = {
  title: "Roma İmparatorluğu Ansiklopedisi | Anasayfa",
  description: "Antik Roma medeniyetinin görkemli tarihini, dinini, mitolojisini, kültürünü, ekonomisini, siyasetini, hukukunu ve askeri yapısını derinlemesine inceleyen, görsel açıdan zenginleştirilmiş dijital ansiklopedi.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}