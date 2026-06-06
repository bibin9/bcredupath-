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

const BASE_X = "https://cbseacademic.nic.in/web_material/QuestionBank/ClassX/";
const BASE_XII = "https://cbseacademic.nic.in/web_material/QuestionBank/ClassXII/";

const PAPERS = [
  /* ─────────── CLASS 10 ─────────── */
  {
    class: 10,
    subject: "math",
    url: BASE_X + "MathsX.pdf",
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
    class: 10,
    subject: "science",
    url: BASE_X + "ScienceX.pdf",
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
    class: 10,
    subject: "english",
    url: BASE_X + "EnglishX.pdf",
    chapters: ["Reading Comprehension"],
  },

  /* ─────────── CLASS 12 ─────────── */
  {
    class: 12,
    subject: "math",
    url: BASE_XII + "MathematicsXII.pdf",
    format: "A",
    chapters: [
      "Relations and Functions",
      "Inverse Trigonometric Functions",
      "Matrices",
      "Determinants",
      "Continuity and Differentiability",
      "Application of Derivatives",
      "Integrals",
      "Application of Integrals",
      "Differential Equations",
      "Vector Algebra",
      "Three Dimensional Geometry",
      "Linear Programming",
      "Probability",
    ],
  },
  {
    class: 12,
    subject: "business",
    url: BASE_XII + "BusinessStudiesXII.pdf",
    format: "C",
    chapters: [
      "Nature and Significance of Management",
      "Principles of Management",
      "Business Environment",
      "Planning",
      "Organising",
      "Staffing",
      "Directing",
      "Controlling",
      "Financial Management",
      "Financial Markets",
      "Marketing Management",
      "Consumer Protection",
    ],
  },
  {
    class: 12,
    subject: "accountancy",
    url: BASE_XII + "AccountancyXII.pdf",
    format: "A",
    chapters: [
      "Accounting for Partnership Firms",
      "Dissolution of Partnership",
      "Accounting for Companies",
      "Accounting for Debentures",
      "Analysis of Financial Statements",
      "Cash Flow Statement",
    ],
  },
  {
    class: 12,
    subject: "economics",
    url: BASE_XII + "EconomicsXII.pdf",
    format: "A",
    chapters: [
      "Introductory Microeconomics",
      "Theory of Consumer Behaviour",
      "Production and Costs",
      "Forms of Market",
      "National Income Accounting",
      "Money and Banking",
      "Income Determination",
      "Government Budget",
      "Balance of Payments",
    ],
  },
  {
    class: 12,
    subject: "history",
    url: BASE_XII + "HistoryXII.pdf",
    format: "D",
    chapters: [
      "Bricks Beads and Bones",
      "Kings Farmers and Towns",
      "Kinship Caste and Class",
      "Thinkers Beliefs and Buildings",
      "Through the Eyes of Travellers",
      "Bhakti Sufi Traditions",
      "An Imperial Capital Vijayanagara",
      "Peasants Zamindars and the State",
      "Kings and Chronicles",
      "Colonialism and the Countryside",
      "Rebels and the Raj",
      "Colonial Cities",
      "Mahatma Gandhi and the Nationalist Movement",
      "Understanding Partition",
      "Framing the Constitution",
    ],
  },
  {
    class: 12,
    subject: "polsci",
    url: BASE_XII + "PoliticalScienceXII.pdf",
    format: "D",
    chapters: [
      "The Cold War Era",
      "The End of Bipolarity",
      "US Hegemony in World Politics",
      "Alternative Centres of Power",
      "Contemporary South Asia",
      "International Organisations",
      "Security in the Contemporary World",
      "Environment and Natural Resources",
      "Globalisation",
      "Challenges of Nation Building",
      "Era of One-Party Dominance",
      "Politics of Planned Development",
      "India's External Relations",
      "Challenges to and Restoration of the Congress System",
      "The Crisis of Democratic Order",
      "Rise of Popular Movements",
      "Regional Aspirations",
      "Recent Developments in Indian Politics",
    ],
  },
  {
    class: 12,
    subject: "sociology",
    url: BASE_XII + "SociologyXII.pdf",
    format: "D",
    chapters: [
      "Demographic Structure of Indian Society",
      "Social Institutions Continuity and Change",
      "The Market as a Social Institution",
      "Patterns of Social Inequality",
      "The Challenges of Cultural Diversity",
      "Structural Change",
      "Cultural Change",
      "The Story of Indian Democracy",
      "Change and Development in Rural Society",
      "Change and Development in Industrial Society",
      "Globalisation and Social Change",
      "Mass Media and Communications",
      "Social Movements",
    ],
  },
];

