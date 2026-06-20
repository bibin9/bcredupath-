import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Feedback } from "@/models/Feedback";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const Body = z.object({
  category: z.enum([
    "bug",
    "wrong-answer",
    "feature-request",
    "content-gap",
    "praise",
    "other",
  ]),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
  context: z.string().max(500).optional(),
});

/**
 * POST /api/feedback
 * Records user feedback to the feedbacks collection.
 * Rate-limited to 5 submissions per day per user.
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() })
    .select("_id name email")
    .lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const rl = await consumeRateLimit(String(user._id), "feedback", 5);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Daily limit of ${rl.limit} feedback submissions reached — thanks for so much input!` },
      { status: 429 }
    );
  }

  const feedback = await Feedback.create({
    userId: user._id,
    userEmail: user.email,
    userName: user.name,
    category: parsed.data.category,
    subject: parsed.data.subject,
    message: parsed.data.message,
    context: parsed.data.context,
  });

  return NextResponse.json({ ok: true, id: String(feedback._id) });
}

/**
 * GET /api/feedback
 * Returns the user's last 10 submissions (for the "Your feedback" history).
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const user = await User.findOne({ email: session.user.email.toLowerCase() })
    .select("_id")
    .lean();
  if (!user) return NextResponse.json({ items: [] });

  const items = await Feedback.find({ userId: user._id })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();
  return NextResponse.json({
    items: items.map((f) => ({
      id: String(f._id),
      category: f.category,
      subject: f.subject,
      status: f.status,
      adminReply: f.adminReply,
      createdAt: f.createdAt,
    })),
  });
}
