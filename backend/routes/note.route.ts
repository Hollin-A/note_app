import { Router, Request, Response } from "express";
import {
  getNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";

const router: Router = Router();

router.post("/", addNote);

router.get("/", getNotes);

router.get("/:id", getNote);

router.patch("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
