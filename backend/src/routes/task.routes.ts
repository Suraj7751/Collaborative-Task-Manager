import { Router } from "express";
import {
  createTask,
  updateTask,
  getCreatedTasks,
  getAssignedTasks,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);

// ✅ ADD THESE
router.get("/created", authMiddleware, getCreatedTasks);
router.get("/assigned", authMiddleware, getAssignedTasks);

export default router;
