import { z } from "zod";


export const createTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),        // ✅ optional
  dueDate: z.string(),                       // ISO date string
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assignedToId: z.string().optional(),       // ✅ FIX
});


export const updateTaskDto = z.object({
  status: z
    .enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"])
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH", "URGENT"])
    .optional(),

  assignedToId: z.string().optional(),
});
