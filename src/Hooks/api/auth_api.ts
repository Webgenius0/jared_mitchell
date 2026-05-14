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
        router.push("/");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
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
        router.push("/");
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
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