const TARGET_CLASS = args.class ? Number(args.class) : null;

let queue = PAPERS;
if (TARGET_CLASS) queue = queue.filter((p) => p.class === TARGET_CLASS);
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
    // Accept either "a)" or "a." or "(a)" option markers
    const optRe = /\n\s*\(?([a-d])\s*[\)\.]\s+([^\n]+)/gi;
    const opts = [];
    let om;
    while ((om = optRe.exec("\n" + sub.raw)) !== null) {
      opts.push({ letter: om[1].toUpperCase(), text: om[2].trim() });
    }
    if (opts.length < 4) continue;
    const four = opts.slice(0, 4);

    // Question text = sub.raw before the first option marker
    const firstOpt = sub.raw.search(/\n\s*\(?a\s*[\)\.]/i);
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
      const best = four.findIndex((o) =>
        o.text.toLowerCase().replace(/\s+/g, " ").trim().includes(t.slice(0, 30))
        || t.includes(o.text.toLowerCase().replace(/\s+/g, " ").trim().slice(0, 30))
      );
      ansIdx = best;
    }
    if (ansIdx < 0) continue;

    const fullQuestion = passage
      ? `[Case Study] ${passage}\n\nQuestion: ${qText}`
      : qText;

    const optionStrings = four.map((o) => `${o.letter}. ${o.text}`);
    const correctOptionText = four[ansIdx].text;
    const solution = ans.explanation
      ? `Correct option: ${ans.letter}. ${ans.explanation}`
      : `Correct option: ${ans.letter}. ${correctOptionText}`;

    docs.push({
      subject: paper.subject,
      class: paper.class,
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
      tags: ["cbse-official", `qbank-class${paper.class}`],
      aiGenerated: false,
      verified: true,
      verifiedBy: "CBSE Academic (cbseacademic.nic.in QBank)",
      verifiedAt: new Date(),
    });
  }
  return docs;
}

/**
 * FORMAT C — Class 12 QBank layout.
 *
 *   <CHAPTER NAME ON ITS OWN LINE>
 *   Read the following text and answer the following questions...
 *   <passage>
 *   Q.1  <question>
 *   (A) opt
 *   (B) opt
 *   (C) opt
 *   (D) opt
 *   Q.2  ...
 *   ...
 *   Q.4  ...
 *   <CHAPTER NAME>          ← next chapter starts the next case study
 *   Read the following ...
 *   ...
 *   <Answer section at END of document>
 *   <CHAPTER NAME>
 *   Ans.1 (X) text
 *   Ans.2 (X) text
 *   ...
 *   (some chapters have CASE-1 / Case-2 sub-labels with their own Ans.1-4 each)
 */
