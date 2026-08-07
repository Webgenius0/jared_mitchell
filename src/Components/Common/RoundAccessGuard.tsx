"use client";

import React from "react";
import { FiLock } from "react-icons/fi";
import useCurrentRoundNumber from "@/Hooks/useCurrentRoundNumber";

/* ------------------------------------------------------------------ */
/*  RoundAccessGuard                                                   */
/* ------------------------------------------------------------------ */
// Rounds open up one at a time over the season. A user may open their
// current round (the season's active round) and every round before it,
// but not the rounds that come after it. This guard wraps the content of
// a round page and replaces it with a locked state when the round is
// still in the future — even if the user navigates to the URL directly.
// While the season data hasn't loaded (or errored) the content renders
// normally (fail-open), so access is never blocked by a transient request
// failure.

export default function RoundAccessGuard({
  roundNumber,
  children,
}: {
  roundNumber: number;
  children: React.ReactNode;
}) {
  const currentRound = useCurrentRoundNumber();

  if (roundNumber > currentRound) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-16 px-6">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <FiLock className="w-5 h-5 text-slate-400" />
        </div>
        <p className="text-sm md:text-base font-medium text-slate-700">
          Round {roundNumber} hasn't opened yet
        </p>
        <p className="text-xs md:text-sm text-slate-400 mt-1.5 max-w-sm mx-auto">
          Rounds unlock one at a time — you can view your current round and
          every round before it.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
