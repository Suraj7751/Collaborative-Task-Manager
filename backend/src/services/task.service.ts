import { prisma } from "../config/prisma";
import { getIO } from "../socket";

/* =====================
   TASK SERVICE
===================== */

export const taskService = {
  // CREATE
  createTask: async (payload: any, creatorId: string) => {
    const task = await prisma.task.create({
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

    getIO().emit("task:created", task);
    return task;
  },

  // UPDATE
  updateTask: async (taskId: string, payload: any, user: any) => {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new Error("Task not found");

    if (
      task.creatorId !== user.id &&
      task.assignedToId !== user.id &&
      user.role !== "ADMIN"
    ) {
      throw new Error("Not authorized");
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: payload,
    });

    getIO().emit("task:updated", updated);
    return updated;
  },

  // DELETE (CREATOR OR ADMIN ONLY)
  deleteTask: async (taskId: string, user: any) => {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new Error("Task not found");

    if (task.creatorId !== user.id && user.role !== "ADMIN") {
      throw new Error("Not allowed");
    }

    await prisma.task.delete({ where: { id: taskId } });

    getIO().emit("task:deleted", taskId);
  },

  // CREATED BY USER
  getCreatedTasks: (userId: string) =>
    prisma.task.findMany({
      where: { creatorId: userId },
      orderBy: { createdAt: "desc" },
    }),

  // ASSIGNED TO USER
  getAssignedTasks: (userId: string) =>
    prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { createdAt: "desc" },
    }),
};
