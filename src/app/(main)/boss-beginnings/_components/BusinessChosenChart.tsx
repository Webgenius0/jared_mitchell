"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiThumbUp,
  HiOutlineThumbUp,
  HiHeart,
  HiOutlineHeart,
  HiFire,
  HiOutlineFire,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { CMSBossBeginningsSteps, RoundLeaderboardData } from "@/Types/cms";
import {
  apiClapBusiness,
  apiSaveBusiness,
  apiShareBusiness,
} from "@/Hooks/api/events_api";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { getItem, setItem } from "@/lib/localStorage";
import { isUsableImage } from "@/lib/utils";
import {
  getRoundLeaderboard,
  getActiveSeasonRounds,
} from "@/lib/Services/cms_service";
import { FaArrowTrendUp } from "react-icons/fa6";

import brewBloomImg from "../../../../Assets/roundbg.png";

// Interaction state is persisted per user so the filled state survives reloads.
// Markers are stored as flat lists of "prefix:userId:businessId" entries so
// different users never see each other's state on a shared device.
const CLAPPED_KEY = "clapped_business_ids";
const SAVED_KEY = "saved_business_ids";
const SHARED_KEY = "shared_business_ids";
const MARKER_PREFIX_CLAP = "clapped:";
const MARKER_PREFIX_SAVE = "saved:";
const MARKER_PREFIX_SHARE = "shared:";

const hasMarker = (storageKey: string, marker: string) => {
  try {
    const raw = getItem(storageKey) || "[]";
    const entries: string[] = JSON.parse(raw);
    return Array.isArray(entries) && entries.includes(marker);
  } catch {
    return false;
  }
};

const persistMarker = (storageKey: string, marker: string) => {
  try {
    const raw = getItem(storageKey) || "[]";
    const entries: string[] = JSON.parse(raw);
    const next = Array.isArray(entries)
      ? Array.from(new Set([...entries, marker]))
      : [marker];
    setItem(storageKey, JSON.stringify(next));
  } catch {
    // localStorage unavailable — visual state just won't persist
  }
};

const removeMarker = (storageKey: string, marker: string) => {
  try {
    const raw = getItem(storageKey) || "[]";
    const entries: string[] = JSON.parse(raw);
    if (!Array.isArray(entries)) return;
    setItem(storageKey, JSON.stringify(entries.filter(e => e !== marker)));
  } catch {
    // localStorage unavailable — visual state just won't persist
  }
};

interface BusinessChosenChartProps {
  data: CMSBossBeginningsSteps;
  roundData?: RoundLeaderboardData | null;
  /** Fallback round id used to self-fetch the leaderboard on the client when
   * `roundData` wasn't provided (e.g. the server snapshot was stale or the
   * server-side fetch failed). */
  roundId?: number | null;
  /** When true, render a paginated grid (CARDS_PER_PAGE cards per page) instead of the carousel */
  paginated?: boolean;
}

const CARDS_PER_PAGE = 12;

interface PointRule {
  icon: React.ReactNode;
  label: string;
  points: number;
  frequency: string;
}

interface BusinessCard {
  id: string;
  /** Actual business id used for the interaction endpoints (/v1/businesses/:business_id/...) */
  businessId: number;
  name: string;
  description: string;
  location: string;
  image: string;
  totalPoints: number;
  rank: number;
  claps: number;
  loves: number;
  fires: number;
}

const pointRules: PointRule[] = [
  {
    icon: <HiOutlineThumbUp />,
    label: "Clap",
    points: 1,
    frequency: "1 per nominee per day",
  },
  {
    icon: <HiOutlineHeart />,
    label: "Love",
    points: 3,
    frequency: "Once per nominee",
  },
  {
    icon: <HiOutlineFire />,
    label: "Fire",
    points: 5,
    frequency: "Once per day per platform",
  },
];

interface InteractionConfig {
  apiCall: (businessId: number) => Promise<any>;
  storageKey: string;
  markerPrefix: string;
  flagField: string;
  businessId: number;
  initialCount: number;
  loginMessage: string;
  failMessage: string;
  onSuccess?: () => void;
}

