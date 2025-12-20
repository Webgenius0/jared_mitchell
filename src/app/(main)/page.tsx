import Sponsors from "@/app/(main)/_components/Sponsors";
import CoreValues from "@/app/(main)/_components/CoreValues";
import Hero from "@/app/(main)/_components/Hero";
import WhyChoose from "@/app/(main)/_components/WhyChoose";
import CommunityPartner from "@/app/(main)/_components/CommunityPartner";
import WhatYouAreGetting from "@/app/(main)/_components/WhatYouAreGetting";
import Features from "@/app/(main)/_components/Features";
import PricingTable from "@/app/(main)/_components/PricingTable";
import PricingPlan from "@/app/(main)/_components/PricingPlan";
import BossBeginnings from "@/app/(main)/_components/BossBeginnings";
import OSIApparel from "@/app/(main)/_components/OSIApparel";
import NewsLetter from "@/app/(main)/_components/NewsLetter";
import SuccessStories from "@/app/(main)/_components/SuccessStories";
import CommunityAchievements from "@/app/(main)/_components/CommunityAchievements";
import Countdown from "@/app/(main)/_components/Countdown";
import ArtistSpotlightCard from "@/app/(main)/_components/ArtistSpotlightCard";
import PastEvents from "@/app/(main)/_components/PastEvents";
import UpcomingEvents from "@/app/(main)/_components/UpcomingEvents";
import EventBanner from "./_components/EventBanner";
import PoweredByOSI from "./_components/PoweredByOSI";
import FeaturedEvent from "./_components/FeaturedEvent";

const Page = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <PoweredByOSI />
      <WhyChoose />
      <CoreValues />
      <PricingPlan />
      <PricingTable />
      <WhatYouAreGetting />
      <Features />
      <BossBeginnings />
      <SuccessStories />
      <ArtistSpotlightCard />
      <CommunityAchievements />
      <ArtistSpotlightCard />
      <CommunityAchievements />
      <EventBanner />
      <Countdown />
      <FeaturedEvent />
      <UpcomingEvents />
      <PastEvents />
      <CommunityAchievements />
      <OSIApparel />
      <CommunityPartner />
      <NewsLetter />
    </>
  );
};

export default Page;
