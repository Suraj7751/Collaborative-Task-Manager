"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.logout = exports.login = exports.register = void 0;
const auth_dto_1 = require("../dtos/auth.dto");
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    const payload = auth_dto_1.registerDto.parse(req.body);
    const { user, token } = await auth_service_1.authService.register(payload);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ localhost
        sameSite: "lax", // ✅ localhost
    });
    res.status(201).json(user);
};
exports.register = register;
const login = async (req, res) => {
    const payload = auth_dto_1.loginDto.parse(req.body);
    const { user, token } = await auth_service_1.authService.login(payload);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ localhost
        sameSite: "lax", // ✅ localhost
    });
    res.json(user);
};
exports.login = login;
const logout = async (_req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.json({ message: "Logged out successfully" });
};
exports.logout = logout;
const me = async (req, res) => {
    res.json(req.user);
};
exports.me = me;
