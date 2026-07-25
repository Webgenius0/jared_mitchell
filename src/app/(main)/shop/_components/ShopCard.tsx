"use client";

import { ShopCardProps } from "@/Types/type";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { LuClock } from "react-icons/lu";
import { useAddToCart } from "@/Hooks/api/cart_api";
import { useCart } from "@/Provider/CartProvider/CartProvider";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ShopCardExtended extends ShopCardProps {
  slug?: string;
  categoryName?: string;
}

const ShopCard = ({ data, itemKey }: { data: ShopCardExtended; itemKey: number }) => {
  const linkHref = data.slug ? `shop/${data.slug}` : `shop/${data?.id}`;
  const { user } = useAuth();
  const router = useRouter();
  const { openCart, refetchCart } = useCart();
  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please sign in to continue");
      router.push("/auth/login");
      return;
    }

    // Extract numeric product ID from data.id (e.g., "123" -> 123)
    const productId = data.id?.replace(/[^0-9]/g, "") || data.id;

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
    <Link href={linkHref}>
      <div
        key={itemKey}
        className="pb-5 rounded-2xl overflow-hidden custom_border custom_shadow bg-white"
      >
        <div className="relative w-full h-[378px]">
          <div className="absolute size-full bg-black/10" />
          <Image
            src={data.image}
            width={358}
            height={378}
            alt=""
            className="size-full object-cover"
          />
          {data.tag && (
            <div className="absolute bg-white py-1 px-2 text-primary-blue text-sm top-6 right-9 rounded-full">
              {data.tag}
            </div>
          )}
        </div>
        <div className="py-4 space-y-5 px-4">
          <div className="space-y-2">
            <h5 className="text-2xl text-primary-black font-medium">
              {data.title}
            </h5>
            <p className="text-xl text-secondary-black line-clamp-1">
              {data.description}
            </p>
          </div>
          {data?.EndsIn && (
            <div className="custom_border bg-[#F1F5F9] px-3 py-4 flex items-center gap-2 text-lg rounded-md text-primary-black">
              <LuClock className="text-xl" /> Ends in: {data?.EndsIn}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="text-2xl text-primary-black">{data.price}</div>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 flex items-center gap-3 text-lg text-nowrap bg-primary-blue text-white rounded-full cursor-pointer hover:bg-secondary-blue"
            >
              <FiShoppingCart className="text-xl" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
