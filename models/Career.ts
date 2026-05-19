import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export interface ICareer extends Document {
  _id: Types.ObjectId;
  name: string;
  emoji: string;
  category: string;
  description: string;
  dayInLife: string;
  qualifications: string[];
  entranceExams: { name: string; link: string; dates: string }[];
  salaryRanges: { entry: number; mid: number; senior: number };
  topColleges: Types.ObjectId[];
  skillsRequired: string[];
  interestTags: string[];
  growthProspects: string;
  videoUrl?: string;
}

const careerSchema = new Schema<ICareer>(
  {
    name: { type: String, required: true, index: true },
    emoji: { type: String, default: "💼" },
    category: { type: String, required: true, index: true },
    description: { type: String, default: "" },
    dayInLife: { type: String, default: "" },
    qualifications: { type: [String], default: [] },
    entranceExams: [
      { name: String, link: String, dates: String, _id: false },
    ],
    salaryRanges: {
      entry: { type: Number, default: 0 },
      mid: { type: Number, default: 0 },
      senior: { type: Number, default: 0 },
    },
    topColleges: [{ type: Schema.Types.ObjectId, ref: "College" }],
    skillsRequired: { type: [String], default: [] },
    interestTags: { type: [String], default: [], index: true },
    growthProspects: { type: String, default: "" },
    videoUrl: String,
  },
  { timestamps: true }
);

export const Career: Model<ICareer> =
  (models.Career as Model<ICareer>) || model<ICareer>("Career", careerSchema);
