import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a1f",
          2: "#14142b",
          3: "#1a1a3e",
        },
        neon: {
          pink: "#ff3e88",
          purple: "#a855f7",
          cyan: "#06d6ff",
          yellow: "#ffd60a",
          green: "#00f5a0",
          orange: "#ff7a3d",
        },
        border: "rgba(255,255,255,0.08)",
        muted: {
          DEFAULT: "rgba(255,255,255,0.05)",
          foreground: "rgba(255,255,255,0.6)",
        },
        foreground: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "glow-pink": "0 0 40px rgba(255,62,136,0.45)",
        "glow-purple": "0 0 40px rgba(168,85,247,0.45)",
        "glow-cyan": "0 0 40px rgba(6,214,255,0.45)",
        "glow-green": "0 0 40px rgba(0,245,160,0.45)",
        "glow-yellow": "0 0 40px rgba(255,214,10,0.45)",
        glass:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grad-pink-purple":
          "linear-gradient(135deg, #ff3e88 0%, #a855f7 100%)",
        "grad-cyan-purple":
          "linear-gradient(135deg, #06d6ff 0%, #a855f7 100%)",
        "grad-yellow-pink":
          "linear-gradient(135deg, #ffd60a 0%, #ff3e88 100%)",
        "grad-green-cyan":
          "linear-gradient(135deg, #00f5a0 0%, #06d6ff 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-50px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        blob: "blob 12s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
