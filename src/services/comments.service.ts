import { CommentDTOAttributes } from "src/interfaces/comment.interface";
import apiClient from "./axiosInstance";
import { PostAttributes } from "src/interfaces/post.interface";

const baseUrl = "/comments";

export default {
  create: async (comment: CommentDTOAttributes) => {
    return await apiClient.post(baseUrl, comment);
  },

  getByPostId: async (id: string): Promise<PostAttributes[]> => {
    const { data } = await apiClient.get(`${baseUrl}/post/${id}`);
    return data;
  },

  getByPostIdUserId: async (
    postId: string,
    userId: string
  ): Promise<PostAttributes[]> => {
    const { data } = await apiClient.get(
      `${baseUrl}/post/${postId}/user/${userId}`
    );
    return data;
  },
};
