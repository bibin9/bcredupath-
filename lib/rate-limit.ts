import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

/**
 * Per-user, per-action daily rate limit using a small Mongo collection.
 * Cheap, sufficient for one-server scale. Swap for Redis if scaling out.
 *
 * Daily caps default to 10 — generous enough that a real student never hits it,
 * tight enough that a misbehaving account can't burn ₹1000s of API credit.
 */

type RateBucket = {
  userId: mongoose.Types.ObjectId;
  action: string;
  dayKey: string; // "2026-05-19"
  count: number;
  updatedAt: Date;
};

const bucketSchema = new mongoose.Schema<RateBucket>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    action: { type: String, required: true },
    dayKey: { type: String, required: true },
    count: { type: Number, default: 0 },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);
bucketSchema.index({ userId: 1, action: 1, dayKey: 1 }, { unique: true });

const RateBucketModel =
  (mongoose.models.RateBucket as mongoose.Model<RateBucket>) ||
  mongoose.model<RateBucket>("RateBucket", bucketSchema);

/** Default per-action daily caps. */
const DEFAULT_CAPS: Record<string, number> = {
  "ai.generate": 10,
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

export type RateLimitResult = {
  ok: boolean;
  current: number;
  limit: number;
  resetAt: Date;
};

/**
 * Atomically increment the user's daily counter for an action.
 * Returns `ok: false` if the cap is exceeded (the increment is rolled back).
 */
export async function consumeRateLimit(
  userId: string | mongoose.Types.ObjectId,
  action: string,
  limit: number = DEFAULT_CAPS[action] ?? 10
): Promise<RateLimitResult> {
  await connectDB();
  const dayKey = todayKey();
  const uid = typeof userId === "string" ? new mongoose.Types.ObjectId(userId) : userId;

  // Atomic upsert + increment
  const doc = await RateBucketModel.findOneAndUpdate(
    { userId: uid, action, dayKey },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true, new: true }
  );

  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(0, 0, 0, 0);

  if (doc.count > limit) {
    // Roll back — we over-incremented
    await RateBucketModel.updateOne(
      { _id: doc._id },
      { $inc: { count: -1 } }
    );
    return { ok: false, current: limit, limit, resetAt: tomorrow };
  }

  return { ok: true, current: doc.count, limit, resetAt: tomorrow };
}
