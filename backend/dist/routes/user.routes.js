"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// GET all users (for task assignment)
router.get("/", auth_middleware_1.authMiddleware, user_controller_1.getUsers);
exports.default = router;
