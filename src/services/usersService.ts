import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";

export const createUser = async (user: UserAttributes) => {
  return await apiClient.post("/users", user);
};
