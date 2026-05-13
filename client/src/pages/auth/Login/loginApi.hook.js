import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from './LoginApi';
import { showError } from '../../../utils/toast';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["me"]})
      console.log(data)
    },
    onError: (error) => {
      showError(error?.message || "Login failed");
    },
  })
};
