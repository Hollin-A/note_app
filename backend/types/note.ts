import { Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  createDate: Date;
  updatedDate: Date;
  createdBy: string;
  timestamps?: {};
}
