"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Users, TrendingUp, Clock, Award } from "lucide-react";
import { FiEye } from "react-icons/fi";
import { slugify } from "@/lib/utils";
import Link from "next/link";

type Trend = "Up" | "Natural" | "Down";

type Business = {
  rank: number;
  name: string;
  owner: string;
  category: string;
  score: number;
  trend: Trend;
};

const ROUNDS = ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"] as const;

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

function getRoundData(roundIndex: number): Business[] {
  return BASE_BUSINESSES.map((b, i) => ({
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

interface VotingTabProps {
  activeRound: number;
  setActiveRound: (round: number) => void;
}

export default function VotingTab({
  activeRound,
  setActiveRound,
}: VotingTabProps) {
  const router = useRouter();
  const data = useMemo(() => getRoundData(activeRound), [activeRound]);
  const participants = 100;
  const advancingPct = 60;
  const advancing = Math.round((advancingPct / 100) * participants);

  const handleViewProfile = (businessName: string) => {
    const roundSlug = `round-${activeRound + 1}`;
    const businessSlug = slugify(businessName);
    router.push(
      `/boss-beginnings-contest/profile/${roundSlug}/${businessSlug}`,
    );
  };

  return (
    <div>
      {/* Header card */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 mb-6">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-[20px] font-semibold text-black">
              Open Qualifier Round
            </h2>
            <p className="text-[13px] text-black/50 mt-0.5">Phase 1</p>
          </div>

          <div className="flex items-center gap-2">
            {ROUNDS.map((round, i) => (
              <button
                key={round}
                onClick={() => setActiveRound(i)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-normal transition-colors ${
                  activeRound === i
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#EEF1F6] text-black/50 hover:bg-black/10"
                }`}
              >
                {round}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[14px] text-black/60 mt-3 mb-6 max-w-2xl">
          Narrow the field and generate buzz. Top {advancingPct}% advance based
          on community engagement.
        </p>

        <div className="flex items-center gap-10">
          <StatItem
            icon={<Users size={18} className="text-black/50" />}
            label="Participants"
            value={`${participants}`}
          />
          <StatItem
            icon={<TrendingUp size={18} className="text-black/50" />}
            label="Advancing"
            value={`${advancing} (${advancingPct}%)`}
          />
          <StatItem
            icon={<Clock size={18} className="text-black/50" />}
            label="Time Left"
            value="3 weeks 4 days"
          />
          <StatItem
            icon={<Award size={18} className="text-black/50" />}
            label="Voting Weight"
            value="100% Community"
          />
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                <th className="text-left font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                  Total Score
                </th>
                <th className="text-left font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((b, idx) => (
                <tr
                  key={b.name}
                  className={`text-sm sm:text-base ${
                    idx !== data.length - 1 ? "border-b border-gray-100" : ""
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

                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="text-blue-600 font-semibold text-sm sm:text-base">
                      {b.score.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-[10px] sm:text-xs">
                      points
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center gap-20">
                    <span
                      className={`font-medium text-xs sm:text-sm w-10 ${trendStyle(
                        b.trend,
                      )}`}
                    >
                      {b.trend}
                    </span>
                    <div
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-colors whitespace-nowrap"
                    >
                      <FiEye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      View Profile
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#EEF1F6] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[12px] text-black/45">{label}</p>
        <p className="text-[14px] font-semibold text-black">{value}</p>
      </div>
    </div>
  );
}
