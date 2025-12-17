import { prisma } from "../config/prisma";

export const taskService = {
  createTask: (payload: any, creatorId: string) => {
    return prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        priority: payload.priority,
        status: payload.status,
        creatorId,
        assignedToId: payload.assignedToId,
      },
    });
  },

  updateTask: (taskId: string, payload: any) => {
    return prisma.task.update({
      where: { id: taskId },
      data: payload,
    });
  },

  getTasksCreatedByUser: (userId: string) => {
    return prisma.task.findMany({
      where: { creatorId: userId },
      orderBy: { createdAt: "desc" },
    });
  },

  getTasksAssignedToUser: (userId: string) => {
    return prisma.task.findMany({
      where: { assignedToId: userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
