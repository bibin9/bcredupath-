// Import CBSE Class X "Question Bank" PDFs from cbseacademic.nic.in.
// These are case-study based MCQ banks (5 sub-questions per case study,
// answer key inline) — different format from the SQP importer.
//
// Usage:
//   npm run import:qbank                      (all three: Math + Science + English)
//   npm run import:qbank -- --subjects=math
//   npm run import:qbank -- --dry-run

import dotenv from "dotenv";
import mongoose from "mongoose";
import { createRequire } from "module";

dotenv.config({ path: ".env.local", override: true });
const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

const args = parseArgs(process.argv.slice(2));
const DRY = !!args["dry-run"];
const SUBJECTS_FILTER = args.subjects ? String(args.subjects).split(",") : null;

const BASE = "https://cbseacademic.nic.in/web_material/QuestionBank/ClassX/";

const PAPERS = [
  {
    subject: "math",
    file: "MathsX.pdf",
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Circles",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability",
    ],
  },
  {
    subject: "science",
    file: "ScienceX.pdf",
    chapters: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce",
      "Heredity",
      "Light - Reflection and Refraction",
      "The Human Eye and the Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment",
      "Sources of Energy",
    ],
  },
  {
    subject: "english",
    file: "EnglishX.pdf",
    chapters: ["Reading Comprehension"], // best-effort, English bank is passage-heavy
  },
];

let queue = PAPERS;
if (SUBJECTS_FILTER) queue = queue.filter((p) => SUBJECTS_FILTER.includes(p.subject));

console.log("\n────────────────────────────────────────");
console.log("  BCRedupath — CBSE Question Bank Import");
console.log("────────────────────────────────────────");
console.log(`  Papers in queue: ${queue.length}`);
console.log(`  Dry run:         ${DRY}`);
console.log("────────────────────────────────────────\n");

const questionSchema = new mongoose.Schema(
  {
    subject: String,
    class: Number,
    chapter: String,
    topic: String,
    type: String,
    marks: Number,
    difficulty: String,
    question: String,
    options: [String],
    answer: mongoose.Schema.Types.Mixed,
    solution: {
      steps: String,
      videoUrl: String,
      commonMistakes: [String],
      relatedConcepts: [String],
    },
    yearsAsked: [Number],
    examType: String,
    region: String,
    frequencyScore: Number,
    predictedProbability: Number,
    bloomLevel: String,
    expectedTime: Number,
    xpReward: Number,
    tags: [String],
    aiGenerated: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    verifiedBy: String,
    verifiedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

async function fetchPdfText(url, attempt = 1) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    const parser = new PDFParse({ data: buf });
    const out = await parser.getText();
    return out.text ?? "";
  } catch (err) {
    if (attempt < 4 && /fetch failed|terminated|ECONNRESET/i.test(err?.message ?? "")) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return fetchPdfText(url, attempt + 1);
    }
    throw err;
  }
}

/** Strip page footers + collapse blank lines. */
function clean(text) {
  return text
    .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, "\n")
    .replace(/Page\s*\d+\s*of\s*\d+/gi, "\n")
    .replace(/\n{3,}/g, "\n\n");
}

/** Loose normalise for fuzzy matching chapter names. */
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Walk the text and emit { chapter, body } chunks per case study.
 *
 * The PDF is structured as:
 *   CHAPTER NAME (maybe with "- CASE STUDY" suffix, or just upper-case)
 *   CASE STUDY 1:
 *     passage
 *     1. q  a) ... b) ... c) ... d) ...
 *     2. q  ...
 *     ...
 *     5. q  ...
 *     ANSWERS / Answer / ANSWERS:
 *     1. <letter>) <text>
 *     ... 5. ...
 *   CASE STUDY 2:   (still same chapter — repeats until next chapter title)
 */
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Pre-index where each chapter header appears in the document.
 * We try multiple variants per canonical chapter name to handle CBSE's
 * inconsistent casing ("ARITHMETIC PROGRESSION" / "Arithmetic Progressions"),
 * dropped intro words ("TRIANGLES" / "SIMILAR TRIANGLES"), etc.
 */
