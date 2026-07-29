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

const Page = async () => {
  const cmsData = await getCMSHomepageData();

  let featuredEvents: FeaturedEventItem[] = [];
  try {
    const featuredRes = await getFeaturedEvents();
    featuredEvents = featuredRes?.events || [];
  } catch (err) {
    console.error("Failed to fetch featured events:", err);
  }

  let featuredProducts: FeaturedProductItem[] = [];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch (err) {
    console.error("Failed to fetch featured products:", err);
  }

  let countdownData: RoundCountdownResponse | null = null;
  try {
    countdownData = await getRoundCountdown();
  } catch (err) {
    console.error("Failed to fetch round countdown:", err);
  }

  let businessWinners: HistoricalWinnersItem[] = [];
  try {
    const res = await getBusinessHistoricalWinners();
    businessWinners = (res?.winners || []).map(w => ({
      id: w.spotlight.id,
      title: w.spotlight.name,
      slug: "",
      description: `${w.spotlight.city}, ${w.spotlight.state}`,
      image: w.spotlight.media.headshot || FALLBACK_IMAGE,
      category: "Business",
    }));
  } catch (err) {
    console.error("Failed to fetch business winners:", err);
  }

  let artistWinners: HistoricalWinnersItem[] = [];
  try {
    const res = await getArtistHistoricalWinners();
    artistWinners = (res?.winners || []).map(w => ({
      id: w.spotlight.id,
      title: w.spotlight.name,
      slug: "",
      description: `${w.spotlight.city}, ${w.spotlight.state}`,
      image: w.spotlight.media.headshot || FALLBACK_IMAGE,
      category: "Artist",
    }));
  } catch (err) {
    console.error("Failed to fetch artist winners:", err);
  }

  let pastSixMonthsWinners: PastSixMonthsWinner[] = [];
  try {
    const res = await getPastSixMonthsWinners();
    pastSixMonthsWinners = res?.winners || [];
  } catch (err) {
    console.error("Failed to fetch past six months winners:", err);
  }

  let currentWinner: PastSixMonthsWinner | null = null;
  try {
    const res = await getCurrentContestWinner();
    currentWinner = res?.winner || null;
  } catch (err) {
    console.error("Failed to fetch current contest winner:", err);
  }

  return (
    <>
      <Hero data={cmsData?.hero} />
      <Sponsors data={cmsData?.partners} showButton={false} />
      <PoweredByOSI data={cmsData?.static_banner} />
      <WhyChoose data={cmsData?.why_choose} />
      <CoreValues data={cmsData?.core_values} />
      <WhatYouAreGetting data={cmsData?.what_you_get} />
      {/* <PricingPlan /> */}
      {/* <PricingTable /> */}
      {/* <Features data={cmsData?.features} /> */}
      <BossBeginnings data={cmsData?.boss_beginnings} />
      <SuccessStories
        cmsData={cmsData?.celebrating_business_spotlight_winners}
        winners={businessWinners}
        type="business"
      />
      <ArtistSpotlightCard
        data={cmsData?.spotlight}
        currentWinner={currentWinner}
      />

      {/* <CommunityAchievements data={cmsData?.highlights} /> */}
      {/* <div className="pb-15">
        <ArtistSpotlightCard data={cmsData?.spotlight} />
      </div> */}
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
      {/* <CommunityPartner /> */}
      <Sponsors data={cmsData?.partners} />
      <NewsLetter data={cmsData?.newsletter} />
    </>
  );
};

export default Page;
