"use client";
import React from "react";
import { Trophy } from "lucide-react";

export default function LeaderboardTab() {
  // This tab is rendered only from static, fabricated content today — the
  // real contest timeline and leaderboard come from the live season API.
  // Until that data exists, show an empty state instead of fake dates/rounds.
  return (
    <div className="space-y-6 mt-10">
      <div className="rounded-2xl border border-black/10 bg-white p-10 sm:p-16 flex flex-col items-center text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1977DD29] flex items-center justify-center mb-4">
          <Trophy className="size-6 sm:size-7 text-blue-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-[#101828]">
          No Leaderboard Yet
        </h3>
        <p className="text-sm sm:text-base text-black/50 mt-2 max-w-md">
          The contest timeline and leaderboard will appear here once the current
          season is live.
        </p>
      </div>
    </div>
  );
}
