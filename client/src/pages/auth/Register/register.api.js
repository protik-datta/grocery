import api from "../../../api/axios";

export const registerUser = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || error.message;
    throw new Error(message, { cause: error })
  }
};
