"use client";

import React from "react";
import {
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiShoppingCart,
  FiTag,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
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
  handleBuyNow: () => void;
  currentPrice: number;
  originalPrice: number | null;
  images: string[];
  isAddingToCart?: boolean;
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
  handleBuyNow,
  currentPrice,
  originalPrice,
  images,
  isAddingToCart,
}: TopProductSectionProps) {
  const discountPercentage = product.discountPercentage || 0;
  const categoryName = product.categoryName || "";
  const longDescription =
    product.longDescription || product.shortDescription || "";
  const inStock = product.inStock ?? true;
  const stockQuantity = product.stockQuantity ?? 0;

  return (
    <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 container mx-auto">
      {/* Gallery Column */}
      <div className="flex flex-col gap-4 w-full">
        <div className="relative w-full aspect-[4/5] bg-[#F5F5F7] h-[650px] rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100">
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{discountPercentage}% OFF
            </div>
          )}
          <img
            src={activeImage}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* Thumbnails */}
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

      {/* Details Column */}
      <div className="flex flex-col gap-6 justify-start">
        <div>
          <h1 className="text-5xl font-semibold font-sf text-black tracking-tight mb-2 capitalize">
            {product.title}
          </h1>
          <div className="text-xl text-gray-500 leading-relaxed">
            {product.longDescription ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: product.longDescription,
                }}
              />
            ) : (
              <p>Premium quality that represents the culture.</p>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-3 py-2 border-b border-gray-100">
          <span className="text-3xl font-extrabold text-[#1977DD]">
            ${currentPrice.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-lg font-medium text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded">
              Save {discountPercentage}%
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-5">
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

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 bg-[#1977DD] text-white py-3.5 rounded-xl font-semibold hover:bg-[#1565C0] transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <>
                <svg
                  className="animate-spin size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding...
              </>
            ) : (
              <>
                <FiShoppingCart className="size-4" /> Add to Cart
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 bg-[#121620] text-white py-3.5 rounded-xl font-semibold hover:bg-black transition shadow-sm"
          >
            Buy Now
          </button>
        </div>

        {/* Product Type / Brand */}
        {product.type && (
          <div className="text-xl text-gray-500 border border-gray-200 rounded-lg px-5 py-3 w-fit">
            Brand:{" "}
            <span className="font-semibold text-gray-800 capitalize">
              {product.type}
            </span>
          </div>
        )}

        {/* Details Accordion */}
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
            <div className="pb-4 space-y-4 text-base flex justify-between text-gray-600 leading-relaxed transition-all">
              {/* Category */}
              {categoryName && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Category
                  </h4>
                  <span className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg">
                    {categoryName}
                  </span>
                </div>
              )}

              {/* Stock Status */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Stock
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span>{inStock ? "In Stock" : "Out of Stock"}</span>
                  {stockQuantity > 0 && (
                    <span className="text-gray-400">
                      ({stockQuantity} available)
                    </span>
                  )}
                </div>
              </div>

              {/* Vendor Info */}
              {product.vendorName && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Vendor
                  </h4>
                  <div className="space-y-1.5 text-sm text-gray-700">
                    <p className="flex items-center gap-2">
                      <FiUser className="size-3.5 text-gray-400 shrink-0" />
                      {product.vendorName}
                    </p>
                    {product.vendorEmail && (
                      <p className="flex items-center gap-2">
                        <FiMail className="size-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{product.vendorEmail}</span>
                      </p>
                    )}
                    {product.vendorPhone && (
                      <p className="flex items-center gap-2">
                        <FiPhone className="size-3.5 text-gray-400 shrink-0" />
                        {product.vendorPhone}
                      </p>
                    )}
                    {product.vendorAddress && (
                      <p className="flex items-center gap-2">
                        <FiMapPin className="size-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">
                          {product.vendorAddress}
                        </span>
                      </p>
                    )}
                    {product.vendorDetails && (
                      <p className="pt-1 text-xs text-gray-400 italic">
                        {product.vendorDetails}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
