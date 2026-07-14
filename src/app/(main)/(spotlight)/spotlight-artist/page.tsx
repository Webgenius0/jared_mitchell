import NewsLetter from "@/Components/Common/NewsLetter";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import DiscoverArtists from "../_components/DiscoverArtists";
import SpotlightHero from "../_components/SpotlightHero";
import SpotlightLadder from "../_components/SpotlightLadder";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import EventSponsors from "../../services/_components/EventSponsors";
import ArtistSpotlightBanner from "../_components/ArtistSpotlightBanner";
import {
  getCMSAboutData,
  getCMSArtistSpotlightData,
} from "@/lib/Services/cms_service";
import Sponsors from "../../_components/Sponsors";

const page = async () => {
  const cmsData = await getCMSArtistSpotlightData();
  const CmsData = await getCMSAboutData();

  return (
    <>
      <ArtistSpotlightBanner data={cmsData?.artist_spotlight_hero} />
      <SpotlightHero data={cmsData?.artist_spotlight_video} />
      <DiscoverArtists type="artist" data={cmsData?.artist_spotlight_list} />
      <CommunityAchievements data={cmsData?.artist_spotlight_highlights} />
      <SpotlightLadder
        title={
          cmsData?.artist_spotlight_ladder?.title || "Weekly Spotlight Ladder"
        }
        subTitle={
          cmsData?.artist_spotlight_ladder?.sub_title ||
          "Community-driven recognition for outstanding developers"
        }
        buttonHref="/spotlight-artist/spotlight-ladder"
        data={cmsData?.artist_spotlight_ladder}
      />
      <BecomeAPart data={cmsData?.artist_spotlight_join} />
      {/* <CreativeJourney data={cmsData?.artist_spotlight_interview} /> */}
      <WhatExist data={cmsData?.artist_spotlight_why_exists} />
      {/* <EventSponsors /> */}
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;

