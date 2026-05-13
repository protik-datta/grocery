import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));

export const useAuth = () => {
  const { setUser, clearAuth, user } = useUserStore();

  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/me");
        const userData = response?.data?.data || response?.data;
        if (userData) {
          setUser(userData);
        }
        return userData;
      } catch (error) {
        clearAuth();
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: user || query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    logout: clearAuth,
    ...query,
  };
};

export default useUserStore;
