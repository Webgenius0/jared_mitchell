import Sponsors from "@/app/(main)/_components/Sponsors";
import CoreValues from "@/app/(main)/_components/CoreValues";
import Hero from "@/app/(main)/_components/Hero";
import WhyChoose from "@/app/(main)/_components/WhyChoose";
import WhatYouAreGetting from "@/app/(main)/_components/WhatYouAreGetting";
import BossBeginnings from "@/app/(main)/_components/BossBeginnings";
import OSIApparel from "@/app/(main)/_components/OSIApparel";
import SuccessStories from "@/app/(main)/_components/SuccessStories";
import CommunityAchievements from "@/app/(main)/_components/CommunityAchievements";
import Countdown from "@/app/(main)/_components/Countdown";
import ArtistSpotlightCard from "@/app/(main)/_components/ArtistSpotlightCard";
import PastEvents from "@/app/(main)/_components/PastEvents";
import UpcomingEvents from "@/app/(main)/_components/UpcomingEvents";
import EventBanner from "./_components/EventBanner";
import PoweredByOSI from "./_components/PoweredByOSI";
import FeaturedEvent from "./_components/FeaturedEvent";
import NewsLetter from "@/Components/Common/NewsLetter";
import {
  getCMSHomepageData,
  getCurrentContestWinner,
  getFeaturedEvents,
  getFeaturedProducts,
  getRoundCountdown,
  getArtistHistoricalWinners,
  getBusinessHistoricalWinners,
  getPastSixMonthsWinners,
} from "@/lib/Services/cms_service";
import {
  FeaturedEventItem,
  FeaturedProductItem,
  HistoricalWinnersItem,
  PastSixMonthsWinner,
  RoundCountdownResponse,
} from "@/Types/cms";

const FALLBACK_IMAGE = "https://placehold.co/400x600.png?text=No+Image";

function mapWinners(
  winners: { spotlight: any }[] | undefined,
  category: "Business" | "Artist",
): HistoricalWinnersItem[] {
  return (winners || []).map(w => ({
    id: w.spotlight.id,
    title: w.spotlight.name,
    slug: "",
    description: `${w.spotlight.city}, ${w.spotlight.state}`,
    image: w.spotlight.media.headshot || FALLBACK_IMAGE,
    category,
  }));
}

const Page = async () => {
  const [
    cmsDataRes,
    featuredEventsRes,
    featuredProductsRes,
    countdownRes,
    businessWinnersRes,
    artistWinnersRes,
    pastSixMonthsWinnersRes,
    currentWinnerRes,
  ] = await Promise.allSettled([
    getCMSHomepageData(),
    getFeaturedEvents(),
    getFeaturedProducts(),
    getRoundCountdown(),
    getBusinessHistoricalWinners(),
    getArtistHistoricalWinners(),
    getPastSixMonthsWinners(),
    getCurrentContestWinner(),
  ]);

  // Log failures the same way the original try/catch blocks did
  [
    ["CMS homepage data", cmsDataRes],
    ["featured events", featuredEventsRes],
    ["featured products", featuredProductsRes],
    ["round countdown", countdownRes],
    ["business winners", businessWinnersRes],
    ["artist winners", artistWinnersRes],
    ["past six months winners", pastSixMonthsWinnersRes],
    ["current contest winner", currentWinnerRes],
  ].forEach(([label, res]: any) => {
    if (res.status === "rejected") {
      console.error(`Failed to fetch ${label}:`, res.reason);
    }
  });

  const cmsData =
    cmsDataRes.status === "fulfilled" ? cmsDataRes.value : undefined;

  const featuredEvents: FeaturedEventItem[] =
    featuredEventsRes.status === "fulfilled"
      ? featuredEventsRes.value?.events || []
      : [];

  const featuredProducts: FeaturedProductItem[] =
    featuredProductsRes.status === "fulfilled" ? featuredProductsRes.value : [];

  const countdownData: RoundCountdownResponse | null =
    countdownRes.status === "fulfilled" ? countdownRes.value : null;

  const businessWinners: HistoricalWinnersItem[] =
    businessWinnersRes.status === "fulfilled"
      ? mapWinners(businessWinnersRes.value?.winners, "Business")
      : [];

  const artistWinners: HistoricalWinnersItem[] =
    artistWinnersRes.status === "fulfilled"
      ? mapWinners(artistWinnersRes.value?.winners, "Artist")
      : [];

  const pastSixMonthsWinners: PastSixMonthsWinner[] =
    pastSixMonthsWinnersRes.status === "fulfilled"
      ? pastSixMonthsWinnersRes.value?.winners || []
      : [];

  const currentWinner: PastSixMonthsWinner | null =
    currentWinnerRes.status === "fulfilled"
      ? currentWinnerRes.value?.winner || null
      : null;

  return (
    <>
      <Hero data={cmsData?.hero} />
      <Sponsors data={cmsData?.partners} showButton={false} />
      <PoweredByOSI data={cmsData?.static_banner} />
      <WhyChoose data={cmsData?.why_choose} />
      <CoreValues data={cmsData?.core_values} />
      <WhatYouAreGetting data={cmsData?.what_you_get} />
      <BossBeginnings
        data={cmsData?.boss_beginnings}
        currentWinner={currentWinner}
      />
      <SuccessStories
        cmsData={cmsData?.celebrating_business_spotlight_winners}
        winners={businessWinners}
        type="business"
      />
      <ArtistSpotlightCard data={cmsData?.spotlight} />
      <SuccessStories
        cmsData={cmsData?.celebrating_artist_spotlight_winners}
        winners={artistWinners}
        type="artist"
      />
      <EventBanner data={cmsData?.cta} />
      <Countdown data={countdownData} />
      <FeaturedEvent events={featuredEvents} />
      <UpcomingEvents />
      <PastEvents />
      <CommunityAchievements
        data={cmsData?.past_6_month_boss_beginnings_highlight}
        pastSixMonthsWinners={pastSixMonthsWinners}
      />
      <OSIApparel data={cmsData?.shop} featuredProducts={featuredProducts} />
      <Sponsors data={cmsData?.partners} />
      <NewsLetter data={cmsData?.newsletter} />
    </>
  );
};

export default Page;
