"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { PageLoader } from "@/Shared/PageLoader";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const bookingRef = searchParams.get("booking_reference");

  return (
    <section className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* ── Success Icon ──────────────────────────────────────────────── */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-bounce">
            <svg
              className="w-10 h-10 text-green-500"
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
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mb-2">
          Thank you for your purchase.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Your tickets have been reserved and a confirmation will be sent to
          your email shortly.
        </p>

        {/* ── Booking Details Card ──────────────────────────────────────── */}
        {(sessionId || bookingRef) && (
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8 text-left space-y-3">
            {bookingRef && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Booking Reference</span>
                <span className="text-sm font-semibold text-gray-800 font-mono tracking-wide">
                  {bookingRef}
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
            href="/events"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#1977DD] text-white rounded-xl font-medium text-sm hover:bg-[#1565C0] active:scale-[0.97] transition-all shadow-sm"
          >
            Browse More Events
          </Link>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-xl font-medium text-sm border border-gray-200 hover:bg-gray-50 active:scale-[0.97] transition-all"
          >
            Go to Home
          </button>
        </div>
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
