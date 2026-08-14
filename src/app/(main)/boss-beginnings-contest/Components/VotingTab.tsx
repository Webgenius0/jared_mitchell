"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiUsers, FiLock } from "react-icons/fi";
import { slugify } from "@/lib/utils";
import { SlBadge } from "react-icons/sl";
import { CiAlarmOn } from "react-icons/ci";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { ActiveSeasonRound, RoundLeaderboardData } from "@/Types/cms";
import { getRoundLeaderboard } from "@/lib/Services/cms_service";

type Trend = "Up" | "Natural" | "Down";

type Business = {
  rank: number;
  name: string;
  owner: string;
  category: string;
  score: number;
  trend: Trend;
  /** Contestant ID — used to link to the live profile page */
  id?: number;
};

const rankBadgeStyle = (rank: number) => {
  if (rank === 1) return "bg-amber-400 text-white";
  if (rank === 2) return "bg-gray-400 text-white";
  if (rank === 3) return "bg-orange-500 text-white";
  return "bg-blue-50 text-blue-600";
};

const trendStyle = (trend: Trend) => {
  if (trend === "Up") return "text-emerald-500";
  if (trend === "Down") return "text-red-500";
  return "text-blue-500";
};

const normalizeTrend = (trend: string): Trend => {
  const value = (trend || "").toLowerCase();
  if (value === "up" || value === "upward") return "Up";
  if (value === "down" || value === "downward") return "Down";
  return "Natural";
};

interface VotingTabProps {
  activeRound: number;
  setActiveRound: (round: number) => void;
  /** Rounds of the live contest season — drive the round tabs, round content and leaderboard */
  rounds?: ActiveSeasonRound[];
}

