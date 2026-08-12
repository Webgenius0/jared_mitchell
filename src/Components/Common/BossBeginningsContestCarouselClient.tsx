"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiEye,
  FiUsers,
  FiLock,
  FiMinus,
  FiAward,
} from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
import { CiAlarmOn } from "react-icons/ci";
import {
  HiMiniArrowTrendingUp,
  HiMiniArrowTrendingDown,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { slugify } from "@/lib/utils";
import {
  ActiveSeasonRound,
  CMSRoundsSection,
  RoundLeaderboardData,
} from "@/Types/cms";
import { getRoundLeaderboard } from "@/lib/Services/cms_service";
import OSIPanelTab from "@/app/(main)/boss-beginnings-contest/Components/OSIPanelTab";
import LeaderboardTab from "@/app/(main)/boss-beginnings-contest/Components/LeaderboardTab";

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
  votes?: number;
  avatar?: string | null;
};

const TABS = ["Voting", "OSI Panel", "Leader-board"] as const;

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
  return BASE_BUSINESSES.slice(0, limit)
    .map((b, i) => ({
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
  if (trend === "Up") return "text-emerald-400";
  if (trend === "Down") return "text-red-400";
  return "text-blue-200";
};

const normalizeTrend = (trend: string): Trend => {
  const value = (trend || "").toLowerCase();
  if (value === "up" || value === "upward") return "Up";
  if (value === "down" || value === "downward") return "Down";
  return "Natural";
};

const TrendBadge = ({ trend }: { trend: Trend }) => {
  const Icon =
    trend === "Up"
      ? HiMiniArrowTrendingUp
      : trend === "Down"
        ? HiMiniArrowTrendingDown
        : FiMinus;
  const label = trend === "Up" ? "Trending Up" : trend === "Down" ? "Trending Down" : "Steady";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-semibold ${
        trend === "Up"
          ? "bg-emerald-400/20 text-emerald-300"
          : trend === "Down"
            ? "bg-red-400/20 text-red-300"
            : "bg-white/15 text-blue-100"
      }`}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  );
};

interface BossBeginningsContestCarouselClientProps {
  /** Rounds of the live contest season — drive the round tabs, round content and leaderboard */
  rounds?: ActiveSeasonRound[];
  /** CMS content for the "OSI Panel" tab */
  roundsData?: CMSRoundsSection;
  /** ID of the round to open by default */
  activeRoundId?: number | null;
  /** Optional section heading shown above the tabs */
  title?: string;
  /** Auto-advance the carousel every few seconds */
  autoPlay?: boolean;
}

export default function BossBeginningsContestCarouselClient({
  rounds,
  roundsData,
  activeRoundId,
  title = "Boss Beginnings Contest",
  autoPlay = true,
}: BossBeginningsContestCarouselClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("Voting");

  // Default to the active round (is_active) so its tab is open on load;
  // falls back to the first round when no live season data is available.
  const [activeRound, setActiveRound] = useState(() => {
    if (!rounds?.length) return 0;
    const activeIdx = rounds.findIndex(r => r.id === activeRoundId);
    if (activeIdx >= 0) return activeIdx;
    const isActiveIdx = rounds.findIndex(r => r.is_active);
    return isActiveIdx >= 0 ? isActiveIdx : 0;
  });

  const [leaderboard, setLeaderboard] = useState<RoundLeaderboardData | null>(
    null,
  );
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

  // Swiper state — used for the custom prev/next arrows + counter
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Reset the carousel position whenever the round changes. (Swiper itself is
  // remounted via the per-round `key`, so only the counter needs resetting.)
  useEffect(() => {
    setActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRound]);

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
            ? Math.round(
                (apiRound.advance_limit / leaderboard.total_entries) * 100,
              )
            : fallbackContent.advancingPct,
        timeLeft:
          leaderboard?.days_left != null
            ? `${leaderboard.days_left} day${leaderboard.days_left === 1 ? "" : "s"} left`
            : fallbackContent.timeLeft,
        votingWeight: apiRound.voting_strategy || fallbackContent.votingWeight,
        challengePrompt: fallbackContent.challengePrompt,
      }
    : fallbackContent;

  // Contestant rows — live entries for the active round, or the static
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
      // Round 1 shows lifetime total_points; every other round shows that
      // round's total_score (points/votes earned within this round only).
      score:
        roundNumber === 1
          ? (e.contestant?.contestable?.total_points ?? 0)
          : (e.total_score ?? 0),
      trend: normalizeTrend(e.trend),
      id: e.contestant_id ?? e.contestant?.id ?? undefined,
      votes: e.votes_count,
      avatar: e.avatar_url,
    }));
  }, [leaderboard, roundNumber]);

  const showFallback = !apiRound;
  const displayRows = showFallback ? fallbackData : leaderboardRows;
  const isFetching = !showFallback && loadingLeaderboard && !leaderboard;
  const isEmpty =
    !showFallback && !loadingLeaderboard && displayRows.length === 0;

  const handleViewProfile = (businessName: string, businessId?: number) => {
    const roundSlug = `round-${roundNumber}`;
    // Live leaderboard entries carry the contestant ID; the static preview
    // rows fall back to the slugified name (profile shows design defaults).
    const slug = businessId ?? slugify(businessName);
    router.push(`/boss-beginnings-contest/profile/${roundSlug}/${slug}`);
  };

  const handleRoundSelect = (index: number) => {
    if (roundTabs[index]?.isDisabled) return;
    setActiveRound(index);
  };

  const carouselKey =
    apiRound?.id != null ? `round-${apiRound.id}` : `fallback-${activeRound}`;

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        {title && (
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101828]">
              {title}
            </h2>
            <p className="text-[12px] sm:text-sm tracking-[0.2em] uppercase text-black/40 mt-2">
              Community-Driven • Fair • Scalable
            </p>
          </div>
        )}

        {/* Top tabs */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 border-b border-black/10 mb-6 px-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-[13px] sm:text-[14px] font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-[#2563EB]"
                  : "text-black/50 hover:text-black/70"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#2563EB] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "OSI Panel" && <OSIPanelTab data={roundsData} />}
        {activeTab === "Leader-board" && <LeaderboardTab />}

        {activeTab === "Voting" && (
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
                      onClick={() => handleRoundSelect(tab.index)}
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

              <div>
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

            {/* Contestants — swapped out for a completion banner once this
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
            ) : isFetching ? (
              <div className="rounded-2xl border border-black/10 bg-white p-10 sm:p-14 flex flex-col items-center text-center">
                <div className="size-10 border-4 border-[#2563EB]/20 border-t-[#2563EB] rounded-full animate-spin mb-4" />
                <p className="text-sm text-black/40">
                  Loading contestants…
                </p>
              </div>
            ) : isEmpty ? (
              <div className="rounded-2xl border border-black/10 bg-white p-10 sm:p-14 flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1977DD29] flex items-center justify-center mb-4">
                  <FiUsers className="size-6 sm:size-7 text-blue-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#101828]">
                  No contestants yet
                </h3>
                <p className="text-sm sm:text-base text-black/50 mt-2 max-w-md">
                  No leaderboard data is available for this round yet. Check
                  back soon.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 lg:p-8">
                <div className="boss-carousel">
                  <div className="relative max-w-2xl mx-auto">
                    <Swiper
                      key={carouselKey}
                      modules={[Pagination, Autoplay]}
                      slidesPerView={1}
                      spaceBetween={24}
                      centeredSlides={false}
                      grabCursor
                      pagination={{ clickable: true }}
                      autoplay={
                        autoPlay && displayRows.length > 1
                          ? {
                              delay: 4000,
                              disableOnInteraction: false,
                              pauseOnMouseEnter: true,
                            }
                          : false
                      }
                      onSwiper={s => setSwiper(s)}
                      onSlideChange={s => setActiveIndex(s.activeIndex)}
                    >
                    {displayRows.map(b => (
                      <SwiperSlide key={b.id ?? `${b.name}-${b.rank}`}>
                        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_40px_-12px_rgba(37,99,235,0.25)]">
                          {/* Gradient header */}
                          <div className="bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] px-5 sm:px-7 py-5 sm:py-6 text-white flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <span
                                className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl text-lg sm:text-2xl font-bold shadow-lg ${rankBadgeStyle(
                                  b.rank,
                                )}`}
                              >
                                #{b.rank}
                              </span>

                              {b.avatar ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={b.avatar}
                                  alt={b.name}
                                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white/40 object-cover"
                                />
                              ) : (
                                <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/15 border border-white/25">
                                  <FiAward className="size-5 sm:size-6" />
                                </span>
                              )}
                            </div>

                            <TrendBadge trend={b.trend} />
                          </div>

                          {/* Body */}
                          <div className="p-5 sm:p-7">
                            <h3 className="text-lg sm:text-2xl font-semibold text-[#101828] leading-tight">
                              {b.name}
                            </h3>
                            <p className="text-[12px] sm:text-sm text-black/50 mt-1">
                              {b.owner}
                            </p>

                            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-5 sm:mt-6">
                              <div className="rounded-xl bg-[#F5F7FB] px-3 py-3 sm:py-4 text-center">
                                <p className="text-[10px] sm:text-xs text-black/45 uppercase tracking-wide">
                                  Score
                                </p>
                                <p className="text-sm sm:text-lg font-bold text-[#2563EB] mt-1">
                                  {b.score.toLocaleString()}
                                </p>
                              </div>
                              <div className="rounded-xl bg-[#F5F7FB] px-3 py-3 sm:py-4 text-center">
                                <p className="text-[10px] sm:text-xs text-black/45 uppercase tracking-wide">
                                  Trend
                                </p>
                                <p
                                  className={`text-sm sm:text-lg font-bold mt-1 ${trendStyle(
                                    b.trend,
                                  )}`}
                                >
                                  {b.trend}
                                </p>
                              </div>
                              <div className="rounded-xl bg-[#F5F7FB] px-3 py-3 sm:py-4 text-center">
                                <p className="text-[10px] sm:text-xs text-black/45 uppercase tracking-wide">
                                  {b.votes != null ? "Votes" : "Category"}
                                </p>
                                <p className="text-sm sm:text-lg font-bold text-[#101828] mt-1 truncate">
                                  {b.votes != null
                                    ? b.votes.toLocaleString()
                                    : b.category}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="px-5 sm:px-7 pb-5 sm:pb-7">
                            <button
                              onClick={() => handleViewProfile(b.name, b.id)}
                              className="inline-flex w-full items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm sm:text-base font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
                            >
                              <FiEye className="size-4 sm:size-5" />
                              View Profile
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                    {/* Custom arrows — hug the carousel edges */}
                    <button
                      onClick={() => swiper?.slidePrev()}
                      disabled={activeIndex === 0}
                      aria-label="Previous contestant"
                      className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-2 lg:-left-6 z-10 size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#2563EB] shadow-md hover:bg-[#2563EB] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <HiMiniChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={() => swiper?.slideNext()}
                      disabled={activeIndex >= displayRows.length - 1}
                      aria-label="Next contestant"
                      className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-2 lg:-right-6 z-10 size-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#2563EB] shadow-md hover:bg-[#2563EB] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <HiMiniChevronRight className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Counter + mobile prev/next */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={() => swiper?.slidePrev()}
                    disabled={activeIndex === 0}
                    aria-label="Previous contestant"
                    className="sm:hidden size-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#2563EB] shadow-sm hover:bg-[#2563EB] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer inline-flex"
                  >
                    <HiMiniChevronLeft className="size-4" />
                  </button>
                  <p className="text-[12px] sm:text-sm text-black/50 font-medium tabular-nums">
                    {activeIndex + 1} / {displayRows.length}
                  </p>
                  <button
                    onClick={() => swiper?.slideNext()}
                    disabled={activeIndex >= displayRows.length - 1}
                    aria-label="Next contestant"
                    className="sm:hidden size-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#2563EB] shadow-sm hover:bg-[#2563EB] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer inline-flex"
                  >
                    <HiMiniChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .boss-carousel .swiper-pagination {
          position: static;
          margin-top: 24px;
        }
        .boss-carousel .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .boss-carousel .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 999px;
          background: #2563eb;
        }
      `}</style>
    </section>
  );
}
