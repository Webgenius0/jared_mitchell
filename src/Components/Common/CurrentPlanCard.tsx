"use client";

import React from "react";
import Link from "next/link";
import {
  normalizeProfileSubscription,
  normalizeSubscriptionStatus,
  subscriptionStatusStyles,
  type ProfileSubscription,
  type MySubscription,
} from "@/Hooks/api/subscription_api";
import { formatDate } from "@/helper/formatDate";
import { FiCalendar } from "react-icons/fi";
import { LuShieldAlert } from "react-icons/lu";

/**
 * Compact "Current Plan" card rendered from the `subscription` object embedded
 * in the user profile (GET /v1/profile → data.subscription). Shown on the
 * dashboard settings pages; links to the full subscription manager.
 */
const CurrentPlanCard = ({
  subscription,
}: {
  subscription?: ProfileSubscription | null;
}) => {
  const sub: MySubscription | null = normalizeProfileSubscription(
    subscription,
  );
  const status = normalizeSubscriptionStatus(sub?.status);
  const statusMeta =
    subscriptionStatusStyles[status] || subscriptionStatusStyles.inactive;

  // ── No subscription ──────────────────────────────────────────────────
  if (!sub) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">No active subscription</h3>
          <p className="text-sm text-gray-500 mt-1">
            Pick a plan to unlock exclusive tools, visibility and community
            perks.
          </p>
        </div>
        <Link
          href="/pricing"
          className="shrink-0 inline-flex items-center px-5 py-2.5 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] transition-colors"
        >
          Browse Plans
        </Link>
      </div>
    );
  }

  const price = sub.price != null ? `$${sub.price}` : null;

  return (
    <div className="bg-gradient-to-r from-blue-50/70 to-white rounded-2xl border border-blue-100 shadow-sm p-6 md:p-7">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Left — plan info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              {sub.plan_name || "Current Plan"}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${statusMeta.className}`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {statusMeta.label}
            </span>
          </div>

          {price && (
            <p className="text-3xl md:text-4xl font-bold text-gray-900">
              {price}
              {sub.price_suffix && (
                <span className="text-sm font-normal text-gray-500 pb-1">
                  {sub.price_suffix}
                </span>
              )}
            </p>
          )}

          {(sub.current_period_end || sub.trial_ends_at) && (
            <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-gray-600">
              {sub.current_period_end && (
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="size-4 text-gray-400 shrink-0" />
                  {status === "cancelled" ? "Access until" : "Next billing"}:
                  <span className="font-medium text-gray-800">
                    {formatDate(sub.current_period_end)}
                  </span>
                </span>
              )}
              {sub.trial_ends_at && status === "trialing" && (
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="size-4 text-gray-400 shrink-0" />
                  Trial ends:
                  <span className="font-medium text-gray-800">
                    {formatDate(sub.trial_ends_at)}
                  </span>
                </span>
              )}
            </div>
          )}

          {(sub.cancel_at_period_end || sub.on_grace_period) &&
            status === "active" && (
              <div className="mt-3.5 flex items-start gap-2.5 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-2.5 text-sm text-yellow-800">
                <LuShieldAlert className="size-4 shrink-0 mt-0.5" />
                <p>
                  {sub.cancel_at_period_end
                    ? `Your plan is set to cancel at the end of the current billing period${
                        sub.current_period_end
                          ? ` (${formatDate(sub.current_period_end)})`
                          : ""
                      }. You can resume it anytime before then.`
                    : "Your subscription is on a grace period. Please update your payment method to avoid losing access."}
                </p>
              </div>
            )}
        </div>

        {/* Right — actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-56 shrink-0">
          <Link
            href="/dashboard/subscription"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] active:scale-[0.98] transition-all"
          >
            Manage Subscription
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-[#1977DD] text-sm font-medium border border-blue-200 hover:bg-blue-50 active:scale-[0.98] transition-all"
          >
            Change Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanCard;
