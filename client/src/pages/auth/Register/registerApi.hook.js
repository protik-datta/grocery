import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../utils/toast";
import { registerUser } from "./register.api";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      showSuccess(data?.message || "Registration Successful!");
    },
    onError: (error) => {
      showError(error?.message);
    },
    retry: 0,
  });
};
