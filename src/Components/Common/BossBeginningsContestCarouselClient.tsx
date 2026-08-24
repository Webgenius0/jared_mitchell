"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiUsers, FiMinus, FiAward } from "react-icons/fi";
import { SlBadge } from "react-icons/sl";
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
  votes?: number;
  avatar?: string | null;
};

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
  const label =
    trend === "Up"
      ? "Trending Up"
      : trend === "Down"
        ? "Trending Down"
        : "Steady";
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
  /** Rounds of the live contest season — the active round drives the carousel */
  rounds?: ActiveSeasonRound[];
  /** ID of the round to open by default */
  activeRoundId?: number | null;
  /** Optional section heading shown above the carousel */
  title?: string;
  /** Auto-advance the carousel every few seconds */
  autoPlay?: boolean;
}

export default function BossBeginningsContestCarouselClient({
  rounds,
  activeRoundId,
  title = "OSI Top Business Award Contest",
  autoPlay = true,
}: BossBeginningsContestCarouselClientProps) {
  const router = useRouter();

  // The active round is the one shown — it drives the leaderboard and the
  // carousel. Falls back to the first round when no live season data exists.
  const activeRound = useMemo(() => {
    if (!rounds?.length) return 0;
    const activeIdx = rounds.findIndex((r) => r.id === activeRoundId);
    if (activeIdx >= 0) return activeIdx;
    const isActiveIdx = rounds.findIndex((r) => r.is_active);
    return isActiveIdx >= 0 ? isActiveIdx : 0;
  }, [rounds, activeRoundId]);

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

  // Round 1 is the open qualifier — no contestant/voting data is shown yet.
  // The carousel only renders for active rounds 2–5.
  const showRoundData = roundNumber >= 2;

  // Load the leaderboard for the active round from the live API.
  useEffect(() => {
    if (!apiRound || !showRoundData) return;
    let cancelled = false;
    setLoadingLeaderboard(true);
    getRoundLeaderboard(apiRound.id, { noCache: true })
      .then((res) => {
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
  }, [apiRound, showRoundData]);

  // Reset the carousel position whenever the round changes. (Swiper itself is
  // remounted via the per-round `key`, so only the counter needs resetting.)
  useEffect(() => {
    setActiveIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRound]);

  // Contestant rows — live entries for the active round.
  const displayRows = useMemo(() => {
    if (!leaderboard?.entries?.length) return [] as Business[];
    return leaderboard.entries.map((e) => ({
      rank: e.rank,
      name:
        e.contestable_name ||
        e.display_name ||
        e.contestant?.contestable?.business_name ||
        "",
      owner: e.contestant?.contestable?.owner_name || "",
      category: "",
      // Total score (points/votes) earned within this round.
      score: e.total_score ?? 0,
      trend: normalizeTrend(e.trend),
      id: e.contestant_id ?? e.contestant?.id ?? undefined,
      votes: e.votes_count,
      avatar: e.avatar_url,
    }));
  }, [leaderboard]);

  const isFetching = loadingLeaderboard && !leaderboard;
  const isEmpty = !loadingLeaderboard && displayRows.length === 0;

  const handleViewProfile = (businessName: string, businessId?: number) => {
    const roundSlug = `round-${roundNumber}`;
    const slug = businessId ?? slugify(businessName);
    router.push(`/boss-beginnings-contest/profile/${roundSlug}/${slug}`);
  };

  const carouselKey =
    apiRound?.id != null ? `round-${apiRound.id}` : `fallback-${activeRound}`;

  // Round 1 is the open qualifier — no contestant data to show.
  if (!showRoundData) return null;

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
            <p className="text-sm text-black/40">Loading contestants…</p>
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
              No leaderboard data is available for this round yet. Check back
              soon.
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
                  onSwiper={(s) => setSwiper(s)}
                  onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                >
                  {displayRows.map((b) => (
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
