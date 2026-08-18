import NewsLetter from "@/Components/Common/NewsLetter";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import SpotlightHero from "../_components/SpotlightHero";
import DiscoverArtists from "../_components/DiscoverArtists";
import EditorsPicks from "../_components/EditorsPicks";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import SpotlightLadder from "../_components/SpotlightLadder";
import BusinessSpotlightBanner from "../_components/BusinessSpotlightBanner";
import HowSpotlightWorks from "../_components/HowSpotlightWorks";
import SuccessStories from "../../_components/SuccessStories";
import {
  getCMSAboutData,
  getCMSBusinessSpotlightData,
  getBusinessHistoricalWinners,
} from "@/lib/Services/cms_service";
import { HistoricalWinnersItem } from "@/Types/cms";
import Sponsors from "../../_components/Sponsors";

const FALLBACK_IMAGE = "https://placehold.co/400x600.png?text=No+Image";

const page = async () => {
  const cmsData = await getCMSBusinessSpotlightData();
  const CmsData = await getCMSAboutData();

  let businessWinners: HistoricalWinnersItem[] = [];
  try {
    const res = await getBusinessHistoricalWinners();
    businessWinners = (res?.winners || []).map(w => ({
      id: w.spotlight.id,
      title: w.spotlight.name,
      slug: w.spotlight.name.toLowerCase().replace(/\s+/g, "-") || "",
      description: `${w.spotlight.city}, ${w.spotlight.state}`,
      image: w.spotlight.media.headshot || FALLBACK_IMAGE,
      category: "Business",
    }));
  } catch (err) {
    console.error("Failed to fetch business winners:", err);
  }

  return (
    <>
      <BusinessSpotlightBanner data={cmsData?.business_spotlight_hero} />
      <SpotlightHero data={cmsData?.business_spotlight_video} />
      <HowSpotlightWorks type="business" />
      <DiscoverArtists
        type="business"
        data={cmsData?.business_spotlight_list}
      />
      {/* <CommunityAchievements data={cmsData?.business_spotlight_highlights} /> */}
      <SuccessStories winners={businessWinners} type="business" />
      {/* <EditorsPicks type="business" data={cmsData?.business_spotlight_picks} /> */}
      {/* <SpotlightLadder
        title={
          cmsData?.business_spotlight_ladder?.title || "OSI Spotlight Ladder"
        }
        subTitle={
          cmsData?.business_spotlight_ladder?.sub_title ||
          "Community-driven weekly recognition"
        }
        buttonHref="/spotlight-business/spotlight-ladder"
        data={cmsData?.business_spotlight_ladder}
      /> */}
      <BecomeAPart data={cmsData?.business_spotlight_join} />
      {/* <CreativeJourney data={cmsData?.business_spotlight_interview} /> */}
      <WhatExist data={cmsData?.business_spotlight_why_exists} />
      <Sponsors data={CmsData?.partners} />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;
