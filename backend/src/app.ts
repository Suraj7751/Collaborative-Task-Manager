import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

/**
 * ✅ REQUIRED FOR RENDER / HTTPS COOKIES
 */
app.set("trust proxy", 1);

/**
 * ✅ CORS CONFIG (DO NOT USE "*")
 */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://collaborative-task-manager-pukb.vercel.app",
    ],
    credentials: true,
  })
);

/**
 * ✅ MIDDLEWARE ORDER MATTERS
 */
app.use(express.json());
app.use(cookieParser());

/**
 * ✅ ROUTES
 */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

/**
 * ✅ ERROR HANDLER (LAST)
 */
app.use(errorHandler);

export default app;
