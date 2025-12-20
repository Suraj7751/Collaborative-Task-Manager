import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://collaborative-task-manager-pukb.vercel.app"
  ],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);


app.use(errorHandler);

export default app;
