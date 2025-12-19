"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_repo_1 = require("../repositories/user.repo");
const jwt_1 = require("../utils/jwt");
exports.authService = {
    register: async (data) => {
        const existing = await user_repo_1.userRepo.findByEmail(data.email);
        if (existing) {
            throw new Error("User already exists");
        }
        const hashed = await bcryptjs_1.default.hash(data.password, 10);
        const user = await user_repo_1.userRepo.createUser({
            ...data,
            password: hashed,
        });
        const token = (0, jwt_1.signToken)({ id: user.id, email: user.email });
        return { user, token };
    },
    login: async (data) => {
        const user = await user_repo_1.userRepo.findByEmail(data.email);
        if (!user)
            throw new Error("Invalid credentials");
        const match = await bcryptjs_1.default.compare(data.password, user.password);
        if (!match)
            throw new Error("Invalid credentials");
        const token = (0, jwt_1.signToken)({ id: user.id, email: user.email });
        return { user, token };
    },
};
