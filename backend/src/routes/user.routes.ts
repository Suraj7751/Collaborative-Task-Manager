import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getUsers } from "../controllers/user.controller";

const router = Router();

// GET all users (for task assignment)
router.get("/", authMiddleware, getUsers);

export default router;
