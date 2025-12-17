import { Router } from "express";
import {
  createTask,
  updateTask,
  getCreatedTasks,
  getAssignedTasks,
  deleteTask,               // ✅ ADD
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask); // ✅ ADD

router.get("/created", authMiddleware, getCreatedTasks);
router.get("/assigned", authMiddleware, getAssignedTasks);

export default router;
