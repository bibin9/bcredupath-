import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IScholarship extends Document {
  name: string;
  provider: string;
  type: "govt" | "private" | "merit" | "need" | "nri";
  state: string | null;
  amount: number;
  eligibility: string;
  applicationLink?: string;
  deadline?: Date;
  documents: string[];
  /** Is this scholarship open to NRI / Overseas Indian students? */
  nriEligible?: boolean;
  /** Targets specific country (e.g. "United Arab Emirates"), null = open globally */
  targetCountry?: string | null;
}

const scholarshipSchema = new Schema<IScholarship>(
  {
    name: { type: String, required: true, index: true },
    provider: String,
    type: {
      type: String,
      enum: ["govt", "private", "merit", "need", "nri"],
      default: "govt",
      index: true,
    },
    state: { type: String, default: null, index: true },
    amount: { type: Number, default: 0 },
    eligibility: String,
    applicationLink: String,
    deadline: Date,
    documents: { type: [String], default: [] },
    nriEligible: { type: Boolean, default: false, index: true },
    targetCountry: { type: String, default: null, index: true },
  },
  { timestamps: true }
);

export const Scholarship: Model<IScholarship> =
  (models.Scholarship as Model<IScholarship>) ||
  model<IScholarship>("Scholarship", scholarshipSchema);
