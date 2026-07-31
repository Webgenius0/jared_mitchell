"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  HiOutlineThumbUp,
  HiOutlineHeart,
  HiOutlineFire,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { CMSBossBeginningsSteps, RoundLeaderboardData } from "@/Types/cms";

import brewBloomImg from "../../../../Assets/roundbg.png";
import Link from "next/link";

interface BusinessChosenChartProps {
  data: CMSBossBeginningsSteps;
  roundData?: RoundLeaderboardData | null;
}

interface PointRule {
  icon: React.ReactNode;
  label: string;
  points: number;
  frequency: string;
}

interface BusinessCard {
  id: string;
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

// Treat placeholder/empty-ish avatar values as "no image" so we fall back to brewBloomImg
const isUsableAvatar = (url?: string | null) => {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  // common placeholder patterns from CMS/API default avatars
  if (/placeholder|default[-_]?avatar|no[-_]?image/i.test(trimmed))
    return false;
  return true;
};

const BusinessChosenChart = ({ data, roundData }: BusinessChosenChartProps) => {
  const scrollerRef = useRef<HTMLUListElement | null>(null);

  if (!roundData || roundData.round.round_number !== 1) {
    return null;
  }

  const businesses: BusinessCard[] = roundData.entries.map(entry => {
    const rawImage =
      entry.contestant.avatar_url || entry.avatar_url || undefined;

    const name = entry.contestant_name || entry.display_name;
    const businessName = entry.contestant.contestable.business_name;
    // Avoid showing the same string twice (name + description)
    const description =
      businessName && businessName !== name ? businessName : "";

    return {
      id: String(entry.contestant_id),
      name,
      description,
      location: "",
      image: isUsableAvatar(rawImage) ? (rawImage as string) : brewBloomImg.src,
      totalPoints: entry.total_score,
      rank: entry.rank,
      claps: entry.total_score,
      loves: Math.round(entry.total_score / 3),
      fires: Math.round(entry.total_score / 5),
    };
  });

  const scrollByCard = (direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    // scroll roughly one card width (+ gap) at a time
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card?.offsetWidth ?? 320;
    const gap = 24;
    const amount = cardWidth + gap;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 overflow-x-hidden">
      <div className="container">
        <h2 className="section_title text-center">
          {data?.title ?? "How Winners Are Chosen"}
        </h2>
        <p className="section_sub_title text-center">
          {data?.sub_title ??
            "Boss Beginnings is decided by the community, with OSI guardrails for fairness."}
        </p>

        {/* Point rules */}
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
      </div>

      {/* Business carousel — native scroll-snap, breaks out of container to bleed full width */}
      {businesses.length > 0 && (
        <div className="relative mt-16 w-screen mx-[calc(50%-50vw)] overflow-hidden">
          {/* Edge fade overlays so clipped/partial cards read as intentional, not broken.
              Swap from-white/to-white for your section's actual background color if it's not white. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-[5] bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-[5] bg-gradient-to-l from-white to-transparent" />

          <button
            onClick={() => scrollByCard("prev")}
            aria-label="Scroll left"
            className="hidden sm:grid absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-white shadow-md place-items-center hover:bg-slate-50"
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
                className="shrink-0 w-[320px] snap-start"
              >
                <BusinessCardItem biz={biz} />
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollByCard("next")}
            aria-label="Scroll right"
            className="hidden sm:grid absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-white shadow-md place-items-center hover:bg-slate-50"
          >
            <HiChevronRight className="text-lg" />
          </button>
        </div>
      )}
    </section>
  );
};

const BusinessCardItem = ({ biz }: { biz: BusinessCard }) => (
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
      <div className="flex items-center justify-between mt-4 bg-slate-50 rounded-xl px-3 py-2">
        <span className="text-sm text-slate-500">Total Points</span>
        <span className="flex items-center gap-1 font-semibold">
          {biz.totalPoints.toLocaleString()}
        </span>
      </div>

      {/* Clap / Love / Fire Action buttons */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <ActionButton
          icon={<HiOutlineThumbUp />}
          label="Clap"
          count={biz.claps}
        />
        <ActionButton
          icon={<HiOutlineHeart />}
          label="Love"
          count={biz.loves}
        />
        <ActionButton icon={<HiOutlineFire />} label="Fire" count={biz.fires} />
      </div>

      <Link
        href={`/how-winners-are-chosen/${biz.id}`}
        className="flex justify-center"
      >
        <button className="text-blue-500 text-sm font-normal mt-3 flex items-center gap-1 hover:underline">
          Learn More <span aria-hidden>→</span>
        </button>
      </Link>
    </div>
  </div>
);

const ActionButton = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) => (
  <button className="flex flex-col items-center justify-center gap-1 border border-slate-200 rounded-lg py-2 hover:bg-slate-50">
    <span className="text-slate-500">{icon}</span>
    <span className="text-[10px] text-slate-500">{label}</span>
    <span className="text-xs font-semibold">{count}</span>
  </button>
);

export default BusinessChosenChart;
