import express, { Router } from "express";

import { registerUser, authenticateUser } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", authenticateUser);

export default router;
