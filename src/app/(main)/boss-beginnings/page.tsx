import BusinessShower from "./_components/BusinessShower";
import BossBeginningWinner from "./_components/BossBeginningWinner";
import NewBusiness from "./_components/NewBusiness";
import WinnerReceives from "./_components/WinnerReceives";
import NewsLetter from "@/Components/Common/NewsLetter";
import BossBeginningBanner from "./_components/BossBeginningBanner";
import BusinessChosenChart from "./_components/BusinessChosenChart";
import {
  getBossCms,
  getCMSHomepageData,
  getCurrentContestWinner,
  getActiveSeasonRounds,
  getRoundLeaderboard,
} from "@/lib/Services/cms_service";
import { CMSBossBeginnings } from "@/Types/cms";
import Sponsors from "../_components/Sponsors";
import BossBeginningSponsor from "./_components/BossBeginningSponsor";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();
  const winnerData = await getCurrentContestWinner();

  // The "How Winners Are Chosen" section only renders while the contest is in
  // Round 1 — once the season moves to a later round the section is hidden.
  let roundLeaderboard = null;
  let isRoundOne = false;
  try {
    const activeSeasonRes = await getActiveSeasonRounds();
    const rounds = activeSeasonRes?.data?.rounds ?? [];
    const activeRound =
      rounds.find(r => r.is_active) ??
      rounds.find(r => r.round_number === 1) ??
      rounds[0];
    isRoundOne = activeRound?.round_number === 1;
    if (isRoundOne) {
      // noCache so the card points/counts always match the live API instead of
      // serving an up-to-60s stale ISR snapshot while users are voting.
      const leaderboardRes = await getRoundLeaderboard(activeRound.id, {
        noCache: true,
      });
      roundLeaderboard = leaderboardRes?.data ?? null;
    }
  } catch {
    // Active season may not be available yet — the section stays hidden
  }

  return (
    <>
      <BossBeginningBanner data={pageData?.boss_beginnings_hero} />

      <BusinessShower data={pageData?.boss_beginnings_features} />

      <BossBeginningWinner
        data={pageData?.boss_beginnings_video_gallery}
        winner={winnerData?.winner}
      />

      {isRoundOne && (
        <BusinessChosenChart
          data={pageData?.boss_beginnings_steps}
          roundData={roundLeaderboard}
        />
      )}

      <NewBusiness data={pageData?.boss_beginnings_section5} />

      <WinnerReceives data={pageData?.boss_beginnings_dynamic} />

      <BossBeginningSponsor />

      <Sponsors data={cmsData?.partners} showButton={false} />

      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;