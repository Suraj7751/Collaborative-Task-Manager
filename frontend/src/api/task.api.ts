import { api } from "./axios";

const taskApi = {
  getCreatedTasks: () => api.get("/tasks/created"),
  getAssignedTasks: () => api.get("/tasks/assigned"),

  createTask: (data: any) =>
    api.post("/tasks", data),

  updateTask: (id: string, data: any) =>
    api.put(`/tasks/${id}`, data),

  // ✅ ADD THIS
  deleteTask: (id: string) =>
    api.delete(`/tasks/${id}`),
};

export default taskApi;