function indexChapterHeaders(text, chapterList) {
  const found = [];
  for (const c of chapterList) {
    const variants = new Set([
      c,
      c.replace(/s$/, ""),
      c.replace(/^Introduction to /, ""),
      c.replace(/Pair of Linear Equations.*/, "Pair of Linear Equations"),
      c.replace(/Some Applications of/, "Some Application of"),
      c.replace(/Areas Related to Circles/, "AREAS RELATED TO CIRCLE"),
      c.replace(/Triangles/, "Similar Triangles"),
      c.replace(/^Light.*Refraction$/, "Light Reflection and Refraction"),
    ]);
    for (const v of variants) {
      // Word-boundary, case-insensitive
      const re = new RegExp("\\b" + escapeRe(v.replace(/-/g, ".?")) + "\\b", "gi");
      let m;
      while ((m = re.exec(text)) !== null) {
        found.push({ pos: m.index, chapter: c });
      }
    }
  }
  found.sort((a, b) => a.pos - b.pos);
  return found;
}

function splitCaseStudies(text, chapterList) {
  const cleaned = clean(text);
  const headers = indexChapterHeaders(cleaned, chapterList);

  // Detect format
  const hasCSMarkers = /CASE\s*STUDY\s*\d+\s*:/i.test(cleaned);
  const hasNumberedSubs = /\n\s*\d+\.\d\s/.test(cleaned); // "1.1 ", "2.3 " etc

  const chunks = [];

  if (hasCSMarkers) {
    // FORMAT A: "CASE STUDY N:" markers (Math)
    const csRe = /CASE\s*STUDY\s*(\d+)\s*:/gi;
    const positions = [];
    let m;
    while ((m = csRe.exec(cleaned)) !== null) {
      positions.push({ pos: m.index, after: m.index + m[0].length, csNum: Number(m[1]) });
    }
    for (let i = 0; i < positions.length; i++) {
      const start = positions[i].after;
      const end = i + 1 < positions.length ? positions[i + 1].pos : cleaned.length;
      const body = cleaned.slice(start, end).trim();
      if (body.length < 40) continue;

      let chapter = chapterList[0];
      for (const h of headers) {
        if (h.pos < positions[i].pos) chapter = h.chapter;
        else break;
      }
      chunks.push({ chapter, csNum: positions[i].csNum, body, format: "A" });
    }
  } else if (hasNumberedSubs) {
    // FORMAT B: "N.M" sub-question numbering (Science)
    // Strategy: find every "\nN.1 " (start of a new case study)
    // and split case study bodies between consecutive starts.
    const startRe = /\n\s*(\d+)\.1\s/g;
    const starts = [];
    let m;
    while ((m = startRe.exec(cleaned)) !== null) {
      starts.push({ pos: m.index, csNum: Number(m[1]) });
    }
    for (let i = 0; i < starts.length; i++) {
      const start = starts[i].pos;
      const end = i + 1 < starts.length ? starts[i + 1].pos : cleaned.length;
      let body = cleaned.slice(start, end).trim();

      // Include preceding passage for case study (back up to previous Answer Key or chapter boundary)
      // Find "\n<csNum>. " (whole-number-period) intro line preceding this
      const introRe = new RegExp(`\\n\\s*${starts[i].csNum}\\.\\s+[A-Z][^\\n]+`, "g");
      const introMatches = [...cleaned.slice(0, start).matchAll(introRe)];
      if (introMatches.length > 0) {
        const lastIntro = introMatches[introMatches.length - 1];
        body = cleaned.slice(lastIntro.index, end).trim();
      }

      if (body.length < 40) continue;

      let chapter = chapterList[0];
      for (const h of headers) {
        if (h.pos < start) chapter = h.chapter;
        else break;
      }
      chunks.push({ chapter, csNum: starts[i].csNum, body, format: "B" });
    }
  }
  return chunks;
}

