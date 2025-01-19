import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";

const baseUrl = "/users";

export default {
  getUserById: async (id: string): Promise<UserAttributes> => {
    const { data } = await apiClient.get(`${baseUrl}/${id}`);
    return data;
  },
};
