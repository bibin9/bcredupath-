"use client";

import { cn } from "@/lib/utils";

type Day = { date: string; count: number };

/**
 * GitHub-style activity heatmap. 12 weeks back, 7 rows (Mon-Sun).
 */
export function Heatmap({ days }: { days: Day[] }) {
  // Find max for color scaling
  const max = Math.max(1, ...days.map((d) => d.count));

  // Bucket count → intensity 0-4
  function bucket(n: number): 0 | 1 | 2 | 3 | 4 {
    if (n === 0) return 0;
    if (n <= max * 0.25) return 1;
    if (n <= max * 0.5) return 2;
    if (n <= max * 0.75) return 3;
    return 4;
  }

  const tones = [
    "bg-white/[0.04]",
    "bg-neon-pink/30",
    "bg-neon-pink/55",
    "bg-neon-pink/80",
    "bg-neon-pink shadow-glow-pink",
  ];

  // Group into 12 weekly columns
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="card-glass">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <h3 className="font-display text-lg font-bold">Practice heatmap 🔥</h3>
          <p className="text-xs text-white/55">Last 12 weeks of activity</p>
        </div>
        <div className="hidden items-center gap-1.5 text-[10px] text-white/45 sm:flex">
          <span>Less</span>
          {tones.map((t, i) => (
            <span key={i} className={cn("h-3 w-3 rounded-sm", t)} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="no-scrollbar overflow-x-auto">
        <div className="flex gap-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1.5">
              {week.map((d) => {
                const b = bucket(d.count);
                return (
                  <div
                    key={d.date}
                    title={`${d.date}: ${d.count} questions`}
                    className={cn("h-4 w-4 rounded-sm transition-all hover:scale-125", tones[b])}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
