import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { showError, showSuccess } from "../utils/toast";

const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout", { _isLogout: true });
    return res;
  } catch (error) {
    showError(error.message || "Logout failed");
    throw error;
  }
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], null);
      queryClient.removeQueries({ queryKey: ["me"] });
      showSuccess(data?.message)
    },
  });
};
