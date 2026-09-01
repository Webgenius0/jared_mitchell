import NewsLetter from "@/Components/Common/NewsLetter";
import BecomeAPart from "../_components/BecomeAPart";
import CreativeJourney from "../_components/CreativeJourney";
import DiscoverArtists from "../_components/DiscoverArtists";
import SpotlightHero from "../_components/SpotlightHero";
import SpotlightLadder from "../_components/SpotlightLadder";
import CommunityAchievements from "../../_components/CommunityAchievements";
import WhatExist from "../../about/_Components/WhatExist";
import ArtistSpotlightBanner from "../_components/ArtistSpotlightBanner";
import HowSpotlightWorks from "../_components/HowSpotlightWorks";
import SpotlightGuide from "../_components/SpotlightGuide";
import SpotlightCountdown from "../_components/SpotlightCountdown";
import SuccessStories from "../../_components/SuccessStories";
import SpotlightWinnerSection from "@/Components/Common/SpotlightWinnerSection";
import SpotlightAdminArticlesSection from "../_components/SpotlightAdminArticlesSection";
import {
  getCMSAboutData,
  getCMSArtistSpotlightData,
  getArtistHistoricalWinners,
  getCMSHomepageData,
  getFeaturedStream,
  getLiveStreams,
  getVideoChannels,
  getSpotlightOfTheWeek,
} from "@/lib/Services/cms_service";
import { AdminArticle, HistoricalWinnersItem, LiveStream, SpotlightHistoricalWinnerItem, VideoChannelItem } from "@/Types/cms";
import Sponsors from "../../_components/Sponsors";

const FALLBACK_IMAGE = "https://placehold.co/400x600.png?text=No+Image";

const page = async () => {
  const cmsData = await getCMSArtistSpotlightData();
  const partners = await getCMSHomepageData();

  let liveStream: LiveStream | undefined;
  let hasPendingStream = false;
  try {
    const { stream, hasPending } = getFeaturedStream(
      await getLiveStreams("artist"),
    );
    liveStream = stream;
    hasPendingStream = hasPending;
  } catch (err) {
    console.error("Failed to fetch artist live streams:", err);
  }

  let artistVideos: VideoChannelItem[] = [];
  try {
    const videoChannels = await getVideoChannels();
    artistVideos = videoChannels?.artist_spotlight?.videos ?? [];
  } catch (err) {
    console.error("Failed to fetch video channels:", err);
  }

  let artistWinners: HistoricalWinnersItem[] = [];
  let lastArtistWinner: SpotlightHistoricalWinnerItem | null = null;
  try {
    const res = await getArtistHistoricalWinners();
    lastArtistWinner = res?.winners?.[0] ?? null;
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

  let adminArticles: AdminArticle[] = [];
  try {
    const spotlightRes = await getSpotlightOfTheWeek("artist");
    adminArticles = spotlightRes?.data?.admin_articles ?? [];
  } catch (err) {
    console.error("Failed to fetch spotlight of the week:", err);
  }

  return (
    <>
      <ArtistSpotlightBanner data={cmsData?.artist_spotlight_hero} />
      <SpotlightCountdown />
      <SpotlightHero
        data={cmsData?.artist_spotlight_video}
        liveStream={liveStream}
        hasPendingStream={hasPendingStream}
        videoChannelVideos={artistVideos}
      />
      <SpotlightWinnerSection winner={lastArtistWinner} type="artist" />

      <SpotlightAdminArticlesSection articles={adminArticles} type="artist" />

      {lastArtistWinner && console.log(lastArtistWinner)}
      <div className="2xl:px-5 3xl:px-5">
        <HowSpotlightWorks type="artist" />
      </div>
    <div className="2xl:px-5 3xl:px-5">
        <SpotlightGuide type="artist" />
    </div>
      <DiscoverArtists type="artist" data={cmsData?.artist_spotlight_list} />
      {/* <CommunityAchievements data={cmsData?.artist_spotlight_highlights} /> */}
      <SuccessStories winners={artistWinners} type="artist" />
      <BecomeAPart data={cmsData?.artist_spotlight_join} />
      {/* <CreativeJourney data={cmsData?.artist_spotlight_interview} /> */}
      <WhatExist data={cmsData?.artist_spotlight_why_exists} />
      <Sponsors data={partners?.partners} showButton={false} />
      <NewsLetter title="Stay connected with new spotlights, events, and creative tools." />
    </>
  );
};

export default page;
