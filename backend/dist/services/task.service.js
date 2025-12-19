"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const prisma_1 = require("../config/prisma");
const socket_1 = require("../socket");
/* =====================
   TASK SERVICE
===================== */
exports.taskService = {
    // CREATE
    createTask: async (payload, creatorId) => {
        const task = await prisma_1.prisma.task.create({
            data: {
                title: payload.title,
                description: payload.description,
                dueDate: new Date(payload.dueDate),
                priority: payload.priority,
                status: "TODO",
                creatorId,
                assignedToId: payload.assignedToId ?? creatorId,
            },
        });
        (0, socket_1.getIO)().emit("task:created", task);
        return task;
    },
    // UPDATE
    updateTask: async (taskId, payload, user) => {
        const task = await prisma_1.prisma.task.findUnique({ where: { id: taskId } });
        if (!task)
            throw new Error("Task not found");
        if (task.creatorId !== user.id &&
            task.assignedToId !== user.id &&
            user.role !== "ADMIN") {
            throw new Error("Not authorized");
        }
        const updated = await prisma_1.prisma.task.update({
            where: { id: taskId },
            data: payload,
        });
        (0, socket_1.getIO)().emit("task:updated", updated);
        return updated;
    },
    // DELETE (CREATOR OR ADMIN ONLY)
    deleteTask: async (taskId, user) => {
        const task = await prisma_1.prisma.task.findUnique({ where: { id: taskId } });
        if (!task)
            throw new Error("Task not found");
        if (task.creatorId !== user.id && user.role !== "ADMIN") {
            throw new Error("Not allowed");
        }
        await prisma_1.prisma.task.delete({ where: { id: taskId } });
        (0, socket_1.getIO)().emit("task:deleted", taskId);
    },
    // CREATED BY USER
    getCreatedTasks: (userId) => prisma_1.prisma.task.findMany({
        where: { creatorId: userId },
        orderBy: { createdAt: "desc" },
    }),
    // ASSIGNED TO USER
    getAssignedTasks: (userId) => prisma_1.prisma.task.findMany({
        where: { assignedToId: userId },
        orderBy: { createdAt: "desc" },
    }),
};
