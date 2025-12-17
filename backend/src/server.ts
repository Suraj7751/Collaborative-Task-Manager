import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import "dotenv/config";


const server = http.createServer(app);
initSocket(server);

server.listen(4000, () =>
  console.log("Backend running on port 4000")
);
