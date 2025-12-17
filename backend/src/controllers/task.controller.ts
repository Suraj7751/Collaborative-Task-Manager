import { Request, Response } from "express";
import { createTaskDto, updateTaskDto } from "../dtos/task.dto";
import { taskService } from "../services/task.service";

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  const payload = createTaskDto.parse(req.body);
  const task = await taskService.createTask(payload, req.user.id);
  res.status(201).json(task);
};

// UPDATE TASK
export const updateTask = async (req: Request, res: Response) => {
  const payload = updateTaskDto.parse(req.body);
  const task = await taskService.updateTask(req.params.id, payload);
  res.json(task);
};

// ✅ GET TASKS CREATED BY LOGGED-IN USER
export const getCreatedTasks = async (req: any, res: Response) => {
  const tasks = await taskService.getTasksCreatedByUser(req.user.id);
  res.json(tasks);
};

// ✅ GET TASKS ASSIGNED TO LOGGED-IN USER
export const getAssignedTasks = async (req: any, res: Response) => {
  const tasks = await taskService.getTasksAssignedToUser(req.user.id);
  res.json(tasks);
};