/**
 * Parse one case-study chunk into up to 5 Question docs.
 *
 * Strategy:
 *   1. Find the ANSWERS / Answer block — everything after that maps Q num → letter
 *   2. Everything before is the passage + 5 Qs
 *   3. Inside the questions block, split on "\n<digit>. " — each sub-question
 *      has q-text followed by a)/b)/c)/d) options
 *   4. The passage is everything before "\n1. "
 */
function parseCaseStudy(chunk, paper) {
  const body = chunk.body;
  const isFormatB = chunk.format === "B";

  // Locate ANSWERS section
  const ansMatch = body.match(/\n\s*(ANSWERS?|Answer\s*Key|Answer)\s*:?\s*\n([\s\S]*?)$/i);
  if (!ansMatch) return [];

  const questionsBlock = body.slice(0, ansMatch.index).trim();
  const answersBlock = ansMatch[2].trim();

  // Extract answer letters per sub-question
  const answers = new Map();
  if (isFormatB) {
    // "1.1 white precipitate is obtained" — answer is the text, not a letter
    // OR may have format "1.1 a) ..." — handle both
    for (const m of answersBlock.matchAll(/(\d+)\.(\d+)\s+(?:([a-dA-D])\s*\)?\s*)?([^\n]+)/g)) {
      const subNum = Number(m[2]);
      answers.set(subNum, {
        letter: m[3] ? m[3].toUpperCase() : null,
        explanation: (m[4] ?? "").trim(),
      });
    }
  } else {
    for (const m of answersBlock.matchAll(/(\d+)\.\s*([a-dA-D])\s*\)?\s*([^\n]*)/g)) {
      answers.set(Number(m[1]), {
        letter: m[2].toUpperCase(),
        explanation: (m[3] ?? "").trim(),
      });
    }
  }
  if (answers.size === 0) return [];

  // Find where the first sub-question starts
  const firstQRe = isFormatB ? /(^|\n)\s*\d+\.1\s/ : /(^|\n)\s*1\.\s/;
  const firstQ = questionsBlock.search(firstQRe);
  if (firstQ === -1) return [];

  const passage = questionsBlock.slice(0, firstQ).trim();
  const qsRaw = questionsBlock.slice(firstQ);

  // Split into sub-questions
  const subs = [];
  const subRe = isFormatB
    ? /(?:^|\n)\s*\d+\.(\d+)\s+([\s\S]*?)(?=\n\s*\d+\.\d+\s+|$)/g
    : /(?:^|\n)\s*(\d+)\.\s+([\s\S]*?)(?=\n\s*\d+\.\s+|$)/g;
  let m;
  while ((m = subRe.exec("\n" + qsRaw + "\n9999. SENTINEL")) !== null) {
    const n = Number(m[1]);
    if (n === 9999) break;
    if (n < 1 || n > 10) continue;
    subs.push({ num: n, raw: m[2].trim() });
  }

  // For each sub, split out 4 options
  const docs = [];
  for (const sub of subs) {
    const optRe = /\n\s*([a-d])\s*\)\s*([^\n]+)/gi;
    const opts = [];
    let lastEnd = 0;
    let om;
    while ((om = optRe.exec("\n" + sub.raw)) !== null) {
      opts.push({ letter: om[1].toUpperCase(), text: om[2].trim() });
      lastEnd = om.index + om[0].length;
    }
    if (opts.length !== 4) continue;

    // Question text = sub.raw before the first "a)"
    const firstOpt = sub.raw.search(/\n\s*a\s*\)/i);
    const qText = (firstOpt > 0 ? sub.raw.slice(0, firstOpt) : sub.raw).trim();
    if (qText.length < 5) continue;

    const ans = answers.get(sub.num);
    if (!ans) continue;

    let ansIdx = -1;
    if (ans.letter) {
      ansIdx = "ABCD".indexOf(ans.letter);
    } else if (ans.explanation) {
      // Format B without letter — match the answer text against options
      const t = ans.explanation.toLowerCase().replace(/\s+/g, " ").trim();
      const best = opts.findIndex((o) =>
        o.text.toLowerCase().replace(/\s+/g, " ").trim().includes(t.slice(0, 30))
        || t.includes(o.text.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 30))
      );
      ansIdx = best;
    }
    if (ansIdx < 0) continue;

    const fullQuestion = passage
      ? `[Case Study] ${passage}\n\nQuestion: ${qText}`
      : qText;

    const optionStrings = opts.map((o) => `${o.letter}. ${o.text}`);
    const correctOptionText = opts[ansIdx].text;
    const solution = ans.explanation
      ? `Correct option: ${ans.letter}. ${ans.explanation}`
      : `Correct option: ${ans.letter}. ${correctOptionText}`;

    docs.push({
      subject: paper.subject,
      class: 10,
      chapter: chunk.chapter,
      topic: `Case Study ${chunk.csNum}`,
      type: "MCQ",
      marks: 1,
      difficulty: "Medium",
      question: fullQuestion,
      options: optionStrings,
      answer: ansIdx,
      solution: {
        steps: solution,
        videoUrl: null,
        commonMistakes: [],
        relatedConcepts: [],
      },
      yearsAsked: [],
      examType: "Board",
      region: "All-India",
      frequencyScore: 8,
      predictedProbability: 0.78,
      bloomLevel: "Apply",
      expectedTime: 90,
      xpReward: 10,
      tags: ["cbse-official", "qbank-class10"],
      aiGenerated: false,
      verified: true,
      verifiedBy: "CBSE Academic (cbseacademic.nic.in QBank)",
      verifiedAt: new Date(),
    });
  }
  return docs;
}

