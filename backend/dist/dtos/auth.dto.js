"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDto = exports.registerDto = void 0;
const zod_1 = require("zod");
exports.registerDto = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    // ✅ accepts numbers + normal emails
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
exports.loginDto = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
});
