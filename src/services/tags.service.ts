import apiClient from "./axiosInstance";

export interface TagAttributes {
  name: string;
  _id: string;
}

export default {
  getAll: async () => {
    return (await apiClient.get<TagAttributes[]>("/tags")).data;
  },
};
