"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageLoader } from "@/Shared/PageLoader";

// ─── Payment flow types ───────────────────────────────────────────────────────
// The backend Stripe cancel_url should append ?type=... when redirecting back,
// e.g.  /payment/cancel?type=subscription&event=my-event-slug

type PaymentType = "subscription" | "order" | "event" | "vote" | "generic";

interface TypeCopy {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const TYPE_CONFIG: Record<PaymentType, TypeCopy> = {
  subscription: {
    title: "Subscription Checkout Cancelled",
    subtitle: "No charges were made.",
    description:
      "Your payment was not completed and no charges have been made. Your current plan (if any) is unchanged. You can try again whenever you're ready.",
    primaryCta: { label: "Back to Pricing", href: "/pricing" },
    secondaryCta: { label: "Go to Dashboard", href: "/dashboard" },
  },
  order: {
    title: "Order Payment Cancelled",
    subtitle: "No charges were made.",
    description:
      "Your payment was not processed. No charges have been made and your cart is still waiting. You can return to checkout whenever you're ready.",
    primaryCta: { label: "Return to Checkout", href: "/shipping-billing" },
    secondaryCta: { label: "Continue Shopping", href: "/shop" },
  },
  event: {
    title: "Booking Payment Cancelled",
    subtitle: "Your payment was not processed.",
    description:
      "No charges have been made. You can try again or browse other events whenever you're ready.",
    primaryCta: { label: "Try Again", href: "/events" },
    secondaryCta: { label: "View Event Details", href: "/events" },
  },
  vote: {
    title: "Vote Purchase Cancelled",
    subtitle: "No charges were made.",
    description:
      "Your payment was not processed and no votes were added. You can head back to the vote purchase page and try again whenever you're ready.",
    primaryCta: { label: "Back to Vote Purchase", href: "/dashboard" },
    secondaryCta: { label: "Browse Contests", href: "/boss-beginnings-contest" },
  },
  generic: {
    title: "Payment Cancelled",
    subtitle: "Your payment was not processed.",
    description:
      "No charges have been made. You can try again or continue browsing whenever you're ready.",
    primaryCta: { label: "Go to Home", href: "/" },
    secondaryCta: { label: "Contact Support", href: "/contact" },
  },
};

function CancelContent() {
  const searchParams = useSearchParams();

  const rawType = (searchParams.get("type") || "").toLowerCase();
  const type: PaymentType = ["subscription", "order", "event", "vote"].includes(
    rawType,
  )
    ? (rawType as PaymentType)
    : "generic";
  const copy = TYPE_CONFIG[type];

  const eventSlug = searchParams.get("event");

  // Dynamic links (event flow)
  const primaryHref =
    type === "event" && eventSlug
      ? `/events/${eventSlug}/buy-ticket`
      : copy.primaryCta.href;
  const secondaryHref =
    type === "event" && eventSlug
      ? `/events/${eventSlug}`
      : copy.secondaryCta.href;

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-red-50/40 via-white to-white">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* ── Cancel Icon ───────────────────────────────────────────────── */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
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

        {/* ── Actions ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1977DD] text-white rounded-xl font-medium text-sm hover:bg-[#1565C0] active:scale-[0.97] transition-all shadow-sm"
          >
            {copy.primaryCta.label}
          </Link>
          <Link
            href={secondaryHref}
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

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CancelContent />
    </Suspense>
  );
}
