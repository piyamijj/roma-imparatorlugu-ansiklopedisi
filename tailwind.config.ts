import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marble: {
          50: "var(--color-marble-50, #f8f6f2)",
          100: "var(--color-marble-100, #f0ece3)",
          200: "var(--color-marble-200, #e3dccb)",
          300: "var(--color-marble-300, #d1c5a8)",
          400: "var(--color-marble-400, #b8a878)",
          DEFAULT: "var(--color-marble-default, #ede7db)",
          900: "var(--color-marble-900, #2a2620)",
        },
        porphyry: {
          DEFAULT: "var(--color-porphyry-default, #5c1a1a)",
          700: "var(--color-porphyry-700, #4a1414)",
          900: "var(--color-porphyry-900, #2e0d0d)",
        },
        gold: {
          100: "var(--color-gold-100, #f3e4b0)",
          300: "var(--color-gold-300, #d9b84a)",
          500: "var(--color-gold-500, #c9a227)",
          DEFAULT: "var(--color-gold-default, #c9a227)",
          700: "var(--color-gold-700, #96771a)",
          900: "var(--color-gold-900, #5e4a10)",
        },
        bronze: {
          300: "var(--color-bronze-300, #a67c52)",
          500: "var(--color-bronze-500, #8c6239)",
          DEFAULT: "var(--color-bronze-default, #8c6239)",
          700: "var(--color-bronze-700, #654726)",
          900: "var(--color-bronze-900, #3d2b17)",
        },
        ink: {
          DEFAULT: "var(--color-ink-default, #231f1a)",
          700: "var(--color-ink-700, #3a332a)",
        },
        laurel: {
          300: "var(--color-laurel-300, #5a7a5a)",
          DEFAULT: "var(--color-laurel-default, #3f5c3f)",
          700: "var(--color-laurel-700, #2b402b)",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Crimson Pro", "Georgia", "serif"],
        inscription: ["var(--font-inscription)", "Trajan Pro", "Cinzel", "serif"],
      },
      backgroundImage: {
        "marble-veins": "repeating-linear-gradient(45deg, rgba(42,38,32,0.01) 0px, rgba(42,38,32,0.01) 2px, transparent 2px, transparent 10px), repeating-linear-gradient(-45deg, rgba(42,38,32,0.01) 0px, rgba(42,38,32,0.01) 1px, transparent 1px, transparent 8px)",
        "gold-shimmer": "linear-gradient(90deg, rgba(201,162,39,0.1) 0%, rgba(217,184,74,0.4) 50%, rgba(201,162,39,0.1) 100%)",
        "radial-vignette": "radial-gradient(circle, transparent 60%, rgba(35,31,26,0.4) 100%)",
      },
      boxShadow: {
        inscription: "0 1px 0 rgba(255,255,255,0.15), 0 -1px 1px rgba(0,0,0,0.4)",
        "gold-glow": "0 0 15px rgba(201,162,39,0.25)",
      },
      keyframes: {
        "fresco-reveal": {
          "0%": { opacity: "0", filter: "blur(8px)", transform: "translateY(20px)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
        "column-rise": {
          "0%": { transform: "scaleY(0)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "coin-flip": {
          "0%": { transform: "perspective(1000px) rotateY(0deg)" },
          "100%": { transform: "perspective(1000px) rotateY(360deg)" },
        },
      },
      animation: {
        "fresco-reveal": "fresco-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "column-rise": "column-rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 3s infinite linear",
        "coin-flip": "coin-flip 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;