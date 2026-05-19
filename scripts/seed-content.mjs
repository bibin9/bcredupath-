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

const { CAREERS } = await importTS("lib/seed/careers.ts");
const { COLLEGES } = await importTS("lib/seed/colleges.ts");
const { EXAMS } = await importTS("lib/seed/exams.ts");
const { SCHOLARSHIPS } = await importTS("lib/seed/scholarships.ts");
const { COUNSELORS } = await importTS("lib/seed/counselors.ts");

// Inline minimal schemas
const careerSchema = new mongoose.Schema({
  name: String, emoji: String, category: String, description: String, dayInLife: String,
  qualifications: [String],
  entranceExams: [{ name: String, link: String, dates: String, _id: false }],
  salaryRanges: { entry: Number, mid: Number, senior: Number },
  topColleges: [mongoose.Schema.Types.ObjectId],
  skillsRequired: [String], interestTags: [String], growthProspects: String, videoUrl: String,
}, { timestamps: true });

const collegeSchema = new mongoose.Schema({
  name: String, type: String, country: String, state: String, city: String,
  nirfRank: Number, globalRank: Number,
  courses: [String], fees: { min: Number, max: Number }, cutoffs: mongoose.Schema.Types.Mixed,
  website: String, admissionLink: String, hostel: Boolean, placement: mongoose.Schema.Types.Mixed,
  highlights: [String],
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
  const collegeDocs = await College.insertMany(COLLEGES.map((c) => ({
    ...c,
    country: c.country ?? "India",
    cutoffs: {},
    placement: {},
  })));
  const collegeByName = new Map(collegeDocs.map((c) => [c.name, c._id]));
  console.log(`  ✓ Colleges        ${collegeDocs.length.toString().padStart(3)}`);

  await Career.deleteMany({});
  const careerDocs = CAREERS.map((c) => ({
    ...c,
    topColleges: c.topColleges
      .map((name) => collegeByName.get(name))
      .filter((id) => !!id),
  }));
  const careersInserted = await Career.insertMany(careerDocs);
  console.log(`  ✓ Careers         ${careersInserted.length.toString().padStart(3)}`);

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
    deadline: s.deadline === "Rolling" || s.deadline === "Varies" ? undefined : parseDate(s.deadline),
  }));
  const schInserted = await Scholarship.insertMany(schDocs);
  console.log(`  ✓ Scholarships    ${schInserted.length.toString().padStart(3)}`);

  await Counselor.deleteMany({});
  const counselorsInserted = await Counselor.insertMany(COUNSELORS);
  console.log(`  ✓ Counselors      ${counselorsInserted.length.toString().padStart(3)}`);

  const total = collegeDocs.length + careersInserted.length + examsInserted.length + schInserted.length + counselorsInserted.length;
  console.log(`\n✅ Seeded ${total} content records`);

  await mongoose.disconnect();
  rmSync(tempDir, { recursive: true, force: true });
}

main().catch((err) => { console.error("Seed failed:", err); rmSync(tempDir, { recursive: true, force: true }); process.exit(1); });
