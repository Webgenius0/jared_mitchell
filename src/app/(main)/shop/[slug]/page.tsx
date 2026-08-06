"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FiShoppingCart,
  FiTag,
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
import { useAddToCart } from "@/Hooks/api/cart_api";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import { setBuyNowItem } from "@/lib/localStorage";
import Sponsors from "../../_components/Sponsors";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { user } = useAuth();
  const { refetchCart } = useCart();

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

  // Cart API hooks
  const { mutate: addToCartMutation, isPending: isAddingToCart } =
    useAddToCart();

  // States
  const [quantity, setQuantity] = useState<number>(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const images: string[] = product?.images?.length
    ? product.images
    : [product?.thumbnail || "/fallback-product.png"];
  const [activeImage, setActiveImage] = useState<string>("/fallback-product.png");

  // Sync activeImage when product data loads so it shows the first actual image
  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images[0]]);

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

    addToCartMutation(
      { product_id: product.id, quantity },
      {
        onSuccess: () => {
          refetchCart();
          setQuantity(1);
        },
      },
    );
  };

  const handleBuyNow = () => {
    if (!requireAuth()) return;

    // Save product info to localStorage for the shipping-billing page
    setBuyNowItem({
      product_id: product.id,
      quantity,
      name: product.title,
      thumbnail: product.thumbnail,
      price: currentPrice,
      slug: product.slug,
    });
    
    router.push("/shipping-billing");
  };

  return (
    <main className="py-10 relative">
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
          isAddingToCart={isAddingToCart}
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
          />
        )}
      </div>
      <Sponsors showButton={false} />
    </main>
  );
}
