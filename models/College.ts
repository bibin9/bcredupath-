import { Schema, model, models, type Model, type Document } from "mongoose";

export interface ICollege extends Document {
  name: string;
  type: "Govt" | "Private";
  country: string; // "India" | "USA" | "UK" | "Canada" | "Singapore" | "Germany" | "Australia" | ...
  state: string;
  city: string;
  nirfRank?: number;
  globalRank?: number; // QS / Times Higher Ed rank for abroad
  courses: string[];
  fees: { min: number; max: number };
  cutoffs: Record<string, unknown>;
  website?: string;
  admissionLink?: string;
  hostel: boolean;
  placement: Record<string, unknown>;
  highlights?: string[]; // 1-3 bullet points
  /** Full postal address for contact details panel */
  address?: string;
  phone?: string;
  email?: string;
}

const collegeSchema = new Schema<ICollege>(
  {
    name: { type: String, required: true, index: true },
    type: { type: String, enum: ["Govt", "Private"], default: "Govt" },
    country: { type: String, default: "India", index: true },
    state: { type: String, required: true, index: true },
    city: String,
    nirfRank: Number,
    globalRank: Number,
    courses: { type: [String], default: [] },
    fees: { min: { type: Number, default: 0 }, max: { type: Number, default: 0 } },
    cutoffs: { type: Schema.Types.Mixed, default: {} },
    website: String,
    admissionLink: String,
    hostel: { type: Boolean, default: false },
    placement: { type: Schema.Types.Mixed, default: {} },
    highlights: { type: [String], default: [] },
    address: String,
    phone: String,
    email: String,
  },
  { timestamps: true }
);

export const College: Model<ICollege> =
  (models.College as Model<ICollege>) || model<ICollege>("College", collegeSchema);
