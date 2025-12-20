import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import "dotenv/config";

/**
 * ✅ USE PORT FROM ENV (RENDER REQUIREMENT)
 */
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

/**
 * ✅ INIT SOCKET.IO WITH SAME SERVER
 */
initSocket(server);

/**
 * ✅ START SERVER
 */
server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
