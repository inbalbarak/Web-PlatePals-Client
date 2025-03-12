import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";

const userPrefix = "/users";

export default {
  getById: async (userId: string) =>
    (await apiClient.get<UserAttributes>(`${userPrefix}/${userId}`)).data,
  upsert: async (_id: string, username: string) =>
    (await apiClient.put(userPrefix, { _id, username })).data,
  updateSavedPosts: async (userId: string, postId: string, toSave: boolean) =>
    (
      await apiClient.put(`${userPrefix}/${userId}/saved-posts`, {
        postId,
        toSave,
      })
    ).data,
};
