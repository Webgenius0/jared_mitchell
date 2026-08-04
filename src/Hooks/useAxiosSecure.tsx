import axios from "axios";
import { getItem, removeItem } from "@/lib/localStorage";

export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
});

axiosSecure.interceptors.request.use(
  config => {
    const token = getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;

    // Never treat 403 as a session-expiry signal: the user IS authenticated
    // but forbidden (e.g. a backend business rule like "only purchase votes
    // for your own spotlight") — wiping the session would kick them to login.
    if (status === 401) {
      // Only auto-logout when the response actually looks like an auth
      // failure (Laravel returns "Unauthenticated." for expired/invalid
      // tokens). Business-rule 401s carry a custom message and must not
      // destroy the session.
      const message = String(
        error.response?.data?.message ?? error.response?.data?.error ?? "",
      ).toLowerCase();
      const isAuthFailure =
        !message ||
        /unauthenticated|unauthorized|token.*expired|expired.*token|session|login|credential/i.test(
          message,
        );

      if (isAuthFailure) {
        removeItem("token");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
