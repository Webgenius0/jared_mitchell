"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Trophy,
  Megaphone,
  Sparkles,
  Users,
  Briefcase,
  ShoppingBag,
} from "lucide-react";
import { ActiveSeasonRound } from "@/Types/cms";

interface TimelineEvent {
  id: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  date: string;
  status: "completed" | "active" | "upcoming";
  goal: string;
  advancement: string;
  measures: string[];
  startDate?: Date | null;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    icon: Megaphone,
    title: "Round 1 — Get The Attention",
    subtitle: "Top 20 → Top 16 Businesses",
    date: "Week 1 (Days 1–7)",
    status: "upcoming",
    goal: "Build awareness for your business and prove that you can attract community attention and support.",
    advancement: "20 businesses compete. The Top 16 advance.",
    measures: ["Awareness", "Promotion", "Reach", "Community Support"],
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Round 2 — Why Am I Here?",
    subtitle: "Top 16 → Top 12 Businesses",
    date: "Week 2 (Days 8–14)",
    status: "upcoming",
    goal: "Give the community a reason to care about your business by telling the story behind it.",
    advancement: "16 businesses compete. The Top 12 advance.",
    measures: ["Story", "Authenticity", "Purpose", "Connection"],
  },
  {
    id: 3,
    icon: Users,
    title: "Round 3 — Community Impact",
    subtitle: "Top 12 → Top 8 Businesses",
    date: "Week 3 (Days 15–21)",
    status: "upcoming",
    goal: "Show how your business can make a positive difference beyond simply making a sale.",
    advancement: "12 businesses compete. The Top 8 advance.",
    measures: ["Purpose", "Community Involvement", "Initiative", "Impact"],
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Round 4 — Business Pitch",
    subtitle: "Top 8 → Top 5 Businesses",
    date: "Week 4 (Days 22–28)",
    status: "upcoming",
    goal: "Prove that your business has a strong concept, a clear strategy, and the potential to grow.",
    advancement: "8 businesses compete. The Top 5 advance to the Final Round.",
    measures: [
      "Business Model",
      "Strategy",
      "Differentiation",
      "Growth Potential",
      "Presentation",
    ],
  },
  {
    id: 5,
    icon: ShoppingBag,
    title: "Round 5 — Customer Experience",
    subtitle: "Final 5 Businesses",
    date: "Week 5 (Days 29–35)",
    status: "upcoming",
    goal: "Prove that your business can turn its promises into a real experience that customers would want to return to and recommend.",
    advancement: "Finalists evaluated by community input & the Our Social Image judging panel to decide the winner.",
    measures: [
      "Execution",
      "Customer Service",
      "Quality",
      "Professionalism",
      "Brand Experience",
    ],
  },
];

interface QuarterlyCycle {
  id: number;
  label: string;
  dateRange: string;
  isActive: boolean;
}

const statusConfig = {
  completed: {
    bg: "bg-white border-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
    badgeText: "Complete",
    iconColor: "text-emerald-600",
  },
  active: {
    bg: "bg-white border-blue-500",
    badge: "bg-blue-100 text-blue-700",
    badgeText: "Active Now",
    iconColor: "text-blue-600",
  },
  upcoming: {
    bg: "bg-white border-gray-300",
    badge: "bg-gray-100 text-gray-500",
    badgeText: "Upcoming",
    iconColor: "text-gray-400",
  },
};

const KEY_DATES = [
  {
    date: "Day 1 (Week 1 Start)",
    event: "Round 1 begins: 'Get The Attention' kicks off (Top 20 compete)",
  },
  {
    date: "Day 8 (Week 2 Start)",
    event: "Round 2 begins: 'Why Am I Here?' storytelling round (Top 16 compete)",
  },
  {
    date: "Day 15 (Week 3 Start)",
    event: "Round 3 begins: 'Community Impact' round (Top 12 compete)",
  },
  {
    date: "Day 22 (Week 4 Start)",
    event: "Round 4 begins: 2–3 min 'Business Pitch' round (Top 8 compete)",
  },
  {
    date: "Day 29 (Week 5 Start)",
    event: "Round 5 begins: 'Customer Experience' round (Final 5 compete)",
  },
  {
    date: "Day 35 (Week 5 End)",
    event: "Competition concludes: Winner is chosen by the judging panel & community vote",
  },
];

// ─── Date helpers ────────────────────────────────────────────────────────────

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAY_MS = 24 * 60 * 60 * 1000;

