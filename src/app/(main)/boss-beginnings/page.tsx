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

  // Fetch active season rounds → find round 1 → fetch its leaderboard
  let roundLeaderboard = null;
  try {
    const activeSeasonRes = await getActiveSeasonRounds();
    const round1 = activeSeasonRes?.data?.rounds?.find(
      r => r.round_number === 1 && r.is_active,
    );
    if (round1) {
      const leaderboardRes = await getRoundLeaderboard(round1.id);
      roundLeaderboard = leaderboardRes?.data ?? null;
    }
  } catch {
    // Active season or round 1 leaderboard may not be available yet
  }

  return (
    <>
      <BossBeginningBanner data={pageData?.boss_beginnings_hero} />

      <BusinessShower data={pageData?.boss_beginnings_features} />

      <BossBeginningWinner
        data={pageData?.boss_beginnings_video_gallery}
        winner={winnerData?.winner}
      />

      <BusinessChosenChart
        data={pageData?.boss_beginnings_steps}
        roundData={roundLeaderboard}
      />

      <NewBusiness data={pageData?.boss_beginnings_section5} />

      <WinnerReceives data={pageData?.boss_beginnings_dynamic} />

      <BossBeginningSponsor />

      <Sponsors data={cmsData?.partners} showButton={false} />

      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;