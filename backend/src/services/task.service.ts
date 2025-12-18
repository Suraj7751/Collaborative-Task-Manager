import { prisma } from "../config/prisma";
import { getIO } from "../socket";

export const taskService = {
  /* =====================
     CREATE TASK
  ===================== */
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

    // 🔴 REAL-TIME EVENT
    getIO().emit("task:created", task);

    return task;
  },

  /* =====================
     UPDATE TASK
  ===================== */
  updateTask: async (taskId: string, payload: any) => {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(payload.status && { status: payload.status }),
        ...(payload.priority && { priority: payload.priority }),
        ...(payload.assignedToId && {
          assignedToId: payload.assignedToId,
        }),
      },
    });

    // 🔴 REAL-TIME EVENT
    getIO().emit("task:updated", task);

    return task;
  },

  /* =====================
     DELETE TASK (SECURE)
  ===================== */
  deleteTask: async (taskId: string, userId: string) => {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.creatorId !== userId) {
      throw new Error("You are not allowed to delete this task");
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    // 🔴 REAL-TIME EVENT
    getIO().emit("task:deleted", taskId);

    return { success: true };
  },

  /* =====================
     TASKS CREATED BY USER
  ===================== */
  getTasksCreatedByUser: async (userId: string) => {
    return prisma.task.findMany({
      where: { creatorId: userId },
      orderBy: { createdAt: "desc" },
    });
  },

  /* =====================
     TASKS ASSIGNED TO USER
  ===================== */
  getTasksAssignedToUser: async (userId: string) => {
    return prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
