import { Schema, model, models, type Model, type Document } from "mongoose";

export interface IRevisionNote extends Document {
  subject: string;
  class: 10 | 12;
  chapter: string;
  /** Markdown body with LaTeX inline ($...$) and headings */
  body: string;
  /** Short formula sheet (key formulas, definitions) */
  formulaSheet: string;
  /** 3-5 quick-recall bullet points */
  keyTakeaways: string[];
  aiGenerated: boolean;
  createdAt: Date;
}

const revisionNoteSchema = new Schema<IRevisionNote>(
  {
    subject: { type: String, required: true, index: true },
    class: { type: Number, enum: [10, 12], required: true, index: true },
    chapter: { type: String, required: true, index: true },
    body: { type: String, required: true },
    formulaSheet: { type: String, default: "" },
    keyTakeaways: { type: [String], default: [] },
    aiGenerated: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

revisionNoteSchema.index({ subject: 1, class: 1, chapter: 1 }, { unique: true });

export const RevisionNote: Model<IRevisionNote> =
  (models.RevisionNote as Model<IRevisionNote>) ||
  model<IRevisionNote>("RevisionNote", revisionNoteSchema);
