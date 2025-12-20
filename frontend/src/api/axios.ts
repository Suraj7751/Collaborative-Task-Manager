import axios from "axios";

export const api = axios.create({
  baseURL: "https://collaborative-task-manager-dx7z.onrender.com",
  withCredentials: true,
});
