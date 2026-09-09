import type { Metadata } from "next";
import {
  getBossCms,
  getCMSAboutData,
  getActiveSeasonRounds,
  getRoundLeaderboard,
} from "@/lib/Services/cms_service";
import { CMSBossBeginnings } from "@/Types/cms";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import BusinessChosenChart from "../boss-beginnings/_components/BusinessChosenChart";
import HowWinnersAreChosenContent from "./Components/HowWinnersAreChosenContent";
import MainChoseBanner from "./Components/MainChoseBanner";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();


  // The "How Winners Are Chosen" BusinessChosenChart section renders while the
  // contest is open. roundData is a best-effort optimization: when the
  // server-side fetch fails or the page is served from a stale ISR snapshot,
  // the client component self-fetches using roundId, so the section appears
  // whenever a round is actually open.
  let roundLeaderboard = null;
  let activeRoundId: number | null = null;
  try {
    const activeSeasonRes = await getActiveSeasonRounds();
    const rounds = activeSeasonRes?.data?.rounds ?? [];
    const activeRound = rounds.find(r => r.is_active) ?? null;
    if (activeRound) {
      activeRoundId = activeRound.id;
      // noCache so the card points/counts always match the live API instead of
      // serving an up-to-60s stale ISR snapshot while users are voting.
      const leaderboardRes = await getRoundLeaderboard(activeRound.id, {
        noCache: true,
      });
      roundLeaderboard = leaderboardRes?.data ?? null;
    }
  } catch {
    // Active season may not be available yet — the section stays hidden unless
    // the client component can resolve the round itself.
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
      <BusinessChosenChart
        data={pageData?.boss_beginnings_steps}
        roundData={roundLeaderboard}
        roundId={activeRoundId}
        paginated
      />
      <HowWinnersAreChosenContent />
      {/* <NewBusiness data={pageData?.boss_beginnings_section5} /> */}
      {/* <HowVotingWorks data={pageData?.boss_beginnings_steps} /> */}
      {/* <WinnerReceives data={pageData?.boss_beginnings_dynamic} /> */}
      <Sponsors data={CmsData?.about_sponsors} title="Our Event Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export const metadata = {
  title: "How Winners Are Chosen - OSI Voting Process | Open Spotlight Initiative",
  description:
    "Learn how OSI winners are chosen through our transparent voting and selection process. Understand the criteria, voting system, and what makes a standout spotlight winner on OSI.",
  keywords: [
    "OSI winners",
    "how OSI voting works",
    "OSI selection process",
    "OSI winner criteria",
    "OSI voting system",
    "spotlight winner",
  ],
  openGraph: {
    title: "How Winners Are Chosen - OSI Voting Process | Open Spotlight Initiative",
    description:
      "Learn how OSI winners are chosen through our transparent voting and selection process. Understand the criteria and voting system.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-winners.png",
        width: 1200,
        height: 630,
        alt: "How OSI Winners Are Chosen - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Winners Are Chosen - OSI Voting Process | Open Spotlight Initiative",
    description:
      "Learn how OSI winners are chosen through our transparent voting and selection process. Understand the criteria and voting system.",
    images: ["/og-winners.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
