import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Note added successfully" });
});

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "get notes" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ message: "get note" });
});

router.put("/:id", (req: Request, res: Response) => {
  res.json({ message: "get note" });
});

router.delete("/:id", (req: Request, res: Response) => {
  res.json({ message: "get note" });
});

export default router;
