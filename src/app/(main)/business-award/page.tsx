import type { Metadata } from "next";
import BusinessShower from "./_components/BusinessShower";
import BusinessAwardWinner from "./_components/BusinessAwardWinner";
import NewBusiness from "./_components/NewBusiness";
import WinnerReceives from "./_components/WinnerReceives";
import NewsLetter from "@/Components/Common/NewsLetter";
import BusinessAwardBanner from "./_components/BusinessAwardBanner";
import BusinessAwardHero from "./_components/BusinessAwardHero";
import BusinessChosenChart from "./_components/BusinessChosenChart";
import AdminArticlesSection from "./_components/AdminArticlesSection";
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
  AdminArticle,
  CMSBusinessAward,
  LiveStream,
  PastSixMonthsWinner,
  VideoChannelItem,
} from "@/Types/cms";
import Sponsors from "../_components/Sponsors";
import BusinessAwardSponsor from "./_components/BusinessAwardSponsor";
import BusinessAwardGuide from "./_components/BusinessAwardGuide";
import ActiveRoundCountdown from "./_components/ActiveRoundCountdown";
import BusinessAwardContestCarousel from "@/Components/Common/BusinessAwardContestCarousel";
import CommunityAchievements from "../_components/CommunityAchievements";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBusinessAward;
  const cmsData = await getCMSHomepageData();
  let winner: PastSixMonthsWinner | null = null;
  let adminArticles: AdminArticle[] = [];
  try {
    const res = await getCurrentContestWinner();
    winner = res?.winner ?? null;
    adminArticles = res?.admin_articles ?? [];
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
      <BusinessAwardBanner data={pageData?.boss_beginnings_hero} />

      <BusinessAwardHero
        data={pageData?.boss_beginnings_hero}
        liveStream={bossStream}
        hasPendingStream={hasPendingStream}
        videoChannelVideos={bossBeginningVideos}
      />

      <BusinessShower data={pageData?.boss_beginnings_features} />

      <BusinessAwardWinner winner={winner} />

      <AdminArticlesSection articles={adminArticles} />

      <BusinessChosenChart
        data={pageData?.boss_beginnings_steps}
        roundData={roundLeaderboard}
        roundId={activeRoundId}
      />

      <ActiveRoundCountdown />

      {/* <BusinessAwardContestCarousel title="OSI Top Business Award Contest" /> */}

      <NewBusiness data={pageData?.boss_beginnings_section5} />
      <CommunityAchievements
        data={cmsData?.past_6_month_boss_beginnings_highlight}
        pastSixMonthsWinners={pastSixMonthsWinners}
      />

      <div className="xl:px-5">
        <WinnerReceives data={pageData?.boss_beginnings_dynamic} />
      <BusinessAwardGuide />
      </div>


      <BusinessAwardSponsor />

      <Sponsors data={cmsData?.partners} showButton={false} />

      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export const metadata = {
  title: "OSI Top Business Award - Boss Beginnings | Open Spotlight Initiative",
  description:
    "Discover the OSI Top Business Award — a platform celebrating exceptional businesses and entrepreneurs. Learn about the Boss Beginnings program, current winners, and how to participate.",
  keywords: [
    "OSI Top Business Award",
    "Boss Beginnings",
    "OSI business award",
    "business recognition",
    "entrepreneur award",
    "OSI contest",
  ],
  openGraph: {
    title: "OSI Top Business Award - Boss Beginnings | Open Spotlight Initiative",
    description:
      "Discover the OSI Top Business Award — a platform celebrating exceptional businesses and entrepreneurs. Learn about Boss Beginnings and how to participate.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-business-award.png",
        width: 1200,
        height: 630,
        alt: "OSI Top Business Award - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI Top Business Award - Boss Beginnings | Open Spotlight Initiative",
    description:
      "Discover the OSI Top Business Award — a platform celebrating exceptional businesses and entrepreneurs. Learn about Boss Beginnings and how to participate.",
    images: ["/og-business-award.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
