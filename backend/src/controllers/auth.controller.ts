import { Request, Response } from "express";
import { registerDto, loginDto } from "../dtos/auth.dto";
import { authService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const payload = registerDto.parse(req.body);
  const { user, token } = await authService.register(payload);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,     // ✅ localhost
    sameSite: "lax",   // ✅ localhost
  });

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const payload = loginDto.parse(req.body);
  const { user, token } = await authService.login(payload);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,     // ✅ localhost
    sameSite: "lax",   // ✅ localhost
  });

  res.json(user);
};

export const me = async (req: any, res: Response) => {
  res.json(req.user);
};
