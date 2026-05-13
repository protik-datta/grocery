import api from "../../../api/axios";

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    throw new error();
  }
};
