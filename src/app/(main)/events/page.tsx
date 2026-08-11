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
} from "@/lib/Services/cms_service";
import { CMSEventsPage, FeaturedEventItem } from "@/Types/cms";

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

  return (
    <>
      <EventsBanner data={pageData?.events_page_hero} />
      <EventHero data={pageData?.events_page_hero} />
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
