"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { axiosPublic } from "@/Hooks/useAxiosPublic";
import { ActiveRoundCountdownRound } from "@/Types/cms";
import { FiClock, FiArrowRight } from "react-icons/fi";

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    season_id: number;
    season_title: string;
    rounds: ActiveRoundCountdownRound[];
  } | null;
  errors: any;
  code: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

// Animated countdown digit with flip effect
const CountdownDigit = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevValue !== value) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Digit container with glass effect */}
        <div className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 rounded-2xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20" />

          {/* Split line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-[0.5px] h-[1px] bg-black/10 z-10" />

          {/* Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tabular-nums transition-all duration-300 ${
                isFlipping
                  ? "scale-95 opacity-70 -translate-y-1"
                  : "scale-100 opacity-100 translate-y-0"
              }`}
            >
              {String(value).padStart(2, "0")}
            </span>
          </div>

          {/* Top shadow for depth */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Label */}
      <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-[0.2em] font-medium">
        {label}
      </span>
    </div>
  );
};

// Separator colon with pulse animation
const CountdownSeparator = () => (
  <div className="flex flex-col items-center gap-2 pt-1 sm:pt-2">
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/50 animate-pulse" />
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/50 animate-pulse" />
  </div>
);

const ActiveRoundCountdown = () => {
  const [activeRound, setActiveRound] =
    useState<ActiveRoundCountdownRound | null>(null);
  const [seasonTitle, setSeasonTitle] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reloadTriggeredRef = useRef(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const fetchCountdown = useCallback(async () => {
    try {
      const res = await axiosPublic.get<ApiResponse>(
        "/v1/contest/active-round-countdown",
      );

      if (res.data.success && res.data.data?.rounds) {
        const round = res.data.data.rounds.find((r) => r.is_active);

        if (round && round.target_date && round.countdown) {
          setActiveRound(round);
          setSeasonTitle(res.data.data.season_title || "");
          setLoading(false);
          return;
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch active round countdown:", err);
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCountdown();
  }, [fetchCountdown]);

  // Start countdown timer when data is available
  useEffect(() => {
    if (!activeRound?.target_date) return;

    reloadTriggeredRef.current = false;

    const initial = calculateTimeLeft(activeRound.target_date);
    setTimeLeft(initial);

    if (
      initial &&
      initial.days === 0 &&
      initial.hours === 0 &&
      initial.minutes === 0 &&
      initial.seconds === 0
    ) {
      if (!reloadTriggeredRef.current) {
        reloadTriggeredRef.current = true;
        setShouldReload(true);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const remaining = calculateTimeLeft(activeRound.target_date);

      if (!remaining) return;

      setTimeLeft(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (!reloadTriggeredRef.current) {
          reloadTriggeredRef.current = true;
          setShouldReload(true);
        }
      }
    }, 1000);

    return cleanup;
  }, [activeRound?.target_date, cleanup]);

  // Periodic API refresh (every 5 minutes)
  useEffect(() => {
    if (!activeRound) return;

    pollRef.current = setInterval(
      () => {
        fetchCountdown();
      },
      5 * 60 * 1000,
    );

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [activeRound, fetchCountdown]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Handle reload after countdown reaches zero
  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);

  // Compute display values
  const isExpired =
    timeLeft !== null &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const shouldShow = !loading && activeRound && timeLeft && !isExpired;

  if (!shouldShow) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl md:rounded-[2rem]">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a]" />

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Floating orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Content */}
          <div className="relative z-10 px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-16">
            {/* Top badge */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-white/90 text-xs sm:text-sm font-medium">
                  Round in Progress
                </span>
              </div>
            </div>

            {/* Season & Round info */}
            <div className="text-center mb-8 md:mb-10">
              {seasonTitle && (
                <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.25em] mb-2">
                  OSI Top Business Award
                </p>
              )}
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Round {activeRound!.round_number}
              </h3>
              {activeRound!.title && (
                <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
                  {activeRound!.title}
                </p>
              )}
            </div>

            {/* Countdown digits */}
            <div className="flex items-start justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-10">
              <CountdownDigit value={timeLeft!.days} label="Days" />
              <CountdownSeparator />
              <CountdownDigit value={timeLeft!.hours} label="Hours" />
              <CountdownSeparator />
              <CountdownDigit value={timeLeft!.minutes} label="Minutes" />
              <CountdownSeparator />
              <CountdownDigit value={timeLeft!.seconds} label="Seconds" />
            </div>

            {/* End date & CTA */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                <FiClock className="size-3.5 sm:size-4" />
                <span>Ends {formatDate(activeRound!.ends_at)}</span>
              </div>

              <a
                href="/dashboard"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0f172a] font-semibold text-sm sm:text-base hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
              >
                Apply Now
                <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveRoundCountdown;
