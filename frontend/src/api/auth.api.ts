import { api } from "./axios";



export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/api/auth/register", data);
};

// Login
export const loginUser = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/api/auth/login", data);
};

// Get logged-in user
export const getMe = () => {
  return api.get("/api/auth/me");
};

// Logout
export const logoutUser = () => {
  return api.post("/api/auth/logout");
};
