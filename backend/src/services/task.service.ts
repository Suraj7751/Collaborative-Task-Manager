import { prisma } from "../config/prisma";

export const taskService = {
  /* =====================
     CREATE TASK
  ===================== */
  createTask: async (payload: any, creatorId: string) => {
    return prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
        dueDate: new Date(payload.dueDate), // ✅ convert
        priority: payload.priority,
        status: "TODO", // ✅ default
        creatorId,
        assignedToId: payload.assignedToId ?? creatorId,
      },
    });
  },

  /* =====================
     UPDATE TASK
  ===================== */
  updateTask: async (taskId: string, payload: any) => {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        ...(payload.status && { status: payload.status }),
        ...(payload.priority && { priority: payload.priority }),
        ...(payload.assignedToId && {
          assignedToId: payload.assignedToId,
        }),
      },
    });
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

    return prisma.task.delete({
      where: { id: taskId },
    });
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
