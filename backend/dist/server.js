"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./socket");
require("dotenv/config");
const server = http_1.default.createServer(app_1.default);
(0, socket_1.initSocket)(server);
server.listen(4000, () => {
    console.log("🚀 Backend running on port 4000");
});
