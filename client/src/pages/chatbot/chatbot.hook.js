import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "./chatbotApi";
import { showError } from '../../utils/toast';

export const useChatbot = () => {
  return useMutation({
    mutationFn: sendChatMessage,
    onError: (error) => {
      showError(
        error?.message ||
          "Something went wrong with the chatbot",
      );
    },
  });
};
