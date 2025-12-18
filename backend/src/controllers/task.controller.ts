import { Request, Response } from "express";
import { createTaskDto, updateTaskDto } from "../dtos/task.dto";
import { taskService } from "../services/task.service";

// CREATE
export const createTask = async (req: any, res: Response) => {
  const payload = createTaskDto.parse(req.body);
  const task = await taskService.createTask(payload, req.user.id);
  res.status(201).json(task);
};

// UPDATE
export const updateTask = async (req: any, res: Response) => {
  const payload = updateTaskDto.parse(req.body);
  const task = await taskService.updateTask(
    req.params.id,
    payload,
    req.user
  );
  res.json(task);
};

// DELETE
export const deleteTask = async (req: any, res: Response) => {
  await taskService.deleteTask(req.params.id, req.user);
  res.json({ success: true });
};

// ✅ CREATED BY USER (FIXED NAME)
export const getCreatedTasks = async (req: any, res: Response) => {
  const tasks = await taskService.getCreatedTasks(req.user.id);
  res.json(tasks);
};

// ✅ ASSIGNED TO USER (FIXED NAME)
export const getAssignedTasks = async (req: any, res: Response) => {
  const tasks = await taskService.getAssignedTasks(req.user.id);
  res.json(tasks);
};
