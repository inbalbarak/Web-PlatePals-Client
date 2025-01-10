import apiClient from "./axiosInstance";
import { PostAttributes } from "src/interfaces/post.interface";

export const upsert = async (post: PostAttributes) => {
  return post._id
    ? await apiClient.put("/post", post)
    : await apiClient.post("/post", post);
};
