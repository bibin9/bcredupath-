import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { claude, CLAUDE_MODEL } from "@/lib/claude";
import { connectDB } from "@/lib/db";
import { Question } from "@/models/Question";
import { User } from "@/models/User";
import { consumeRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel Hobby cap. Most generations finish 30-50s.

const Body = z.object({
  subject: z.string().min(1, "Pick a subject first"),
  chapter: z.string().min(1, "Pick a chapter first"),
  topic: z.string().optional().default(""),
  count: z.number().int().min(10).max(25),
  examType: z.enum(["board", "competitive"]),
  classNum: z.union([z.literal(10), z.literal(12)]).default(10),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    // Surface the first specific message so the toast is actionable
    const issues = parsed.error.issues;
    const first = issues[0];
    const friendly = first
      ? `${first.path.join(".")}: ${first.message}`
      : "Invalid body";
    return NextResponse.json(
      { error: friendly, details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { subject, chapter, topic, count, examType, classNum } = parsed.data;

  await connectDB();

  // Per-user daily rate limit
  const me = await User.findOne({ email: session.user.email.toLowerCase() }).select("_id").lean();
  if (!me) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const rl = await consumeRateLimit(String(me._id), "ai.generate", 10);
  if (!rl.ok) {
    const hoursToReset = Math.max(1, Math.ceil((rl.resetAt.getTime() - Date.now()) / 3_600_000));
    return NextResponse.json(
      {
        error: `Daily limit reached (${rl.limit} generations / day). Resets in ~${hoursToReset}h. Use the Question Bank in the meantime!`,
        rateLimit: { current: rl.current, limit: rl.limit, resetAt: rl.resetAt },
      },
      { status: 429 }
    );
  }

  // Few-shot examples from DB — pick 2 representative questions for the same subject
  const examples = await Question.find({ subject, class: classNum })
    .sort({ predictedProbability: -1 })
    .limit(2)
    .lean();

  const fewShot = examples.length
    ? examples
        .map((q, i) =>
          `EXAMPLE ${i + 1}:\n${JSON.stringify(
            {
              type: q.type,
              marks: q.marks,
              difficulty: q.difficulty,
              question: q.question,
              options: q.options,
              answer: q.answer,
              solution: {
                steps: (q.solution.steps ?? "").slice(0, 220),
                commonMistakes: q.solution.commonMistakes,
                relatedConcepts: q.solution.relatedConcepts,
              },
            },
            null,
            2
          )}`
        )
        .join("\n\n")
    : "(no examples available — follow the schema strictly)";

  const prompt = buildPrompt({ subject, chapter, topic, count, examType, classNum, fewShot });

  try {
    // Server-side web_search tool — lets Claude actually browse Indian
    // education sites for real recent PYQs. Cast since the SDK type isn't
    // exposed for this beta tool variant in our SDK version.
    const webSearchTool = {
      type: "web_search_20250305",
      name: "web_search",
      max_uses: 3,
      allowed_domains: [
        "cbseacademic.nic.in",
        "ncert.nic.in",
        "vedantu.com",
        "byjus.com",
        "oswaalbooks.com",
        "educart.co",
        "topperlearning.com",
        "embibe.com",
        "shaalaa.com",
        "selfstudys.com",
        "learncbse.in",
        "tiwariacademy.com",
        "successcds.net",
        "studyrankers.com",
      ],
    };

    const resp = await callWithBackoff(() =>
      claude().messages.create({
        model: CLAUDE_MODEL,
        max_tokens: Math.min(8000, 500 + count * 350),
        tools: [webSearchTool] as unknown as never,
        messages: [{ role: "user", content: prompt }],
      })
    );

    // Pull text + collect every cited source from web_search_tool_result blocks
    const sources: { url: string; title: string }[] = [];
    let text = "";
    for (const block of resp.content) {
      if (block.type === "text") {
        text += (block as { text: string }).text;
      } else if ((block as { type: string }).type === "web_search_tool_result") {
        const b = block as unknown as {
          content?: Array<{ type: string; url?: string; title?: string }>;
        };
        for (const r of b.content ?? []) {
          if (r.type === "web_search_result" && r.url) {
            sources.push({ url: r.url, title: r.title ?? r.url });
          }
        }
      }
    }
    // De-dupe by URL
    const seen = new Set<string>();
    const dedupedSources = sources.filter((s) => {
      if (seen.has(s.url)) return false;
      seen.add(s.url);
      return true;
    });

    const parsedQs = safeParseJson(text);
    if (!parsedQs || parsedQs.length === 0) {
      return NextResponse.json(
        { error: "Could not parse AI response. Try again or pick a different topic." },
        { status: 502 }
      );
    }

    const validated = parsedQs.filter(validate);
    if (validated.length === 0) {
      return NextResponse.json(
        { error: "AI returned no usable questions. Try again." },
        { status: 502 }
      );
    }

    // Shape questions to match what PracticeRunner expects
    const questions = validated.slice(0, count).map((q, i) => ({
      _id: `gen-${Date.now()}-${i}`,
      subject,
      chapter,
      topic: q.topic ?? topic ?? chapter,
      type: q.type,
      marks: q.marks,
      difficulty: q.difficulty ?? "Medium",
      question: q.question,
      options: q.options ?? null,
      answer: q.answer,
      solution: {
        steps: q.solution.steps,
        commonMistakes: q.solution.commonMistakes ?? [],
        relatedConcepts: q.solution.relatedConcepts ?? [],
      },
      yearsAsked: q.yearsAsked ?? [],
      predictedProbability: examType === "competitive" ? 0.65 : 0.75,
      xpReward: XP_BY_MARKS[q.marks] ?? 10,
      expectedTime: q.expectedTime ?? 120,
    }));

    return NextResponse.json({
      questions,
      sources: dedupedSources,
      usage: { input: resp.usage.input_tokens, output: resp.usage.output_tokens },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI generation failed";
    console.error("[ai/generate]", err);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

const XP_BY_MARKS: Record<number, number> = { 1: 10, 2: 20, 3: 30, 4: 40, 5: 50 };

function buildPrompt(args: {
  subject: string;
  chapter: string;
  topic: string;
  count: number;
  examType: "board" | "competitive";
  classNum: 10 | 12;
  fewShot: string;
}) {
  const { subject, chapter, topic, count, examType, classNum, fewShot } = args;
  const topicLine = topic ? `Focus subtopic: ${topic}` : "Cover the main subtopics of the chapter.";

  const searchTarget =
    examType === "competitive"
      ? `JEE Main / NEET / Olympiad ${subject} questions on "${chapter}${topic ? ` - ${topic}` : ""}" from 2022-2025`
      : `CBSE Class ${classNum} ${subject} board exam questions on "${chapter}${topic ? ` - ${topic}` : ""}" from 2022-2025`;

  const styleGuide =
    examType === "competitive"
      ? `STYLE: Competitive-exam pattern (JEE Main / NEET / Olympiad level).
- Most questions should be MCQ (1 mark) with trap distractors.
- Difficulty mix: 30% Medium, 50% Hard, 20% VeryHard.
- Multi-step analytical reasoning preferred.`
      : `STYLE: CBSE Class ${classNum} board-paper pattern.
- Mix of MCQ (1m), AssertionReason (1m), VSA (2m), SA (3m), LA (5m), CaseStudy (4m).
- Difficulty mix: 30% Easy, 50% Medium, 20% Hard.
- Match exact phrasing style of real CBSE board papers.`;

  return `You are an expert ${subject.toUpperCase()} teacher building a practice set for Indian Class ${classNum} students.

YOUR TASK: Find ${count} REAL recent questions for the topic below, then format them as JSON.

TOPIC: ${chapter}${topic ? ` — ${topic}` : ""}
EXAM ORIENTATION: ${examType === "competitive" ? "JEE/NEET competitive" : `CBSE Class ${classNum} board`}

WORKFLOW (very important):
1. Use the web_search tool to find: ${searchTarget}
2. Search for recent (2022-2025) questions. Try sources like CBSE official, NCERT, Vedantu, BYJU's, Oswaal, Educart, LearnCBSE, TopperLearning.
3. Prefer ACTUAL past questions you find on these sites over invented ones. If a search result has a real question with year, use it and tag the correct "yearsAsked".
4. If you can only find ${Math.floor(count / 2)} real questions, supplement with high-fidelity exam-style questions matching the same pattern. Tag those with "yearsAsked": [].
5. For EVERY question, regenerate the FULL solution clearly (do not just link out).

${styleGuide}

REQUIREMENTS for each question object:
- Use LaTeX in $...$ for inline math, $$...$$ for block math.
- MCQs: EXACTLY 4 options. "answer" is the index (0-3).
- SA/LA/CaseStudy: "answer" is a short final-answer string.
- "solution.steps": complete working (multi-line, plain text or LaTeX).
- "solution.commonMistakes": 1-2 specific traps.
- "solution.relatedConcepts": 1-2 short tags.
- "yearsAsked": INTEGER array. Use real years for sourced questions, [] otherwise.
- "frequencyScore": 1-10. Use 8+ for verified PYQs.
- "bloomLevel": Remember / Understand / Apply / Analyze / Evaluate.
- "expectedTime" seconds (MCQ ~45, SA ~180, LA ~480).
- "topic": short subtopic name.

FORMAT REFERENCE (your output must match this schema exactly):

${fewShot}

After your web searches, output ONLY the final JSON array of ${count} objects. Wrap it in a single \`\`\`json ... \`\`\` block. No prose before or after.`;
}

async function callWithBackoff<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 429 || status === 529) {
        const ra = Number((err as { headers?: Record<string, string> })?.headers?.["retry-after"]);
        const waitS = Number.isFinite(ra) && ra > 0 ? ra : Math.min(30, 2 ** attempt * 3);
        await new Promise((r) => setTimeout(r, waitS * 1000));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Rate limit exceeded after retries");
}

function safeParseJson(text: string): RawQ[] | null {
  let s = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    const p = JSON.parse(s);
    if (Array.isArray(p)) return p;
    if (Array.isArray(p?.questions)) return p.questions;
  } catch {
    const start = s.indexOf("[");
    const end = s.lastIndexOf("]");
    if (start !== -1 && end > start) {
      try { return JSON.parse(s.slice(start, end + 1)); } catch {}
    }
  }
  return null;
}

type RawQ = {
  type: string;
  marks: number;
  difficulty?: string;
  question: string;
  options?: string[] | null;
  answer: number | string;
  solution: {
    steps: string;
    commonMistakes?: string[];
    relatedConcepts?: string[];
  };
  yearsAsked?: number[];
  frequencyScore?: number;
  bloomLevel?: string;
  expectedTime?: number;
  topic?: string;
};

function validate(q: RawQ): boolean {
  if (!q || typeof q !== "object") return false;
  if (typeof q.question !== "string" || q.question.length < 10) return false;
  if (!["MCQ", "AssertionReason", "VSA", "SA", "LA", "CaseStudy", "HOTS"].includes(q.type)) return false;
  if (typeof q.marks !== "number") return false;
  if (q.type === "MCQ") {
    if (!Array.isArray(q.options) || q.options.length !== 4) return false;
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer > 3) return false;
  }
  if (!q.solution?.steps) return false;
  return true;
}
