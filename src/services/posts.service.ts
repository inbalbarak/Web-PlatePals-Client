import apiClient from "./axiosInstance";
import {
  PostAttributes,
  PostDTOAttributes,
} from "src/interfaces/post.interface";

const baseUrl = "/posts";

export default {
  upsert: async (post: PostDTOAttributes) => {
    return post._id
      ? await apiClient.put(baseUrl, post)
      : await apiClient.post(baseUrl, post);
  },
  getAll: async (): Promise<PostAttributes[]> => {
    const { data } = await apiClient.get(baseUrl);
    return data;
  },
  getByIds: async (ids: string[]): Promise<PostAttributes[]> => {
    const { data } = await apiClient.post(`${baseUrl}/ids`, { ids });
    return data;
  },
  getByAuthor: async () => {
    const { data } = await apiClient.get(`${baseUrl}/user/`);
    return data;
  },
  delete: async (postId: string) => {
    await apiClient.delete(`${baseUrl}/${postId}`);
  },
};
