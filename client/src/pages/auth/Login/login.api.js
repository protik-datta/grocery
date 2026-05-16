import api from "../../../api/axios";

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    const message = error?.message || 'Login failed'
    throw new Error(message, { cause: error })
  }
};
