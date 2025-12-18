import { Response, NextFunction } from "express";

export const adminOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
