import {
  CommentAttributes,
  CommentDTOAttributes,
} from "src/interfaces/comment.interface";
import apiClient from "./axiosInstance";

const baseUrl = "/comments";

export default {
  create: async (
    comment: CommentDTOAttributes
  ): Promise<{
    comment: CommentAttributes;
    updatedAverageRating: number;
  }> => {
    const { data } = await apiClient.post(baseUrl, comment);
    return data;
  },

  getByPostId: async (id: string): Promise<CommentAttributes[]> => {
    const { data } = await apiClient.get(`${baseUrl}/post/${id}`);
    return data;
  },

  getByPostIdUserId: async (
    postId: string,
    userId: string
  ): Promise<CommentAttributes[]> => {
    const { data } = await apiClient.get(
      `${baseUrl}/post/${postId}/user/${userId}`
    );
    return data;
  },
};
