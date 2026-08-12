"use client";
import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 SUBSCRIPTION ENDPOINTS
// -----------------------------------------------------------------------------
// Update these to match your backend contract once it's available.
// The UI is fully wired to these paths — change them in ONE place.
//   get    → GET  the current user's subscription status
//   cancel → POST cancels the active subscription
//   resume → POST re-activates a cancelled/past-due subscription
//   swap   → POST /v1/subscription/swap (pricing_plan_id in the request body)
// ─────────────────────────────────────────────────────────────────────────────
export const SUBSCRIPTION_ENDPOINTS = {
  get: "/v1/subscription/status",
  cancel: "/v1/subscription/cancel",
  resume: "/v1/subscription/resume",
  // POST with { pricing_plan_id } in the request body
  swap: "/v1/subscription/swap",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "cancelled"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | string;

export interface MySubscription {
  id: number | string;
  plan_id?: number | string | null;
  plan_name: string;
  price?: string | number | null;
  price_suffix?: string | null; // e.g. "/month"
  billing_interval?: string | null; // e.g. "monthly" | "yearly"
  status: SubscriptionStatus;
  current_period_start?: string | null;
  current_period_end?: string | null; // next billing date / access until
  cancel_at_period_end?: boolean;
  payment_method?: {
    brand?: string | null;
    last4?: string | null;
  } | null;
  created_at?: string | null;
  // ── Fields from the real /v1/subscription/status response ─────────────
  is_subscribed?: boolean;
  stripe_id?: string | null; // Stripe subscription id (sub_...)
  stripe_price?: string | null; // Stripe price id (price_...) — used to match the current plan
  quantity?: number | null;
  trial_ends_at?: string | null;
  on_grace_period?: boolean;
}

// GET /v1/subscription/status response shape
export interface SubscriptionStatusDetails {
  name: string | null;
  stripe_id: string | null;
  stripe_status: string | null;
  stripe_price: string | null;
  quantity: number | null;
  trial_ends_at: string | null;
  ends_at: string | null;
  on_grace_period: boolean;
  canceled: boolean;
}

export interface SubscriptionStatusResponse {
  status: string;
  data: {
    is_subscribed: boolean;
    details: SubscriptionStatusDetails | null;
  };
}

/** Normalizes status strings from the backend ("canceled" → "cancelled"). */
export const normalizeSubscriptionStatus = (
  status?: string,
): "active" | "trialing" | "cancelled" | "past_due" | "inactive" => {
  const s = String(status ?? "").toLowerCase();
  if (s === "active") return "active";
  if (s === "trialing" || s === "trial") return "trialing";
  if (s === "past_due" || s === "unpaid") return "past_due";
  if (s === "cancelled" || s === "canceled") return "cancelled";
  return "inactive";
};

// ─── Profile subscription (embedded in GET /v1/profile → data.subscription) ──

export interface ProfileSubscription {
  status?: string | null;
  on_trial?: boolean;
  on_grace_period?: boolean;
  canceled?: boolean;
  plan_name?: string | null;
  plan_price?: number | string | null;
  plan_price_suffix?: string | null;
  trial_ends_at?: string | null;
  ends_at?: string | null;
}

/**
 * Maps the `subscription` object embedded in the user profile
 * (GET /v1/profile → data.subscription) into the MySubscription shape.
 * Returns null when the user has no subscription.
 */
export const normalizeProfileSubscription = (
  sub: ProfileSubscription | null | undefined,
): MySubscription | null => {
  if (!sub || typeof sub !== "object") return null;
  const isCancelled = Boolean(sub.canceled);
  const status = isCancelled ? "cancelled" : sub.status || "active";
  return {
    id: "",
    plan_id: null,
    plan_name: sub.plan_name || "Current Plan",
    price: sub.plan_price ?? null,
    price_suffix: sub.plan_price_suffix ?? null,
    billing_interval: null,
    status,
    current_period_end: sub.ends_at,
    cancel_at_period_end: isCancelled,
    payment_method: null,
    is_subscribed: true,
    trial_ends_at: sub.trial_ends_at,
    on_grace_period: Boolean(sub.on_grace_period),
  };
};

/**
 * True when the user profile carries an active (or trialing) subscription.
 * Uses the `subscription` object embedded in GET /v1/profile → data.subscription.
 */
export const isUserSubscribed = (user?: any): boolean => {
  const sub = user?.subscription;
  if (!sub || typeof sub !== "object") return false;
  if (sub.canceled) return false;
  const status = String(sub.status || "").toLowerCase();
  return status === "active" || status === "trialing";
};

// Badge/pill styles for subscription statuses (shared by header + plan cards)
export const subscriptionStatusStyles: Record<
  string,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  trialing: {
    label: "Trial",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  past_due: {
    label: "Past due",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 border-red-200",
  },
  inactive: {
    label: "No subscription",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

/**
 * Maps the raw /v1/subscription/status response into the MySubscription shape
 * the UI renders. Returns null when the user has no subscription.
 */
export const normalizeSubscriptionResponse = (
  res: any,
): MySubscription | null => {
  const data = res?.data;
  if (!data || !data.is_subscribed || !data.details) return null;

  const d = data.details;
  const isCancelled = Boolean(d.canceled);
  const status = isCancelled
    ? "cancelled"
    : d.stripe_status || "active";

  return {
    id: d.stripe_id ?? "",
    plan_id: d.stripe_price ?? null, // matched against plan.stripe_price_id for display
    plan_name: d.name ?? "Current Plan",
    price: null, // not returned by the status endpoint — enriched from plans in the UI
    price_suffix: null,
    billing_interval: null,
    status,
    current_period_end: d.ends_at,
    cancel_at_period_end: isCancelled,
    payment_method: null,
    is_subscribed: true,
    stripe_id: d.stripe_id,
    stripe_price: d.stripe_price,
    quantity: d.quantity,
    trial_ends_at: d.trial_ends_at,
    on_grace_period: Boolean(d.on_grace_period),
  };
};

// ─── Hooks ───────────────────────────────────────────────────────────────────

/** GET the current user's subscription status. */
export const useGetMySubscription = (enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    key: ["my-subscription"],
    endpoint: SUBSCRIPTION_ENDPOINTS.get,
    isPrivate: true,
    enabled,
  });
};

/** POST — cancel the active subscription. */
export const useCancelSubscription = () => {
  return useClientApi({
    method: "post",
    key: ["cancel-subscription"],
    endpoint: SUBSCRIPTION_ENDPOINTS.cancel,
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Subscription cancelled.");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};

/** POST — resume a cancelled / past-due subscription. */
export const useResumeSubscription = () => {
  return useClientApi({
    method: "post",
    key: ["resume-subscription"],
    endpoint: SUBSCRIPTION_ENDPOINTS.resume,
    isPrivate: true,
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Subscription resumed successfully.");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};

/** POST — swap to a different plan. Call with { data: { pricing_plan_id: planId } }. */
export const useSwapSubscription = () => {
  return useClientApi({
    method: "post",
    key: ["swap-subscription"],
    endpoint: SUBSCRIPTION_ENDPOINTS.swap,
    isPrivate: true,
    onSuccess: (res: any) => {
      // Backend may signal success via `success: true` or Laravel-style
      // `status: "success"` (same shape as /v1/subscription/checkout).
      const ok =
        res?.success === true ||
        String(res?.status ?? "").toLowerCase() === "success";

      if (!ok) {
        toast.error(res?.message || "Failed to change plan.");
        return;
      }

      // Some backends return a checkout_url when the swap requires
      // payment (e.g. proration) — redirect when provided.
      if (res?.data?.checkout_url) {
        toast.success(res?.message || "Redirecting to payment...");
        window.location.href = res.data.checkout_url;
      } else {
        toast.success(res?.message || "Plan changed successfully.");
      }
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err));
    },
  });
};
