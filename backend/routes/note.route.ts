import { Router } from "express";
import {
  getNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";
import { authenticateJWT } from "../middleware/userAuth";

const router: Router = Router();

router.use(authenticateJWT);

router.post("/", addNote);

router.get("/", getNotes);

router.get("/:id", getNote);

router.patch("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
