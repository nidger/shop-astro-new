import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { allProducts } from '../data/products';

type Product = (typeof allProducts)[0];

export interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          // Basic check to prevent duplicates, can be enhanced later
          if (state.items.find((p) => p.id === product.id)) {
            return state;
          }
          return { items: [...state.items, product] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart-storage', // name of the item in the storage (must be unique)
    }
  )
);
