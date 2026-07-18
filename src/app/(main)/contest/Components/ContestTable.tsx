"use client";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import Link from "next/link";

type Trend = "Up" | "Natural" | "Down";

type Contestant = {
  id: number;
  rank: number;
  business: string;
  owner: string;
  category: string;
  score: number;
  trend: Trend;
  type: "business" | "artist";
};

const CONTESTANTS: Contestant[] = [
  {
    id: 1,
    rank: 1,
    business: "Aspire Marketing",
    owner: "David Smith",
    category: "Professional Services",
    score: 4821,
    trend: "Up",
    type: "business",
  },
  {
    id: 2,
    rank: 2,
    business: "Oasis Outdoor Living",
    owner: "Emily Williams",
    category: "Home & Garden",
    score: 4497,
    trend: "Natural",
    type: "business",
  },
  {
    id: 3,
    rank: 3,
    business: "Chic & Co Boutique",
    owner: "Michael Taylor",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Down",
    type: "artist",
  },
  {
    id: 4,
    rank: 4,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "business",
  },
  {
    id: 5,
    rank: 5,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "artist",
  },
  {
    id: 6,
    rank: 6,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "business",
  },
  {
    id: 7,
    rank: 7,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Natural",
    type: "artist",
  },
  {
    id: 8,
    rank: 8,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "business",
  },
  {
    id: 9,
    rank: 9,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "artist",
  },
  {
    id: 10,
    rank: 10,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "business",
  },
  {
    id: 11,
    rank: 11,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "artist",
  },
  {
    id: 12,
    rank: 12,
    business: "Urban Threads Boutique",
    owner: "Michael Johnson",
    category: "Retail & Fashion",
    score: 4497,
    trend: "Up",
    type: "business",
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "business", label: "Business Spotlights" },
  { key: "artist", label: "Artist Spotlights" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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

export default function ContestTable() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered =
    activeTab === "all"
      ? CONTESTANTS
      : CONTESTANTS.filter(c => c.type === activeTab);

  return (
    <div className="container mx-auto">
      {/* Tabs */}
      <div className="rounded-2xl border border-black/15 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 sm:p-5 flex flex-wrap gap-2 mt-6 sm:mt-8 mb-8 sm:mb-15">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "text-gray-500 hover:bg-gray-50 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
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
              {filtered.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`text-sm sm:text-base ${
                    idx !== filtered.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <span
                      className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg text-[10px] sm:text-xs font-semibold ${rankBadgeStyle(
                        c.rank,
                      )}`}
                    >
                      #{c.rank}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      {c.business}
                    </div>
                    <div className="text-gray-400 text-[10px] sm:text-xs">
                      {c.owner}
                    </div>
                  </td>

                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div className="text-blue-600 font-semibold text-sm sm:text-base">
                      {c.score.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-[10px] sm:text-xs">
                      points
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center gap-20">
                    <span
                      className={`font-medium text-xs sm:text-sm w-10 ${trendStyle(
                        c.trend,
                      )}`}
                    >
                      {c.trend}
                    </span>
                    <Link
                      href={`/contest/${c.id}`}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-colors whitespace-nowrap"
                    >
                      <FiEye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      View Profile
                    </Link>
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
