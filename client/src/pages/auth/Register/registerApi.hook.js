import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError } from "../../../utils/toast";
import { registerUser } from "./register.api";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      showError(error?.message);
    },
    retry: 0,
  });
};
