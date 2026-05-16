import api from "../api/axios";

export const orderProduct = async (payload) => {
  try {
    const response = await api.post("/orders/create-order", JSON.stringify(payload));
    return response;
  } catch (error) {
    const message = error?.message;
    throw new Error(message, { cause: error });
  }
};

export const initPaymentApi = async (orderId) => {
  const response = await api.post("/v1/payment/init", { orderId });
  return response;
};
