"use client";

import React from "react";
import {
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiShoppingCart,
} from "react-icons/fi";

interface TopProductSectionProps {
  product: any;
  quantity: number;
  setQuantity: (n: number) => void;
  activeImage: string;
  setActiveImage: (img: string) => void;
  isDetailsOpen: boolean;
  setIsDetailsOpen: (open: boolean) => void;
  handleAddToCart: () => void;
  currentPrice: number;
  originalPrice: number | null;
  images: string[];
}

export default function TopProductSection({
  product,
  quantity,
  setQuantity,
  activeImage,
  setActiveImage,
  isDetailsOpen,
  setIsDetailsOpen,
  handleAddToCart,
  currentPrice,
  originalPrice,
  images,
}: TopProductSectionProps) {
  return (
    <div className=" p-6 sm:p-8  grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 container mx-auto">
      {/* Gallery Column */}
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full aspect-[4/5] bg-[#F5F5F7] h-[650px] rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
          <img
            src={activeImage}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-300 aspect-video"
          />
        </div>

        {/* Thumbnails list */}
        {images.length > 1 && (
          <div className="flex flex-wrap gap-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 bg-[#F5F5F7] rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img
                    ? "border-[#1977DD]"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Configuration & Purchase Details Column */}
      <div className="flex flex-col gap-6 justify-start">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight mb-2">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description ||
              "Premium quality that represents the culture."}
          </p>
        </div>

        {/* Pricing Section */}
        <div className="flex items-baseline gap-3 py-2 border-b border-gray-100">
          <span className="text-3xl font-extrabold text-[#1977DD]">
            ${currentPrice.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-lg font-medium text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity Controller */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Quantity:
          </span>
          <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 px-3 text-gray-500 hover:text-black transition"
            >
              <FiMinus className="size-4" />
            </button>
            <span className="px-4 font-semibold text-sm text-black min-w-[32px] text-center select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 px-3 text-gray-500 hover:text-black transition"
            >
              <FiPlus className="size-4" />
            </button>
          </div>
        </div>

        {/* Checkout Primary Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 bg-[#1977DD] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1565C0] transition flex items-center justify-center gap-2 shadow-sm"
          >
            <FiShoppingCart className="size-4" /> Add to Cart
          </button>
          <button
            type="button"
            className="flex-1 bg-[#121620] text-white py-3.5 rounded-xl font-semibold hover:bg-black transition shadow-sm"
          >
            Buy Now
          </button>
        </div>

        {/* Brand */}
        {product.brand && (
          <div className="text-sm border-t border-gray-100 pt-4 flex gap-2 items-center">
            <span className="text-gray-400">Brand:</span>
            <span className="px-3 py-1 text-xs font-medium border border-gray-200 bg-gray-50 rounded-md text-gray-700">
              {product.brand}
            </span>
          </div>
        )}

        {/* Accordion Details */}
        <div className="border-t border-gray-100">
          <button
            type="button"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="w-full py-4 flex justify-between items-center text-left text-sm font-semibold text-gray-800 hover:text-black"
          >
            <span>Details</span>
            {isDetailsOpen ? (
              <FiChevronUp className="size-4 text-gray-500" />
            ) : (
              <FiChevronDown className="size-4 text-gray-500" />
            )}
          </button>
          {isDetailsOpen && (
            <div className="pb-4 text-sm text-gray-600 leading-relaxed transition-all">
              {product.longDetails ||
                "No additional parameters provided for this item listing details structure."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
