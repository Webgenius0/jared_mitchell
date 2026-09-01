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
import SpotlightGuide from "../_components/SpotlightGuide";
import SpotlightCountdown from "../_components/SpotlightCountdown";
import SuccessStories from "../../_components/SuccessStories";
import SpotlightWinnerSection from "@/Components/Common/SpotlightWinnerSection";
import SpotlightAdminArticlesSection from "../_components/SpotlightAdminArticlesSection";
import {
  getCMSAboutData,
  getCMSBusinessSpotlightData,
  getBusinessHistoricalWinners,
  getFeaturedStream,
  getLiveStreams,
  getVideoChannels,
  getSpotlightOfTheWeek,
} from "@/lib/Services/cms_service";
import { AdminArticle, HistoricalWinnersItem, LiveStream, SpotlightHistoricalWinnerItem, VideoChannelItem } from "@/Types/cms";
import Sponsors from "../../_components/Sponsors";

const FALLBACK_IMAGE = "https://placehold.co/400x600.png?text=No+Image";

const page = async () => {
  const cmsData = await getCMSBusinessSpotlightData();
  const CmsData = await getCMSAboutData();

  let liveStream: LiveStream | undefined;
  let hasPendingStream = false;
  try {
    const { stream, hasPending } = getFeaturedStream(
      await getLiveStreams("business"),
    );
    liveStream = stream;
    hasPendingStream = hasPending;
  } catch (err) {
    console.error("Failed to fetch business live streams:", err);
  }

  let businessVideos: VideoChannelItem[] = [];
  try {
    const videoChannels = await getVideoChannels();
    businessVideos = videoChannels?.business_spotlight?.videos ?? [];
  } catch (err) {
    console.error("Failed to fetch video channels:", err);
  }

  let businessWinners: HistoricalWinnersItem[] = [];
  let lastBusinessWinner: SpotlightHistoricalWinnerItem | null = null;
  try {
    const res = await getBusinessHistoricalWinners();
    lastBusinessWinner = res?.winners?.[0] ?? null;
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

  let adminArticles: AdminArticle[] = [];
  try {
    const spotlightRes = await getSpotlightOfTheWeek("business");
    adminArticles = spotlightRes?.data?.admin_articles ?? [];
  } catch (err) {
    console.error("Failed to fetch spotlight of the week:", err);
  }

  return (
    <>
      <BusinessSpotlightBanner data={cmsData?.business_spotlight_hero} />
      <SpotlightCountdown />
      <SpotlightHero
        data={cmsData?.business_spotlight_video}
        liveStream={liveStream}
        hasPendingStream={hasPendingStream}
        videoChannelVideos={businessVideos}
      />
      <SpotlightWinnerSection winner={lastBusinessWinner} type="business" />

      <SpotlightAdminArticlesSection articles={adminArticles} type="business" />

<div className="2xl:px-5 3xl:px-5">
        <HowSpotlightWorks type="business" />
      <SpotlightGuide type="business" />
</div>
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
