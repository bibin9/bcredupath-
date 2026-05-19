import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export interface IDoubt extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  subject?: string;
  chapter?: string;
  question: string;
  answer: string;
  helpful: boolean | null; // user feedback
  createdAt: Date;
}

const doubtSchema = new Schema<IDoubt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subject: String,
    chapter: String,
    question: { type: String, required: true },
    answer: { type: String, required: true },
    helpful: { type: Boolean, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

doubtSchema.index({ userId: 1, createdAt: -1 });

export const Doubt: Model<IDoubt> =
  (models.Doubt as Model<IDoubt>) || model<IDoubt>("Doubt", doubtSchema);
