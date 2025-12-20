import { Request, Response } from "express";
import { registerDto, loginDto } from "../dtos/auth.dto";
import { authService } from "../services/auth.service";

// Detect production (Render)
const isProd = process.env.NODE_ENV === "production";

export const register = async (req: Request, res: Response) => {
  const payload = registerDto.parse(req.body);
  const { user, token } = await authService.register(payload);

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,                 // ✅ true on Render
    sameSite: isProd ? "none" : "lax",
  });

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const payload = loginDto.parse(req.body);
  const { user, token } = await authService.login(payload);

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,                 // ✅ true on Render
    sameSite: isProd ? "none" : "lax",
  });

  res.json(user);
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  res.json({ message: "Logged out successfully" });
};

export const me = async (req: any, res: Response) => {
  res.json(req.user);
};
