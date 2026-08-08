"use client";

import React from "react";
import { Heart, Sparkles, ThumbsUp, BarChart3 } from "lucide-react";
import RoundAssetsSubmission from "@/Components/Common/RoundAssetsSubmission";
import RoundAccessGuard from "@/Components/Common/RoundAccessGuard";
import { useGetContestSummary } from "@/Hooks/api/dashboard_api";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function StatCardItem({ label, value, icon: Icon }: StatCard) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2 mb-4 md:mb-5">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-blue-500" />
        </div>
        <span className="text-sm md:text-base text-slate-500">{label}</span>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Round5Page() {
  const { data } = useGetContestSummary();
  const summary = data?.data;

  const roundData = (summary?.round_wise_summary ?? []).find(
    (r: { round?: string }) => r.round === "Round 5",
  );

  const pointStats: StatCard[] = [
    {
      label: "Total point",
      value: roundData?.total_points ?? "—",
      icon: Heart,
    },
    {
      label: "Todays point",
      value: roundData?.todays_points ?? "—",
      icon: Sparkles,
    },
    {
      label: "Weekly point",
      value: roundData?.weekly_points ?? "—",
      icon: ThumbsUp,
    },
    {
      label: "Monthly point",
      value: roundData?.monthly_points ?? "—",
      icon: BarChart3,
    },
  ];

  return (
    <div className=" bg-[#F5F6F8]">
      <div className=" space-y-6">
        <RoundAccessGuard roundNumber={5}>
          {/* Votes */}
          <div>
            <h2 className="text-sm md:text-base font-medium text-slate-800 mb-3">
              Points
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {pointStats.map(stat => (
                <StatCardItem key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* Round 5 assets submission */}
          <RoundAssetsSubmission roundNumber={5} multiple={false} />
        </RoundAccessGuard>
      </div>
    </div>
  );
}
