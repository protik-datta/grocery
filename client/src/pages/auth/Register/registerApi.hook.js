import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../../utils/toast";
import { registerUser } from "./registerApi";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      showSuccess(data?.message);
    },
    onError: (error) => {
      showError(error?.message || "Registration failed");
    },
  });
};
