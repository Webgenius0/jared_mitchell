"use client";
import { useGetCart } from "@/Hooks/api/cart_api";
import useAuth from "@/Hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useState, useCallback } from "react";

interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    price: number;
    sale_price: number;
    display_price: number;
    discount_percentage: number;
    type: string;
    thumbnail: string;
    images: { id: number; image: string }[];
    category: { id: number; name: string };
    stock: { tracked: boolean; quantity: number; in_stock: boolean };
  };
  created_at: string;
}

interface CartData {
  items: CartItem[];
  subtotal: number;
  total_items: number;
  unique_items: number;
}

interface CartContextValue {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cartData: CartData | null;
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isLoading: boolean;
  refetchCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    data: cartResponse,
    isLoading,
  } = useGetCart(!!user);

  const cartData: CartData | null = cartResponse?.data || null;
  const cartItems: CartItem[] = cartData?.items || [];
  const cartCount = cartData?.total_items || 0;
  const cartSubtotal = cartData?.subtotal || 0;

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  const refetchCart = useCallback(() => {
    // Invalidate the cart query so all subscribers get fresh data
    queryClient.invalidateQueries({ queryKey: ["get-cart"] });
  }, [queryClient]);

  const value: CartContextValue = {
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    cartData,
    cartItems,
    cartCount,
    cartSubtotal,
    isLoading,
    refetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
