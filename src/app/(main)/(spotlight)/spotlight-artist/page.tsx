import NewsLetter from "@/Components/Common/NewsLetter";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import DiscoverArtists from "../_components/DiscoverArtists";
import SpotlightHero from "../_components/SpotlightHero";
import SpotlightLadder from "../_components/SpotlightLadder";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import ArtistSpotlightBanner from "../_components/ArtistSpotlightBanner";
import SuccessStories from "../../_components/SuccessStories";
import {
  getCMSAboutData,
  getCMSArtistSpotlightData,
  getArtistHistoricalWinners,
  getArtistLiveStreams,
  getCMSHomepageData,
} from "@/lib/Services/cms_service";
import { HistoricalWinnersItem, LiveStream } from "@/Types/cms";
import Sponsors from "../../_components/Sponsors";

const FALLBACK_IMAGE = "https://placehold.co/400x600.png?text=No+Image";

const page = async () => {
  const cmsData = await getCMSArtistSpotlightData();
  const partners = await getCMSHomepageData();

  // Artist spotlight live stream (AWS IVS). Ended streams are filtered out
  // by the service; only an actively-broadcasting channel switches the hero
  // over to the live player — pending keeps the looping video.
  let liveStream: LiveStream | undefined;
  try {
    const streams = await getArtistLiveStreams();
    liveStream = streams.find(s => s.status === "live");
  } catch (err) {
    console.error("Failed to fetch artist live streams:", err);
  }

  let artistWinners: HistoricalWinnersItem[] = [];
  try {
    const res = await getArtistHistoricalWinners();
    artistWinners = (res?.winners || []).map(w => ({
      id: w.spotlight.id,
      title: w.spotlight.name,
      slug: w.spotlight.name.toLowerCase().replace(/\s+/g, "-") || "",
      description: `${w.spotlight.city}, ${w.spotlight.state}`,
      image: w.spotlight.media.headshot || FALLBACK_IMAGE,
      category: "Artist",
    }));
  } catch (err) {
    console.error("Failed to fetch artist winners:", err);
  }

  return (
    <>
      <ArtistSpotlightBanner data={cmsData?.artist_spotlight_hero} />
      <SpotlightHero
        data={cmsData?.artist_spotlight_video}
        liveStream={liveStream}
      />
      <DiscoverArtists type="artist" data={cmsData?.artist_spotlight_list} />
      {/* <CommunityAchievements data={cmsData?.artist_spotlight_highlights} /> */}
      <SuccessStories winners={artistWinners} type="artist" />
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
      <Sponsors data={partners?.partners} showButton={false} />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;
