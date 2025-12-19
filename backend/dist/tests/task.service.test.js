"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../src/services/task.service");
describe("Task Service", () => {
    it("should create a task", async () => {
        const task = await task_service_1.taskService.createTask({
            title: "Test Task",
            description: "Testing",
            dueDate: new Date().toISOString(),
            priority: "LOW",
            assignedToId: "user-id",
        }, "creator-id");
        expect(task.title).toBe("Test Task");
    });
});
