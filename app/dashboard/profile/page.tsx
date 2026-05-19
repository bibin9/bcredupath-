import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { EmojiAvatar } from "@/components/shared/EmojiAvatar";
import { XPBar } from "@/components/game/XPBar";
import { StreakCounter } from "@/components/game/StreakCounter";
import { BadgeChip } from "@/components/game/BadgeChip";
import { rankFromXP, RANK_EMOJI, BADGES, type BadgeId } from "@/lib/gamification";
import { LocaleToggle } from "@/components/shared/LocaleToggle";
import { LogOut, Settings, Languages } from "lucide-react";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const user = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!user) return null;

  const rank = rankFromXP(user.xp);
  const allBadges = Object.keys(BADGES) as BadgeId[];

  return (
    <div className="space-y-6">
      <section className="card-glass">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <EmojiAvatar emoji={user.avatar} size="xl" />
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">{user.name}</h1>
            <p className="text-sm text-white/55">{user.email}</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="pill-neon-cyan">Class {user.class}</span>
              {user.stream && (
                <span className="pill-neon-purple">{user.stream.toUpperCase()}</span>
              )}
              {user.state && <span className="pill">📍 {user.state}</span>}
              <span className="pill-neon-yellow">
                {RANK_EMOJI[rank]} {rank}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/api/auth/signout" className="btn-ghost">
              <LogOut className="h-4 w-4" /> Sign out
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Stat label="Total XP" value={user.xp.toLocaleString("en-IN")} />
          <Stat label="Streak" value={`${user.streak} 🔥`} />
          <Stat label="Attempted" value={user.practiceHistory?.length ?? 0} />
        </div>

        <div className="mt-6">
          <XPBar xp={user.xp} />
        </div>
      </section>

      <section className="card-glass">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold">Badge gallery</h2>
            <p className="text-xs text-white/55">
              {user.badges.length} of {allBadges.length} unlocked
            </p>
          </div>
          <StreakCounter count={user.streak} />
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
          {allBadges.map((id) => (
            <BadgeChip key={id} id={id} unlocked={user.badges.includes(id)} size="lg" />
          ))}
        </div>
      </section>

      <section className="card-glass">
        <div className="mb-4 flex items-center gap-3">
          <Settings className="h-5 w-5 text-white/55" />
          <h2 className="font-display text-xl font-bold">Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-neon-cyan" />
                <span className="font-semibold">Language</span>
              </div>
              <p className="text-xs text-white/55">Hindi + English support for key surfaces</p>
            </div>
            <LocaleToggle />
          </div>

          <div className="text-xs text-white/45">
            More settings (theme, notifications, exam date) coming soon.
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
        {label}
      </div>
      <div className="stat-num mt-1 text-2xl">{value}</div>
    </div>
  );
}
