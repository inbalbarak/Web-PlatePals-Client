import apiClient from "./axiosInstance";
import { PostAttributes } from "src/interfaces/post.interface";

const baseUrl = "/posts";

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
};
