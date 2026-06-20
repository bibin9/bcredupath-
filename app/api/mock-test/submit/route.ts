import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

const Body = z.object({
  subject: z.string().min(1),
  paperNumber: z.number().int().min(1).max(99),
  score: z.number().int().min(0).max(80),
  total: z.number().int().min(1).max(120),
  timeSpentSeconds: z.number().int().min(0).max(20000),
});

/**
 * Record a mock paper attempt to user.practiceHistory.
 * Mode format: "mock-paper:<subject>:<paperNumber>"  (parsed by the
 * subject page + papers API to compute attempts + best score).
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await connectDB();
  const xpEarned = Math.round((parsed.data.score / parsed.data.total) * 100);
  await User.updateOne(
    { email: session.user.email.toLowerCase() },
    {
      $push: {
        practiceHistory: {
          mode: `mock-paper:${parsed.data.subject}:${parsed.data.paperNumber}`,
          score: parsed.data.score,
          total: parsed.data.total,
          xpEarned,
          date: new Date(),
        },
      },
      $inc: { xp: xpEarned },
    }
  );
  return NextResponse.json({ ok: true, xpEarned });
}
