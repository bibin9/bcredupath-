import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  avatar: string;
  class: 10 | 12 | null;
  stream: "pcm" | "pcb" | "commerce" | "humanities" | null;
  /** ISO-style country name. "India" by default; NRI students can pick another. */
  country: string;
  /** ISO-4217 code: INR, USD, AED, SGD, etc. Defaults based on country. */
  preferredCurrency: string;
  state?: string;
  city?: string;
  school?: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: Date | null;
  badges: string[];
  rank: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond";
  bookmarks: Types.ObjectId[];
  interests: string[];
  preferredSubjects: string[];
  careerPreferences: string[];
  onboarded: boolean;
  parentShareToken?: string;
  parentEmail?: string;
  role?: "student" | "admin" | "teacher";
  practiceHistory: Array<{
    mode: string;
    score: number;
    total: number;
    xpEarned: number;
    date: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, select: false },
    avatar: { type: String, default: "🦊" },
    class: { type: Number, enum: [10, 12, null], default: null },
    stream: { type: String, enum: ["pcm", "pcb", "commerce", "humanities", null], default: null },
    country: { type: String, default: "India", index: true },
    preferredCurrency: { type: String, default: "INR" },
    state: { type: String },
    city: { type: String },
    school: { type: String },
    xp: { type: Number, default: 0, min: 0, index: true },
    level: { type: Number, default: 0, min: 0 },
    streak: { type: Number, default: 0, min: 0 },
    lastActiveDate: { type: Date, default: null },
    badges: { type: [String], default: [] },
    rank: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
      default: "Bronze",
    },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    interests: { type: [String], default: [] },
    preferredSubjects: { type: [String], default: [] },
    careerPreferences: { type: [String], default: [] },
    onboarded: { type: Boolean, default: false },
    parentShareToken: { type: String, index: true, sparse: true },
    parentEmail: { type: String },
    role: { type: String, enum: ["student", "admin", "teacher"], default: "student" },
    practiceHistory: [
      {
        mode: String,
        score: Number,
        total: Number,
        xpEarned: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ xp: -1 });
userSchema.index({ state: 1, xp: -1 });

export const User: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>("User", userSchema);
