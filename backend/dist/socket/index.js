"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = exports.io = void 0;
const socket_io_1 = require("socket.io");
const initSocket = (server) => {
    exports.io = new socket_io_1.Server(server, {
        cors: { origin: true, credentials: true },
    });
    exports.io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId)
            socket.join(userId);
    });
};
exports.initSocket = initSocket;
