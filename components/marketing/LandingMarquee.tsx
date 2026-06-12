"use client";

/**
 * A continuous horizontal marquee of career chips. Pure CSS animation
 * (no JS frame loop) so it's smooth even on weak devices.
 */
const CAREERS = [
  { emoji: "💻", name: "Software Engineer", tint: "cyan" },
  { emoji: "🩺", name: "Cardiologist", tint: "pink" },
  { emoji: "📒", name: "Chartered Accountant", tint: "yellow" },
  { emoji: "⚖️", name: "Constitutional Lawyer", tint: "purple" },
  { emoji: "🎨", name: "UI / UX Designer", tint: "pink" },
  { emoji: "🤖", name: "AI/ML Engineer", tint: "cyan" },
  { emoji: "🎬", name: "Filmmaker", tint: "purple" },
  { emoji: "✈️", name: "Pilot", tint: "yellow" },
  { emoji: "🧠", name: "Clinical Psychologist", tint: "green" },
  { emoji: "🏛️", name: "Architect", tint: "cyan" },
  { emoji: "🔬", name: "Research Scientist", tint: "yellow" },
  { emoji: "📈", name: "Quant Analyst", tint: "green" },
  { emoji: "🚀", name: "Aerospace Engineer", tint: "pink" },
  { emoji: "💼", name: "Investment Banker", tint: "yellow" },
  { emoji: "🪖", name: "Defense Officer (NDA)", tint: "purple" },
  { emoji: "👨‍🍳", name: "Chef", tint: "pink" },
  { emoji: "🌍", name: "Diplomat (IFS)", tint: "cyan" },
  { emoji: "🎮", name: "Game Developer", tint: "green" },
  { emoji: "🦾", name: "Robotics Engineer", tint: "cyan" },
  { emoji: "🧬", name: "Bioinformatician", tint: "yellow" },
  { emoji: "📸", name: "Photographer", tint: "purple" },
  { emoji: "🇮🇳", name: "IAS Officer", tint: "yellow" },
  { emoji: "💰", name: "Wealth Manager", tint: "green" },
  { emoji: "🌊", name: "Marine Biologist", tint: "cyan" },
];

const TINT_RING: Record<string, string> = {
  cyan: "border-neon-cyan/40 bg-neon-cyan/8 text-neon-cyan",
  pink: "border-neon-pink/40 bg-neon-pink/8 text-neon-pink",
  yellow: "border-neon-yellow/40 bg-neon-yellow/8 text-neon-yellow",
  purple: "border-neon-purple/40 bg-neon-purple/8 text-neon-purple",
  green: "border-neon-green/40 bg-neon-green/8 text-neon-green",
};

export function LandingMarquee() {
  // We render the chips twice so the CSS animation can loop seamlessly.
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />

      <div className="flex w-max animate-[marquee_55s_linear_infinite] gap-3">
        {[...CAREERS, ...CAREERS].map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${TINT_RING[c.tint] ?? ""}`}
          >
            <span className="text-lg">{c.emoji}</span>
            <span className="text-white/85">{c.name}</span>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
