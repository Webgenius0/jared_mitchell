import {
  getBossCms,
  getCMSAboutData,
  getActiveSeasonRounds,
  getRoundLeaderboard,
} from "@/lib/Services/cms_service";
import { CMSBossBeginnings } from "@/Types/cms";
import BossBeginningBanner from "../boss-beginnings/_components/BossBeginningBanner";
import WinnerReceives from "../boss-beginnings/_components/WinnerReceives";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import BusinessChosenChart from "../boss-beginnings/_components/BusinessChosenChart";
import MainChoseBanner from "./Components/MainChoseBanner";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();

  // The "How Winners Are Chosen" BusinessChosenChart section only renders
  // while the contest is in Round 1 — once the season moves to a later round
  // the section is hidden.
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
      <MainChoseBanner data={pageData?.boss_beginnings_hero} />
      {/* <section className="section container">
        <div className="w-full h-[627px]">
          <CustomVideoPlayer
            videoSrc={
              pageData?.boss_beginnings_video_gallery?.video ??
              "/home/hero-video.mp4"
            }
            className={"!rounded-[40px]"}
          />
        </div>
      </section> */}
      {/* <BusinessShower data={pageData?.boss_beginnings_features} /> */}
      {/* <BossBeginningWinner data={pageData?.boss_beginnings_video_gallery} /> */}
      {isRoundOne && (
        <BusinessChosenChart
          data={pageData?.boss_beginnings_steps}
          roundData={roundLeaderboard}
          paginated
        />
      )}
      {/* <NewBusiness data={pageData?.boss_beginnings_section5} /> */}
      {/* <HowVotingWorks data={pageData?.boss_beginnings_steps} /> */}
      {/* <WinnerReceives data={pageData?.boss_beginnings_dynamic} /> */}
      <Sponsors data={CmsData?.partners} title="Our Event Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
