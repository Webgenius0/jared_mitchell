import BusinessShower from "./_components/BusinessShower";
import BossBeginningWinner from "./_components/BossBeginningWinner";
import NewBusiness from "./_components/NewBusiness";
import WinnerReceives from "./_components/WinnerReceives";
import NewsLetter from "@/Components/Common/NewsLetter";
import BossBeginningBanner from "./_components/BossBeginningBanner";
import BossBeginningHero from "./_components/BossBeginningHero";
import BusinessChosenChart from "./_components/BusinessChosenChart";
import {
  getBossCms,
  getCMSHomepageData,
  getCurrentContestWinner,
  getActiveSeasonRounds,
  getRoundLeaderboard,
  getFeaturedStream,
  getLiveStreams,
} from "@/lib/Services/cms_service";
import { CMSBossBeginnings, LiveStream } from "@/Types/cms";
import Sponsors from "../_components/Sponsors";
import BossBeginningSponsor from "./_components/BossBeginningSponsor";
import BossBeginningsContestCarousel from "@/Components/Common/BossBeginningsContestCarousel";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();
  const winnerData = await getCurrentContestWinner();

  let roundLeaderboard = null;
  let activeRoundId: number | null = null;
  try {
    const activeSeasonRes = await getActiveSeasonRounds();
    const rounds = activeSeasonRes?.data?.rounds ?? [];
    const activeRound = rounds.find(r => r.is_active) ?? null;
    if (activeRound) {
      activeRoundId = activeRound.id;

      const leaderboardRes = await getRoundLeaderboard(activeRound.id, {
        noCache: true,
      });
      roundLeaderboard = leaderboardRes?.data ?? null;
    }
  } catch {
    // Active season may not be available yet — the section stays hidden unless
    // the client component can resolve the round itself.
  }

  // Boss beginnings live stream (AWS IVS). Prefers a live channel
  // (playback_url), otherwise falls back to the latest ended stream's
  // recording (vod_url). A pending-only channel hides the section.
  // Streams are tagged "business" on the backend.
  let bossStream: LiveStream | undefined;
  let hasPendingStream = false;
  try {
    const { stream, hasPending } = getFeaturedStream(
      await getLiveStreams("business"),
    );
    bossStream = stream;
    hasPendingStream = hasPending;
  } catch (err) {
    console.error("Failed to fetch boss beginnings live streams:", err);
  }

  return (
    <>
      <BossBeginningBanner data={pageData?.boss_beginnings_hero} />

      <BossBeginningHero
        data={pageData?.boss_beginnings_hero}
        liveStream={bossStream}
        hasPendingStream={hasPendingStream}
      />

      <BusinessShower data={pageData?.boss_beginnings_features} />

      <BossBeginningWinner
        data={pageData?.boss_beginnings_video_gallery}
        winner={winnerData?.winner}
      />

      <BusinessChosenChart
        data={pageData?.boss_beginnings_steps}
        roundData={roundLeaderboard}
        roundId={activeRoundId}
      />

      {/* <BossBeginningsContestCarousel title="Boss Beginnings Contest" /> */}

      <NewBusiness data={pageData?.boss_beginnings_section5} />

      <WinnerReceives data={pageData?.boss_beginnings_dynamic} />

      <BossBeginningSponsor />

      <Sponsors data={cmsData?.partners} showButton={false} />

      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
