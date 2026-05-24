// Seeds careers, colleges, exams, scholarships, counselors.
// Run with: npm run seed:content

import dotenv from "dotenv";
import mongoose from "mongoose";
import { build } from "esbuild";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";

dotenv.config({ path: ".env.local", override: true });

const tempDir = mkdtempSync(join(tmpdir(), "bcr-content-"));
async function importTS(path) {
  const out = join(tempDir, `${Math.random().toString(36).slice(2)}.mjs`);
  await build({ entryPoints: [path], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "error" });
  return import(pathToFileURL(out).href);
}

const { CAREERS: CAREERS_V1 } = await importTS("lib/seed/careers.ts");
const { CAREERS_EXTENDED } = await importTS("lib/seed/careers-extended.ts");
const { HUMANITIES_COMMERCE_CAREERS } = await importTS("lib/seed/careers-humanities-commerce.ts");
const { COLLEGES: COLLEGES_V1 } = await importTS("lib/seed/colleges.ts");
const { COLLEGES_EXTENDED } = await importTS("lib/seed/colleges-extended.ts");
const { EXAMS } = await importTS("lib/seed/exams.ts");
const { SCHOLARSHIPS } = await importTS("lib/seed/scholarships.ts");
const { COUNSELORS } = await importTS("lib/seed/counselors.ts");
const { ROADMAP_OVERRIDES, DEFAULT_ROADMAP } = await importTS("lib/seed/career-roadmaps.ts");
const { ROADMAP_OVERRIDES_EXTENDED } = await importTS("lib/seed/career-roadmaps-extended.ts");
const { COLLEGE_CONTACTS } = await importTS("lib/seed/college-contacts.ts");
const { NRI_QUOTA } = await importTS("lib/seed/nri-quota.ts");

// Merge v1 + extended (later entries don't overwrite v1 if name clashes)
const seen = new Set();
const CAREERS = [...CAREERS_V1, ...CAREERS_EXTENDED, ...HUMANITIES_COMMERCE_CAREERS].filter((c) => {
  if (seen.has(c.name)) return false;
  seen.add(c.name);
  return true;
});
const collegeSeen = new Set();
const COLLEGES = [...COLLEGES_V1, ...COLLEGES_EXTENDED].filter((c) => {
  if (collegeSeen.has(c.name)) return false;
  collegeSeen.add(c.name);
  return true;
});
const ROADMAPS_ALL = { ...ROADMAP_OVERRIDES, ...ROADMAP_OVERRIDES_EXTENDED };

// Inline minimal schemas
const roadmapStageSchema = new mongoose.Schema({
  degree: String, duration: String, entranceExams: [String], notes: String,
}, { _id: false });

const careerSchema = new mongoose.Schema({
  name: String, emoji: String, category: String, description: String, dayInLife: String,
  qualifications: [String],
  entranceExams: [{ name: String, link: String, dates: String, _id: false }],
  salaryRanges: { entry: Number, mid: Number, senior: Number },
  topColleges: [mongoose.Schema.Types.ObjectId],
  skillsRequired: [String], interestTags: [String], preferredSubjects: [String],
  growthProspects: String, videoUrl: String,
  roadmap: new mongoose.Schema({
    class10: { focus: String, minScore: String, _id: false },
    class12: { stream: String, coreSubjects: [String], minScore: String, _id: false },
    undergrad: [roadmapStageSchema],
    postgrad: [roadmapStageSchema],
    finalRole: String,
  }, { _id: false }),
}, { timestamps: true });

const collegeSchema = new mongoose.Schema({
  name: String, type: String, country: String, state: String, city: String,
  nirfRank: Number, globalRank: Number,
  courses: [String], fees: { min: Number, max: Number }, cutoffs: mongoose.Schema.Types.Mixed,
  website: String, admissionLink: String, hostel: Boolean, placement: mongoose.Schema.Types.Mixed,
  highlights: [String],
  address: String, phone: String, email: String,
  nriQuota: {
    available: Boolean,
    annualFeeINR: Number,
    cutoffNotes: String,
    seatPercent: Number,
    notes: String,
    _id: false,
  },
}, { timestamps: true });

const examSchema = new mongoose.Schema({
  name: String, fullName: String, category: String,
  applicationStart: Date, applicationEnd: Date, examDate: Date, resultDate: Date,
  eligibility: String, syllabus: String, pattern: String, officialWebsite: String,
  fees: Number, description: String,
}, { timestamps: true });

