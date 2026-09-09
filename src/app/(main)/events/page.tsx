import type { Metadata } from "next";
import EventsBanner from "./_Components/EventsBanner";
import UpcomingEvents from "./_Components/UpcomingEvents";
import EventSchedule from "./_Components/EventSchedule";
import EventHost from "./_Components/EventHost";
import EventGallery from "./_Components/EventGallery";
import EventHighlight from "./_Components/EventHighlight";
import FeaturedEventsCarousel from "./_Components/FeaturedEventsCarousel";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../_components/Sponsors";
import EventHero from "./_Components/EventHero";
import BusinessAwardSponsor from "../business-award/_components/BusinessAwardSponsor";
import {
  getCMSHomepageData,
  getEventsPageCms,
  getFeaturedEvents,
  getFeaturedStream,
  getLiveStreams,
  getVideoChannels,
} from "@/lib/Services/cms_service";
import { CMSEventsPage, FeaturedEventItem, LiveStream, VideoChannelItem } from "@/Types/cms";

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

  let eventVideos: VideoChannelItem[] = [];
  try {
    const videoChannels = await getVideoChannels();
    eventVideos = videoChannels?.event_video?.videos ?? [];
  } catch (err) {
    console.error("Failed to fetch video channels:", err);
  }

  return (
    <>
      <EventsBanner data={pageData?.events_page_hero} />
      <EventHero
        data={pageData?.events_page_hero}
        liveStream={eventStream}
        hasPendingStream={hasPendingStream}
        videoChannelVideos={eventVideos}
      />
      <FeaturedEventsCarousel events={featuredEvents} />
      <UpcomingEvents />
      <EventSchedule video={pageData?.events_page_video} />
      <EventHost data={pageData?.events_page_host} />
      <EventGallery />
      <EventHighlight />
      <BusinessAwardSponsor variant="events" />
      <Sponsors data={cmsData?.partners} showButton={true} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export const metadata = {
  title: "Events - Upcoming & Featured | OSI",
  description:
    "Discover upcoming events, live streams, and featured happenings in the OSI community. Attend, participate, and stay connected with the Open Spotlight Initiative events calendar.",
  keywords: [
    "OSI events",
    "OSI upcoming events",
    "OSI live streams",
    "OSI event calendar",
    "community events",
    "OSI happenings",
  ],
  openGraph: {
    title: "Events - Upcoming & Featured | OSI",
    description:
      "Discover upcoming events, live streams, and featured happenings in the OSI community. Stay connected with the Open Spotlight Initiative.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-events.png",
        width: 1200,
        height: 630,
        alt: "OSI Events - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - Upcoming & Featured | OSI",
    description:
      "Discover upcoming events, live streams, and featured happenings in the OSI community. Stay connected with the Open Spotlight Initiative.",
    images: ["/og-events.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default Page;
