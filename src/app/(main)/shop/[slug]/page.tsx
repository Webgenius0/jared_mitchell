"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiShoppingCart,
  FiX,
  FiMinus,
  FiPlus,
  FiTag,
  FiPackage,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { getProductBySlug, getAllProducts } from "@/Hooks/api/cms_api";

interface ProductDisplay {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  price: number;
  salePrice: number;
  displayPrice: number;
  discountPercentage: number;
  type: string;
  categoryName: string;
  thumbnail: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  vendorAddress: string;
  vendorDetails: string;
}

import TopProductSection from "../_components/TopProductSection";
import SuggestedSection from "../_components/SuggestedSection";
import { PageLoader } from "@/Shared/PageLoader";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { user } = useAuth();

  // Fetch product by slug and all products for suggestions
  const { data: apiResponse, isLoading } = getProductBySlug(slug || "");
  const { data: allProductsResponse } = getAllProducts();
  const productRaw = apiResponse?.data || null;
  const allProducts: any[] = allProductsResponse?.data || [];

  // Map API data to display format
  const product: ProductDisplay | null = productRaw
    ? {
        id: String(productRaw.id),
        slug: productRaw.slug,
        title: productRaw.name,
        shortDescription: productRaw.short_description,
        longDescription: productRaw.description,
        price: productRaw.price,
        salePrice: productRaw.sale_price,
        displayPrice: productRaw.display_price,
        discountPercentage: productRaw.discount_percentage,
        type: productRaw.type,
        categoryName: productRaw.category?.name || "",
        thumbnail: productRaw.thumbnail,
        images: (productRaw.images || [])
          .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
          .map((img: any) => img?.image || "")
          .filter(Boolean),
        inStock: productRaw.stock?.in_stock ?? true,
        stockQuantity: productRaw.stock?.quantity ?? 0,
        vendorName: productRaw.vendor?.name || "",
        vendorEmail: productRaw.vendor?.email || "",
        vendorPhone: productRaw.vendor?.phone || "",
        vendorAddress: productRaw.vendor?.address || "",
        vendorDetails: productRaw.vendor?.details || "",
      }
    : null;

  // States
  const [quantity, setQuantity] = useState<number>(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isVendorOpen, setIsVendorOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const images: string[] = product?.images?.length
    ? product.images
    : [product?.thumbnail || "/fallback-product.png"];
  const [activeImage, setActiveImage] = useState<string>(images[0] || "");

  // Loading state
  if (isLoading) {
    return <PageLoader />;
  }

  // Not found
  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500 italic">
        Product not found.
      </div>
    );
  }

  const currentPrice = product.displayPrice;
  const originalPrice =
    product.price > product.displayPrice ? product.price : null;

  // Suggested products (filter out current, pick 4)
  const suggestedProducts: any[] = allProducts
    .filter((item: any) => item.slug !== slug)
    .slice(0, 4);
  const alsoLikeProducts = suggestedProducts.slice(0, 2);

  const requireAuth = () => {
    if (!user) {
      toast.error("Please sign in to continue");
      router.push("/auth/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireAuth()) return;
    setCartItems(prev => {
      const existing = prev.find(c => c.id === product.id);
      if (existing) return prev;
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          image: images[0],
          price: currentPrice,
          quantity,
        },
      ];
    });
    setQuantity(1);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(c => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter(c => c.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(c => c.id !== id));
  };

  const addAlsoLikeToCart = (item: any) => {
    if (!requireAuth()) return;
    const price = item.displayPrice || 0;
    const imageSrc = item.thumbnail || "/fallback-product.png";
    setCartItems(prev => {
      const existing = prev.find(c => c.id === String(item.id));
      if (existing) {
        return prev.map(c =>
          c.id === String(item.id) ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          id: String(item.id),
          title: item.name,
          image: imageSrc,
          price,
          quantity: 1,
        },
      ];
    });
  };

  const handleBuyNow = () => {
    if (!requireAuth()) return;
    handleAddToCart();
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="py-10 relative">
      {/* Floating cart trigger */}
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

      <div className="flex flex-col gap-16">
        {/* ── Top Section: Main Product View ── */}
        <TopProductSection
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          isDetailsOpen={isDetailsOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
          currentPrice={currentPrice}
          originalPrice={originalPrice}
          images={images}
        />


        {/* ── Suggested for You ── */}
        {suggestedProducts.length > 0 && (
          <SuggestedSection
            suggestedProducts={suggestedProducts.map((item: any) => ({
              id: String(item.id),
              slug: item.slug,
              title: item.name,
              description: item.short_description,
              price: `$${item.display_price}`,
              image: item.thumbnail,
              tag: item.type === "digital" ? "Digital" : undefined,
            }))}
            onAddToCart={(mappedItem: any) => {
              const raw = alsoLikeProducts.find(
                (p: any) => String(p.id) === mappedItem.id,
              );
              if (raw) addAlsoLikeToCart(raw);
            }}
          />
        )}
      </div>

      {/* ── Cart Drawer ── */}
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
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
                    {alsoLikeProducts.map((item: any) => {
                      const thumbSrc =
                        item.thumbnail || "/fallback-product.png";
                      const priceNum = item.display_price || 0;
                      return (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="w-12 h-12 bg-[#F5F5F7] rounded-lg overflow-hidden shrink-0">
                            <img
                              src={thumbSrc}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-black line-clamp-1">
                              {item.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              ${priceNum.toFixed(0)}
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
