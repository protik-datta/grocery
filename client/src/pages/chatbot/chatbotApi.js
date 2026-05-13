import api from "../../api/axios";

export const sendChatMessage = async (messageText) => {
  try {
    const response = await api.post("/chat", { message: messageText });
    return response.data;
  } catch (error) {
    throw new error();
  }
};
