import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { claude, CLAUDE_MODEL } from "@/lib/claude";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { RevisionNote } from "@/models/RevisionNote";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const QuerySchema = z.object({
  subject: z.string().min(1),
  chapter: z.string().min(1),
  classNum: z.coerce.number().refine((n) => n === 10 || n === 12),
});

/**
 * GET /api/notes?subject=&chapter=&classNum=
 *
 * Returns the cached revision note if present, otherwise generates via Claude,
 * caches in DB, and returns. Result is shared across all students for the same
 * chapter (one note per chapter, not per user).
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    subject: searchParams.get("subject"),
    chapter: searchParams.get("chapter"),
    classNum: searchParams.get("classNum") ?? "10",
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad query" }, { status: 400 });
  }
  const { subject, chapter, classNum } = parsed.data;

  await connectDB();

  // Cached?
  const existing = await RevisionNote.findOne({
    subject,
    chapter,
    class: classNum,
  }).lean();
  if (existing) {
    return NextResponse.json({ note: existing, cached: true });
  }

  // Generate fresh — count against the user's rate limit
  const me = await User.findOne({ email: session.user.email.toLowerCase() }).select("_id").lean();
  if (!me) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const rl = await consumeRateLimit(String(me._id), "ai.notes", 10);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Daily limit reached (${rl.limit} note generations / day). Try again tomorrow or pick a chapter that's already cached.` },
      { status: 429 }
    );
  }

  const prompt = buildPrompt({ subject, chapter, classNum: classNum as 10 | 12 });

  try {
    const resp = await claude().messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = resp.content
      .filter((c) => c.type === "text")
      .map((c) => (c as { text: string }).text)
      .join("");

    const parsedJson = safeParseJson(text);
    if (!parsedJson?.body) {
      return NextResponse.json(
        { error: "Could not generate note. Try again." },
        { status: 502 }
      );
    }

    const note = await RevisionNote.create({
      subject,
      chapter,
      class: classNum,
      body: parsedJson.body,
      formulaSheet: parsedJson.formulaSheet ?? "",
      keyTakeaways: parsedJson.keyTakeaways ?? [],
      aiGenerated: true,
    });

    return NextResponse.json({ note, cached: false });
  } catch (err) {
    console.error("[api/notes]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Generation failed" },
      { status: 503 }
    );
  }
}

function buildPrompt(args: { subject: string; chapter: string; classNum: 10 | 12 }) {
  const { subject, chapter, classNum } = args;
  return `You are an expert CBSE Class ${classNum} ${subject.toUpperCase()} teacher writing concise revision notes for a student preparing for board exams.

CHAPTER: ${chapter}

Output a JSON object with these exact keys:
- "body" (string, markdown): The main revision notes. Cover all sub-topics in this chapter, but be concise — student should read in 10 minutes. Use:
   * ## sub-headings for each major sub-topic
   * **bold** for key terms
   * LaTeX in $...$ for inline math, $$...$$ for block formulas
   * Bullet points for definitions, properties, types
   * Examples where they aid intuition
- "formulaSheet" (string, markdown): One compact section with ALL key formulas + their use. Each on its own line.
- "keyTakeaways" (array of strings): 3-5 one-line bullet points a student should leave the chapter knowing.

CONSTRAINTS:
- Match the NCERT Class ${classNum} CBSE syllabus exactly.
- Plain English, ~15-17 year old reading level.
- DO NOT make up facts. If unsure, omit.
- Body should be 600-900 words. Formula sheet under 200 words.
- Output ONLY the JSON object, no markdown fences, no prose.`;
}

function safeParseJson(text: string): {
  body?: string;
  formulaSheet?: string;
  keyTakeaways?: string[];
} | null {
  let s = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(s);
  } catch {
    const start = s.indexOf("{");
    const end = s.lastIndexOf("}");
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(s.slice(start, end + 1));
      } catch {}
    }
  }
  return null;
}
