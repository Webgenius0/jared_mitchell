import EventsBanner from "./_Components/EventsBanner";
import CreatorMarket from "./_Components/CreatorMarket";
import FilterSection from "./_Components/FilterSection";
import UpcomingEvents from "./_Components/UpcomingEvents";
import EventSchedule from "./_Components/EventSchedule";
import EventHost from "./_Components/EventHost";
import VendorOsi from "./_Components/VendorOsi";
import WhatYouGet from "./_Components/WhatYouGet";
import EventGallery from "./_Components/EventGallery";
import EventHighlight from "./_Components/EventHighlight";
import FeaturedEventsCarousel from "./_Components/FeaturedEventsCarousel";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../_components/Sponsors";
import EventHero from "./_Components/EventHero";
import BossBeginningSponsor from "../boss-beginnings/_components/BossBeginningSponsor";
import {
  getCMSAboutData,
  getCMSHomepageData,
  getEventsPageCms,
  getFeaturedEvents,
  getFeaturedStream,
  getLiveStreams,
} from "@/lib/Services/cms_service";
import { CMSEventsPage, FeaturedEventItem, LiveStream } from "@/Types/cms";

const Page = async () => {
  const pageData = (await getEventsPageCms()) as CMSEventsPage;
  const cmsData = await getCMSHomepageData();

  let featuredEvents: FeaturedEventItem[] = [];
  try {
    const featuredRes = await getFeaturedEvents();
    featuredEvents = featuredRes?.events || [];
  } catch (err) {
    console.error("Failed to fetch featured events:", err);
  }

  // Event live stream (AWS IVS). Prefers a live channel (playback_url),
  // otherwise falls back to the latest ended stream's recording (vod_url).
  // A pending-only channel hides the EventHero section.
  let eventStream: LiveStream | undefined;
  let hasPendingStream = false;
  try {
    const { stream, hasPending } = getFeaturedStream(
      await getLiveStreams("event"),
    );
    eventStream = stream;
    hasPendingStream = hasPending;
  } catch (err) {
    console.error("Failed to fetch event live streams:", err);
  }

  return (
    <>
      <EventsBanner data={pageData?.events_page_hero} />
      <EventHero
        data={pageData?.events_page_hero}
        liveStream={eventStream}
        hasPendingStream={hasPendingStream}
      />
      <FeaturedEventsCarousel events={featuredEvents} />
      {/* <CreatorMarket /> */}
      {/* <FilterSection /> */}
      <UpcomingEvents />
      <EventSchedule video={pageData?.events_page_video} />
      <EventHost data={pageData?.events_page_host} />
      {/* <VendorOsi data={pageData?.events_page_vendor} /> */}
      {/* <WhatYouGet data={pageData?.events_page_booth_features} /> */}
      <EventGallery />
      <EventHighlight />
      <BossBeginningSponsor variant="events" />
      <Sponsors data={cmsData?.partners} showButton={true} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
