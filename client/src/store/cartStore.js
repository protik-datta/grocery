import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        const items = get().items;

        const existing = items.find((i) => i.product._id === product._id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product._id === product._id
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                  }
                : i,
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity: 1 }],
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
        get().items.reduce(
          (sum, i) => sum + i.product.offerPrice * i.quantity,
          0,
        ),
    }),
    {
      name: "cart-storage",

      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
