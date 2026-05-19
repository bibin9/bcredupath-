"use client";

import { EmojiAvatar } from "@/components/shared/EmojiAvatar";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export type LbEntry = {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  state?: string | null;
  city?: string | null;
  school?: string | null;
  tierEmoji: string;
};

export function LeaderboardRow({
  entry,
  isMe,
  showLocation,
}: {
  entry: LbEntry;
  isMe?: boolean;
  showLocation?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border px-3 py-2.5 transition-all",
        isMe
          ? "border-neon-purple/50 bg-neon-purple/15 shadow-glow-purple"
          : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.18] hover:bg-white/[0.06]"
      )}
    >
      <div className="flex w-9 shrink-0 items-center justify-center">
        {entry.rank <= 3 ? (
          <span className="text-xl">
            {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
          </span>
        ) : (
          <span className="stat-num text-sm text-white/55">#{entry.rank}</span>
        )}
      </div>

      <EmojiAvatar emoji={entry.avatar} size="md" ring={false} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="truncate">{entry.name}</span>
          {isMe && (
            <span className="rounded-full bg-neon-purple/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-neon-purple">
              YOU
            </span>
          )}
          <span className="text-base">{entry.tierEmoji}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/55">
          <span>Lvl {entry.level}</span>
          {showLocation && entry.state && (
            <>
              <span>·</span>
              <span className="truncate">📍 {entry.state}</span>
            </>
          )}
          {entry.streak > 0 && (
            <>
              <span>·</span>
              <span className="flex items-center gap-0.5 text-neon-orange">
                <Flame className="h-2.5 w-2.5" fill="currentColor" />
                {entry.streak}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="stat-num text-base text-white">{entry.xp.toLocaleString("en-IN")}</div>
        <div className="text-[9px] uppercase tracking-widest text-white/45">XP</div>
      </div>
    </div>
  );
}
