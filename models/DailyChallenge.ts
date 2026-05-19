import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export interface IDailyChallenge extends Document {
  date: Date;
  subject: string;
  questionIds: Types.ObjectId[];
  xpReward: number;
  participants: Types.ObjectId[];
}

const dailyChallengeSchema = new Schema<IDailyChallenge>(
  {
    date: { type: Date, required: true, unique: true, index: true },
    subject: { type: String, required: true },
    questionIds: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    xpReward: { type: Number, default: 100 },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const DailyChallenge: Model<IDailyChallenge> =
  (models.DailyChallenge as Model<IDailyChallenge>) ||
  model<IDailyChallenge>("DailyChallenge", dailyChallengeSchema);