async function importPaper(paper) {
  process.stdout.write(
    `  X ${paper.subject.padEnd(8)} | ${paper.file.padEnd(14)} → `
  );
  const url = BASE + paper.file;
  const text = await fetchPdfText(url);
  const chunks = splitCaseStudies(text, paper.chapters);
  const docs = [];
  for (const c of chunks) {
    try {
      docs.push(...parseCaseStudy(c, paper));
    } catch (err) {
      // skip bad chunks
    }
  }

  const byChapter = {};
  docs.forEach((d) => {
    byChapter[d.chapter] = (byChapter[d.chapter] ?? 0) + 1;
  });

  if (DRY) {
    console.log(`${docs.length.toString().padStart(3)} parsed (dry)`);
    Object.entries(byChapter)
      .sort()
      .forEach(([c, n]) => console.log(`         ${c.padEnd(40)} ${n}`));
    return docs.length;
  }

  if (docs.length > 0) {
    await Question.deleteMany({ tags: { $all: ["qbank-class10"] }, subject: paper.subject });
    await Question.insertMany(docs, { ordered: false });
  }
  console.log(`${docs.length.toString().padStart(3)} inserted`);
  Object.entries(byChapter)
    .sort()
    .forEach(([c, n]) => console.log(`         ${c.padEnd(40)} ${n}`));
  return docs.length;
}

async function main() {
  if (!DRY) {
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI missing in .env.local");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
    console.log("→ connected to Mongo\n");
  }

  let total = 0;
  for (const paper of queue) {
    try {
      total += await importPaper(paper);
    } catch (err) {
      console.log(`error: ${err.message}`);
    }
  }

  console.log("\n────────────────────────────────────────");
  console.log(`✅ ${DRY ? "Parsed" : "Inserted"} ${total} CBSE Q-bank questions`);
  console.log("────────────────────────────────────────");

  if (!DRY) await mongoose.disconnect();
}

function parseArgs(argv) {
  const out = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) out[m[1]] = m[2] ?? true;
  }
  return out;
}

main().catch((err) => {
  console.error("Q-bank import failed:", err);
  process.exit(1);
});
