"use client";

import { featuredShopData } from "@/Components/Data/data";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FiShoppingCart, FiX, FiMinus, FiPlus } from "react-icons/fi";
import { ShopCardProps } from "@/Types/type";
import TopProductSection from "../_components/TopProductSection";
import SuggestedSection from "../_components/SuggestedSection";

type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const SingproductId = Array.isArray(params.id) ? params.id[0] : params.id;

  const productdetails = featuredShopData.find(
    item => item?.id === SingproductId,
  ) as ShopCardProps & {
    images?: string[];
    originalPrice?: string;
    brand?: string;
    longDetails?: string;
  };

  // States for interactive parts
  const [quantity, setQuantity] = useState<number>(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Normalize images to always be string[]
  const normalizeImage = (img: any): string =>
    typeof img === "string" ? img : img?.src || "/fallback-product.png";

  const images: string[] = (
    productdetails?.images || [productdetails?.image]
  ).map(normalizeImage);
  const [activeImage, setActiveImage] = useState<string>(images[0]);

  // Handle items not found gracefully
  if (!productdetails) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500 italic">
        Product not found.
      </div>
    );
  }

  // Calculate pricing values safely (strip $ sign first)
  const currentPrice = parseFloat(
    (productdetails.price || "0").replace(/[^0-9.]/g, ""),
  );
  const originalPrice = productdetails.originalPrice
    ? parseFloat(productdetails.originalPrice)
    : null;

  // Filter out current product to get 4 suggestions (now 5 items in data)
  const suggestedProducts = featuredShopData
    .filter(item => item.id !== SingproductId)
    .slice(0, 4);

  // "You May Also Like" strip inside the cart drawer (keep it small)
  const alsoLikeProducts = suggestedProducts.slice(0, 2);

  const handleAddToCart = () => {
    setCartItems(prev => {
      const existing = prev.find(c => c.id === productdetails.id);
      if (existing) {
        // Item already in cart — just open the cart, don't add more
        return prev;
      }
      return [
        ...prev,
        {
          id: productdetails.id,
          title: productdetails.title,
          image: images[0],
          price: currentPrice,
          quantity,
        },
      ];
    });
    setQuantity(1); // Reset quantity selector after adding
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(c =>
          c.id === id ? { ...c, quantity: c.quantity + delta } : c,
        )
        .filter(c => c.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(c => c.id !== id));
  };

  const addAlsoLikeToCart = (item: (typeof featuredShopData)[number]) => {
    const price = parseFloat(
      (item.price || "0").replace(/[^0-9.]/g, ""),
    );
    const imageSrc =
      typeof item.image === "string"
        ? item.image
        : (item.image as any)?.src || "/fallback-product.png";
    setCartItems(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          image: imageSrc,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className=" py-10  relative">
      {/* Floating cart trigger (optional, mirrors header cart icon) */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed top-6 right-6 z-30 bg-white shadow-md rounded-full p-3 flex items-center gap-2 hover:shadow-lg transition"
      >
        <FiShoppingCart className="size-5 text-black" />
        {cartCount > 0 && (
          <span className="bg-[#1977DD] text-white text-xs font-bold rounded-full size-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <div className=" flex flex-col gap-16">
        {/* ── Top Section: Main Product View ───────────────────────────────── */}
        <TopProductSection
          product={productdetails}
          quantity={quantity}
          setQuantity={setQuantity}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          isDetailsOpen={isDetailsOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          handleAddToCart={handleAddToCart}
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          images={images}
        />

        {/* ── Bottom Section: Suggested for You Recommendations ─────────── */}
        <SuggestedSection
          suggestedProducts={suggestedProducts}
          onAddToCart={addAlsoLikeToCart}
        />
      </div>

      {/* ── Cart Drawer / Modal ──────────────────────────────────────────── */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Slide-over panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-black">Shopping Cart</h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-black transition"
              >
                <FiX className="size-5" />
              </button>
            </div>

            {/* Cart items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-gray-400 text-center mt-10">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-[#F5F5F7] rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black line-clamp-1">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:text-black"
                        >
                          <FiMinus className="size-3" />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:text-black"
                        >
                          <FiPlus className="size-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-bold text-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-gray-400 hover:text-red-500 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* You May Also Like */}
              {alsoLikeProducts.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    You May Also Like
                  </p>
                  <div className="flex flex-col gap-3">
                    {alsoLikeProducts.map(item => {
                      const price = parseFloat(
                        (item.price || "0").replace(/[^0-9.]/g, ""),
                      );
                      const thumbSrc =
                        typeof item.image === "string"
                          ? item.image
                          : (item.image as any)?.src || "/fallback-product.png";
                      return (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="w-12 h-12 bg-[#F5F5F7] rounded-lg overflow-hidden shrink-0">
                            <img
                              src={thumbSrc}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-black line-clamp-1">
                              {item.title}
                            </p>
                            <span className="text-xs text-gray-500">
                              ${price.toFixed(0)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => addAlsoLikeToCart(item)}
                            className="bg-[#1977DD] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md hover:bg-[#1565C0] transition"
                          >
                            Add
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer: Total + Checkout */}
            <div className="border-t border-gray-100 px-5 py-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">
                  Total:
                </span>
                <span className="text-lg font-bold text-black">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                disabled={cartItems.length === 0}
                className="w-full bg-[#1977DD] text-white py-3 rounded-xl font-semibold hover:bg-[#1565C0] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
