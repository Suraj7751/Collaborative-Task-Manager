import { api } from "./axios";

const userApi = {
  getUsers: () => api.get("/users"),
};

export default userApi;
