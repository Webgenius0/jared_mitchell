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
  getVideoChannels,
  getPastSixMonthsWinners,
} from "@/lib/Services/cms_service";
import {
  CMSBossBeginnings,
  LiveStream,
  PastSixMonthsWinner,
  VideoChannelItem,
} from "@/Types/cms";
import Sponsors from "../_components/Sponsors";
import BossBeginningSponsor from "./_components/BossBeginningSponsor";
import BossBeginningGuide from "./_components/BossBeginningGuide";
import ActiveRoundCountdown from "./_components/ActiveRoundCountdown";
import BossBeginningsContestCarousel from "@/Components/Common/BossBeginningsContestCarousel";
import CommunityAchievements from "../_components/CommunityAchievements";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();
  let winner: PastSixMonthsWinner | null = null;
  try {
    const res = await getCurrentContestWinner();
    winner = res?.winner ?? null;
  } catch (err) {
    console.error("Failed to fetch current contest winner:", err);
  }

  let roundLeaderboard = null;
  let activeRoundId: number | null = null;
  try {
    const activeSeasonRes = await getActiveSeasonRounds();
    const rounds = activeSeasonRes?.data?.rounds ?? [];
    const activeRound = rounds.find((r) => r.is_active) ?? null;
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

  let bossStream: LiveStream | undefined;
  let hasPendingStream = false;
  try {
    const { stream, hasPending } = getFeaturedStream(
      await getLiveStreams("business"),
    );
    bossStream = stream;
    hasPendingStream = hasPending;
  } catch (err) {
    console.error("Failed to fetch OSI Top Business Award live streams:", err);
  }

  let bossBeginningVideos: VideoChannelItem[] = [];
  try {
    const videoChannels = await getVideoChannels();
    bossBeginningVideos = videoChannels?.boss_beginning?.videos ?? [];
  } catch (err) {
    console.error("Failed to fetch video channels:", err);
  }

  let pastSixMonthsWinners: PastSixMonthsWinner[] = [];
  try {
    const res = await getPastSixMonthsWinners();
    pastSixMonthsWinners = res?.winners ?? [];
  } catch (err) {
    console.error("Failed to fetch past six months winners:", err);
  }

  return (
    <>
      <BossBeginningBanner data={pageData?.boss_beginnings_hero} />

      <BossBeginningHero
        data={pageData?.boss_beginnings_hero}
        liveStream={bossStream}
        hasPendingStream={hasPendingStream}
        videoChannelVideos={bossBeginningVideos}
      />

      <BusinessShower data={pageData?.boss_beginnings_features} />

      <BossBeginningWinner winner={winner} />

      <BusinessChosenChart
        data={pageData?.boss_beginnings_steps}
        roundData={roundLeaderboard}
        roundId={activeRoundId}
      />

      <ActiveRoundCountdown />

      {/* <BossBeginningsContestCarousel title="OSI Top Business Award Contest" /> */}

      <NewBusiness data={pageData?.boss_beginnings_section5} />
      <CommunityAchievements
        data={cmsData?.past_6_month_boss_beginnings_highlight}
        pastSixMonthsWinners={pastSixMonthsWinners}
      />

      <div className="xl:px-5">
        <WinnerReceives data={pageData?.boss_beginnings_dynamic} />
      <BossBeginningGuide />
      </div>


      <BossBeginningSponsor />

      <Sponsors data={cmsData?.partners} showButton={false} />

      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
