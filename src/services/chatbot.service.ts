import { ChatMessage } from "pages/chatbot/chatbot";
import apiClient from "./axiosInstance";

const baseUrl = "/chatbot";

export default {
  getBotResponse: async (messages: ChatMessage[]): Promise<ChatMessage> => {
    const { data } = await apiClient.post(baseUrl, messages);
    return data.message;
  },
};
