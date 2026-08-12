"use client";
import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

// Get Cart
// GET /v1/cart
export const useGetCart = (enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    key: ["get-cart"],
    endpoint: "/v1/cart",
    isPrivate: true,
    enabled,
  });
};

export const useAddToCart = (
  onSuccessOverride?: (res: any) => void,
  onErrorOverride?: (err: any) => void,
) => {
  return useClientApi({
    method: "post",
    key: ["add-to-cart"],
    endpoint: "/v1/cart/add",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Added to cart!");
        onSuccessOverride?.(res);
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
      onErrorOverride?.(err);
    },
  });
};

export const useUpdateCartItem = () => {
  return useClientApi({
    method: "post",
    key: ["update-cart"],
    endpoint: "/v1/cart/update",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Cart updated!");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};

export const useDeleteCartItem = () => {
  return useClientApi({
    method: "delete",
    key: ["delete-cart-item"],
    endpoint: "/v1/cart/delete",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Item removed from cart");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};


export const useBuyNow = () => {
  return useClientApi({
    method: "post",
    key: ["buy-now"],
    endpoint: "/v1/orders/buy-now",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Order placed!");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};

export const usePlaceOrder = () => {
  return useClientApi({
    method: "post",
    key: ["place-order"],
    endpoint: "/v1/orders/place",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Order placed successfully!");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};

export const useClearCart = () => {
  return useClientApi({
    method: "delete",
    key: ["clear-cart"],
    endpoint: "/v1/cart/clear",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Cart cleared!");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};
