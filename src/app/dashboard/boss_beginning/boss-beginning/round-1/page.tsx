"use client";

import React from "react";
import { Heart, Sparkles, ThumbsUp, BarChart3 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

interface VotingSummaryItem {
  value: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const voteStats: StatCard[] = [
  { label: "Total vote", value: 1248, icon: Heart },
  { label: "Todays vote", value: 124, icon: Sparkles },
  { label: "Weekly vote", value: 842, icon: ThumbsUp },
  { label: "Monthly vote", value: 3210, icon: BarChart3 },
];

const votingSummary: VotingSummaryItem[] = [
  { value: "1.8k", label: "Claps" },
  { value: "50", label: "Save" },
  { value: "10", label: "Fire" },
  { value: "#4", label: "Rank" },
];

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

export default function Round1Page() {
  return (
    <div className=" bg-[#F5F6F8]">
      <div className=" space-y-6">
        {/* Votes */}
        <div>
          <h2 className="text-sm md:text-base font-medium text-slate-800 mb-3">
            Votes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {voteStats.map(stat => (
              <StatCardItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Voting summary */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-4">
            Voting summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {votingSummary.map(item => (
              <div key={item.label} className="text-center py-5 md:py-6 px-2">
                <div className="text-lg md:text-xl font-semibold text-slate-900">
                  {item.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
