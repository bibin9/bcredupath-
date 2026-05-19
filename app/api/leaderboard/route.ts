import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

type Scope = "all-india" | "state" | "city" | "school";
type Period = "daily" | "weekly" | "monthly" | "alltime";

const PERIOD_HOURS: Record<Period, number | null> = {
  daily: 24,
  weekly: 24 * 7,
  monthly: 24 * 30,
  alltime: null,
};

/**
 * GET /api/leaderboard?scope=&period=&limit=
 *
 * For "alltime" → ranks users by total xp directly.
 * For period scopes → sums xpEarned from user.practiceHistory entries within
 * the time window. Both modes return [{ rank, name, avatar, xp, state, ... }].
 */
export async function GET(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const me = session?.user?.email
    ? await User.findOne({ email: session.user.email.toLowerCase() }).lean()
    : null;

  const { searchParams } = new URL(req.url);
  const scope = (searchParams.get("scope") ?? "all-india") as Scope;
  const period = (searchParams.get("period") ?? "alltime") as Period;
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

  // Scope filter — restricts to the user's state/city/school for non-global scopes
  const scopeFilter: Record<string, unknown> = { onboarded: true };
  if (scope === "state" && me?.state) scopeFilter.state = me.state;
  else if (scope === "city" && me?.city) scopeFilter.city = me.city;
  else if (scope === "school" && me?.school) scopeFilter.school = me.school;

  let entries: LeaderboardEntry[];

  if (period === "alltime") {
    const users = await User.find(scopeFilter)
      .select("name avatar xp level streak state city school rank")
      .sort({ xp: -1 })
      .limit(limit)
      .lean();
    entries = users.map((u, i) => ({
      rank: i + 1,
      userId: String(u._id),
      name: u.name,
      avatar: u.avatar,
      xp: u.xp,
      level: u.level,
      streak: u.streak,
      state: u.state ?? null,
      city: u.city ?? null,
      school: u.school ?? null,
      tierEmoji: rankEmoji(u.rank),
    }));
  } else {
    // Sum xpEarned from practiceHistory in the window
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
          totalXp: { $first: "$xp" },
        },
      },
      { $sort: { xp: -1 } },
      { $limit: limit },
    ]);
    entries = agg.map((u, i) => ({
      rank: i + 1,
      userId: String(u._id),
      name: u.name,
      avatar: u.avatar,
      xp: u.xp,
      level: u.level ?? 0,
      streak: u.streak ?? 0,
      state: u.state ?? null,
      city: u.city ?? null,
      school: u.school ?? null,
      tierEmoji: "✨",
    }));
  }

  // Compute current user's rank (may be outside the top `limit`)
  let myRank: MyRank | null = null;
  if (me) {
    if (period === "alltime") {
      const ahead = await User.countDocuments({ ...scopeFilter, xp: { $gt: me.xp } });
      const total = await User.countDocuments(scopeFilter);
      const leader = await User.findOne(scopeFilter)
        .sort({ xp: -1 })
        .select("xp name avatar")
        .lean();
      myRank = {
        rank: ahead + 1,
        xp: me.xp,
        outOf: total,
        gapToLeader: leader ? Math.max(0, leader.xp - me.xp) : 0,
        leaderName: leader?.name ?? null,
      };
    } else {
      const myEntry = entries.find((e) => e.userId === String(me._id));
      if (myEntry) {
        const leader = entries[0];
        myRank = {
          rank: myEntry.rank,
          xp: myEntry.xp,
          outOf: entries.length,
          gapToLeader: leader ? Math.max(0, leader.xp - myEntry.xp) : 0,
          leaderName: leader?.name ?? null,
        };
      }
    }
  }

  return NextResponse.json({
    entries,
    myRank,
    scope,
    period,
  });
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

type LeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  state: string | null;
  city: string | null;
  school: string | null;
  tierEmoji: string;
};

type MyRank = {
  rank: number;
  xp: number;
  outOf: number;
  gapToLeader: number;
  leaderName: string | null;
};
