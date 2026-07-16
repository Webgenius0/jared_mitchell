"use client";
import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

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

export const useAddToCart = (onSuccessOverride?: (res: any) => void, onErrorOverride?: (err: any) => void) => {
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
      toast.error(
        err?.response?.data?.message || "Failed to add to cart",
      );
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
      toast.error(
        err?.response?.data?.message || "Failed to update cart",
      );
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
      toast.error(
        err?.response?.data?.message ||
          "Failed to remove item from cart",
      );
    },
  });
};

// Clear Cart
// DELETE /v1/cart/clear — body: { quantity }
// Note: For DELETE requests, pass body via { data: { data: { quantity } } } in the mutation call
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
      toast.error(
        err?.response?.data?.message || "Failed to clear cart",
      );
    },
  });
};
