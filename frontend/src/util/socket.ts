import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? "https://collaborative-task-manager-dx7z.onrender.com"
    : "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"], // ✅ important for Render
});
