import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  res.json(users);
};
