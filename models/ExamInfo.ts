import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IExamInfo extends Document {
  name: string;
  fullName: string;
  category: "entrance" | "scholarship" | "olympiad" | "board";
  /** Field this exam unlocks: engineering, medical, law, design, etc. */
  field?: string;
  /** UG = after Class 12, PG = after UG, defense = defense recruitment, etc. */
  level?: "UG" | "PG" | "defense" | "research" | "language" | "lateral";
  /** True for international tests like SAT, IELTS, GRE, etc. */
  international?: boolean;
  applicationStart?: Date;
  applicationEnd?: Date;
  examDate?: Date;
  resultDate?: Date;
  eligibility?: string;
  syllabus?: string;
  pattern?: string;
  /** Step-by-step "how to apply" guide */
  applyHow?: string[];
  officialWebsite?: string;
  fees?: number;
  description?: string;
  /** Career names this exam directly opens (resolved against the Career collection) */
  careersUnlocked?: string[];
  /** College names that accept this exam (resolved against the College collection) */
  collegesAccepting?: string[];
}

const examInfoSchema = new Schema<IExamInfo>(
  {
    name: { type: String, required: true, index: true },
    fullName: String,
    category: {
      type: String,
      enum: ["entrance", "scholarship", "olympiad", "board"],
      default: "entrance",
      index: true,
    },
    field: { type: String, index: true },
    level: { type: String, enum: ["UG", "PG", "defense", "research", "language", "lateral"], default: "UG", index: true },
    international: { type: Boolean, default: false, index: true },
    applicationStart: Date,
    applicationEnd: Date,
    examDate: { type: Date, index: true },
    resultDate: Date,
    eligibility: String,
    syllabus: String,
    pattern: String,
    applyHow: { type: [String], default: [] },
    officialWebsite: String,
    fees: Number,
    description: String,
    careersUnlocked: { type: [String], default: [] },
    collegesAccepting: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const ExamInfo: Model<IExamInfo> =
  (models.ExamInfo as Model<IExamInfo>) || model<IExamInfo>("ExamInfo", examInfoSchema);