function parseFormatC(text, paper) {
  const cleaned = clean(text);

  // Find the first "Ans.N" — split into questions vs answers sections
  const ansStart = cleaned.search(/\n\s*Ans\s*\.\s*1\b/i);
  if (ansStart === -1) return [];
  const qSection = cleaned.slice(0, ansStart);
  const aSection = cleaned.slice(ansStart);

  const qHeaders = indexChapterHeaders(qSection, paper.chapters);
  const aHeaders = indexChapterHeaders(aSection, paper.chapters);

  // questionsByChapter: chapter -> [{ passage, qs: [{ qNum, qText, opts[4] }] }]
  const questionsByChapter = {};
  for (let i = 0; i < qHeaders.length; i++) {
    const chap = qHeaders[i].chapter;
    const start = qHeaders[i].pos;
    const end = i + 1 < qHeaders.length ? qHeaders[i + 1].pos : qSection.length;
    const body = qSection.slice(start, end);

    // Split into case studies — markers: "Read the following", "Read the case", "CASE-N", "Case-N"
    // Or just split by Q.1 occurrences (each Q.1 starts a new case study within a chapter)
    const caseStarts = [];
    const csRe = /(?:^|\n)\s*(?:Read the (?:following|case|below)|CASE\s*-?\s*\d+|Case\s*-?\s*\d+)/gi;
    let cm;
    while ((cm = csRe.exec(body)) !== null) caseStarts.push(cm.index);
    if (caseStarts.length === 0) caseStarts.push(0);

    const cases = [];
    for (let j = 0; j < caseStarts.length; j++) {
      const cStart = caseStarts[j];
      const cEnd = j + 1 < caseStarts.length ? caseStarts[j + 1] : body.length;
      const cBody = body.slice(cStart, cEnd);

      // Find Q.N blocks
      const qRe = /Q\s*\.\s*(\d+)\s+([\s\S]*?)(?=\n\s*Q\s*\.\s*\d+\s|$)/g;
      const qs = [];
      let qm;
      while ((qm = qRe.exec(cBody)) !== null) {
        const qNum = Number(qm[1]);
        if (qNum < 1 || qNum > 8) continue;
        const raw = qm[2];
        // Extract 4 options in (A) (B) (C) (D)
        const optRe = /\(([A-Da-d])\)\s*([^\n(]+?)(?=\n|$|\([A-Da-d]\))/g;
        const opts = [];
        let om;
        while ((om = optRe.exec(raw)) !== null) {
          opts.push({ letter: om[1].toUpperCase(), text: om[2].trim() });
        }
        if (opts.length < 4) continue;
        const four = opts.slice(0, 4);
        const firstOpt = raw.search(/\(A\)/i);
        const qText = (firstOpt > 0 ? raw.slice(0, firstOpt) : raw).trim();
        if (qText.length < 5) continue;
        qs.push({ qNum, qText, opts: four });
      }

      const firstQ = cBody.search(/Q\s*\.\s*1\s/);
      const passage = firstQ > 0 ? cBody.slice(0, firstQ).trim() : "";
      // Strip the case-study trigger line from the passage
      const cleanedPassage = passage
        .replace(/^(Read the (?:following|case|below)[^\n]*\n)/i, "")
        .replace(/^(CASE\s*-?\s*\d+\s*\n)/i, "")
        .replace(/^(Case\s*-?\s*\d+\s*\n)/i, "")
        .trim();

      if (qs.length > 0) cases.push({ passage: cleanedPassage, qs });
    }

    if (!questionsByChapter[chap]) questionsByChapter[chap] = [];
    questionsByChapter[chap].push(...cases);
  }

  // answersByChapter: chapter -> [Map(qNum -> { letter, text })]
  const answersByChapter = {};
  for (let i = 0; i < aHeaders.length; i++) {
    const chap = aHeaders[i].chapter;
    const start = aHeaders[i].pos;
    const end = i + 1 < aHeaders.length ? aHeaders[i + 1].pos : aSection.length;
    const body = aSection.slice(start, end);

    // Split into segments by CASE-N / Case-N if present
    const segStarts = [];
    const segRe = /(?:^|\n)\s*(?:CASE\s*-?\s*\d+|Case\s*-?\s*\d+)/g;
    let sm;
    while ((sm = segRe.exec(body)) !== null) segStarts.push(sm.index);
    const segments = [];
    if (segStarts.length === 0) {
      segments.push(body);
    } else {
      if (segStarts[0] > 5) segments.push(body.slice(0, segStarts[0]));
      for (let j = 0; j < segStarts.length; j++) {
        const s = segStarts[j];
        const e = j + 1 < segStarts.length ? segStarts[j + 1] : body.length;
        segments.push(body.slice(s, e));
      }
    }

    for (const seg of segments) {
      const map = new Map();
      for (const am of seg.matchAll(/Ans\s*\.\s*(\d+)\s*\(?([A-Za-z])\)?[\.)]?\s*([^\n]*)/gi)) {
        map.set(Number(am[1]), {
          letter: am[2].toUpperCase(),
          explanation: (am[3] ?? "").trim(),
        });
      }
      if (map.size > 0) {
        if (!answersByChapter[chap]) answersByChapter[chap] = [];
        answersByChapter[chap].push(map);
      }
    }
  }

  // Zip
  const docs = [];
  for (const chap of Object.keys(questionsByChapter)) {
    const qsCases = questionsByChapter[chap];
    const ansCases = answersByChapter[chap] ?? [];
    const n = Math.min(qsCases.length, ansCases.length);
    for (let i = 0; i < n; i++) {
      const { passage, qs } = qsCases[i];
      const ans = ansCases[i];
      for (const q of qs) {
        const a = ans.get(q.qNum);
        if (!a) continue;
        const ansIdx = "ABCD".indexOf(a.letter);
        if (ansIdx < 0) continue;

        const fullQ = passage
          ? `[Case Study] ${passage}\n\nQuestion: ${q.qText}`
          : q.qText;
        const optionStrings = q.opts.map((o) => `${o.letter}. ${o.text}`);

        docs.push({
          subject: paper.subject,
          class: paper.class,
          chapter: chap,
          topic: `Case Study ${i + 1}`,
          type: "MCQ",
          marks: 1,
          difficulty: "Medium",
          question: fullQ,
          options: optionStrings,
          answer: ansIdx,
          solution: {
            steps: a.explanation
              ? `Correct option: ${a.letter}. ${a.explanation}`
              : `Correct option: ${a.letter}. ${q.opts[ansIdx].text}`,
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
          tags: ["cbse-official", `qbank-class${paper.class}`],
          aiGenerated: false,
          verified: true,
          verifiedBy: "CBSE Academic (cbseacademic.nic.in QBank)",
          verifiedAt: new Date(),
        });
      }
    }
  }
  return docs;
}

/**
 * FORMAT D — humanities (History, PolSci, Sociology XII).
 *
 * Open-ended "Source Based Questions" or "Passage Based Questions" —
 * no MCQ options. Each question has 3-5 sub-parts (a, b, c, d, i, ii)
 * that are short-answer; the reference answer follows each sub-part
 * inline (Sociology) or after the whole question (PolSci).
 *
 * We extract these as SA-type questions with reference answers in
 * solution.steps, so students get the source passage + the question +
 * a model answer.
 */
function parseFormatD(text, paper) {
  const cleaned = clean(text);
  const headers = indexChapterHeaders(cleaned, paper.chapters);
  // If <2 chapter headers found, the PDF doesn't separate by chapter
  // — use a generic catch-all label so students aren't misled.
  const useGeneric = headers.length < 2;

  // Top-level questions are numbered: \n  1. / \n  2. / \n  3.
  // Each question has sub-parts: a. / b. / c. / d.   OR   (i) / (ii) / (iii)
  const docs = [];

  // Walk top-level questions
  const qRe = /(?:^|\n)\s*(\d+)\.\s*([\s\S]*?)(?=\n\s*\d+\.\s|$)/g;
  let m;
  while ((m = qRe.exec(cleaned + "\n999. END")) !== null) {
    const qNum = Number(m[1]);
    if (qNum === 999) break;
    if (qNum < 1 || qNum > 40) continue;
    const block = m[2].trim();
    if (block.length < 40) continue;

    // Determine chapter from position
    let chapter;
    if (useGeneric) {
      chapter = "Source-Based Questions (Mixed Chapters)";
    } else {
      chapter = paper.chapters[0];
      const pos = m.index;
      for (const h of headers) {
        if (h.pos < pos) chapter = h.chapter;
        else break;
      }
    }

    // Split into source/passage (everything before first sub-part) + sub-parts
    const subRe = /\n\s*(?:([a-eA-E])\.|\(([ivx]+)\))\s+([\s\S]*?)(?=\n\s*(?:[a-eA-E]\.|\([ivx]+\))\s|$)/g;
    const subMatches = [...block.matchAll(subRe)];
    if (subMatches.length === 0) continue;

    const firstSubPos = subMatches[0].index;
    const passage = block.slice(0, firstSubPos).trim();

    for (const sm of subMatches) {
      const letter = (sm[1] || sm[2] || "").toLowerCase();
      const raw = sm[3].trim();
      if (raw.length < 5) continue;

      // Some Sociology PDFs put answer on the line after the question
      // separated by a single newline. Split: question = first line(s)
      // up to a sentence-ending punctuation; answer = the rest.
      const lines = raw.split("\n").filter((l) => l.trim());
      let qText = lines[0] || raw;
      let aText = lines.slice(1).join(" ").trim();
      // If the first line doesn't end with ? or :, include more lines
      // until we hit one that does.
      let idx = 1;
      while (!/[?:]\s*$/.test(qText.trim()) && idx < lines.length) {
        qText += " " + lines[idx];
        aText = lines.slice(idx + 1).join(" ").trim();
        idx++;
      }
      qText = qText.trim();
      // If still no '?' at end, treat whole block as question and skip
      if (qText.length < 8) continue;

      const fullQuestion = passage
        ? `[Source-Based Question] ${passage}\n\nSub-question (${letter}): ${qText}`
        : `${qText}`;

      docs.push({
        subject: paper.subject,
        class: paper.class,
        chapter,
        topic: `Source-Based Q${qNum}`,
        type: "SA",
        marks: 2,
        difficulty: "Medium",
        question: fullQuestion,
        options: null,
        answer: "(Model answer below)",
        solution: {
          steps: aText
            ? `Reference answer: ${aText}`
            : "Refer to NCERT chapter for the model answer.",
          videoUrl: null,
          commonMistakes: [],
          relatedConcepts: [],
        },
        yearsAsked: [],
        examType: "Board",
        region: "All-India",
        frequencyScore: 7,
        predictedProbability: 0.7,
        bloomLevel: "Understand",
        expectedTime: 180,
        xpReward: 20,
        tags: ["cbse-official", `qbank-class${paper.class}`],
        aiGenerated: false,
        verified: true,
        verifiedBy: "CBSE Academic (cbseacademic.nic.in QBank)",
        verifiedAt: new Date(),
      });
    }
  }
  return docs;
}

async function importPaper(paper) {
  const cls = paper.class === 12 ? "XII" : "X";
  process.stdout.write(
    `  ${cls.padEnd(3)} ${paper.subject.padEnd(12)} | ${paper.url.split("/").pop().padEnd(28)} → `
  );
  const text = await fetchPdfText(paper.url);

  let docs = [];
  // Default format: Format A for Class 10 (CASE STUDY N + a) options),
  // can be overridden with paper.format
  const fmt = paper.format ?? (paper.class === 10 ? "A" : "C");

  if (fmt === "D") {
    docs = parseFormatD(text, paper);
  } else if (fmt === "C") {
    docs = parseFormatC(text, paper);
  } else {
    // Format A (also fallback for B detection inside splitCaseStudies)
    const chunks = splitCaseStudies(text, paper.chapters);
    for (const c of chunks) {
      try {
        docs.push(...parseCaseStudy(c, paper));
      } catch (err) {
        // skip bad chunks
      }
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
    await Question.deleteMany({
      tags: { $all: [`qbank-class${paper.class}`] },
      subject: paper.subject,
      class: paper.class,
    });
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
