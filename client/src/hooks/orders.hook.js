import { useMutation, useQuery } from "@tanstack/react-query";
import useCartStore from "../store/cartStore";
import {
  getMyOrder,
  getMyOrderById,
  initPaymentApi,
  orderProduct,
} from "../service/orders.api";
import { showError } from "../utils/toast";

export const useOrderMutation = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  return useMutation({
    mutationFn: async (payload) => {
      const orderRes = await orderProduct(payload);
      const orderId = orderRes?.data._id;

      if (!orderId) throw new Error("Order creation failed");

      if (payload.paymentMethod === "card") {
        try {
          const paymentRes = await initPaymentApi(orderId);
          if (paymentRes?.url) {
            return { type: "card", url: paymentRes.url };
          } else {
            throw { message: "Order created but Payment failed", orderId };
          }
        } catch (err) {
          throw {
            message: err.message || "Payment initiation failed",
            orderId: err.orderId || orderId,
          };
        }
      }

      return { type: "cash", orderId };
    },

    onSuccess: (data) => {
      clearCart();
      if (data.type === "card" && data.url) {
        window.location.href = data.url;
      } else if (data.type === "cash") {
        window.location.href = `/orders/${data?.orderId}`;
      }
    },

    onError: (error) => {
      if (error.orderId) {
        showError(`${error.message}. Redirecting to your orders...`);
        setTimeout(() => {
          window.location.href = `/payment/success?orderId=${error.orderId}&status=failed`;
        }, 2000);
      } else {
        showError(error.message || "Something went wrong");
      }
    },

    retry: 0,
  });
};

export const useRetryPayment = () => {
  return useMutation({
    mutationFn: async (orderId) => {
      const paymentRes = await initPaymentApi(orderId);
      if (paymentRes?.url) {
        return paymentRes.url;
      }
      throw new Error("Payment initiation failed");
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: () => {
      showError("Payment initiation failed. Please try again.");
    },
  });
};

export const useMyOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrder,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyOrdersById = (id) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getMyOrderById(id),
    enabled: !!id,
  });
};
