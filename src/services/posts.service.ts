import apiClient from "./axiosInstance";
import {
  PostAttributes,
  PostDTOAttributes,
} from "src/interfaces/post.interface";

const baseUrl = "/post";

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
};
