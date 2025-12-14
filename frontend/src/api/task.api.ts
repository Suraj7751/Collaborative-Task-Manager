import { api } from "./axios";

export const fetchTasks = () =>
  api.get("/tasks");

export const createTask = (data: any) =>
  api.post("/tasks", data);

export const updateTask = ({ id, data }: any) =>
  api.put(`/tasks/${id}`, data);
