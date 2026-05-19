"use client";

import Link from "next/link";
import { EmojiAvatar } from "./EmojiAvatar";
import { XPBar } from "@/components/game/XPBar";
import { StreakCounter } from "@/components/game/StreakCounter";
import { rankFromXP, RANK_EMOJI } from "@/lib/gamification";
import { NotificationBell } from "./NotificationBell";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";

export function TopBar({
  name,
  avatar,
  xp,
  streak,
  showAdmin,
}: {
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  showAdmin?: boolean;
}) {
  const rank = rankFromXP(xp);

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-grad-pink-purple text-lg shadow-glow-pink">
            🎯
          </div>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <StreakCounter count={streak} size="sm" />
          <span className="hidden sm:inline-flex pill-neon-yellow">
            {RANK_EMOJI[rank]} {rank}
          </span>
          <NotificationBell />
          <Link href="/dashboard/profile" className="hidden shrink-0 lg:block">
            <EmojiAvatar emoji={avatar} size="md" />
          </Link>
          <MobileMenu showAdmin={showAdmin} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 lg:hidden">
        <XPBar xp={xp} showLabel={true} />
      </div>
    </header>
  );
}
