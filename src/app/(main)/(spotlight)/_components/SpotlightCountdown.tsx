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

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs sm:text-sm md:text-base text-white/70 mt-1 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/40 mx-1 sm:mx-2">
    :
  </span>
);

const SpotlightCountdown = () => {
  const [countdownData, setCountdownData] = useState<CountdownData | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [phase, setPhase] = useState<"running" | "upcoming" | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const reloadTriggeredRef = useRef(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
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

  // Fetch countdown data
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
    if (initial && initial.days === 0 && initial.hours === 0 && initial.minutes === 0 && initial.seconds === 0) {
      if (!reloadTriggeredRef.current) {
        reloadTriggeredRef.current = true;
        window.location.reload();
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
          window.location.reload();
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

  // Loading state
  if (loading) {
    return (
      <section className="py-8 md:py-12">
        <Container>
          <div className="bg-gradient-to-r from-primary-blue to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center">
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-48 mx-auto mb-4" />
              <div className="flex justify-center gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 w-16 bg-white/20 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Error or no data — hide section gracefully
  if (error || !countdownData || !timeLeft) {
    return null;
  }

  const isRunning = phase === "running";
  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isExpired) return null;

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="bg-gradient-to-r from-primary-blue to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 custom_shadow">
          {/* Phase badge */}
          <div className="flex justify-center mb-4">
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium ${
                isRunning
                  ? "bg-green-500/20 text-green-300 border border-green-400/30"
                  : "bg-white/15 text-white/90 border border-white/25"
              }`}
            >
              <FiClock className="size-3.5 sm:size-4" />
              {isRunning ? "Voting in Progress" : "Upcoming Spotlight Week"}
            </span>
          </div>

          {/* Week name */}
          <h3 className="text-center text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            {countdownData.name}
          </h3>

          {/* Target date */}
          <p className="text-center text-white/70 text-xs sm:text-sm md:text-base mb-6 md:mb-8">
            {isRunning
              ? "Voting ends"
              : "Applications close & voting starts"}{" "}
            {formatTargetDate(countdownData.target_date)}
          </p>

          {/* Countdown digits */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <Separator />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <Separator />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <Separator />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          {/* CTA */}
          {countdownData.is_accepting_applications && (
            <div className="flex justify-center mt-6 md:mt-8">
              <a
                href="/dashboard/artist_business/spotlight-management"
                className="inline-flex items-center gap-2 bg-white text-primary-blue px-6 py-3 rounded-full font-semibold text-sm md:text-base hover:bg-white/90 transition-colors"
              >
                Apply Now
                <FiArrowRight className="size-4" />
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SpotlightCountdown;