function toDate(value?: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function fmtDayMonth(date: Date): string {
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
}

function fmtShort(date: Date): string {
  return `${fmtDayMonth(date)}, ${date.getFullYear()}`;
}

function fmtRange(start: Date, end: Date): string {
  return start.getFullYear() === end.getFullYear()
    ? `${fmtDayMonth(start)} – ${fmtDayMonth(end)}, ${end.getFullYear()}`
    : `${fmtShort(start)} – ${fmtShort(end)}`;
}

function daysBetween(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / DAY_MS);
}

function formatCountdown(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const clock = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return days > 0 ? `${days}d ${clock}` : clock;
}

function quarterWindow(year: number, quarter: number): { start: Date; end: Date } {
  const start = new Date(year, (quarter - 1) * 3, 1);
  return { start, end: new Date(start.getTime() + 34 * DAY_MS) };
}

const CYCLE_EPOCH = new Date(2026, 9, 1);

interface DatedRound {
  round: ActiveSeasonRound;
  start: Date;
  end: Date;
}

function buildTimelineEvents(rounds: ActiveSeasonRound[], now: number) {
  const datedRounds: DatedRound[] = rounds
    .map(round => ({ round, start: toDate(round.starts_at), end: toDate(round.ends_at) }))
    .filter((item): item is DatedRound => Boolean(item.start && item.end));

  const seasonStart = datedRounds.length
    ? datedRounds.reduce((min, item) => (item.start < min ? item.start : min), datedRounds[0].start)
    : null;
  const seasonEnd = datedRounds.length
    ? datedRounds.reduce((max, item) => (item.end > max ? item.end : max), datedRounds[0].end)
    : null;
  const activeFlagIdx = rounds.findIndex(r => r.is_active);

  const events: TimelineEvent[] = TIMELINE_EVENTS.map((base, i) => {
    const round = rounds[i];
    const start = round ? toDate(round.starts_at) : null;
    const end = round ? toDate(round.ends_at) : null;

    let status: TimelineEvent["status"] = "upcoming";
    if (start && end) {
      if (now >= end.getTime()) status = "completed";
      else if (now >= start.getTime()) status = "active";
    } else if (activeFlagIdx >= 0) {
      status = i < activeFlagIdx ? "completed" : i === activeFlagIdx ? "active" : "upcoming";
    }

    const dayStart = start && seasonStart ? daysBetween(seasonStart, start) + 1 : i * 7 + 1;
    const dayEnd = end && seasonStart ? daysBetween(seasonStart, end) + 1 : i * 7 + 7;
    const weekText = `Week ${i + 1} (Days ${dayStart}–${dayEnd})`;
    const date = start && end ? `${weekText} — ${fmtRange(start, end)}` : weekText;

    return {
      ...base,
      title: round?.title || base.title,
      status,
      date,
      startDate: start,
    };
  });

  return { events, seasonStart, seasonEnd, activeFlagIdx, datedRounds };
}

function buildQuarterlyCycles(
  rounds: ActiveSeasonRound[],
  now: number,
): QuarterlyCycle[] {
  interface Draft {
    year: number;
    quarter: number;
    start: Date;
    end: Date;
    containsActiveRound: boolean;
  }
  const drafts: Draft[] = [];
  const findDraft = (year: number, quarter: number) =>
    drafts.find(d => d.year === year && d.quarter === quarter);

  for (const round of rounds) {
    const start = toDate(round.starts_at);
    const end = toDate(round.ends_at);
    if (!start || !end) continue;
    const year = start.getFullYear();
    const quarter = Math.floor(start.getMonth() / 3) + 1;
    let draft = findDraft(year, quarter);
    if (!draft) {
      draft = { year, quarter, start, end, containsActiveRound: false };
      drafts.push(draft);
    } else {
      if (start < draft.start) draft.start = start;
      if (end > draft.end) draft.end = end;
    }
    if (round.is_active) draft.containsActiveRound = true;
  }

  let cursor = new Date(CYCLE_EPOCH);
  while (drafts.length < 4) {
    const year = cursor.getFullYear();
    const quarter = Math.floor(cursor.getMonth() / 3) + 1;
    if (!findDraft(year, quarter)) {
      const { start, end } = quarterWindow(year, quarter);
      if (end.getTime() >= now) {
        drafts.push({ year, quarter, start, end, containsActiveRound: false });
      }
    }
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 3, 1);
  }

  drafts.sort((a, b) => a.start.getTime() - b.start.getTime());

  return drafts.slice(0, 4).map((d, idx) => ({
    id: idx + 1,
    label: `Q${d.quarter} ${d.year}`,
    dateRange: `${fmtDayMonth(d.start)} - ${fmtDayMonth(d.end)}`,
    isActive:
      d.containsActiveRound ||
      (now >= d.start.getTime() && now <= d.end.getTime()),
  }));
}

