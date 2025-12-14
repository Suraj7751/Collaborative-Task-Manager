import { Server } from "socket.io";

export let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: { origin: true, credentials: true },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    if (userId) socket.join(userId);
  });
};
