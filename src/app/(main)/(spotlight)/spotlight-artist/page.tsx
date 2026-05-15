import NewsLetter from "@/Components/Common/NewsLetter";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import DiscoverArtists from "../_components/DiscoverArtists";
import EditorsPicks from "../_components/EditorsPicks";
import SpotlightHero from "../_components/SpotlightHero";
import SpotlightLadder from "../_components/SpotlightLadder";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import EventSponsors from "../../services/_components/EventSponsors";
import ArtistSpotlightBanner from "../_components/ArtistSpotlightBanner";

const page = () => {
  return (
    <>
      <ArtistSpotlightBanner />
      <SpotlightHero />
      <DiscoverArtists type="artist" />
      <CommunityAchievements />
      {/* <EditorsPicks type="artist" /> */}
      <SpotlightLadder
        title="Weekly Spotlight Ladder"
        subTitle="Community-driven recognition for outstanding developers"
        buttonHref="/spotlight-artist/spotlight-ladder"
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
