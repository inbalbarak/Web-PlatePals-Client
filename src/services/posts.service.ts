import apiClient from "./axiosInstance";
import { PostAttributes } from "src/interfaces/post.interface";

const prefix = "/posts";

export default {
  upsert: async (post: PostAttributes) => {
    return post._id
      ? await apiClient.put(prefix, post)
      : await apiClient.post(prefix, post);
  },
  getByAuthor: async (userId: string) => {
    return (await apiClient.get(`${prefix}/author/${userId}`)).data;
  },
};
