import apiClient from "./axiosInstance";

export const createUser = async (user: {
  username: string;
  password: string;
}) => {
  return await apiClient.post("/users", { user });
};
