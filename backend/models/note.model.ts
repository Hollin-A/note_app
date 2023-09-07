import { model, Schema, Model, Document } from "mongoose";

export interface Note extends Document {
  title: string;
  content: string;
  createDate: Date;
  updatedDate: Date;
  // createdBy: string;
  timestamps?: {};
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  // createdBy: { type: String, required: false },
  timestamps: { createDate: Date, updatedDate: Date },
});

export const NoteModel: Model<Note> = model<Note>("notes", NoteSchema);
