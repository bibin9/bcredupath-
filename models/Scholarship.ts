import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IScholarship extends Document {
  name: string;
  provider: string;
  type: "govt" | "private" | "merit" | "need";
  state: string | null;
  amount: number;
  eligibility: string;
  applicationLink?: string;
  deadline?: Date;
  documents: string[];
}

const scholarshipSchema = new Schema<IScholarship>(
  {
    name: { type: String, required: true, index: true },
    provider: String,
    type: {
      type: String,
      enum: ["govt", "private", "merit", "need"],
      default: "govt",
      index: true,
    },
    state: { type: String, default: null, index: true },
    amount: { type: Number, default: 0 },
    eligibility: String,
    applicationLink: String,
    deadline: Date,
    documents: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Scholarship: Model<IScholarship> =
  (models.Scholarship as Model<IScholarship>) ||
  model<IScholarship>("Scholarship", scholarshipSchema);
