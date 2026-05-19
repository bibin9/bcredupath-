import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  period: "daily" | "weekly" | "monthly" | "alltime";
  scope: "all-india" | "state" | "city" | "school";
  scopeKey: string;
  xp: number;
  rank: number;
  snapshot: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    period: {
      type: String,
      enum: ["daily", "weekly", "monthly", "alltime"],
      required: true,
      index: true,
    },
    scope: {
      type: String,
      enum: ["all-india", "state", "city", "school"],
      required: true,
    },
    scopeKey: { type: String, default: "ALL" },
    xp: { type: Number, default: 0, index: true },
    rank: { type: Number, default: 0 },
    snapshot: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

leaderboardSchema.index({ period: 1, scope: 1, scopeKey: 1, xp: -1 });

export const Leaderboard: Model<ILeaderboardEntry> =
  (models.Leaderboard as Model<ILeaderboardEntry>) ||
  model<ILeaderboardEntry>("Leaderboard", leaderboardSchema);
