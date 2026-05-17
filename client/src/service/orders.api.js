import api from "../api/axios";

export const orderProduct = async (payload) => {
  try {
    const response = await api.post("/orders/create-order", payload);
    return response;
  } catch (error) {
    const message = error?.message || "Something error occured";
    throw new Error(message, { cause: error });
  }
};

export const getMyOrder = async () => {
  try {
    const response = await api.get("/orders/my-orders");
    return response;
  } catch (error) {
    const message = error?.message || "Something error occured";
    throw new Error(message, { cause: error });
  }
};

export const getMyOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response;
  } catch (error) {
    const message = error?.message || "Something error occured";
    throw new Error(message, { cause: error });
  }
};

export const initPaymentApi = async (orderId) => {
  const response = await api.post("/v1/payment/init", { orderId });
  return response;
};
