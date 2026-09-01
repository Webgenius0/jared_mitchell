"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiUsers, FiInbox } from "react-icons/fi";
import { PiSuitcaseSimple, PiPalette } from "react-icons/pi";
import type { LeaderboardEntry } from "@/Types/cms";

type TabKey = "all" | "business" | "artist";

interface ContestTableProps {
  leaderboard: LeaderboardEntry[];
  weekStatus: string;
  isVotingOpen: boolean;
  votingEndsAt: string;
}

const TABS = [
  { key: "all", label: "All", icon: FiUsers },
  { key: "business", label: "Business Spotlights", icon: PiSuitcaseSimple },
  { key: "artist", label: "Artist Spotlights", icon: PiPalette },
] as const;

const TAB_CONTENT = {
  all: {
    title: "All Contestants",
    description:
      "Browse all businesses and artists competing in this season's spotlight contest. Vote for your favorites and help them rise to the top.",
    totalLabel: "Total Contestants",
    emptyTitle: "No contestants yet",
    emptyDescription:
      "There are no contestants to show right now. Check back soon.",
  },
  business: {
    title: "Business Spotlights",
    description:
      "Discover innovative local businesses making an impact in their communities. Support them with your votes and engagement.",
    totalLabel: "Total Businesses",
    emptyTitle: "No business spotlights yet",
    emptyDescription:
      "No businesses have entered this category yet. Check back soon.",
  },
  artist: {
    title: "Artist Spotlights",
    description:
      "Explore talented artists showcasing their craft. From visual arts to performing arts — discover and support creative excellence.",
    totalLabel: "Total Artists",
    emptyTitle: "No artist spotlights yet",
    emptyDescription:
      "No artists have entered this category yet. Check back soon.",
  },
} as const;

const rankBadgeStyle = (rank: number) => {
  if (rank === 1) return "bg-amber-400 text-white";
  if (rank === 2) return "bg-gray-400 text-white";
  if (rank === 3) return "bg-orange-500 text-white";
  return "bg-blue-50 text-blue-600";
};

export default function ContestTable({
  leaderboard,
  weekStatus,
  isVotingOpen,
  votingEndsAt,
}: ContestTableProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? leaderboard
        : leaderboard.filter(c => c.spotlight.type === activeTab),
    [activeTab, leaderboard],
  );

  const tabContent = TAB_CONTENT[activeTab];
  const TabIcon = TABS.find(t => t.key === activeTab)!.icon;
  const isEmpty = filtered.length === 0;

  const handleViewProfile = (spotlightId: number, type: string) => {
    router.push(`/contest/${spotlightId}?type=${type}`);
  };

  return (
    <div className="container mx-auto">


      {/* Tabs */}
      <div className=" border border-black/15 bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] p-3 sm:p-5 flex flex-wrap gap-2 mb-6 sm:mb-8">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2  text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-500 hover:bg-gray-50 border border-transparent"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content card */}
      <div className=" border border-black/10 bg-white p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <TabIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#101828]">
                  {tabContent.title}
                </h3>
                <p className="text-sm text-black/50">
                  {tabContent.totalLabel}: {filtered.length}
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#1D1D1F] max-w-2xl mt-3">
              {tabContent.description}
            </p>
          </div>
        </div>
      </div>

      {/* Table or Empty state */}
      {isEmpty ? (
        <div className="bg-white border border-gray-100 shadow-sm  flex flex-col items-center justify-center text-center py-16 px-6">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <FiInbox className="size-6 text-blue-600" />
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-[#101828] mb-1">
            {tabContent.emptyTitle}
          </h4>
          <p className="text-sm text-black/50 max-w-sm">
            {tabContent.emptyDescription}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] sm:min-w-[720px] table-fixed">
              <thead>
                <tr className="bg-blue-600 text-white text-sm sm:text-base">
                  <th className="text-left font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                    Rank
                  </th>
                  <th className="text-left font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                    Name
                  </th>
                  <th className="text-center font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                    Total Score
                  </th>
                  <th className="text-end font-medium px-3 sm:px-4 lg:px-6 py-3 sm:py-4 w-1/4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => (
                  <tr
                    key={c.nominee_id}
                    className={`text-sm sm:text-base ${
                      idx !== filtered.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8  text-[10px] sm:text-xs font-semibold ${rankBadgeStyle(
                            c.rank,
                          )}`}
                        >
                          #{c.rank}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                          {c.spotlight.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        {c.spotlight.name}
                      </div>
                      <div className="text-gray-400 text-[10px] sm:text-xs">
                        {c.spotlight.city}, {c.spotlight.state}
                      </div>
                      <div className="text-gray-400 text-[10px] sm:text-xs">
                        {c.owner.name}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                      <div className="text-blue-600 font-semibold text-sm sm:text-base">
                        {c.total_votes.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-[10px] sm:text-xs">
                        votes
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-end">
                      <button
                        onClick={() =>
                          handleViewProfile(c.spotlight.id, c.spotlight.type)
                        }
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-medium px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-colors whitespace-nowrap"
                      >
                        <FiEye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Winner indicator */}
      {filtered.some(e => e.is_winner) && (
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200  text-center">
          <span className="text-amber-700 font-medium text-sm">
            🏆 Winners have been announced for this week!
          </span>
        </div>
      )}
    </div>
  );
}
