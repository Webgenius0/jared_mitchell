"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import useAuth from "@/Hooks/useAuth";
import { useAddToCart } from "@/Hooks/api/cart_api";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import toast from "react-hot-toast";
import { ShopCardProps } from "@/Types/type";

interface SuggestedProduct extends ShopCardProps {
  slug?: string;
}

interface SuggestedSectionProps {
  suggestedProducts: SuggestedProduct[];
}

export default function SuggestedSection({
  suggestedProducts,
}: SuggestedSectionProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { refetchCart } = useCart();
  const { mutate: addToCart } = useAddToCart();

  if (suggestedProducts.length === 0) return null;

  const handleAddToCart = (item: SuggestedProduct) => {
    if (!user) {
      toast.error("Please sign in to continue");
      router.push("/auth/login");
      return;
    }

    const productId = item.id?.replace(/[^0-9]/g, "") || item.id;
    addToCart(
      { product_id: productId, quantity: 1 },
      {
        onSuccess: () => {
          refetchCart();
        },
      },
    );
  };

  return (
    <div className="bg-[#F5F5F7] py-15">
      <div className="flex flex-col gap-6 container mx-auto">
        <h2 className="section_title">Suggested for you</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {suggestedProducts.map(item => {
            const itemPrice = parseFloat(
              (item.price || "0").replace(/[^0-9.]/g, ""),
            );
            const imageSrc =
              typeof item.image === "string"
                ? item.image
                : (item.image as any)?.src || "/fallback-product.png";
     

            return (
              <div
                key={item.id}
                className="border border-gray-100 shadow-sm p-4 flex flex-col justify-between group bg-white"
              >
                <Link href={`/shop/${item?.slug}`} className="block">
                  <div>
                    {/* Media Header */}
                    <div className="w-full aspect-square bg-[#F5F5F7] overflow-hidden mb-4 relative">
                      <img
                        src={imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                    {/* Descriptions text structure */}
                    <h4 className="font-bold text-lg text-black line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                      {item.description ||
                        "Premium quality items chosen explicitly for you."}
                    </p>
                  </div>
                </Link>

                {/* Actions & Price Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-50 mt-2">
                  <span className="font-normal text-lg text-black">
                    ${itemPrice.toFixed(0)}
                  </span>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className="bg-[#1977DD] text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-[#1565C0] transition flex items-center gap-1"
                  >
                    <FiShoppingCart className="size-3" /> Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
