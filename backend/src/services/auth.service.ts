import bcrypt from "bcryptjs";
import { userRepo } from "../repositories/user.repo";
import { signToken } from "../utils/jwt";

export const authService = {
  register: async (data: any) => {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await userRepo.create({
      ...data,
      password: hashed,
    });

    const token = signToken({ id: user.id, email: user.email });

    return { user, token };
  },

  login: async (data: any) => {
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = signToken({ id: user.id, email: user.email });

    return { user, token };
  },
};
