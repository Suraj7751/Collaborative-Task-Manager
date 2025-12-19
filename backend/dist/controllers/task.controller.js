"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedTasks = exports.getCreatedTasks = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const task_dto_1 = require("../dtos/task.dto");
const task_service_1 = require("../services/task.service");
// CREATE
const createTask = async (req, res) => {
    const payload = task_dto_1.createTaskDto.parse(req.body);
    const task = await task_service_1.taskService.createTask(payload, req.user.id);
    res.status(201).json(task);
};
exports.createTask = createTask;
// UPDATE
const updateTask = async (req, res) => {
    const payload = task_dto_1.updateTaskDto.parse(req.body);
    const task = await task_service_1.taskService.updateTask(req.params.id, payload, req.user);
    res.json(task);
};
exports.updateTask = updateTask;
// DELETE
const deleteTask = async (req, res) => {
    await task_service_1.taskService.deleteTask(req.params.id, req.user);
    res.json({ success: true });
};
exports.deleteTask = deleteTask;
// ✅ CREATED BY USER (FIXED NAME)
const getCreatedTasks = async (req, res) => {
    const tasks = await task_service_1.taskService.getCreatedTasks(req.user.id);
    res.json(tasks);
};
exports.getCreatedTasks = getCreatedTasks;
// ✅ ASSIGNED TO USER (FIXED NAME)
const getAssignedTasks = async (req, res) => {
    const tasks = await task_service_1.taskService.getAssignedTasks(req.user.id);
    res.json(tasks);
};
exports.getAssignedTasks = getAssignedTasks;
