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

const page = () => {
  return (
    <>
      <BusinessSpotlightBanner />
      <SpotlightHero />
      <DiscoverArtists />
      <CommunityAchievements />
      <EditorsPicks />
      <SpotlightLadder
        title="OSI Spotlight Ladder"
        subTitle="Community-driven weekly recognition"
        buttonHref="/spotlight-business/spotlight-ladder"
      />
      <BecomeAPart />
      <CreativeJourney />
      <WhatExist />
      <EventSponsors />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;
