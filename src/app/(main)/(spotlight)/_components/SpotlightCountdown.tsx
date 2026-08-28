"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Container from "@/Components/Common/Container";
import { axiosPublic } from "@/Hooks/useAxiosPublic";
import { FiClock, FiArrowRight } from "react-icons/fi";

interface CountdownData {
  id: number;
  week_number: number;
  year: number;
  name: string;
  status: string;
  phase: string;
  is_accepting_applications: boolean;
  is_voting_open: boolean;
  voting_starts_at: string;
  voting_ends_at: string;
  target_date: string;
  countdown: {
    formatted: string;
    formatted_short: string;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: CountdownData | null;
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

function formatTargetDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
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

const SpotlightCountdown = () => {
  const [countdownData, setCountdownData] = useState<CountdownData | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [phase, setPhase] = useState<"running" | "upcoming" | null>(null);
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
      // Try running countdown first
      const runningRes = await axiosPublic.get<ApiResponse>(
        "/v1/spotlight/weeks/running-countdown",
      );

      if (
        runningRes.data.success &&
        runningRes.data.data?.target_date &&
        runningRes.data.data?.countdown
      ) {
        setCountdownData(runningRes.data.data);
        setPhase("running");
        setLoading(false);
        setError(false);
        return;
      }

      // Fallback to upcoming countdown
      const upcomingRes = await axiosPublic.get<ApiResponse>(
        "/v1/spotlight/weeks/upcoming-countdown",
      );

      if (
        upcomingRes.data.success &&
        upcomingRes.data.data?.target_date &&
        upcomingRes.data.data?.countdown
      ) {
        setCountdownData(upcomingRes.data.data);
        setPhase("upcoming");
        setLoading(false);
        setError(false);
        return;
      }

      // No valid countdown data
      setLoading(false);
      setError(false);
    } catch (err) {
      console.error("Failed to fetch spotlight countdown:", err);
      setLoading(false);
      setError(true);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCountdown();
  }, [fetchCountdown]);

  // Start countdown timer when data is available
  useEffect(() => {
    if (!countdownData?.target_date) return;

    reloadTriggeredRef.current = false;

    // Calculate initial time
    const initial = calculateTimeLeft(countdownData.target_date);
    setTimeLeft(initial);

    // Check if already expired
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

    // Start interval
    timerRef.current = setInterval(() => {
      const remaining = calculateTimeLeft(countdownData.target_date);

      if (!remaining) return;

      setTimeLeft(remaining);

      // Check if countdown completed
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
  }, [countdownData?.target_date, cleanup]);

  // Periodic API refresh (every 5 minutes)
  useEffect(() => {
    if (!countdownData) return;

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
  }, [countdownData, fetchCountdown]);

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
  const isRunning = phase === "running";
  const isExpired =
    timeLeft !== null &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const shouldShow =
    !loading && !error && countdownData && timeLeft && !isExpired;

  if (!shouldShow) {
    return null;
  }

  return (
    <section className="py-8 md:py-10 lg:py-14 xl:py-20  2xl:px-5 3xl:px-5">
      <Container>
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
          <div className="relative z-10 px-4 md:px-6 lg:px-10 py-6 md:py-8 lg:py-12 xl:py-16">
            {/* Top badge */}
            <div className="flex justify-center mb-4 md:mb-6 lg:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-white/90 text-xs sm:text-sm font-medium">
                  {isRunning ? "Voting in Progress" : "Upcoming Week"}
                </span>
              </div>
            </div>

            {/* Week name */}
            <div className="text-center mb-5 md:mb-7 lg:mb-8 xl:mb-10">
              <p className="text-white/50 text-xs sm:text-sm uppercase tracking-[0.25em] mb-2">
                Spotlight Contest
              </p>
              <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1.5 md:mb-2">
                {countdownData!.name}
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto">
                {isRunning
                  ? "Voting ends"
                  : "Applications close & voting starts"}{" "}
                {formatTargetDate(countdownData!.target_date)}
              </p>
            </div>

            {/* Countdown digits */}
            <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 mb-5 md:mb-7 lg:mb-8 xl:mb-10">
              <CountdownDigit value={timeLeft!.days} label="Days" />
              <CountdownSeparator />
              <CountdownDigit value={timeLeft!.hours} label="Hours" />
              <CountdownSeparator />
              <CountdownDigit value={timeLeft!.minutes} label="Minutes" />
              <CountdownSeparator />
              <CountdownDigit value={timeLeft!.seconds} label="Seconds" />
            </div>

            {/* CTA */}
            {countdownData!.is_accepting_applications && (
              <div className="flex justify-center">
                <a
                  href="/dashboard/artist_business/spotlight-management"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0f172a] font-semibold text-sm sm:text-base hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                >
                  Apply Now
                  <FiArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpotlightCountdown;
