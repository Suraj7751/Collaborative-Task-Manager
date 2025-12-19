"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskDto = exports.createTaskDto = void 0;
const zod_1 = require("zod");
exports.createTaskDto = zod_1.z.object({
    title: zod_1.z.string().max(100),
    description: zod_1.z.string(),
    dueDate: zod_1.z.string(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
    assignedToId: zod_1.z.string(),
});
exports.updateTaskDto = zod_1.z.object({
    status: zod_1.z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]).optional(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    assignedToId: zod_1.z.string().optional(),
});