const scholarshipSchema = new mongoose.Schema({
  name: String, provider: String, type: String, state: String,
  amount: Number, eligibility: String, applicationLink: String, deadline: Date,
  documents: [String],
  nriEligible: { type: Boolean, default: false },
  targetCountry: String,
}, { timestamps: true });

const counselorSchema = new mongoose.Schema({
  name: String, specialization: [String], city: String, state: String,
  phone: String, email: String, website: String, languages: [String],
  fees: Number, rating: Number, verified: Boolean, photo: String,
}, { timestamps: true });

const Career = mongoose.models.Career || mongoose.model("Career", careerSchema);
const College = mongoose.models.College || mongoose.model("College", collegeSchema);
const ExamInfo = mongoose.models.ExamInfo || mongoose.model("ExamInfo", examSchema);
const Scholarship = mongoose.models.Scholarship || mongoose.model("Scholarship", scholarshipSchema);
const Counselor = mongoose.models.Counselor || mongoose.model("Counselor", counselorSchema);

function parseDate(s) {
  if (!s) return undefined;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing");
  await mongoose.connect(process.env.MONGODB_URI, { dbName: "bcredupath" });
  console.log("→ connected\n");

  // Wipe + re-seed each collection (these are static reference data)
  await College.deleteMany({});
  const collegeDocs = await College.insertMany(COLLEGES.map((c) => {
    const contact = COLLEGE_CONTACTS[c.name] ?? {};
    const quota = NRI_QUOTA[c.name];
    return {
      ...c,
      country: c.country ?? "India",
      cutoffs: {},
      placement: {},
      ...contact,
      ...(quota ? { nriQuota: quota } : {}),
    };
  }));
  const collegeByName = new Map(collegeDocs.map((c) => [c.name, c._id]));
  const contactCount = Object.keys(COLLEGE_CONTACTS).length;
  const nriCount = collegeDocs.filter((c) => c.nriQuota?.available).length;
  console.log(
    `  ✓ Colleges        ${collegeDocs.length.toString().padStart(3)}  (${contactCount} with contacts, ${nriCount} with NRI quota)`
  );

  await Career.deleteMany({});
  const careerDocs = CAREERS.map((c) => ({
    ...c,
    topColleges: c.topColleges
      .map((name) => collegeByName.get(name))
      .filter((id) => !!id),
    // Apply roadmap: inline > override file (v1 or extended) > default fallback
    roadmap: c.roadmap ?? ROADMAPS_ALL[c.name] ?? DEFAULT_ROADMAP,
  }));
  const careersInserted = await Career.insertMany(careerDocs);
  const withRoadmap = careerDocs.filter((c) => c.roadmap && c.roadmap !== DEFAULT_ROADMAP).length;
  console.log(`  ✓ Careers         ${careersInserted.length.toString().padStart(3)}  (${withRoadmap} with curated roadmaps, +${HUMANITIES_COMMERCE_CAREERS.length} humanities/commerce)`);

  await ExamInfo.deleteMany({});
  const examDocs = EXAMS.map((e) => ({
    ...e,
    applicationStart: parseDate(e.applicationStart),
    applicationEnd: parseDate(e.applicationEnd),
    examDate: parseDate(e.examDate),
  }));
  const examsInserted = await ExamInfo.insertMany(examDocs);
  console.log(`  ✓ Exams           ${examsInserted.length.toString().padStart(3)}`);

  await Scholarship.deleteMany({});
  const schDocs = SCHOLARSHIPS.map((s) => ({
    ...s,
    deadline:
      !s.deadline ||
      s.deadline === "Rolling" ||
      s.deadline === "Varies" ||
      s.deadline.startsWith("Annual") ||
      s.deadline.startsWith("Post-")
        ? undefined
        : parseDate(s.deadline),
  }));
  const schInserted = await Scholarship.insertMany(schDocs);
  const nriSchCount = schDocs.filter((s) => s.nriEligible).length;
  console.log(`  ✓ Scholarships    ${schInserted.length.toString().padStart(3)}  (${nriSchCount} NRI-eligible)`);

  await Counselor.deleteMany({});
  const counselorsInserted = await Counselor.insertMany(COUNSELORS);
  console.log(`  ✓ Counselors      ${counselorsInserted.length.toString().padStart(3)}`);

  const total = collegeDocs.length + careersInserted.length + examsInserted.length + schInserted.length + counselorsInserted.length;
  console.log(`\n✅ Seeded ${total} content records`);

  await mongoose.disconnect();
  rmSync(tempDir, { recursive: true, force: true });
}

main().catch((err) => { console.error("Seed failed:", err); rmSync(tempDir, { recursive: true, force: true }); process.exit(1); });
