import apiClient from "./axiosInstance";
import { PostAttributes } from "src/interfaces/post.interface";

const baseUrl = "/post";

export default {
  upsert: async (post: PostAttributes) => {
    return post._id
      ? await apiClient.put(baseUrl, post)
      : await apiClient.post(baseUrl, post);
  },
  getAll: async (): Promise<PostAttributes[]> => {
    const { data } = await apiClient.get(baseUrl);
    return data;
  },
  getByAuthor: async (userId: string) => {
    const { data } = await apiClient.get(`${baseUrl}/author/${userId}`);
    return data;
  },
  delete: async (postId: string) => {
    await apiClient.delete(`${baseUrl}/${postId}`);
  },
};
