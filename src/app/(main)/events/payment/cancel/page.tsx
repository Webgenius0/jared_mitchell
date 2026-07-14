"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { PageLoader } from "@/Shared/PageLoader";

function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventSlug = searchParams.get("event");

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-16 px-4">
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
          Payment Cancelled
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mb-2">
          Your payment was not processed.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          No charges have been made. You can try again or browse other events
          whenever you&apos;re ready.
        </p>

        {/* ── Actions ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {eventSlug ? (
            <Link
              href={`/events/${eventSlug}/buy-ticket`}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1977DD] text-white rounded-xl font-medium text-sm hover:bg-[#1565C0] active:scale-[0.97] transition-all shadow-sm"
            >
              Try Again
            </Link>
          ) : (
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1977DD] text-white rounded-xl font-medium text-sm hover:bg-[#1565C0] active:scale-[0.97] transition-all shadow-sm"
            >
              Browse Events
            </Link>
          )}
          <Link
            href={eventSlug ? `/events/${eventSlug}` : "/events"}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-xl font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.97] transition-all"
          >
            View Event Details
          </Link>
        </div>

        {/* ── Help Text ────────────────────────────────────────────────── */}
        <p className="mt-10 text-xs text-gray-400">
          Need help?{" "}
          <Link href="/contact" className="text-[#1977DD] underline hover:no-underline">
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
