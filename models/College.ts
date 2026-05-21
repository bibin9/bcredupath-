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
  /**
   * Whether this college offers NRI quota seats. Roughly 15% at AIIMS, IITs,
   * NITs and most private medical/engineering colleges. Fees are higher
   * (often 2-5x) and cutoffs slightly easier.
   */
  nriQuota?: {
    available: boolean;
    /** Annual fee in INR for NRI seats (typically much higher than domestic) */
    annualFeeINR?: number;
    /** Approx cutoff drop for NRI candidates (e.g. "NEET 50th percentile vs 95th for domestic") */
    cutoffNotes?: string;
    /** % of seats reserved for NRI candidates */
    seatPercent?: number;
    /** Free-text notes — application route, documents needed, etc. */
    notes?: string;
  };
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
    nriQuota: {
      available: { type: Boolean, default: false },
      annualFeeINR: Number,
      cutoffNotes: String,
      seatPercent: Number,
      notes: String,
      _id: false,
    },
  },
  { timestamps: true }
);

export const College: Model<ICollege> =
  (models.College as Model<ICollege>) || model<ICollege>("College", collegeSchema);
