import { useMutation } from '@tanstack/react-query';
import useCartStore from '../store/cartStore';
import { initPaymentApi, orderProduct } from '../service/orders.api';
import { showError } from '../utils/toast';

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
      if (data.type === "card" && data.url) {
        window.location.href = data.url;
        clearCart();
      } else if (data.type === "cash") {
        window.location.href = `/payment/success?orderId=${data.orderId}`;
        clearCart();
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
