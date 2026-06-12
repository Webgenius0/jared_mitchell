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
import { getCMSHomepageData } from "@/lib/Services/cms_service";

const Page = async () => {
  const cmsData = await getCMSHomepageData();

  return (
    <>
      <Hero data={cmsData?.hero} />
      <Sponsors data={cmsData?.partners} />
      <PoweredByOSI data={cmsData?.features} />
      <WhyChoose data={cmsData?.why_choose} />
      <CoreValues data={cmsData?.core_values} />
      <PricingPlan />
      <PricingTable />
      <WhatYouAreGetting data={cmsData?.what_you_get} />
      {/* <Features data={cmsData?.features} /> */}
      <BossBeginnings data={cmsData?.boss_beginnings} />
      <SuccessStories />
      <ArtistSpotlightCard data={cmsData?.spotlight} />
      <CommunityAchievements data={cmsData?.highlights} />
      <div className="pb-15">
        <ArtistSpotlightCard data={cmsData?.spotlight} />
      </div>
      <EventBanner data={cmsData?.cta} />
      <Countdown />
      <FeaturedEvent />
      <UpcomingEvents />
      <PastEvents />
      <OSIApparel data={cmsData?.shop} />
      {/* <CommunityPartner /> */}
      <NewsLetter data={cmsData?.newsletter} />
    </>
  );
};

export default Page;
