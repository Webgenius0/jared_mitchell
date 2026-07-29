import React from "react";
import { CMSBossBeginnings } from "@/Types/cms";
import ContestBanner from "./Components/ContestBanner";
import { getBossCms, getCMSHomepageData, getLeaderboard } from "@/lib/Services/cms_service";
import ContestSpotlights from "./Components/ContestSpotlights";
import ContestTable from "./Components/ContestTable";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();

  // Fetch artist and business leaderboards separately (API filters by type param)
  const [artistData, businessData] = await Promise.all([
    getLeaderboard(2, ["artist"]),
    getLeaderboard(2, ["business"]),
  ]);

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

  return (
    <div>
      <ContestBanner data={pageData?.boss_beginnings_hero} />
      <ContestSpotlights />
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
