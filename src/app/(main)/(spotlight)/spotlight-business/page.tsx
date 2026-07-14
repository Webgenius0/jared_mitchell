import NewsLetter from "@/Components/Common/NewsLetter";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import EventSponsors from "../../services/_components/EventSponsors";
import SpotlightHero from "../_components/SpotlightHero";
import DiscoverArtists from "../_components/DiscoverArtists";
import EditorsPicks from "../_components/EditorsPicks";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import SpotlightLadder from "../_components/SpotlightLadder";
import BusinessSpotlightBanner from "../_components/BusinessSpotlightBanner";
import {
  getCMSAboutData,
  getCMSBusinessSpotlightData,
} from "@/lib/Services/cms_service";
import Sponsors from "../../_components/Sponsors";

const page = async () => {
  const cmsData = await getCMSBusinessSpotlightData();
  const CmsData = await getCMSAboutData();

  return (
    <>
      <BusinessSpotlightBanner data={cmsData?.business_spotlight_hero} />
      <SpotlightHero data={cmsData?.business_spotlight_video} />
      <DiscoverArtists
        type="business"
        data={cmsData?.business_spotlight_list}
      />
      <CommunityAchievements data={cmsData?.business_spotlight_highlights} />
      {/* <EditorsPicks type="business" data={cmsData?.business_spotlight_picks} /> */}
      <SpotlightLadder
        title={
          cmsData?.business_spotlight_ladder?.title || "OSI Spotlight Ladder"
        }
        subTitle={
          cmsData?.business_spotlight_ladder?.sub_title ||
          "Community-driven weekly recognition"
        }
        buttonHref="/spotlight-business/spotlight-ladder"
        data={cmsData?.business_spotlight_ladder}
      />
      <BecomeAPart data={cmsData?.business_spotlight_join} />
      {/* <CreativeJourney data={cmsData?.business_spotlight_interview} /> */}
      <WhatExist data={cmsData?.business_spotlight_why_exists} />
      {/* <EventSponsors /> */}
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;

