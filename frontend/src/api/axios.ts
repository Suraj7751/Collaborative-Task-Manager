import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://collaborative-task-manager-dx7z.onrender.com/api"
      : "http://localhost:4000/api",
  withCredentials: true,
});
