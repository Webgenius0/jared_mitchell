import React from "react";
import BossBegginingsConstestBanner from "./Components/BossBegginingsConstestBanner";
import {
  ActiveSeasonRound,
  CMSBossBeginnings,
  CMSRoundsPage,
} from "@/Types/cms";
import {
  getBossCms,
  getCMSAboutData,
  getRoundsCms,
  getActiveSeasonRounds,
} from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import OpenQualifierRound from "./Components/Openqualifierround";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();
  // Rounds data is optional — fall back gracefully if the endpoint is unavailable
  let roundsData: CMSRoundsPage | undefined;
  try {
    roundsData = await getRoundsCms();
  } catch {
    roundsData = undefined;
  }

  // Live season rounds — used to render the round tabs, mark which round is
  // active (open by default), and load its leaderboard.
  let seasonRounds: ActiveSeasonRound[] = [];
  let activeRoundId: number | null = null;
  try {
    const seasonRes = await getActiveSeasonRounds();
    seasonRounds = seasonRes?.data?.rounds ?? [];
    activeRoundId =
      seasonRounds.find(r => r.is_active)?.id ?? seasonRounds[0]?.id ?? null;
  } catch {
    // No active season yet — the page falls back to the static preview data
  }

  return (
    <>
      <BossBegginingsConstestBanner data={pageData?.boss_beginnings_hero} />
      <OpenQualifierRound
        roundsData={roundsData?.rounds}
        rounds={seasonRounds}
        activeRoundId={activeRoundId}
      />
      <Sponsors data={CmsData?.partners} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};
export default page;
