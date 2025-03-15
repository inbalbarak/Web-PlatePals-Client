import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";

const baseUrl = "/users";

export default {
  getById: async (userId: string) =>
    (await apiClient.get<UserAttributes>(`${baseUrl}/${userId}`)).data,
  upsert: async (_id: string, username: string) =>
    (await apiClient.put(baseUrl, { _id, username })).data,
  updateSavedPosts: async (userId: string, postId: string, toSave: boolean) =>
    (
      await apiClient.put(`${baseUrl}/saved-posts/${userId}`, {
        postId,
        toSave,
      })
    ).data,
};
