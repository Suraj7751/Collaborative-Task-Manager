import { api } from "./axios";

/* =====================
   AUTH APIs
===================== */

// Register
export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

// Login
export const loginUser = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/auth/login", data);
};

// Get logged-in user
export const getMe = () => {
  return api.get("/auth/me");
};

// ✅ Logout (STEP 4)
export const logoutUser = () => {
  return api.post("/auth/logout");
};
