import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { allProducts } from '../data/products';

type Product = (typeof allProducts)[0];

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { product, quantity }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
