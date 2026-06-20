import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export type MockPaperSection = {
  name: string;
  instructions: string;
  marksPerQuestion: number;
  /** Refs to Question docs */
  questionIds: Types.ObjectId[];
};

export interface IMockPaper extends Document {
  _id: Types.ObjectId;
  subject: string;
  class: 10 | 12;
  /** Stable paper number, 1..20 per (subject, class). */
  paperNumber: number;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  sections: MockPaperSection[];
  /** "qbank" if assembled from CBSE Q-Bank / SQP / PQ pool. */
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema<MockPaperSection>(
  {
    name: { type: String, required: true },
    instructions: { type: String, default: "" },
    marksPerQuestion: { type: Number, required: true },
    questionIds: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  },
  { _id: false }
);

const mockPaperSchema = new Schema<IMockPaper>(
  {
    subject: { type: String, required: true, index: true },
    class: { type: Number, enum: [10, 12], required: true, index: true },
    paperNumber: { type: Number, required: true, min: 1 },
    title: { type: String, required: true },
    totalMarks: { type: Number, default: 80 },
    durationMinutes: { type: Number, default: 180 },
    sections: { type: [sectionSchema], default: [] },
    source: { type: String, default: "qbank" },
  },
  { timestamps: true }
);

mockPaperSchema.index({ subject: 1, class: 1, paperNumber: 1 }, { unique: true });

export const MockPaper: Model<IMockPaper> =
  (models.MockPaper as Model<IMockPaper>) ||
  model<IMockPaper>("MockPaper", mockPaperSchema);
