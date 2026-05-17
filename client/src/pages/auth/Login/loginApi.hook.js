import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError } from "../../../utils/toast";
import { loginUser } from "./login.api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      showError(error?.message || "Login failed");
    },
  });
};
