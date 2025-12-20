import { io } from "socket.io-client";

export const socket = io(
  "https://collaborative-task-manager-dx7z.onrender.com",
  {
    withCredentials: true,
    transports: ["websocket"],
  }
);
