"use client";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import useClientApi from "@/Hooks/useClientApi";

// Get User Data
export const useGetUserData = (token: any) => {
  return useClientApi({
    method: "get",
    key: ["user", token],
    enabled: !!token,
    endpoint: "/v1/profile",
    isPrivate: true,
    queryOptions: {
      refetchInterval: 1000 * 60 * 60, // refetch every hour
    },
  });
};

// Registration
export const useRegister = () => {
  return useClientApi({
    method: "post",
    key: ["register"],
    endpoint: "/v1/register",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// OTP verification
export const useOtpVerification = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["otp-verification"],
    endpoint: "/v1/verify-email",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
        setToken(res?.data?.token);
        router.push("/dashboard");
      }
    },
    onError: (err: any) => {
      const errors = err?.response?.data?.errors;

      let message = "Something went wrong";

      if (typeof errors === "string") {
        // e.g. "Invalid or expired OTP"
        message = errors;
      } else if (Array.isArray(errors)) {
        // e.g. ["Invalid OTP", "OTP expired"]
        message = errors[0];
      } else if (errors && typeof errors === "object") {
        // e.g. { email: ["The email field is required."] }
        const firstKey = Object.keys(errors)[0];
        message = Array.isArray(errors[firstKey])
          ? errors[firstKey][0]
          : String(errors[firstKey]);
      }

      toast.error(message);
    },
  });
};

// OTP resend
export const useResendOtp = () => {
  return useClientApi({
    method: "post",
    key: ["resend-otp"],
    endpoint: "/v1/resend-otp",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Login
export const useLogin = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["login"],
    endpoint: "/v1/login",
    onSuccess: (res: any) => {
      if (res?.success) {
        setToken(res?.data?.token);
        toast.success(res?.message);
        // Honor an optional ?redirect= target (e.g. "create business" form),
        // but only allow internal paths — never external URLs.
        const redirect = new URLSearchParams(window.location.search).get(
          "redirect",
        );
        const safeRedirect =
          redirect && redirect.startsWith("/") && !redirect.startsWith("//")
            ? redirect
            : "/dashboard";
        router.push(safeRedirect);
      } else {
        // API returned 2xx but success:false — show the message it gave us
        toast.error(res?.message || "Something went wrong. Please try again.");
      }
    },
    onError: (err: any) => {
      const payload = err?.response?.data;

      // Validation errors: { errors: { field: [messages] } }
      const fieldErrors = payload?.errors;
      if (fieldErrors && typeof fieldErrors === "object") {
        const firstField = Object.keys(fieldErrors)[0];
        const firstMessage = fieldErrors[firstField]?.[0];
        toast.error(firstMessage || payload?.message || "Validation failed.");
        return;
      }

      // Fallback to top-level message, then generic network/server errors
      const status = err?.response?.status;
      if (payload?.message) {
        toast.error(payload.message);
      } else if (status === 401) {
        toast.error("Invalid email or password.");
      } else if (status >= 500) {
        toast.error("Server error. Please try again later.");
      } else if (err?.message === "Network Error") {
        toast.error("Network error. Check your connection and try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    },
  });
};

// Verify Email
export const useVerifyEmail = () => {
  return useClientApi({
    method: "post",
    key: ["verify-email"],
    endpoint: "/v1/forgot-password",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Verify OTP
export const useVerifyOtp = () => {
  return useClientApi({
    method: "post",
    key: ["verify-otp"],
    endpoint: "/v1/verify-otp",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Logout
export const useLogout = () => {
  const router = useRouter();
  const { clearToken } = useAuth();

  return useClientApi({
    method: "post",
    key: ["logout"],
    endpoint: "/v1/logout",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        clearToken();
        toast.success(res?.message || "Logged out successfully");
        router.push("/");
      }
    },
    onError: (err: any) => {
      // Even if the API fails, clear the token and redirect
      clearToken();
      router.push("/");
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });
};

// Reset Password
export const useResetPassword = () => {
  const router = useRouter();

  return useClientApi({
    method: "post",
    key: ["reset-password"],
    endpoint: "/v1/reset-password",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
        router.push("/auth/login");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Update Avatar
export const useUpdateAvatar = () => {
  return useClientApi({
    method: "post",
    key: ["update-avatar"],
    endpoint: "/v1/update-avatar",
    isPrivate: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Avatar updated successfully");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update avatar");
    },
  });
};

// Update Profile
export const useUpdateProfile = () => {
  return useClientApi({
    method: "post",
    key: ["update-profile"],
    endpoint: "/v1/update-profile",
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Profile updated successfully");
      }
    },
    onError: (err: any) => {
      const payload = err?.response?.data;

      // Validation errors: { errors: { field: [messages] } }
      const fieldErrors = payload?.errors;
      if (fieldErrors && typeof fieldErrors === "object") {
        const firstField = Object.keys(fieldErrors)[0];
        const firstMessage = fieldErrors[firstField]?.[0];
        toast.error(firstMessage || payload?.message || "Validation failed.");
        return;
      }

      toast.error(payload?.message || "Failed to update profile");
    },
  });
};

// Subscription Checkout
export const useSubscriptionCheckout = () => {
  return useClientApi({
    method: "post",
    key: ["subscription-checkout"],
    endpoint: "/v1/subscription/checkout",
    isPrivate: true,
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to initiate checkout");
    },
  });
};
