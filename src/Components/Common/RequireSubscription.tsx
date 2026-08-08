"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import { isUserSubscribed } from "@/Hooks/api/subscription_api";
import { PageLoader } from "@/Shared/PageLoader";
import { LuShieldAlert } from "react-icons/lu";

interface RequireSubscriptionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

/**
 * Blocks a page until the user has an active subscription.
 * - Not logged in  → redirects to login
 * - No subscription → shows a "Subscription required" screen with a pricing CTA
 * - Subscribed      → renders children
 */
const RequireSubscription = ({
  children,
  title = "Subscription required",
  description = "You need an active subscription to access this feature. Subscribe to unlock it.",
}: RequireSubscriptionProps) => {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/auth/login");
    }
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!token) return null; // redirecting to login

  if (!isUserSubscribed(user)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 text-center">
          <div className="mx-auto size-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
            <LuShieldAlert className="size-8 text-[#1977DD]" />
          </div>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mb-7 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1977DD] text-white text-sm font-medium hover:bg-[#1565C0] active:scale-[0.98] transition-all"
            >
              View Plans
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              Back to Dashboard
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Already subscribed? Try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireSubscription;