const useBusinessInteraction = ({
  apiCall,
  storageKey,
  markerPrefix,
  flagField,
  businessId,
  initialCount,
  loginMessage,
  failMessage,
  onSuccess,
}: InteractionConfig) => {
  const { token, user } = useAuth();
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (user?.id == null) return;
    const realMarker = `${markerPrefix}${user.id}:${businessId}`;
    const guestMarker = `${markerPrefix}guest:${businessId}`;
    setActive(
      prev =>
        prev ||
        hasMarker(storageKey, realMarker) ||
        hasMarker(storageKey, guestMarker),
    );
  }, [user?.id, storageKey, markerPrefix, businessId]);

  // Keep local count in sync when the leaderboard data refetches
  useEffect(() => {
    setCount(initialCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCount]);

  const trigger = async () => {
    if (!token) {
      toast.error(loginMessage);
      router.push("/auth/login");
      return;
    }
    if (submittingRef.current || loading) return;
    submittingRef.current = true;
    setLoading(true);
    const wasActive = active;
    const prevCount = count;
    const guestMarker = `${markerPrefix}guest:${businessId}`;
    const markers = user?.id
      ? [`${markerPrefix}${user.id}:${businessId}`, guestMarker]
      : [guestMarker];

    // Optimistic toggle
    setActive(prev => !prev);
    setCount(prev => Math.max(0, prev + (wasActive ? -1 : 1)));

    // Only the on/off flag is reconciled from the interaction response (so the
    // button state + persistence stay correct). The counts and total points are
    // intentionally NOT shown from this response — after an interaction we
    // refetch the round leaderboard (/v1/contest/rounds/:id/leaderboard) and
    // set the card data from that authoritative source instead.
    const syncFromResponse = (response: any) => {
      if (response?.data?.[flagField] === true) {
        setActive(true);
        markers.forEach(m => persistMarker(storageKey, m));
      } else if (response?.data?.[flagField] === false) {
        setActive(false);
        markers.forEach(m => removeMarker(storageKey, m));
      }
    };

    try {
      const res = await apiCall(businessId);
      if (res?.success) {
        syncFromResponse(res);
        if (res?.message) toast.success(res.message);
        onSuccess?.();
      } else {
        // Backend rejected — revert the optimistic toggle
        setActive(wasActive);
        setCount(prevCount);
        if (res?.message) toast.error(res.message);
      }
    } catch {
      setActive(wasActive);
      setCount(prevCount);
      toast.error(failMessage);
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return { count, loading, active, trigger };
};

// ---------------------------------------------------------------------------
// Leaderboard merge helper
// ---------------------------------------------------------------------------
// The background refetch after an interaction is authoritative (it uses
// `noCache`), and interactions are reversible — the API returns responses
// like "Business fired removed successfully" and points can go down when a
// fire/love/clap is removed. So the freshest server values always win here;
// previous values are only used to fill in fields the incoming entry omits.
const mergeLeaderboardData = (
  prev: RoundLeaderboardData | null,
  incoming: RoundLeaderboardData,
): RoundLeaderboardData => {
  if (!prev) return incoming;

  const prevByBusiness = new Map(
    prev.entries.map(e => [e.contestant.business_id, e]),
  );

  return {
    ...incoming,
    entries: incoming.entries.map(entry => {
      const prevEntry = prevByBusiness.get(entry.contestant.business_id);
      if (!prevEntry) return entry;

      return {
        ...entry,
        total_score: entry.total_score ?? prevEntry.total_score ?? 0,
        contestant: {
          ...entry.contestant,
          contestable: {
            ...entry.contestant.contestable,
            total_points:
              entry.contestant?.contestable?.total_points ??
              prevEntry.contestant?.contestable?.total_points ??
              0,
          },
        },
        claps: entry.claps ?? prevEntry.claps ?? 0,
        saves: entry.saves ?? prevEntry.saves ?? 0,
        shares: entry.shares ?? prevEntry.shares ?? 0,
      };
    }),
  };
};

const BusinessChosenChart = ({
  data,
  roundData,
  roundId,
  paginated = false,
}: BusinessChosenChartProps) => {
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [liveData, setLiveData] = useState<RoundLeaderboardData | null>(
    roundData ?? null,
  );
  const [noActiveRound, setNoActiveRound] = useState(false);
  useEffect(() => {
    if (!roundData) return;
    setLiveData(prev => mergeLeaderboardData(prev, roundData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundData]);


  useEffect(() => {
    if (roundData) return;
    let cancelled = false;

    const load = async () => {
      try {
        // Prefer the round id the page already resolved server-side.
        if (roundId) {
          const res = await getRoundLeaderboard(roundId, { noCache: true });
          if (cancelled) return;
          if (res?.data) {
            setLiveData(res.data);
            return;
          }
        }

        // Otherwise resolve the active round ourselves.
        const seasonRes = await getActiveSeasonRounds();
        const rounds = seasonRes?.data?.rounds ?? [];
        const activeRound = rounds.find(r => r.is_active);
        if (cancelled) return;
        if (!activeRound) {
          setNoActiveRound(true);
          return;
        }
        const res = await getRoundLeaderboard(activeRound.id, {
          noCache: true,
        });
        if (!cancelled && res?.data) setLiveData(res.data);
      } catch {
        // Failed to determine the round — leave the section hidden.
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [roundData, roundId]);

  const currentRoundData = liveData ?? roundData;

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshLeaderboard = useCallback(() => {
    if (!currentRoundData?.round_id) return;
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(async () => {
      refreshTimerRef.current = null;
      try {
        // noCache so a repeat click's points change is never served stale
        const res = await getRoundLeaderboard(currentRoundData.round_id, {
          noCache: true,
        });

        
        if (res?.data) {
          setLiveData(prev => mergeLeaderboardData(prev, res.data));
        }
      } catch {
        // Keep current data if the refresh fails
      }
    }, 250);
  }, [currentRoundData?.round_id]);

  // Clear any pending refresh timer on unmount
  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []);

  if (noActiveRound) {
    return null;
  }

  if (!currentRoundData) {
    return null;
  }

  const roundNumber = currentRoundData.round.round_number;

  const businesses: BusinessCard[] = currentRoundData.entries.map(entry => {
    const rawImage =
      entry.contestant.avatar_url || entry.avatar_url || undefined;

    const name = entry.display_name || entry.contestant?.display_name || "";
    const businessName = entry.contestant.contestable.business_name;
    const description =
      businessName && businessName !== name ? businessName : "";

    return {
      id: String(entry.contestant_id),
      businessId: entry.contestant.business_id,
      name,
      description,
      location: "",
      image: isUsableImage(rawImage) ? (rawImage as string) : brewBloomImg.src,
      totalPoints: Math.max(
        entry.contestant?.contestable?.total_points ?? 0,
        entry.total_score ?? 0,
      ),
      rank: entry.rank,
      claps: entry.claps ?? 0,
      loves: entry.saves ?? 0,
      fires: entry.shares ?? 0,
    };
  });

  const scrollByCard = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card?.offsetWidth ?? 320;
    const gap = 24;
    const amount = cardWidth + gap;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  // Pagination helpers (paginated mode)
  const pageCount = Math.max(1, Math.ceil(businesses.length / CARDS_PER_PAGE));
  const safePage = Math.min(currentPage, pageCount);
  const startIndex = (safePage - 1) * CARDS_PER_PAGE;
  const visibleBusinesses = businesses.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE,
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), pageCount));
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="py-20 overflow-x-hidden scroll-mt-24">
      <div className="container">
        <h2 className="section_title text-center">
          {data?.title ?? "How Winners Are Chosen"}
        </h2>
        <p className="section_sub_title text-center">
          {data?.sub_title ??
            "Business Launch Award is decided by the community, with OSI guardrails for fairness."}
        </p>

        {/* Active round badge */}
        {currentRoundData?.round && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-blue/10 text-primary-blue px-4 py-1.5 text-sm font-medium">
              Round {currentRoundData.round.round_number}
              {currentRoundData.round.title &&
                ` — ${currentRoundData.round.title}`}
            </span>
            {currentRoundData.days_left != null && (
              <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 px-4 py-1.5 text-sm font-medium">
                {currentRoundData.days_left} day
                {currentRoundData.days_left === 1 ? "" : "s"} left
              </span>
            )}
          </div>
        )}

        {/* Point rules — shown only during round 1 (the community voting round) */}
        {roundNumber === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {pointRules.map(rule => (
              <div
                key={rule.label}
                className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <div className="size-12 rounded-full bg-blue-100 text-blue-500 grid place-items-center text-xl mb-3">
                  {rule.icon}
                </div>
                <p className="font-medium text-slate-700">{rule.label}</p>
                <p className="text-2xl font-bold mt-1">{rule.points} PT</p>
                <p className="text-sm text-slate-500 mt-1">{rule.frequency}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {paginated ? (
        <div className="container mt-16">
          {visibleBusinesses.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleBusinesses.map(biz => (
                  <BusinessCardItem
                    key={biz.id}
                    biz={biz}
                    roundNumber={roundNumber}
                    onInteractionSuccess={refreshLeaderboard}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              {pageCount > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className="size-9 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <HiChevronLeft className="text-lg" />
                  </button>

                  {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                    page => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === safePage ? "page" : undefined}
                        className={`size-9 rounded-full text-sm font-medium transition-colors ${
                          page === safePage
                            ? "bg-primary-blue text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === pageCount}
                    aria-label="Next page"
                    className="size-9 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <HiChevronRight className="text-lg" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        businesses.length > 0 && (
          <div className="relative mt-16 w-screen mx-[calc(50%-50vw)] overflow-hidden">
            {/* Edge fade overlays so clipped/partial cards read as intentional, not broken. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-[5] bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-[5] bg-gradient-to-l from-white to-transparent" />

            <button
              onClick={() => scrollByCard("prev")}
              aria-label="Scroll left"
              className="grid absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-white shadow-md place-items-center hover:bg-slate-50 border border-slate-200 transition-transform hover:scale-105"
            >
              <HiChevronLeft className="text-lg" />
            </button>

            <ul
              ref={scrollerRef}
              className="flex gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-8"
            >
              {businesses.map(biz => (
                <li
                  key={biz.id}
                  data-card
                  className="shrink-0 w-[280px] sm:w-[320px] snap-start"
                >
                  <BusinessCardItem
                    biz={biz}
                    roundNumber={roundNumber}
                    onInteractionSuccess={refreshLeaderboard}
                  />
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollByCard("next")}
              aria-label="Scroll right"
              className="grid absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-white shadow-md place-items-center hover:bg-slate-50 border border-slate-200 transition-transform hover:scale-105"
            >
              <HiChevronRight className="text-lg" />
            </button>
          </div>
        )
      )}
    </section>
  );
};

const BusinessCardItem = ({
  biz,
  roundNumber,
  onInteractionSuccess,
}: {
  biz: BusinessCard;
  roundNumber: number;
  onInteractionSuccess?: () => void;
}) => {
  // Only round 1 (the open qualifier) accepts community interactions — the
  // clap/love/fire buttons are hidden for rounds 2–5.
  const showInteractions = roundNumber === 1;
  const clap = useBusinessInteraction({
    apiCall: apiClapBusiness,
    storageKey: CLAPPED_KEY,
    markerPrefix: MARKER_PREFIX_CLAP,
    flagField: "is_clapped",
    businessId: biz.businessId,
    initialCount: biz.claps,
    loginMessage: "Please login to clap",
    failMessage: "Failed to clap. Please try again.",
    onSuccess: onInteractionSuccess,
  });

  const love = useBusinessInteraction({
    apiCall: apiSaveBusiness,
    storageKey: SAVED_KEY,
    markerPrefix: MARKER_PREFIX_SAVE,
    flagField: "is_saved",
    businessId: biz.businessId,
    initialCount: biz.loves,
    loginMessage: "Please login to love this business",
    failMessage: "Failed to love. Please try again.",
    onSuccess: onInteractionSuccess,
  });

  const fire = useBusinessInteraction({
    apiCall: apiShareBusiness,
    storageKey: SHARED_KEY,
    markerPrefix: MARKER_PREFIX_SHARE,
    flagField: "is_shared",
    businessId: biz.businessId,
    initialCount: biz.fires,
    loginMessage: "Please login to fire this business",
    failMessage: "Failed to fire. Please try again.",
    onSuccess: onInteractionSuccess,
  });

  // Points delta badge ----------------------------------------------------
  // Whenever the card's total points changes (from the leaderboard refetch
  // after an interaction), float a "+N / -N PT" badge over the Total Points
  // row so the change is visible at a glance.
  const [pointsDelta, setPointsDelta] = useState<number | null>(null);
  const [deltaNonce, setDeltaNonce] = useState(0);
  const prevTotalRef = useRef(biz.totalPoints);
  const deltaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevTotalRef.current;
    if (prev === biz.totalPoints) return;
    prevTotalRef.current = biz.totalPoints;
    const change = biz.totalPoints - prev;
    if (change === 0) return;
    setPointsDelta(change);
    // Re-key so repeated equal deltas restart the pop animation
    setDeltaNonce(n => n + 1);
    if (deltaTimerRef.current) clearTimeout(deltaTimerRef.current);
    deltaTimerRef.current = setTimeout(() => setPointsDelta(null), 1700);
  }, [biz.totalPoints]);

  // Clear any pending delta timer on unmount
  useEffect(() => {
    return () => {
      if (deltaTimerRef.current) clearTimeout(deltaTimerRef.current);
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image src={biz.image} alt={biz.name} fill className="object-cover" />
        <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 rounded-full px-3 py-1">
          #{biz.rank}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-semibold text-lg">{biz.name}</p>
        {biz.description && (
          <p className="text-sm text-slate-500">{biz.description}</p>
        )}

        {/* Total points */}
        <div className="relative flex items-center justify-between mt-4 bg-slate-50 rounded-xl px-3 py-2">
          <span className="text-sm text-slate-500">Total Points</span>
          <span className="flex items-center gap-1 font-semibold ">
            {biz.totalPoints.toLocaleString()}
            <FaArrowTrendUp className="text-green-500" />
          </span>
          {pointsDelta !== null && (
            <span
              key={deltaNonce}
              className={`points-delta-pop absolute -top-3 right-3 z-10 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm ${
                pointsDelta > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {pointsDelta > 0 ? `+${pointsDelta}` : pointsDelta} PT
            </span>
          )}
        </div>

        {/* Clap / Love / Fire Action buttons — round 1 only */}
        {showInteractions && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            <ActionButton
              icon={clap.active ? <HiThumbUp /> : <HiOutlineThumbUp />}
              label="Clap"
              count={clap.count}
              onClick={clap.trigger}
              loading={clap.loading}
              loadingColor="text-blue-500 border-blue-200 bg-blue-50"
              active={clap.active}
              activeColor="text-blue-500 border-blue-200 bg-blue-50"
              activeTextColor="text-blue-500"
              activeHoverColor="hover:bg-blue-50"
            />
            <ActionButton
              icon={love.active ? <HiHeart /> : <HiOutlineHeart />}
              label="Love"
              count={love.count}
              onClick={love.trigger}
              loading={love.loading}
              loadingColor="text-rose-500 border-rose-200 bg-rose-50"
              active={love.active}
              activeColor="text-rose-500 border-rose-200 bg-rose-50"
              activeTextColor="text-rose-500"
              activeHoverColor="hover:bg-rose-50"
            />
            <ActionButton
              icon={fire.active ? <HiFire /> : <HiOutlineFire />}
              label="Fire"
              count={fire.count}
              onClick={fire.trigger}
              loading={fire.loading}
              loadingColor="text-orange-500 border-orange-200 bg-orange-50"
              active={fire.active}
              activeColor="text-orange-500 border-orange-200 bg-orange-50"
              activeTextColor="text-orange-500"
              activeHoverColor="hover:bg-orange-50"
            />
          </div>
        )}

        <Link
          href={`/boss-beginnings-contest/profile/round-${roundNumber}/${biz.id}`}
          className="flex justify-center"
        >
          <button className="text-blue-500 text-sm font-normal mt-3 flex items-center gap-1 hover:underline">
            Score This Business <span aria-hidden>→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

const ActionButton = ({
  icon,
  label,
  count,
  onClick,
  loading = false,
  loadingColor = "",
  active = false,
  activeColor = "",
  activeTextColor = "text-blue-500",
  activeHoverColor = "hover:bg-blue-50",
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  onClick?: () => void;
  loading?: boolean;
  /** Tailwind classes applied to icon/text while the action is in flight */
  loadingColor?: string;
  /** When true, render the button in its "selected" (already done) state */
  active?: boolean;
  /** Tailwind classes applied to the whole button while active */
  activeColor?: string;
  /** Tailwind color class for the icon/text while active (e.g. text-rose-500) */
  activeTextColor?: string;
  /** Tailwind hover class for the button while active (e.g. hover:bg-rose-50) */
  activeHoverColor?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    aria-pressed={active || undefined}
    className={`flex flex-col items-center justify-center gap-1 border rounded-lg py-2 disabled:opacity-60 disabled:cursor-wait transition-colors ${
      active
        ? `${activeColor} ${activeHoverColor}`
        : "border-slate-200 hover:bg-slate-50"
    }`}
  >
    <span
      className={`${loading ? loadingColor : active ? activeTextColor : "text-slate-500"}`}
    >
      {loading ? (
        <span className="inline-block animate-pulse">{icon}</span>
      ) : (
        icon
      )}
    </span>
    <span
      className={`text-[10px] ${loading ? loadingColor : active ? activeTextColor : "text-slate-500"}`}
    >
      {label}
    </span>
    <span className="text-xs font-semibold">{count}</span>
  </button>
);

export default BusinessChosenChart;
