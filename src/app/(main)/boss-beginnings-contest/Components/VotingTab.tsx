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

const ROUNDS = ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"] as const;

interface RoundContent {
  title: string;
  phase: string;
  description: string;
  participants: number;
  advancingPct: number;
  advancing: number;
  timeLeft: string;
  votingWeight: string;
  challengePrompt?: string;
}

const ROUND_CONTENT: RoundContent[] = [
  {
    title: "Open Qualifier Round",
    phase: "Phase 1",
    description:
      "Narrow the field and generate buzz. Top 60% advance based on community engagement.",
    participants: 100,
    advancingPct: 60,
    advancing: 60,
    timeLeft: "3 weeks 2 days",
    votingWeight: "100% Community",
  },
  {
    title: "Community Impact Round",
    phase: "Phase 2",
    description:
      "Filter for meaning, not just popularity. Submit 3-5 bullet points or 60-90 second video.",
    participants: 60,
    advancingPct: 50,
    advancing: 30,
    timeLeft: "2 weeks 4 days",
    votingWeight: "70% Community",
    challengePrompt: "How does your business serve the community?",
  },
  {
    title: "Business Story Round",
    phase: "Phase 3",
    description:
      "Identify businesses with clarity and vision. Submit 1-page pitch or 2-minute video.",
    participants: 30,
    advancingPct: 40,
    advancing: 12,
    timeLeft: "2 weeks 1 day",
    votingWeight: "60% Community / 40% Panel",
    challengePrompt: "Mini Business Pitch",
  },
  {
    title: "Semi-Finals",
    phase: "Phase 4",
    description:
      "OSI panel first involvement. Identify the strongest contenders for the final.",
    participants: 15,
    advancingPct: 40,
    advancing: 6,
    timeLeft: "1 week 5 days",
    votingWeight: "50% Community",
    // challengePrompt: "What's the one innovation that sets you apart?",
  },
  {
    title: "Final Round",
    phase: "Phase 5",
    description:
      "Crown the winner! Final voting and OSI customer experience evaluation.",
    participants: 8,
    advancingPct: 38,
    advancing: 3,
    timeLeft: "2 weeks 0 days",
    votingWeight: "30% Community",
    // challengePrompt: "Why should you take home the grand prize?",
  },
];

const BASE_BUSINESSES: Omit<Business, "score" | "trend">[] = [
  {
    rank: 1,
    name: "Aspire Marketing",
    owner: "David Smith",
    category: "Professional Services",
  },
  {
    rank: 2,
    name: "Oasis Outdoor Living",
    owner: "Emily Williams",
    category: "Home & Garden",
  },
  {
    rank: 3,
    name: "Chic & Co Boutique",
    owner: "Michael Taylor",
    category: "Retail & Fashion",
  },
  {
    rank: 4,
    name: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
  },
  {
    rank: 5,
    name: "Copper Kettle Coffee",
    owner: "Sara Ahmed",
    category: "Food & Beverage",
  },
  {
    rank: 6,
    name: "Ironwood Fitness",
    owner: "James Chen",
    category: "Health & Wellness",
  },
  {
    rank: 7,
    name: "Willow Lane Florals",
    owner: "Priya Patel",
    category: "Retail & Fashion",
  },
  {
    rank: 8,
    name: "Northside Auto Care",
    owner: "Carlos Rivera",
    category: "Automotive",
  },
  {
    rank: 9,
    name: "The Reading Room",
    owner: "Anna Kowalski",
    category: "Retail & Fashion",
  },
  {
    rank: 10,
    name: "Sunset Yoga Studio",
    owner: "Maya Thompson",
    category: "Health & Wellness",
  },
  {
    rank: 11,
    name: "Pinnacle Consulting",
    owner: "Robert Chen",
    category: "Professional Services",
  },
  {
    rank: 12,
    name: "Bloom & Grow Nursery",
    owner: "Lisa Park",
    category: "Home & Garden",
  },
  {
    rank: 13,
    name: "Velvet & Vine",
    owner: "Daniel Garcia",
    category: "Retail & Fashion",
  },
  {
    rank: 14,
    name: "Summit Coffee Roasters",
    owner: "Amanda Lee",
    category: "Food & Beverage",
  },
  {
    rank: 15,
    name: "CoreFit Studio",
    owner: "Marcus Brown",
    category: "Health & Wellness",
  },
  {
    rank: 16,
    name: "Harbor Bookshop",
    owner: "Rachel Kim",
    category: "Retail & Fashion",
  },
  {
    rank: 17,
    name: "Evergreen Landscaping",
    owner: "Tom Wilson",
    category: "Home & Garden",
  },
  {
    rank: 18,
    name: "Bright Ideas Agency",
    owner: "Jessica Taylor",
    category: "Professional Services",
  },
  {
    rank: 19,
    name: "Golden Wheat Bakery",
    owner: "Omar Hassan",
    category: "Food & Beverage",
  },
  {
    rank: 20,
    name: "Tranquil Spa & Wellness",
    owner: "Sophie Martin",
    category: "Health & Wellness",
  },
];

