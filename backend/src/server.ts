import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// ✅ MUST be called before services emit events
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
