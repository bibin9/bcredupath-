"use client";

import { motion } from "framer-motion";
import { EmojiAvatar } from "@/components/shared/EmojiAvatar";
import { cn } from "@/lib/utils";

export type PodiumPlayer = {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  state?: string | null;
};

/**
 * Top-3 podium. Renders an empty slot if fewer than 3 entries exist.
 */
export function Podium({ players }: { players: PodiumPlayer[] }) {
  // Reorder: 2nd, 1st, 3rd for visual height
  const order = [players[1], players[0], players[2]];
  const heights = ["h-28", "h-36", "h-24"];
  const colors = [
    "from-white/[0.15] to-white/[0.03] border-white/20", // silver
    "from-neon-yellow/30 to-neon-yellow/5 border-neon-yellow/40 shadow-glow-yellow", // gold
    "from-neon-orange/25 to-neon-orange/5 border-neon-orange/35", // bronze
  ];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <div className="flex items-end justify-center gap-3 px-3 pt-8 pb-2">
      {order.map((p, i) => {
        if (!p) {
          return (
            <div key={`empty-${i}`} className="flex w-1/3 max-w-[160px] flex-col items-center opacity-30">
              <div className="text-3xl">—</div>
              <div className={cn("mt-3 w-full rounded-t-2xl border bg-gradient-to-b", heights[i], "border-white/10 from-white/[0.04] to-transparent")} />
            </div>
          );
        }
        return (
          <motion.div
            key={p.rank}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + (2 - i) * 0.12, ease: "backOut" }}
            className="flex w-1/3 max-w-[160px] flex-col items-center"
          >
            <div className="relative">
              <EmojiAvatar emoji={p.avatar} size={i === 1 ? "lg" : "md"} />
              <div className={cn(
                "absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-base shadow-glass",
                i === 1 ? "bg-grad-yellow-pink animate-pulse-glow" : "bg-white/[0.1]"
              )}>
                {medals[i]}
              </div>
            </div>
            <div className="mt-2 max-w-full truncate text-center text-sm font-bold text-white">
              {p.name.split(" ")[0]}
            </div>
            {p.state && <div className="truncate text-[10px] text-white/45">{p.state}</div>}
            <div className={cn(
              "mt-2 w-full rounded-t-2xl border bg-gradient-to-b px-2 pt-3 text-center",
              heights[i],
              colors[i]
            )}>
              <div className="font-display text-2xl font-black">#{p.rank}</div>
              <div className="mt-1 stat-num text-xs text-white/85">{p.xp.toLocaleString("en-IN")}</div>
              <div className="text-[9px] uppercase tracking-widest text-white/45">XP</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
