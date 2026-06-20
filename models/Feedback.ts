import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export type FeedbackCategory =
  | "bug"
  | "wrong-answer"
  | "feature-request"
  | "content-gap"
  | "praise"
  | "other";

export type FeedbackStatus = "new" | "triaged" | "resolved" | "wontfix";

export interface IFeedback extends Document {
  _id: Types.ObjectId;
  userId?: Types.ObjectId;
  userEmail?: string;
  userName?: string;
  category: FeedbackCategory;
  subject: string;
  message: string;
  /** Free-text where the user was (e.g. "/dashboard/mock-test/paper/abc123") */
  context?: string;
  status: FeedbackStatus;
  /** Admin response if triaged */
  adminReply?: string;
  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    userEmail: { type: String, index: true },
    userName: String,
    category: {
      type: String,
      enum: ["bug", "wrong-answer", "feature-request", "content-gap", "praise", "other"],
      default: "other",
      index: true,
    },
    subject: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 5000 },
    context: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: ["new", "triaged", "resolved", "wontfix"],
      default: "new",
      index: true,
    },
    adminReply: String,
  },
  { timestamps: true }
);

feedbackSchema.index({ createdAt: -1 });

export const Feedback: Model<IFeedback> =
  (models.Feedback as Model<IFeedback>) || model<IFeedback>("Feedback", feedbackSchema);
