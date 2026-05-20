import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export type RoadmapStage = {
  /** "MBBS", "B.Tech CSE", "MD (Cardiology)" etc. */
  degree: string;
  /** "5.5 years", "3 years", etc. */
  duration?: string;
  /** Entrance exam names — links to ExamInfo if you want to fetch dates */
  entranceExams?: string[];
  /** Free-text note about the stage */
  notes?: string;
};

export type CareerRoadmap = {
  /** "Focus on Math + Science in Class 10" — coarse early advice */
  class10?: { focus: string; minScore?: string };
  /** Required Class 12 stream + subjects */
  class12: {
    stream: "PCM" | "PCB" | "PCMB" | "Commerce" | "Humanities" | "Any" | string;
    coreSubjects: string[];
    minScore?: string;
    notes?: string;
  };
  /** Undergraduate degrees that lead to this career */
  undergrad: RoadmapStage[];
  /** Optional postgrad path (specialisation, MBA, MS, etc.) */
  postgrad?: RoadmapStage[];
  /** Final role description shown after the last node */
  finalRole?: string;
};

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
  /** Subjects best suited for this career — used by matcher */
  preferredSubjects?: string[];
  growthProspects: string;
  videoUrl?: string;
  roadmap?: CareerRoadmap;
}

const roadmapStageSchema = new Schema<RoadmapStage>(
  {
    degree: { type: String, required: true },
    duration: String,
    entranceExams: [String],
    notes: String,
  },
  { _id: false }
);

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
    preferredSubjects: { type: [String], default: [] },
    growthProspects: { type: String, default: "" },
    videoUrl: String,
    roadmap: {
      type: new Schema<CareerRoadmap>(
        {
          class10: {
            focus: String,
            minScore: String,
            _id: false,
          },
          class12: {
            stream: String,
            coreSubjects: [String],
            minScore: String,
            notes: String,
            _id: false,
          },
          undergrad: [roadmapStageSchema],
          postgrad: [roadmapStageSchema],
          finalRole: String,
        },
        { _id: false }
      ),
      required: false,
    },
  },
  { timestamps: true }
);

export const Career: Model<ICareer> =
  (models.Career as Model<ICareer>) || model<ICareer>("Career", careerSchema);
