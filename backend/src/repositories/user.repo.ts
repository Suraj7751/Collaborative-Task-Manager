import { prisma } from "../prisma";

export const userRepo = {
  create: (data: any) =>
    prisma.user.create({ data }),

  findByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  findById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),

  update: (id: string, data: any) =>
    prisma.user.update({ where: { id }, data }),
};
