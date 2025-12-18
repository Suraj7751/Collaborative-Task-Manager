import { z } from "zod";

export const registerDto = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  // ✅ accepts numbers + normal emails
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginDto = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});
