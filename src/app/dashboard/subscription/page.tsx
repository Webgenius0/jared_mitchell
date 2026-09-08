import type { Metadata } from "next";
import React from "react";
import SubscriptionManager from "@/Components/Common/SubscriptionManager";

const SubscriptionPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Subscription
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your plan — change plans, resume, or cancel your subscription
          anytime.
        </p>
      </div>

      <SubscriptionManager />
    </div>
  );
};

export const metadata = {
  title: "Subscription - Manage Your Plan | OSI Dashboard",
  description:
    "Manage your OSI subscription. View your current plan, upgrade or downgrade, cancel subscriptions, and track billing history in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default SubscriptionPage;