function seededScore(base: number, round: number, seed: number) {
  const x = Math.sin(seed * 999 + round * 37) * 10000;
  const frac = x - Math.floor(x);
  return Math.round(base - round * 40 + frac * 300);
}

function seededTrend(round: number, seed: number): Trend {
  const x = Math.sin(seed * 53 + round * 91) * 10000;
  const frac = x - Math.floor(x);
  if (frac < 0.3) return "Natural";
  if (frac < 0.65) return "Up";
  return "Down";
}

const ROUND_LIMITS = [20, 16, 12, 8, 5];

function getRoundData(roundIndex: number): Business[] {
  const limit = ROUND_LIMITS[roundIndex] ?? 20;
  return BASE_BUSINESSES.slice(0, limit).map((b, i) => ({
    ...b,
    score: 4900 - i * 40 + (seededScore(4900, roundIndex, i) % 60),
    trend: seededTrend(roundIndex, i),
  }))
    .sort((a, b) => b.score - a.score)
    .map((b, i) => ({ ...b, rank: i + 1 }));
}

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
  const [leaderboard, setLeaderboard] =
    useState<RoundLeaderboardData | null>(null);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  const apiRound = rounds?.[activeRound];
  const roundNumber = apiRound?.round_number ?? activeRound + 1;

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
    : ROUNDS.map((label, i) => ({
        index: i,
        label,
        isActive: activeRound === i,
        isDisabled: false,
      }));

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

  // Header content — merged from live round data where available.
  const fallbackContent = ROUND_CONTENT[activeRound] ?? ROUND_CONTENT[0];
  const roundContent = apiRound
    ? {
        title: apiRound.title || fallbackContent.title,
        phase: `Round ${apiRound.round_number}`,
        description:
          apiRound.goal || apiRound.requirements || fallbackContent.description,
        participants:
          leaderboard?.total_entries ?? fallbackContent.participants,
        advancing: apiRound.advance_limit ?? fallbackContent.advancing,
        advancingPct:
          apiRound.advance_limit != null &&
          leaderboard?.total_entries != null &&
          leaderboard.total_entries > 0
            ? Math.round((apiRound.advance_limit / leaderboard.total_entries) * 100)
            : fallbackContent.advancingPct,
        timeLeft:
          leaderboard?.days_left != null
            ? `${leaderboard.days_left} day${leaderboard.days_left === 1 ? "" : "s"} left`
            : fallbackContent.timeLeft,
        votingWeight:
          apiRound.voting_strategy || fallbackContent.votingWeight,
        challengePrompt: fallbackContent.challengePrompt,
      }
    : fallbackContent;

  // Leaderboard rows — live entries for the active round, or the static
  // preview data when there is no live season yet.
  const fallbackData = useMemo(() => getRoundData(activeRound), [activeRound]);
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
      // The leaderboard endpoint returns total_score: 0 for every entry while
      // the authoritative points live on contestant.contestable.total_points.
      // Either field may carry the real value depending on the response, so
      // take the greater of the two (both are 0 when there are no points).
      score: Math.max(
        e.contestant?.contestable?.total_points ?? 0,
        e.total_score ?? 0,
      ),
      trend: normalizeTrend(e.trend),
      id: e.contestant_id ?? e.contestant?.id ?? undefined,
    }));
  }, [leaderboard]);

  const showFallback = !apiRound;
  const displayRows = showFallback ? fallbackData : leaderboardRows;
  const isFetching = !showFallback && loadingLeaderboard && !leaderboard;
  const isEmpty = !showFallback && !loadingLeaderboard && !leaderboard;

  const handleViewProfile = (businessName: string, businessId?: number) => {
    const roundSlug = `round-${roundNumber}`;
    // Live leaderboard entries carry the contestant ID; the static preview
    // rows fall back to the slugified name (profile shows design defaults).
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
          <h4 className="text-sm sm:text-base lg:text-lg font-normal text-[#1D1D1F] mt-5">
            {roundContent.description}
          </h4>

          {roundContent.challengePrompt && (
            <div className="mt-4 rounded-xl bg-[#EFF6FF] p-4">
              <p className="text-xl font-normal text-[#101828] mb-1">
                Challenge:
              </p>
              <p className="text-base text-[#2563EB]">
                {roundContent.challengePrompt}
              </p>
            </div>
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
                  {String(roundContent.advancing).padStart(2, "0")} (
                  {roundContent.advancingPct}%)
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
                  {roundContent.timeLeft}
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
                  {roundContent.votingWeight}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard table */}
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
                displayRows.map((b, idx) => (
                  <tr
                    key={b.id || b.name}
                    className={`text-sm sm:text-base ${
                      idx !== displayRows.length - 1
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
    </div>
  );
}
