import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export type QuestionType =
  | "MCQ"
  | "AssertionReason"
  | "VSA"
  | "SA"
  | "LA"
  | "CaseStudy"
  | "HOTS";

export interface IQuestion extends Document {
  _id: Types.ObjectId;
  subject: string;
  class: 10 | 12;
  chapter: string;
  topic: string;
  subtopic?: string;
  type: QuestionType;
  marks: number;
  difficulty: "Easy" | "Medium" | "Hard" | "VeryHard";
  question: string;
  options: string[] | null;
  answer: number | string;
  solution: {
    steps: string;
    videoUrl: string | null;
    commonMistakes: string[];
    relatedConcepts: string[];
  };
  yearsAsked: number[];
  examType: "Board" | "Sample" | "Exemplar" | "Mock";
  region: string;
  frequencyScore: number;
  predictedProbability: number;
  bloomLevel: string;
  expectedTime: number;
  xpReward: number;
  tags: string[];
  imageUrl: string | null;
  aiGenerated?: boolean;
  /** True when reviewed/approved by a teacher. Shown with a ✓ badge in the UI. */
  verified?: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    subject: { type: String, required: true, index: true },
    class: { type: Number, enum: [10, 12], required: true, index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    subtopic: String,
    type: {
      type: String,
      enum: ["MCQ", "AssertionReason", "VSA", "SA", "LA", "CaseStudy", "HOTS"],
      required: true,
    },
    marks: { type: Number, required: true, min: 1, max: 6 },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "VeryHard"],
      default: "Medium",
    },
    question: { type: String, required: true },
    options: { type: [String], default: null },
    answer: Schema.Types.Mixed,
    solution: {
      steps: { type: String, default: "" },
      videoUrl: { type: String, default: null },
      commonMistakes: { type: [String], default: [] },
      relatedConcepts: { type: [String], default: [] },
    },
    yearsAsked: { type: [Number], default: [] },
    examType: {
      type: String,
      enum: ["Board", "Sample", "Exemplar", "Mock"],
      default: "Board",
    },
    region: { type: String, default: "All-India" },
    frequencyScore: { type: Number, default: 5, min: 1, max: 10 },
    predictedProbability: { type: Number, default: 0, min: 0, max: 1 },
    bloomLevel: { type: String, default: "Apply" },
    expectedTime: { type: Number, default: 90 },
    xpReward: { type: Number, default: 10 },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, default: null },
    aiGenerated: { type: Boolean, default: false, index: true },
    verified: { type: Boolean, default: false, index: true },
    verifiedBy: String,
    verifiedAt: Date,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

questionSchema.index({ subject: 1, chapter: 1, type: 1 });
questionSchema.index({ class: 1, subject: 1, predictedProbability: -1 });

export const Question: Model<IQuestion> =
  (models.Question as Model<IQuestion>) || model<IQuestion>("Question", questionSchema);
