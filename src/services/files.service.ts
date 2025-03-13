import apiClient from "./axiosInstance";

const baseUrl = "/files";

export default {
  uploadImg: async (file: File) => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);

      try {
        const res = await apiClient.post(`${baseUrl}?file=123.jpeg`, formData, {
          headers: {
            "Content-Type": "image/jpeg",
          },
        });
        const url: string = res.data.url;
        return url;
      } catch (err) {
        console.log(err);
        return;
      }
    }

    return;
  },
};