export default function LeaderboardTab({
  rounds,
}: {
  rounds?: ActiveSeasonRound[];
}) {
  const safeRounds = useMemo(() => rounds ?? [], [rounds]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const nowMs = now ?? 0;
  const timeline = useMemo(
    () => buildTimelineEvents(safeRounds, nowMs),
    [safeRounds, nowMs],
  );
  const quarterlyCycles = useMemo(
    () => buildQuarterlyCycles(safeRounds, nowMs),
    [safeRounds, nowMs],
  );

  const totalWeeks = TIMELINE_EVENTS.length;

  const activeDated = timeline.datedRounds.find(
    x => nowMs >= x.start.getTime() && nowMs < x.end.getTime(),
  );
  const nextDated = timeline.datedRounds.find(x => x.start.getTime() > nowMs);
  const isSeasonOver =
    timeline.datedRounds.length > 0 &&
    Boolean(timeline.seasonEnd) &&
    nowMs >= timeline.seasonEnd!.getTime();

  const progressPct = (() => {
    if (timeline.seasonStart && timeline.seasonEnd) {
      const span = timeline.seasonEnd.getTime() - timeline.seasonStart.getTime();
      if (span > 0) {
        return Math.min(
          100,
          Math.max(
            0,
            Math.round(((nowMs - timeline.seasonStart.getTime()) / span) * 100),
          ),
        );
      }
    }
    if (activeDated) {
      return Math.round(
        (timeline.datedRounds.indexOf(activeDated) / totalWeeks) * 100,
      );
    }
    if (!timeline.datedRounds.length && timeline.activeFlagIdx >= 0) {
      return Math.round((timeline.activeFlagIdx / totalWeeks) * 100);
    }
    return isSeasonOver ? 100 : 0;
  })();

  let badgeText: string;
  let weekLine: string;
  if (activeDated) {
    const num = activeDated.round.round_number;
    badgeText = num === totalWeeks ? "Final Week Active" : `Week ${num} Active`;
    weekLine = `Week ${num} of ${totalWeeks}`;
  } else if (nextDated) {
    badgeText = "Starts Soon";
    weekLine = `Week ${nextDated.round.round_number} of ${totalWeeks} starts ${fmtShort(nextDated.start)}`;
  } else if (isSeasonOver) {
    badgeText = "Contest Complete";
    weekLine = "Contest cycle completed";
  } else if (timeline.activeFlagIdx >= 0) {
    const num =
      safeRounds[timeline.activeFlagIdx]?.round_number ??
      timeline.activeFlagIdx + 1;
    badgeText = num === totalWeeks ? "Final Week Active" : `Week ${num} Active`;
    weekLine = `Week ${num} of ${totalWeeks}`;
  } else {
    badgeText = "Awaiting Schedule";
    weekLine = "Schedule to be announced";
  }

  let countdown: string | null = null;
  if (now !== null) {
    if (activeDated) {
      countdown = `Round ${activeDated.round.round_number} ends in ${formatCountdown(activeDated.end.getTime() - nowMs)}`;
    } else if (nextDated) {
      countdown = `Round ${nextDated.round.round_number} starts in ${formatCountdown(nextDated.start.getTime() - nowMs)}`;
    } else if (isSeasonOver) {
      countdown = "Contest cycle completed — next season dates will be announced";
    }
  }

  const keyDates = useMemo(() => {
    const items = timeline.events.map((event, i) => ({
      date: event.startDate
        ? `${fmtShort(event.startDate)} (Week ${i + 1} Start)`
        : KEY_DATES[i]?.date ?? `Week ${i + 1} Start`,
      event: KEY_DATES[i]?.event ?? `Round ${i + 1} begins`,
    }));
    items.push({
      date: timeline.seasonEnd
        ? `${fmtShort(timeline.seasonEnd)} (Week ${totalWeeks} End)`
        : KEY_DATES[KEY_DATES.length - 1].date,
      event: KEY_DATES[KEY_DATES.length - 1].event,
    });
    return items;
  }, [timeline, totalWeeks]);

  const cycleYears = Array.from(
    new Set(quarterlyCycles.map(c => Number(c.label.split(" ")[1]))),
  ).sort((a, b) => a - b);
  const cyclesHeading = cycleYears.length
    ? cycleYears[0] === cycleYears[cycleYears.length - 1]
      ? `${cycleYears[0]} Quarterly Cycles`
      : `${cycleYears[0]}–${cycleYears[cycleYears.length - 1]} Quarterly Cycles`
    : "Quarterly Cycles";

  return (
    <div className="space-y-6 mt-10">
      {/* Timeline header card */}
      <div className="bg-[#2563EB] px-4 sm:px-6 py-4 sm:py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="size-7" />
          <h2 className="text-xl font-semibold">
            {totalWeeks}-Week Competition Timeline
          </h2>
        </div>
        <p className="text-sm text-white/80">
          A fast-paced, {totalWeeks}-week tournament featuring 1 week per round.
          Track weekly progress and milestones below.
        </p>
        {countdown && (
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white tabular-nums">
            <Clock className="size-4 shrink-0" />
            <span>{countdown}</span>
          </div>
        )}
      </div>

      {/* Progress card */}
      <div className="p-4 sm:p-6 border border-black/15 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] mt-8 sm:mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-black">
              Competition Progress
            </h3>
            <p className="text-[12px] sm:text-[13px] text-black/50">
              {totalWeeks} Weeks Total • 1 Week Per Round
            </p>
          </div>
          <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-blue-50 text-[#2563EB] text-[11px] sm:text-[12px] font-medium w-fit">
            <Clock className="size-[13px]" />
            {badgeText}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-black mb-2">
          <span>Overall Progress</span>
          <span className="text-[#2563EB] font-medium">{progressPct}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-[12px] text-black/45">{weekLine}</p>
      </div>

      {/* Timeline events */}
      <div className="space-y-4">
        {timeline.events.map(event => {
          const cfg = statusConfig[event.status];
          const EventIcon = event.icon;
          return (
            <div
              key={event.id}
              className={`p-4 sm:p-5 border ${cfg.bg} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`size-10 sm:size-11 flex items-center justify-center ${cfg.iconColor} bg-blue-50/50 rounded-sm shrink-0`}
                  >
                    <EventIcon className="size-5 sm:size-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-[14px] sm:text-[15px] font-semibold text-black">
                        {event.title}
                      </h4>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB]">
                        {event.subtitle}
                      </span>
                    </div>

                    <p className="text-[12px] text-black/45 mt-0.5">{event.date}</p>

                    <p className="text-[13px] text-black/70 mt-2 font-medium">
                      <span className="text-black font-semibold">Goal: </span>
                      {event.goal}
                    </p>

                    {/* What this round measures */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-black/60 uppercase tracking-wide mr-1">
                        Measures:
                      </span>
                      {event.measures.map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-gray-100 text-black/75 border border-black/5 font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Advancement note */}
                    <p className="text-[12px] text-[#2563EB] font-medium mt-2">
                      ✦ {event.advancement}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 px-3 py-1 text-[11px] font-medium rounded-sm ${cfg.badge}`}
                >
                  {cfg.badgeText}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Dates */}
      <div className="border border-black/10 bg-white p-4 sm:p-6">
        <h3 className="text-base font-semibold text-black mb-4">Round Breakdown & Key Dates</h3>
        <div className="space-y-0 divide-y divide-black/5">
          {keyDates.map((item, idx) => (
            <div key={idx} className="py-4 flex items-start gap-3">
              <Calendar className="size-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-medium text-black">
                  {item.date}
                </p>
                <p className="text-[13px] text-black/60">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What happens after winning */}
      <div className="border border-black/10 bg-blue-50 p-4 sm:p-6">
        <h3 className="text-base font-semibold text-black mb-4">
          What Happens After the Winner is Announced?
        </h3>
        <div className="space-y-3">
          {[
            "The winner receives professional media coverage and bespoke photography",
            "Featured spotlight placement on the OSI homepage and weekly newsletter",
            "Priority vendor placement at upcoming OSI-sponsored events",
            "Dedicated promotional campaign across official OSI social media channels",
            "A complimentary one-year Growth Plan membership",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm sm:text-base text-black/70"
            >
              <Trophy className="size-3.5 sm:size-4 text-[#2563EB] shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Quarterly cycles */}
      <h3 className="text-sm sm:text-base font-semibold text-black mb-4">
        {cyclesHeading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quarterlyCycles.map(cycle => (
          <div
            key={cycle.id}
            className={`p-4 sm:p-5 border transition-all ${
              cycle.isActive
                ? "bg-[#2563EB] text-white border-[#2563EB]"
                : "bg-[#F5F5F7] text-black border-transparent"
            }`}
          >
            <h4
              className={`text-base font-semibold mb-1 ${
                cycle.isActive ? "text-white" : "text-black"
              }`}
            >
              {cycle.label}
            </h4>
            <p
              className={`text-[12px] ${
                cycle.isActive ? "text-white/70" : "text-black/50"
              }`}
            >
              {cycle.dateRange}
            </p>
            {cycle.isActive ? (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/20 px-3 py-2 text-[11px] font-medium">
                <span className="size-2 rounded-full bg-white animate-pulse" />
                Active Now
              </div>
            ) : (
              <p className="mt-3 text-black/40 border px-3 py-2 text-[12px] w-fit">
                Upcoming
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}