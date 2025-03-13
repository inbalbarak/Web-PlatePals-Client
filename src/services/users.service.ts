import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";

const userPrefix = "/users";

export default {
  getById: async (userId: string) =>
    (await apiClient.get<UserAttributes>(`${userPrefix}/${userId}`)).data,
  upsert: async (_id: string, username: string, imageUrl?: string) =>
    (
      await apiClient.put(userPrefix, {
        _id,
        username,
        ...(imageUrl && { imageUrl }),
      })
    ).data,
};
