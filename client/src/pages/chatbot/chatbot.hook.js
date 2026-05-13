import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChatMessage } from "./chatbotApi";
import { showError } from '../../utils/toast';

export const useChatbot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => {
      console.log("Chat Response:", data);
    },
    onError: (error) => {
      showError(
        error?.message ||
          "Something went wrong with the chatbot",
      );
    },
  });
};
