"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageLoader } from "@/Shared/PageLoader";

// ─── Payment flow types ───────────────────────────────────────────────────────
// The backend Stripe success_url should append ?type=... when redirecting back,
// e.g.  /payment/success?type=subscription&session_id=cs_xxx&reference=SUB-123

type PaymentType = "subscription" | "order" | "event" | "vote" | "generic";

interface TypeCopy {
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const TYPE_CONFIG: Record<PaymentType, TypeCopy> = {
  subscription: {
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Subscription Active! 🎉",
    subtitle: "Welcome aboard.",
    description:
      "Your subscription has been activated successfully. You can manage, change or cancel your plan anytime from your dashboard.",
    primaryCta: { label: "Manage Subscription", href: "/dashboard/subscription" },
    secondaryCta: { label: "Go to Home", href: "/" },
  },
  order: {
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Order Placed Successfully! 🎉",
    subtitle: "Thank you for your purchase.",
    description:
      "Your order has been confirmed and a receipt is on its way to your email. Track your purchase anytime from your dashboard.",
    primaryCta: { label: "Continue Shopping", href: "/shop" },
    secondaryCta: { label: "Go to Home", href: "/" },
  },
  event: {
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Booking Confirmed! 🎉",
    subtitle: "See you there.",
    description:
      "Your tickets have been reserved and a confirmation will be sent to your email shortly.",
    primaryCta: { label: "Browse More Events", href: "/events" },
    secondaryCta: { label: "Go to Home", href: "/" },
  },
  vote: {
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Vote Purchase Successful! 🎉",
    subtitle: "Your support matters.",
    description:
      "Your support votes have been added. Head to your dashboard to see the updated vote count.",
    primaryCta: { label: "Go to Dashboard", href: "/dashboard" },
    secondaryCta: { label: "Back to Contests", href: "/boss-beginnings-contest" },
  },
  generic: {
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "Payment Successful! 🎉",
    subtitle: "Thank you for your purchase.",
    description:
      "Your payment was processed successfully and a confirmation will be sent to your email shortly.",
    primaryCta: { label: "Go to Home", href: "/" },
    secondaryCta: { label: "Browse Events", href: "/events" },
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();

  const rawType = (searchParams.get("type") || "").toLowerCase();
  const type: PaymentType = ["subscription", "order", "event", "vote"].includes(
    rawType,
  )
    ? (rawType as PaymentType)
    : "generic";
  const copy = TYPE_CONFIG[type];

  const sessionId = searchParams.get("session_id");
  const reference =
    searchParams.get("reference") ||
    searchParams.get("booking_reference") ||
    searchParams.get("order_id") ||
    searchParams.get("purchase_id");
  const plan = searchParams.get("plan");
  const amount = searchParams.get("amount");

  const hasDetails = Boolean(sessionId || reference || plan || amount);

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-green-50/40 via-white to-white">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* ── Success Icon ─────────────────────────────────────────────── */}
        <div className="mb-8 flex justify-center">
          <div
            className={`w-20 h-20 rounded-full ${copy.iconBg} flex items-center justify-center animate-bounce`}
          >
            <svg
              className={`w-10 h-10 ${copy.iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          {copy.title}
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mb-2">{copy.subtitle}</p>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          {copy.description}
        </p>

        {/* ── Payment Details Card ─────────────────────────────────────── */}
        {hasDetails && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left space-y-3">
            {plan && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Plan</span>
                <span className="text-sm font-semibold text-gray-800 capitalize">
                  {plan}
                </span>
              </div>
            )}
            {amount && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-sm font-semibold text-gray-800">
                  {amount}
                </span>
              </div>
            )}
            {reference && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Reference</span>
                <span className="text-sm font-semibold text-gray-800 font-mono tracking-wide">
                  {reference}
                </span>
              </div>
            )}
            {sessionId && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Session ID</span>
                <span className="text-sm text-gray-600 font-mono truncate max-w-[200px]">
                  {sessionId}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Actions ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={copy.primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1977DD] text-white rounded-xl font-medium text-sm hover:bg-[#1565C0] active:scale-[0.97] transition-all shadow-sm"
          >
            {copy.primaryCta.label}
          </Link>
          <Link
            href={copy.secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-xl font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.97] transition-all"
          >
            {copy.secondaryCta.label}
          </Link>
        </div>

        {/* ── Help Text ────────────────────────────────────────────────── */}
        <p className="mt-10 text-xs text-gray-400">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-[#1977DD] underline hover:no-underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <SuccessContent />
    </Suspense>
  );
}
