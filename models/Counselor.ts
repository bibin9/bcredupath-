import { Schema, model, models, type Model, type Document } from "mongoose";

export interface ICounselor extends Document {
  name: string;
  specialization: string[];
  city: string;
  state: string;
  phone?: string;
  email?: string;
  website?: string;
  languages: string[];
  fees?: number;
  rating: number;
  verified: boolean;
  photo?: string;
}

const counselorSchema = new Schema<ICounselor>(
  {
    name: { type: String, required: true, index: true },
    specialization: { type: [String], default: [] },
    city: { type: String, index: true },
    state: { type: String, index: true },
    phone: String,
    email: String,
    website: String,
    languages: { type: [String], default: ["English", "Hindi"] },
    fees: Number,
    rating: { type: Number, default: 0, min: 0, max: 5 },
    verified: { type: Boolean, default: false },
    photo: String,
  },
  { timestamps: true }
);

export const Counselor: Model<ICounselor> =
  (models.Counselor as Model<ICounselor>) ||
  model<ICounselor>("Counselor", counselorSchema);
