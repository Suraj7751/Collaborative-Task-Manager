import { Router } from "express";
import { createTask, updateTask } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);

export default router;
