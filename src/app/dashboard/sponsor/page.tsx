import type { Metadata } from "next";

"use client";

import React from "react";
import useAuth from "@/Hooks/useAuth";
import UserEventInteractions from "@/Components/Common/UserEventInteractions";

export const metadata = {
  title: "Sponsor Dashboard - Ad Performance & Campaigns | OSI",
  description:
    "Access your OSI sponsor dashboard. Track ad performance, manage campaigns, view placement schedules, and monitor impression estimates in the Open Spotlight Initiative.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  const { user } = useAuth();
  const displayName =
    user?.profile?.name || user?.profile?.username || "User";

  return (
    <div className="bg-[#F5F6F8]">
      <div className="space-y-6">
        <h1 className="text-lg md:text-xl text-slate-800">
          Welcome back, <span className="font-medium">{displayName}</span>
        </h1>

        {/* Bookmarked / Shared events */}
        <UserEventInteractions />
      </div>
    </div>
  );
}
