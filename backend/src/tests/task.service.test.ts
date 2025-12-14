import { taskService } from "../src/services/task.service";

describe("Task Service", () => {
  it("should create a task", async () => {
    const task = await taskService.createTask(
      {
        title: "Test Task",
        description: "Testing",
        dueDate: new Date().toISOString(),
        priority: "LOW",
        assignedToId: "user-id",
      },
      "creator-id"
    );

    expect(task.title).toBe("Test Task");
  });
});
