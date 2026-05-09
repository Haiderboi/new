"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCartItemCount, getCartTotal, removeCartItem, upsertCartItem } from "@/lib/cart-utils";
import type { CartItem, Product } from "@/types";

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "acme-store-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(STORAGE_KEY);

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    setCart((currentCart) => upsertCartItem(currentCart, product));
  }, []);

  const removeFromCartById = useCallback((id: string) => {
    setCart((currentCart) => removeCartItem(currentCart, id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart: removeFromCartById,
      clearCart,
      total: getCartTotal(cart),
      itemCount: getCartItemCount(cart),
    }),
    [addToCart, cart, clearCart, removeFromCartById],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
