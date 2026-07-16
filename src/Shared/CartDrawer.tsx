"use client";

import React, { useRef } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import {
  useUpdateCartItem,
  useDeleteCartItem,
  useClearCart,
} from "@/Hooks/api/cart_api";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Shape expected for "You May Also Like" items.
// Swap this out for whatever your related-products hook returns.
type RelatedProduct = {
  id: number | string;
  name: string;
  slug: string;
  thumbnail?: string;
  display_price: number;
};

interface CartDrawerProps {
  relatedProducts?: RelatedProduct[];
  onAddRelated?: (product: RelatedProduct) => void;
}

export default function CartDrawer({
  relatedProducts = [],
  onAddRelated,
}: CartDrawerProps) {
  const router = useRouter();
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartCount,
    cartSubtotal,
    isLoading,
    refetchCart,
  } = useCart();

  const { mutate: updateCartMutation } = useUpdateCartItem();
  const { mutate: deleteCartMutation } = useDeleteCartItem();
  const { mutate: clearCartMutation } = useClearCart();

  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!isCartOpen) return null;

  const handleUpdateQuantity = (cartItemId: number, delta: number) => {
    const item = cartItems.find(c => c.id === cartItemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      deleteCartMutation(
        { endpoint: `/v1/cart/${cartItemId}/delete`, data: {} },
        { onSuccess: () => refetchCart() },
      );
      return;
    }

    updateCartMutation(
      {
        endpoint: `/v1/cart/${cartItemId}/update`,
        data: { quantity: newQuantity },
      },
      { onSuccess: () => refetchCart() },
    );
  };

  const handleRemoveItem = (cartItemId: number) => {
    deleteCartMutation(
      { endpoint: `/v1/cart/${cartItemId}/delete`, data: {} },
      { onSuccess: () => refetchCart() },
    );
  };

  const handleClearCart = () => {
    clearCartMutation(
      { data: { data: { quantity: cartCount } } },
      { onSuccess: () => refetchCart() },
    );
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col translate-x-0 transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-black text-sm tracking-wide uppercase">
              Shopping Cart
            </h3>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="text-[11px] font-medium text-red-500 hover:text-red-600 transition px-2 py-0.5 rounded-md hover:bg-red-50"
              >
                Clear All
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-black transition"
          >
            Close
            <FiArrowRight className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading ? (
            <div className="flex flex-col gap-4 mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-14 h-14 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-16 text-center">
              <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiArrowRight className="size-7 text-gray-400 rotate-90" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">
                Add some products to get started
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 bg-[#1977DD] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1565C0] transition"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cartItems.map(item => {
                const product = item.product;
                const imageSrc = product?.thumbnail || "/fallback-product.png";
                const price = product?.display_price || 0;

                return (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-14 h-14 bg-[#F5F5F7] rounded-lg overflow-hidden shrink-0">
                      <img
                        src={imageSrc}
                        alt={product?.name || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${product?.slug}`}
                        onClick={closeCart}
                        className="text-sm font-semibold text-black line-clamp-1 hover:text-blue-600 transition"
                      >
                        {product?.name || "Product"}
                      </Link>

                      <div className="flex items-center gap-2 mt-1.5 text-sm">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:text-black transition"
                        >
                          <span className="text-xs leading-none">−</span>
                        </button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:text-black transition"
                        >
                          <span className="text-xs leading-none">+</span>
                        </button>
                        <span className="text-gray-400 text-xs ml-1">
                          x ${price.toFixed(2)} = $
                          {(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition shrink-0 p-1"
                    >
                      <FiX className="size-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* You May Also Like */}
          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-black">
                  You May Also Like
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollByCard(-1)}
                    className="size-6 rounded-full bg-[#1977DD] text-white flex items-center justify-center hover:bg-[#1565C0] transition"
                  >
                    <FiChevronLeft className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard(1)}
                    className="size-6 rounded-full bg-[#1977DD] text-white flex items-center justify-center hover:bg-[#1565C0] transition"
                  >
                    <FiChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollerRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
              >
                {relatedProducts.map(p => (
                  <div
                    key={p.id}
                    className="shrink-0 w-36 border border-gray-100 rounded-xl p-3 flex flex-col gap-2"
                  >
                    <Link
                      href={`/shop/${p.slug}`}
                      onClick={closeCart}
                      className="w-full h-20 bg-[#F5F5F7] rounded-lg overflow-hidden block"
                    >
                      <img
                        src={p.thumbnail || "/fallback-product.png"}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <p className="text-[11px] font-semibold text-black uppercase line-clamp-2 leading-tight">
                      {p.name}
                    </p>
                    <p className="text-xs font-bold text-black">
                      ${p.display_price.toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => onAddRelated?.(p)}
                      className="mt-auto bg-[#1977DD] text-white text-[11px] font-semibold py-1.5 rounded-lg hover:bg-[#1565C0] transition"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 shrink-0">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-600">
                Total:
              </span>
              <span className="text-lg font-bold text-black">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                closeCart();
                router.push("/shipping-billing");
              }}
              className="w-full bg-[#1977DD] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition"
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
