import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Tabs } from "@/components/leaderboard/ScopeTabs";
import { Podium, type PodiumPlayer } from "@/components/leaderboard/Podium";
import { LeaderboardRow, type LbEntry } from "@/components/leaderboard/LeaderboardRow";
import { Trophy, Sparkles, AlertCircle } from "lucide-react";
import { isNRI } from "@/lib/constants";

export const dynamic = "force-dynamic";

type SearchParams = {
  scope?: "global" | "country" | "state" | "city" | "school";
  period?: "daily" | "weekly" | "monthly" | "alltime";
};

const PERIOD_HOURS = {
  daily: 24,
  weekly: 24 * 7,
  monthly: 24 * 30,
  alltime: null,
} as const;

export default async function LeaderboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);
  await connectDB();
  const me = await User.findOne({ email: session!.user!.email!.toLowerCase() }).lean();
  if (!me) return null;

  // NRI students default to "country" scope; domestic default to "global"
  const userIsNRI = isNRI(me.country);
  const defaultScope = userIsNRI ? "country" : "global";
  const scope = (searchParams.scope ?? defaultScope) as NonNullable<SearchParams["scope"]>;
  const period = searchParams.period ?? "alltime";

  // Build scope filter
  const scopeFilter: Record<string, unknown> = { onboarded: true };
  if (scope === "country" && me.country) scopeFilter.country = me.country;
  else if (scope === "state" && me.state) scopeFilter.state = me.state;
  else if (scope === "city" && me.city) scopeFilter.city = me.city;
  else if (scope === "school" && me.school) scopeFilter.school = me.school;

  let entries: LbEntry[] = [];
  let myEntry: LbEntry | null = null;
  let myRankCalc: { rank: number; outOf: number; gapToLeader: number; leaderName: string | null } | null = null;

  if (period === "alltime") {
    const users = await User.find(scopeFilter)
      .select("name avatar xp level streak state city school rank")
      .sort({ xp: -1 })
      .limit(50)
      .lean();
    entries = users.map((u, i) => ({
      rank: i + 1,
      userId: String(u._id),
      name: u.name,
      avatar: u.avatar,
      xp: u.xp,
      level: u.level,
      streak: u.streak,
      state: u.state,
      city: u.city,
      school: u.school,
      tierEmoji: rankEmoji(u.rank),
    }));
    const ahead = await User.countDocuments({ ...scopeFilter, xp: { $gt: me.xp } });
    const total = await User.countDocuments(scopeFilter);
    const leader = await User.findOne(scopeFilter).sort({ xp: -1 }).select("xp name").lean();
    myRankCalc = {
      rank: ahead + 1,
      outOf: total,
      gapToLeader: leader ? Math.max(0, leader.xp - me.xp) : 0,
      leaderName: leader?.name ?? null,
    };
    myEntry = entries.find((e) => e.userId === String(me._id)) ?? null;
  } else {
    const sinceMs = Date.now() - (PERIOD_HOURS[period] as number) * 3600_000;
    const since = new Date(sinceMs);
    const agg = await User.aggregate([
      { $match: scopeFilter },
      { $unwind: { path: "$practiceHistory", preserveNullAndEmptyArrays: false } },
      { $match: { "practiceHistory.date": { $gte: since } } },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          avatar: { $first: "$avatar" },
          xp: { $sum: "$practiceHistory.xpEarned" },
          state: { $first: "$state" },
          city: { $first: "$city" },
          school: { $first: "$school" },
          level: { $first: "$level" },
          streak: { $first: "$streak" },
        },
      },
      { $sort: { xp: -1 } },
      { $limit: 50 },
    ]);
    entries = agg.map((u, i) => ({
      rank: i + 1,
      userId: String(u._id),
      name: u.name,
      avatar: u.avatar,
      xp: u.xp,
      level: u.level ?? 0,
      streak: u.streak ?? 0,
      state: u.state,
      city: u.city,
      school: u.school,
      tierEmoji: "✨",
    }));
    myEntry = entries.find((e) => e.userId === String(me._id)) ?? null;
    const leader = entries[0];
    myRankCalc = myEntry
      ? {
          rank: myEntry.rank,
          outOf: entries.length,
          gapToLeader: leader ? Math.max(0, leader.xp - myEntry.xp) : 0,
          leaderName: leader?.name ?? null,
        }
      : null;
  }

  const podium: PodiumPlayer[] = entries.slice(0, 3).map((e) => ({
    rank: e.rank,
    name: e.name,
    avatar: e.avatar,
    xp: e.xp,
    state: e.state,
  }));

  // Scope tab availability — varies by domestic vs NRI student
  const countryFlag = userIsNRI ? "🌍" : "🇮🇳";
  const scopeOptions = userIsNRI
    ? [
        { id: "global", label: "Global", emoji: "🌐" },
        { id: "country", label: me.country ?? "Country", emoji: countryFlag },
        { id: "city", label: me.city ?? "City", emoji: "🏙️", disabled: !me.city, tooltip: !me.city ? "Add your city in Profile" : undefined },
        { id: "school", label: "School", emoji: "🏫", disabled: !me.school, tooltip: !me.school ? "Add your school in Profile" : undefined },
      ]
    : [
        { id: "global", label: "All India", emoji: "🇮🇳" },
        { id: "state", label: me.state ?? "State", emoji: "📍", disabled: !me.state, tooltip: !me.state ? "Set state in onboarding" : undefined },
        { id: "city", label: me.city ?? "City", emoji: "🏙️", disabled: !me.city, tooltip: !me.city ? "Set city in profile" : undefined },
        { id: "school", label: "School", emoji: "🏫", disabled: !me.school, tooltip: !me.school ? "Set school in profile" : undefined },
      ];

  const periodOptions = [
    { id: "daily", label: "Today", emoji: "🌅" },
    { id: "weekly", label: "This week", emoji: "📅" },
    { id: "monthly", label: "This month", emoji: "🗓️" },
    { id: "alltime", label: "All time", emoji: "👑" },
  ];

  return (
    <div className="space-y-5">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-4xl border border-neon-yellow/25 bg-gradient-to-br from-neon-yellow/15 via-bg-2 to-neon-pink/10 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-neon-yellow/20 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-neon-pink/20 blur-3xl" />
        <div className="relative">
          <span className="pill-neon-yellow">
            <Sparkles className="h-3 w-3" /> Compete · Climb · Conquer
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
            Leaderboard <span className="grad-text-yellow">🏆</span>
          </h1>
          <p className="mt-2 text-sm text-white/65 md:text-base">
            {scope === "global" && (userIsNRI ? "Top students worldwide (all CBSE)." : "Top students across India.")}
            {scope === "country" && `Top students in ${me.country ?? "your country"}.`}
            {scope === "state" && `Top students in ${me.state ?? "your state"}.`}
            {scope === "city" && `Top students in ${me.city ?? "your city"}.`}
            {scope === "school" && `Top students at ${me.school ?? "your school"}.`}
            {" "}
            {period !== "alltime" && `(${periodOptions.find((p) => p.id === period)?.label.toLowerCase()})`}
          </p>
        </div>
      </section>

      {/* TABS */}
      <div className="space-y-3">
        <Tabs param="scope" options={scopeOptions} defaultValue={defaultScope} />
        <Tabs param="period" options={periodOptions} defaultValue="alltime" />
      </div>

      {/* YOUR RANK CARD (sticky-ish at top) */}
      {myRankCalc ? (
        <section className="card-glass">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                Your rank
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-black grad-text">
                  #{myRankCalc.rank}
                </span>
                <span className="text-sm text-white/55">of {myRankCalc.outOf}</span>
              </div>
            </div>
            <div className="text-right">
              {myRankCalc.gapToLeader > 0 ? (
                <>
                  <div className="stat-num text-2xl text-neon-yellow">
                    {myRankCalc.gapToLeader.toLocaleString("en-IN")} XP
                  </div>
                  <div className="text-[10px] text-white/55">
                    behind {myRankCalc.leaderName?.split(" ")[0] ?? "leader"}
                  </div>
                </>
              ) : (
                <span className="pill-neon-yellow">👑 You're #1!</span>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="card-glass flex items-center gap-3 !bg-neon-pink/8 !border-neon-pink/25">
          <AlertCircle className="h-5 w-5 text-neon-pink" />
          <span className="text-sm">
            No activity yet for this scope/period — finish a practice session to appear here.
          </span>
        </section>
      )}

      {/* PODIUM */}
      {podium.length > 0 && (
        <section className="card-glass !p-2 md:!p-4">
          <Podium players={podium} />
        </section>
      )}

      {/* LIST (rank 4+) */}
      <section className="space-y-2">
        {entries.length === 0 ? (
          <div className="card-glass text-center text-sm text-white/65">
            <Trophy className="mx-auto mb-2 h-6 w-6 text-white/35" />
            Nobody's on the board yet. Be the first.
          </div>
        ) : (
          entries.slice(3).map((e) => (
            <LeaderboardRow
              key={e.userId}
              entry={e}
              isMe={e.userId === String(me._id)}
              showLocation={scope === "global"}
            />
          ))
        )}

        {/* If you're not in top 50, show your card at the bottom */}
        {!myEntry && myRankCalc && myRankCalc.rank > 50 && (
          <>
            <div className="my-4 flex items-center gap-3 text-xs text-white/45">
              <span className="h-px flex-1 bg-white/[0.08]" />
              <span>···</span>
              <span className="h-px flex-1 bg-white/[0.08]" />
            </div>
            <LeaderboardRow
              entry={{
                rank: myRankCalc.rank,
                userId: String(me._id),
                name: me.name,
                avatar: me.avatar,
                xp: me.xp,
                level: me.level,
                streak: me.streak,
                state: me.state,
                city: me.city,
                school: me.school,
                tierEmoji: rankEmoji(me.rank),
              }}
              isMe={true}
              showLocation={scope === "global"}
            />
          </>
        )}
      </section>
    </div>
  );
}

function rankEmoji(rank?: string): string {
  switch (rank) {
    case "Diamond": return "💠";
    case "Platinum": return "💎";
    case "Gold": return "🥇";
    case "Silver": return "🥈";
    case "Bronze":
    default: return "🥉";
  }
}
