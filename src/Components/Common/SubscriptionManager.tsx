"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  useGetMySubscription,
  useCancelSubscription,
  useResumeSubscription,
  useSwapSubscription,
  normalizeSubscriptionStatus,
  normalizeSubscriptionResponse,
  subscriptionStatusStyles,
  type MySubscription,
} from "@/Hooks/api/subscription_api";
import { getSubscriptionPlans } from "@/lib/Services/cms_service";
import { pricingPlans as staticPlans } from "@/Components/Data/data";
import Modal from "@/Components/Common/Modal";
import { formatDate } from "@/helper/formatDate";
import {
  FiCreditCard,
  FiCalendar,
  FiZap,
} from "react-icons/fi";
import { LuRepeat, LuRefreshCw, LuShieldAlert } from "react-icons/lu";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PlanOption {
  id: string | number;
  name: string;
  price: string;
  suffix: string;
  bestFor: string;
  badge?: string | null;
  featured: boolean;
  stripePriceId?: string | null;
}

function Spinner({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
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
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

const SubscriptionManager = () => {
  const queryClient = useQueryClient();

  // ── Current subscription ──────────────────────────────────────────────
  const {
    data: subRes,
    isLoading: subLoading,
    isError: subError,
    refetch: refetchSub,
  } = useGetMySubscription(true);

  // ── Available plans (for swap) — CMS plans with static fallback ──────
  const { data: cmsPlans } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: getSubscriptionPlans,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const swapPlans: PlanOption[] = useMemo(() => {
    if (cmsPlans && cmsPlans.length > 0) {
      return cmsPlans.map(p => ({
        id: p.id,
        name: p.plan_name,
        price: p.price,
        suffix: p.price_suffix || "",
        bestFor: p.best_for || "",
        badge: p.badge_text,
        featured: Boolean(p.is_featured),
        stripePriceId: p.stripe_price_id,
      }));
    }
    return staticPlans.map(p => ({
      id: p.id,
      name: p.title,
      price: p.price,
      suffix: p.period,
      bestFor: p.bestFor,
      badge: p.badge,
      featured: Boolean(p.highlighted),
      stripePriceId: null,
    }));
  }, [cmsPlans]);

  // ── Mutations ─────────────────────────────────────────────────────────
  const { mutate: cancelSub, isPending: isCancelling } =
    useCancelSubscription();
  const { mutate: resumeSub, isPending: isResuming } = useResumeSubscription();
  const { mutate: swapSub, isPending: isSwapping } = useSwapSubscription();

  // ── UI state ──────────────────────────────────────────────────────────
  const [cancelOpen, setCancelOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const [swapTargetId, setSwapTargetId] = useState<string | number | null>(
    null,
  );

  const sub: MySubscription | null = normalizeSubscriptionResponse(subRes);
  const status = normalizeSubscriptionStatus(sub?.status);
  const statusMeta =
    subscriptionStatusStyles[status] || subscriptionStatusStyles.inactive;

  const canManage = status === "active" || status === "trialing";
  const canResume = status === "cancelled" || status === "past_due";

  // The status endpoint doesn't return the plan name/price — enrich from the
  // matching plan (matched via stripe_price ↔ stripe_price_id).
  const matchedPlan: PlanOption | undefined = useMemo(
    () =>
      swapPlans.find(
        p =>
          Boolean(sub?.stripe_price) &&
          Boolean(p.stripePriceId) &&
          sub?.stripe_price === p.stripePriceId,
      ),
    [swapPlans, sub?.stripe_price],
  );

  const displayPlan = matchedPlan
    ? {
        plan_name: matchedPlan.name,
        price: matchedPlan.price,
        price_suffix: matchedPlan.suffix,
      }
    : { plan_name: sub?.plan_name, price: sub?.price, price_suffix: sub?.price_suffix };

  const currentPlanIsSelected = (plan: PlanOption) => {
    if (sub?.plan_id != null && String(sub.plan_id) === String(plan.id))
      return true;
    if (
      Boolean(sub?.stripe_price) &&
      Boolean(plan.stripePriceId) &&
      sub?.stripe_price === plan.stripePriceId
    )
      return true;
    return false;
  };

  // Pick a sensible default swap target (first plan that isn't the current one)
  useEffect(() => {
    if (swapOpen && swapTargetId === null && swapPlans.length > 0) {
      const firstOther = swapPlans.find(p => !currentPlanIsSelected(p));
      setSwapTargetId(firstOther ? firstOther.id : swapPlans[0].id);
    }
  }, [swapOpen, swapTargetId, swapPlans, sub]);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["my-subscription"] });

  const handleCancel = () => {
    cancelSub(undefined, { onSettled: () => { setCancelOpen(false); invalidate(); } });
  };

  const handleResume = () => {
    resumeSub(undefined, { onSettled: () => { setResumeOpen(false); invalidate(); } });
  };

  const handleSwap = () => {
    if (swapTargetId === null) {
      toast.error("Please select a plan to switch to.");
      return;
    }
    swapSub(
      // Plan id goes in the body: POST /v1/subscription/swap
      { data: { pricing_plan_id: swapTargetId } },
      { onSettled: () => { setSwapOpen(false); invalidate(); } },
    );
  };

  // ── Loading ───────────────────────────────────────────────────────────
  if (subLoading) {
    return (
      <div className="space-y-5">
        {[1, 2].map(i => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse space-y-4"
          >
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded w-64" />
          </div>
        ))}
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────
  if (subError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
        <LuShieldAlert className="mx-auto size-10 text-red-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Couldn&apos;t load your subscription
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Something went wrong while fetching your subscription details. Please
          try again.
        </p>
        <button
          onClick={() => refetchSub()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] transition-colors cursor-pointer"
        >
          <LuRefreshCw className="size-4" />
          Retry
        </button>
      </div>
    );
  }

  // ── No subscription (empty state) ─────────────────────────────────────
  if (!sub) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-10 md:p-14 text-center">
        <div className="mx-auto size-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <FiZap className="size-8 text-[#1977DD]" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No active subscription
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-7">
          You don&apos;t have a subscription yet. Pick a plan that fits your
          goals and unlock exclusive tools, visibility and community perks.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] transition-colors"
        >
          Browse Plans
        </Link>
      </div>
    );
  }

  const price =
    displayPlan.price != null ? `$${displayPlan.price}` : null;

  return (
    <div className="space-y-6">
      {/* ── Current plan card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left — plan info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {displayPlan.plan_name || "Current Plan"}
              </h3>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${statusMeta.className}`}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {statusMeta.label}
              </span>
            </div>

            <div className="flex items-end gap-1 mb-4">
              {price && (
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  {price}
                </span>
              )}
              {displayPlan.price_suffix && (
                <span className="text-sm text-gray-500 pb-1">
                  {displayPlan.price_suffix}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {sub.billing_interval && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-500">Billing cycle:</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {sub.billing_interval}
                  </span>
                </div>
              )}
              {sub.current_period_end && status !== "cancelled" && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-500">Next billing date:</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(sub.current_period_end)}
                  </span>
                </div>
              )}
              {sub.current_period_end && status === "cancelled" && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-500">Access until:</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(sub.current_period_end)}
                  </span>
                </div>
              )}
              {sub.trial_ends_at && status === "trialing" && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-500">Trial ends:</span>
                  <span className="font-medium text-gray-800">
                    {formatDate(sub.trial_ends_at)}
                  </span>
                </div>
              )}
              {sub.payment_method?.last4 && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCreditCard className="size-4 text-gray-400 shrink-0" />
                  <span className="text-gray-500 capitalize">
                    {sub.payment_method.brand || "Card"}
                  </span>
                  <span className="font-medium text-gray-800">
                    •••• {sub.payment_method.last4}
                  </span>
                </div>
              )}
            </div>

            {sub.cancel_at_period_end && status === "active" && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                <LuShieldAlert className="size-4 shrink-0 mt-0.5" />
                <p>
                  Your plan is set to cancel at the end of the current billing
                  period
                  {sub.current_period_end
                    ? ` (${formatDate(sub.current_period_end)})`
                    : ""}
                  . You can resume it anytime before then to keep your benefits.
                </p>
              </div>
            )}
            {sub.on_grace_period && status === "active" && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                <LuShieldAlert className="size-4 shrink-0 mt-0.5" />
                <p>
                  Your subscription is on a grace period. Please update your
                  payment method to avoid losing access.
                </p>
              </div>
            )}
          </div>

          {/* Right — actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64 shrink-0">
            {canManage && (
              <>
                <button
                  onClick={() => setSwapOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <LuRepeat className="size-4" />
                  Change Plan
                </button>
                <button
                  onClick={() => setCancelOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-red-600 text-sm font-medium border border-red-200 hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Cancel Subscription
                </button>
              </>
            )}
            {canResume && (
              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] active:scale-[0.98] transition-all cursor-pointer"
              >
                <LuRefreshCw className="size-4" />
                Resume Subscription
              </button>
            )}
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gray-50 text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick plans strip ─────────────────────────────────────────── */}
      {swapPlans.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Available Plans
            </h3>
            <button
              onClick={() => setSwapOpen(true)}
              className="text-sm text-[#1977DD] font-medium hover:underline cursor-pointer"
            >
              Switch plan
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {swapPlans.map(plan => {
              const isCurrent = currentPlanIsSelected(plan);
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-xl border p-5 transition-colors ${
                    isCurrent
                      ? "border-[#1977DD] bg-blue-50/40"
                      : "border-gray-200 hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 left-4 text-[10px] font-semibold uppercase tracking-wide bg-[#1977DD] text-white px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-gray-900">{plan.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1977DD] bg-white border border-blue-200 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500">
                      {plan.suffix}
                    </span>
                  </p>
                  {plan.bestFor && (
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                      {plan.bestFor}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Support card ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Questions about your plan?
          </h3>
          <p className="text-sm text-gray-500">
            Our team is happy to help you pick the right plan or fix billing
            issues.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center px-5 py-2.5 rounded-xl bg-white text-[#1977DD] text-sm font-medium border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          Contact Support
        </Link>
      </div>

      {/* ── Cancel confirmation modal ─────────────────────────────────── */}
      <Modal open={cancelOpen} onClose={() => setCancelOpen(false)}>
        <div className="p-6 pt-2 max-w-md mx-auto text-center">
          <div className="mx-auto size-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <LuShieldAlert className="size-7 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cancel subscription?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            You&apos;ll keep access to{" "}
            <span className="font-medium text-gray-800">
              {displayPlan.plan_name || "your plan"}
            </span>{" "}
            until the end of your current billing period
            {sub.current_period_end
              ? ` (${formatDate(sub.current_period_end)})`
              : ""}
            , then your plan will end and you&apos;ll lose its benefits.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setCancelOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Keep plan
            </button>
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isCancelling && <Spinner />}
              Yes, cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Resume confirmation modal ─────────────────────────────────── */}
      <Modal open={resumeOpen} onClose={() => setResumeOpen(false)}>
        <div className="p-6 pt-2 max-w-md mx-auto text-center">
          <div className="mx-auto size-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <LuRefreshCw className="size-7 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Resume subscription?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Your{" "}
            <span className="font-medium text-gray-800">
              {displayPlan.plan_name || "subscription"}
            </span>{" "}
            will be reactivated and billing will resume normally. You&apos;ll
            keep all of your plan&apos;s benefits.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setResumeOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Not now
            </button>
            <button
              onClick={handleResume}
              disabled={isResuming}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1977DD] text-sm font-medium text-white hover:bg-[#1565C0] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isResuming && <Spinner />}
              Resume
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Swap plan modal ───────────────────────────────────────────── */}
      <Modal
        open={swapOpen}
        onClose={() => setSwapOpen(false)}
        title="Change your plan"
      >
        <div className="p-2 pt-4">
          <p className="text-sm text-gray-500 mb-5">
            Pick the plan that fits you best. Any price difference will be
            handled at the end of this billing cycle.
          </p>

          {swapPlans.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm">
                No other plans available right now.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {swapPlans.map(plan => {
                const isCurrent = currentPlanIsSelected(plan);
                const isSelected = swapTargetId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    disabled={isCurrent}
                    onClick={() => setSwapTargetId(plan.id)}
                    className={`relative text-left rounded-xl border-2 p-5 transition-all cursor-pointer ${
                      isCurrent
                        ? "border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed"
                        : isSelected
                          ? "border-[#1977DD] bg-blue-50/40 shadow-sm"
                          : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2.5 left-4 text-[10px] font-semibold uppercase tracking-wide bg-[#1977DD] text-white px-2 py-0.5 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-gray-900">{plan.name}</h4>
                      {isCurrent ? (
                        <span className="text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      ) : isSelected ? (
                        <span className="text-[10px] font-semibold text-white bg-[#1977DD] px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500">
                        {plan.suffix}
                      </span>
                    </p>
                    {plan.bestFor && (
                      <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                        {plan.bestFor}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => setSwapOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSwap}
              disabled={isSwapping || swapTargetId === null}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1977DD] text-sm font-medium text-white hover:bg-[#1565C0] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {isSwapping && <Spinner />}
              Confirm Change
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionManager;
