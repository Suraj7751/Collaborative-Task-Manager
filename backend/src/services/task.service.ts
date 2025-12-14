import { taskRepo } from "../repositories/task.repo";
import { io } from "../socket";

export const taskService = {
  createTask: async (payload: any, creatorId: string) => {
    const task = await taskRepo.create({
      ...payload,
      creatorId,
      status: "TODO",
      dueDate: new Date(payload.dueDate),
    });

    io.emit("task:created", task);
    return task;
  },

  updateTask: async (id: string, payload: any) => {
    const task = await taskRepo.update(id, payload);

    io.emit("task:updated", task);

    if (payload.assignedToId) {
      io.to(payload.assignedToId).emit("task:assigned", task);
    }

    return task;
  },
};
