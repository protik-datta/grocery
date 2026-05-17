import api from "../../../api/axios";

export const registerUser = async (payload) => {
  try {
    const response = await api.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    const message = error?.message || "User registration error";
    throw new Error(message, { cause: error });
  }
};
