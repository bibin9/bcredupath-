import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { claude, CLAUDE_MODEL } from "@/lib/claude";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Doubt } from "@/models/Doubt";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const Body = z.object({
  question: z.string().min(5, "Ask a clearer question").max(2000),
  subject: z.string().optional(),
  chapter: z.string().optional(),
  classNum: z.union([z.literal(10), z.literal(12)]).default(10),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid body" },
      { status: 400 }
    );
  }

  await connectDB();
  const me = await User.findOne({ email: session.user.email.toLowerCase() }).select("_id class").lean();
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // 30 doubts/day/user is generous; protects against accidental loops
  const rl = await consumeRateLimit(String(me._id), "ai.doubt", 30);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Daily limit reached (${rl.limit} doubts / day). Resets at UTC midnight.` },
      { status: 429 }
    );
  }

  const { question, subject, chapter } = parsed.data;
  const classNum = parsed.data.classNum ?? me.class ?? 10;

  const ctx = [
    `Class ${classNum} CBSE student`,
    subject ? `Subject: ${subject}` : null,
    chapter ? `Chapter: ${chapter}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const prompt = `You are a patient ${subject ? subject.toUpperCase() : "CBSE"} teacher explaining concepts to a Class ${classNum} student in India.

CONTEXT: ${ctx}

STUDENT'S DOUBT:
"""
${question}
"""

INSTRUCTIONS:
- Explain clearly in a way a 15-17 year old can grasp.
- Build intuition first, then formulas/proofs.
- Use LaTeX in $...$ for math, $$...$$ for block equations.
- Break long explanations into 3-5 short paragraphs with **bold headers** if helpful.
- End with a 1-2 line "🎯 Key takeaway" summary.
- If the question is unclear, ask back for clarification briefly.
- NEVER make up facts. If unsure, say "Check your NCERT textbook for the exact phrasing".
- Match the CBSE syllabus and language style.

Now explain.`;

  try {
    const resp = await claude().messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const answer = resp.content
      .filter((c) => c.type === "text")
      .map((c) => (c as { text: string }).text)
      .join("");

    if (!answer || answer.length < 10) {
      return NextResponse.json({ error: "Could not generate an answer. Try rephrasing." }, { status: 502 });
    }

    // Persist to history (best-effort — non-blocking on failure)
    const doubt = await Doubt.create({
      userId: me._id,
      subject,
      chapter,
      question,
      answer,
    });

    return NextResponse.json({
      id: String(doubt._id),
      answer,
      usage: { input: resp.usage.input_tokens, output: resp.usage.output_tokens },
    });
  } catch (err) {
    console.error("[ai/doubt]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI request failed" },
      { status: 503 }
    );
  }
}

/** GET /api/ai/doubt — recent doubts history */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const me = await User.findOne({ email: session.user.email.toLowerCase() }).select("_id").lean();
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const items = await Doubt.find({ userId: me._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return NextResponse.json({
    items: items.map((d) => ({
      id: String(d._id),
      subject: d.subject,
      chapter: d.chapter,
      question: d.question,
      answer: d.answer,
      helpful: d.helpful,
      createdAt: d.createdAt,
    })),
  });
}
