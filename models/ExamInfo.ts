import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IExamInfo extends Document {
  name: string;
  fullName: string;
  category: "entrance" | "scholarship" | "olympiad" | "board";
  applicationStart?: Date;
  applicationEnd?: Date;
  examDate?: Date;
  resultDate?: Date;
  eligibility?: string;
  syllabus?: string;
  pattern?: string;
  officialWebsite?: string;
  fees?: number;
  description?: string;
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
    applicationStart: Date,
    applicationEnd: Date,
    examDate: { type: Date, index: true },
    resultDate: Date,
    eligibility: String,
    syllabus: String,
    pattern: String,
    officialWebsite: String,
    fees: Number,
    description: String,
  },
  { timestamps: true }
);

export const ExamInfo: Model<IExamInfo> =
  (models.ExamInfo as Model<IExamInfo>) || model<IExamInfo>("ExamInfo", examInfoSchema);
