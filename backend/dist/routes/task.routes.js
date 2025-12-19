"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, task_controller_1.createTask);
router.put("/:id", auth_middleware_1.authMiddleware, task_controller_1.updateTask);
router.delete("/:id", auth_middleware_1.authMiddleware, task_controller_1.deleteTask); // ✅ ADD
router.get("/created", auth_middleware_1.authMiddleware, task_controller_1.getCreatedTasks);
router.get("/assigned", auth_middleware_1.authMiddleware, task_controller_1.getAssignedTasks);
exports.default = router;
