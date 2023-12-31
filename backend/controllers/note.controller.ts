import { Response, Request } from "express";
import { INote } from "../types/note";
import { NoteModel } from "../models/note.model";
import { IUser } from "../types/user";

const getNotes = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as IUser;

  try {
    const notes: INote[] = await NoteModel.find({ createdBy: user._id }).sort({
      updatedDate: -1,
    });
    res.status(200).json({ notes });
  } catch (error) {
    throw error;
  }
};

const getNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note: INote | null = await NoteModel.findById(req.params.id);
    res.status(200).json({ note });
  } catch (error) {
    throw error;
  }
};

const addNote = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as IUser;

  try {
    const body = req.body as Pick<INote, "title" | "content" | "category">;

    const note: INote = new NoteModel({
      title: body.title,
      content: body.content,
      category: body.category,
      createdBy: user._id,
      createDate: new Date(),
      updatedDate: new Date(),
    });

    const newNote: INote = await note.save();

    res.status(201).json({ message: "Note added", note: newNote });
  } catch (error) {
    throw error;
  }
};

const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updatedNote = {
      title: body.title,
      content: body.content,
      createDate: body.createDate,
      updatedDate: new Date(),
    };

    const updateNote: INote | null = await NoteModel.findByIdAndUpdate(
      id,
      updatedNote,
      { new: true }
    );
    res.status(200).json({
      message: "Note updated",
      note: updateNote,
    });
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedNote: INote | null = await NoteModel.findByIdAndRemove(
      req.params.id
    );
    res.status(200).json({
      message: "Note deleted",
      note: deletedNote,
    });
  } catch (error) {
    throw error;
  }
};

export { getNotes, getNote, addNote, updateNote, deleteNote };
