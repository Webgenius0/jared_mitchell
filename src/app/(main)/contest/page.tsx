import React from "react";
import { CMSBossBeginnings } from "@/Types/cms";
import ContestBanner from "./Components/ContestBanner";
import {
  getBossCms,
  getCMSHomepageData,
  getLeaderboard,
  getCurrentSpotlightWeek,
} from "@/lib/Services/cms_service";
import ContestSpotlights from "./Components/ContestSpotlights";
import ContestTable from "./Components/ContestTable";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";

// Format remaining voting time as "1 week 2 days"-style text. Returns null
// when there's no end date or voting has already ended.
const formatTimeLeft = (endsAt?: string | null): string | null => {
  if (!endsAt) return null;
  const end = new Date(endsAt).getTime();
  if (Number.isNaN(end)) return null;
  const diffMs = end - Date.now();
  if (diffMs <= 0) return null;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  if (weeks > 0 && days > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ${days} day${days > 1 ? "s" : ""}`;
  }
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""}`;
  return `${days} day${days > 1 ? "s" : ""}`;
};

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();

  let weekId: number | null = null;
  try {
    const currentWeek = await getCurrentSpotlightWeek();
    weekId = currentWeek?.data?.week?.id ?? null;
  } catch (e) {
    console.error("Failed to fetch current spotlight week", e);
  }

  // Fetch artist and business leaderboards separately (API filters by type
  // param). Both can independently come back null (no active week, or a
  // 404 from the API) — that's an expected empty state, not an error.
  let artistData = null;
  let businessData = null;

  if (weekId) {
    try {
      [artistData, businessData] = await Promise.all([
        getLeaderboard(weekId, ["artist"]),
        getLeaderboard(weekId, ["business"]),
      ]);
    } catch (e) {
      console.error("Failed to fetch leaderboard data", e);
    }
  }

  // Merge and deduplicate by nominee_id, assign global rank by total_votes
  const week = artistData?.data?.week ?? businessData?.data?.week;
  const allEntries = [
    ...(artistData?.data?.leaderboard ?? []),
    ...(businessData?.data?.leaderboard ?? []),
  ];

  // Remove duplicates (safety) and sort by total_votes descending for global ranking
  const seen = new Set<number>();
  const unique = allEntries.filter(e => {
    if (seen.has(e.nominee_id)) return false;
    seen.add(e.nominee_id);
    return true;
  });
  unique.sort((a, b) => b.total_votes - a.total_votes);

  // Reassign global ranks for the combined view
  const leaderboard = unique.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  // Spotlight stats — derived from live week/leaderboard data so the
  // dashboard cards never show fabricated numbers.
  const participants = leaderboard.length;
  const advancing = leaderboard.filter(e => e.is_winner).length;
  const advancingPct =
    participants > 0 && advancing > 0
      ? Math.round((advancing / participants) * 100)
      : null;
  const timeLeft = formatTimeLeft(week?.voting_ends_at);

  return (
    <div>
      <ContestBanner data={pageData?.boss_beginnings_hero} />
      <div className="pb-10">
        <ContestSpotlights
          participants={participants}
          advancing={advancing}
          advancingPct={advancingPct}
          timeLeft={timeLeft}
        />
      </div>

      <ContestTable
        leaderboard={leaderboard}
        weekStatus={week?.status ?? "unknown"}
        isVotingOpen={week?.is_voting_open ?? false}
        votingEndsAt={week?.voting_ends_at ?? ""}
      />
      <Sponsors data={cmsData?.partners} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};
export default page;