export default function VotingTab({
  activeRound,
  setActiveRound,
  rounds,
}: VotingTabProps) {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<RoundLeaderboardData | null>(
    null,
  );
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  const apiRound = rounds?.[activeRound];
  const roundNumber = apiRound?.round_number ?? activeRound + 1;

  // A round is "complete" once its voting window has closed. For the final
  // round (5) this means the whole contest is over.
  const isRoundComplete = Boolean(
    apiRound?.voting_ends_at &&
      new Date(apiRound.voting_ends_at).getTime() < Date.now(),
  );
  const isFinalRound = roundNumber === 5;

  // Round tabs — built from the live season rounds when available. Only the
  // active round is selectable; every other round tab is locked.
  const hasActiveRound = rounds?.some(r => r.is_active) ?? false;
  const roundTabs = rounds?.length
    ? rounds.map((r, i) => {
        const isActive = r.is_active || (!hasActiveRound && i === 0);
        return {
          index: i,
          label: `Round ${r.round_number}`,
          isActive,
          isDisabled: !isActive,
        };
      })
    : [];

  // Load the leaderboard for the active round from the live API.
  useEffect(() => {
    if (!apiRound) return;
    let cancelled = false;
    setLoadingLeaderboard(true);
    getRoundLeaderboard(apiRound.id, { noCache: true })
      .then(res => {
        if (!cancelled) setLeaderboard(res?.data ?? null);
      })
      .catch(() => {
        if (!cancelled) setLeaderboard(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingLeaderboard(false);
      });
    return () => {
      cancelled = true;
    };
  }, [apiRound]);

  // Leaderboard rows — live entries for the active round only.
  const leaderboardRows = useMemo(() => {
    if (!leaderboard?.entries?.length) return [] as Business[];
    return leaderboard.entries.map(e => ({
      rank: e.rank,
      name:
        e.contestable_name ||
        e.display_name ||
        e.contestant?.contestable?.business_name ||
        "",
      owner: e.contestant?.contestable?.owner_name || "",
      category: "",
      // Round 1 shows lifetime total_points; every other round shows that
      // round's total_score (points/votes earned within this round only).
      score:
        roundNumber === 1
          ? (e.contestant?.contestable?.total_points ?? 0)
          : (e.total_score ?? 0),
      trend: normalizeTrend(e.trend),
      id: e.contestant_id ?? e.contestant?.id ?? undefined,
    }));
  }, [leaderboard, roundNumber]);

  // No live season round — nothing to vote on yet. Show an empty state
  // instead of fabricated preview data.
  if (!apiRound) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-10 sm:p-14 flex flex-col items-center text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1977DD29] flex items-center justify-center mb-4">
          <CiAlarmOn className="size-6 sm:size-7 text-blue-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-[#101828]">
          No Active Voting Round
        </h3>
        <p className="text-sm sm:text-base text-black/50 mt-2 max-w-md">
          There is no live contest round right now. Voting will appear here once
          the next round opens.
        </p>
      </div>
    );
  }

  // Header content — built from live round + leaderboard data only.
  const roundContent = {
    title: apiRound.title || `Round ${roundNumber}`,
    phase: `Round ${apiRound.round_number}`,
    description: apiRound.goal || apiRound.requirements || "",
    participants: leaderboard?.total_entries ?? 0,
    advancing: apiRound.advance_limit ?? null,
    advancingPct:
      apiRound.advance_limit != null &&
      leaderboard?.total_entries != null &&
      leaderboard.total_entries > 0
        ? Math.round(
            (apiRound.advance_limit / leaderboard.total_entries) * 100,
          )
        : null,
    timeLeft:
      leaderboard?.days_left != null
        ? `${leaderboard.days_left} day${leaderboard.days_left === 1 ? "" : "s"} left`
        : null,
    votingWeight: apiRound.voting_strategy || null,
  };

  const isFetching = loadingLeaderboard && !leaderboard;
  const isEmpty = !loadingLeaderboard && leaderboardRows.length === 0;

  const handleViewProfile = (businessName: string, businessId?: number) => {
    const roundSlug = `round-${roundNumber}`;
    const slug = businessId ?? slugify(businessName);
    router.push(`/boss-beginnings-contest/profile/${roundSlug}/${slug}`);
  };

  return (
    <div>
      {/* Header card */}
      <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#101828]">
              {roundContent.title}
            </h3>
            <p className="text-[12px] sm:text-[13px] text-black/50 mt-0.5">
              {roundContent.phase}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {roundTabs.map(tab => (
              <button
                key={tab.label}
                onClick={() => !tab.isDisabled && setActiveRound(tab.index)}
                disabled={tab.isDisabled}
                title={
                  tab.isDisabled
                    ? "Only the active round is available"
                    : undefined
                }
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-[13px] font-normal transition-colors ${
                  tab.isActive
                    ? "bg-[#2563EB] text-white"
                    : tab.isDisabled
                      ? "bg-[#EEF1F6] text-black/35 cursor-not-allowed"
                      : "bg-[#EEF1F6] text-black/50 hover:bg-black/10"
                }`}
              >
                {tab.isDisabled && <FiLock className="size-3" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="">
          {roundContent.description && (
            <h4 className="text-sm sm:text-base lg:text-lg font-normal text-[#1D1D1F] mt-5">
              {roundContent.description}
            </h4>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-5">
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <FiUsers className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Participants
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">
                  {roundContent.participants}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <HiMiniArrowTrendingUp className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Advancing
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">
                  {roundContent.advancing != null
                    ? `${String(roundContent.advancing).padStart(2, "0")}${
                        roundContent.advancingPct != null
                          ? ` (${roundContent.advancingPct}%)`
                          : ""
                      }`
                    : "—"}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <CiAlarmOn className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Time Left
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">
                  {roundContent.timeLeft || "—"}
                </h6>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className="w-14 h-14 sm:w-17 sm:h-17 rounded-full bg-[#1977DD29] flex justify-center items-center shrink-0">
                <SlBadge className="size-5 sm:size-6 text-blue-400" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg lg:text-xl font-normal text-[#364153]">
                  Voting Weight
                </h5>
                <h6 className="text-base sm:text-lg lg:text-xl font-normal text-[#0F172B]">
                  {roundContent.votingWeight || "—"}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard table — swapped out for a completion banner once this
          round's voting window has closed. */}
      {isRoundComplete ? (
        <div className="rounded-2xl border border-black/10 bg-white p-10 sm:p-14 flex flex-col items-center text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1977DD29] flex items-center justify-center mb-4">
            <SlBadge className="size-6 sm:size-7 text-blue-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-[#101828]">
            {isFinalRound
              ? "Contest Complete"
              : `Round ${roundNumber} Complete`}
          </h3>
          <p className="text-sm sm:text-base text-black/50 mt-2 max-w-md">
            {isFinalRound
              ? "Voting has ended for the Final Round. Thanks to everyone who took part — the winner will be announced soon."
              : `Voting has ended for Round ${roundNumber}. Check back once the next round opens.`}
          </p>
        </div>
      ) : (
        <div className="bg-white  border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] sm:min-w-[720px]">
              <thead>
                <tr className="bg-blue-600 text-white text-sm sm:text-base ">
                  <th className="text-left font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/5">
                    Rank
                  </th>
                  <th className="text-left font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                    Business
                  </th>
                  <th className="text-center font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                    Total Score
                  </th>
                  <th className="text-enter font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4 ">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {isFetching ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-black/40"
                    >
                      Loading leaderboard…
                    </td>
                  </tr>
                ) : isEmpty ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-sm text-black/40"
                    >
                      No leaderboard data available for this round yet.
                    </td>
                  </tr>
                ) : (
                  leaderboardRows.map((b, idx) => (
                    <tr
                      key={b.id || b.name}
                      className={`text-sm sm:text-base ${
                        idx !== leaderboardRows.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      } hover:bg-gray-50 transition-colors`}
                    >
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span
                          className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg text-[10px] sm:text-xs font-semibold ${rankBadgeStyle(
                            b.rank,
                          )}`}
                        >
                          #{b.rank}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {b.name}
                        </div>
                        <div className="text-gray-400 text-[10px] sm:text-xs">
                          {b.owner}
                        </div>
                      </td>

                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                        <div className="text-blue-600 font-semibold text-sm sm:text-base">
                          {b.score.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-[10px] sm:text-xs">
                          points
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center gap-20 justify-end">
                        <span
                          className={`font-medium text-xs sm:text-sm w-10 ${trendStyle(
                            b.trend,
                          )}`}
                        >
                          {b.trend}
                        </span>
                        <button
                          onClick={() => handleViewProfile(b.name, b.id)}
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-colors whitespace-nowrap"
                        >
                          <FiEye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
