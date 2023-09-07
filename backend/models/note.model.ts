import { model, Schema, Model } from "mongoose";
import { INote } from "../types/note";

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  // createdBy: { type: String, required: false },
  timestamps: { createDate: Date, updatedDate: Date },
});

export const NoteModel: Model<INote> = model<INote>("notes", NoteSchema);
