import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { allProducts } from '../data/products';

type Product = (typeof allProducts)[0];

export interface CartItem {
  id: string; // Unique identifier for the cart item, e.g., "1-M"
  product: Product;
  quantity: number;
  size?: string;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity = 1, size) =>
        set((state) => {
          // Create a unique ID for the cart item based on product ID and size
          const cartItemId = size ? `${product.id}-${size}` : product.id;
          const existingItem = state.items.find((item) => item.id === cartItemId);

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return { items: updatedItems };
          } else {
            const newItem: CartItem = { id: cartItemId, product, quantity, size };
            return { items: [...state.items, newItem] };
          }
        }),
      removeFromCart: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartItemId),
        })),
      increaseQuantity: (cartItemId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (cartItemId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === cartItemId && item.quantity > 1
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
