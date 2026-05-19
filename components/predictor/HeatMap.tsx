"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HeatRow = {
  subject: string;
  chapter: string;
  count: number;
  avgProb: number;
  maxProb: number;
  hot: number;
};

const SUBJECT_EMOJI: Record<string, string> = {
  math: "📐",
  science: "🔬",
  physics: "⚛️",
  chemistry: "🧪",
  biology: "🧬",
  english: "📖",
};

export function HeatMap({ rows }: { rows: HeatRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="card-glass text-center text-sm text-white/55">
        No chapter data yet. Run <code className="rounded bg-white/10 px-1.5 py-0.5 text-neon-cyan">npm run seed</code>.
      </div>
    );
  }

  const max = Math.max(...rows.map((r) => r.maxProb), 0.01);

  return (
    <div className="card-glass">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="font-display text-xl font-bold">Chapter heatmap 🌡️</h3>
          <p className="text-xs text-white/55">Probability per chapter, hottest first.</p>
        </div>
        <Legend />
      </div>

      <ul className="space-y-2">
        {rows.map((r, i) => {
          const pct = Math.round(r.avgProb * 100);
          const widthPct = Math.max(6, (r.maxProb / max) * 100);
          const tier = tierFor(r.avgProb);
          return (
            <li key={`${r.subject}-${r.chapter}`} className="group">
              <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-base">{SUBJECT_EMOJI[r.subject] ?? "📚"}</span>
                  <span className="truncate font-semibold text-white/85">{r.chapter}</span>
                  {r.hot > 0 && (
                    <span className="pill-neon-pink shrink-0 !px-2 !py-0 text-[9px]">
                      🔥 {r.hot}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="stat-num text-white/65">{pct}%</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/45">{r.count}q</span>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.025, ease: "easeOut" }}
                  className={cn("h-full rounded-full", tier.bar)}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function tierFor(p: number) {
  if (p >= 0.7) return { bar: "bg-grad-pink-purple shadow-glow-pink", label: "very likely" };
  if (p >= 0.5) return { bar: "bg-grad-yellow-pink", label: "likely" };
  if (p >= 0.3) return { bar: "bg-grad-cyan-purple", label: "possible" };
  return { bar: "bg-white/15", label: "low" };
}

function Legend() {
  return (
    <div className="hidden gap-2 text-[10px] uppercase tracking-widest text-white/45 sm:flex">
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-full bg-grad-pink-purple" /> 70%+
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-full bg-grad-yellow-pink" /> 50%+
      </span>
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-full bg-grad-cyan-purple" /> 30%+
      </span>
    </div>
  );
}
