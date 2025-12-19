"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const prisma_1 = require("../config/prisma");
const getUsers = async (_req, res) => {
    const users = await prisma_1.prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    res.json(users);
};
exports.getUsers = getUsers;
