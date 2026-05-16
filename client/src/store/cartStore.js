import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      deliveryFee: 70,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product._id === product._id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity }],
          });
        }

        set({ isOpen: true });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === productId ? { ...i, quantity } : i,
          ),
        }));
      },

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      totalAmount: () => {
        const subtotal = get().subtotal();
        return subtotal > 0 ? subtotal + get().deliveryFee : 0;
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
