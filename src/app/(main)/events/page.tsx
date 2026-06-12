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
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../_components/Sponsors";
import EventHero from "./_Components/EventHero";
import { getEventsPageCms } from "@/lib/Services/cms_service";
import { CMSEventsPage } from "@/Types/cms";

const Page = async () => {
  const pageData = (await getEventsPageCms()) as CMSEventsPage;

  return (
    <>
      <EventsBanner data={pageData?.events_page_hero} />
      <EventHero data={pageData?.events_page_hero} />
      <CreatorMarket />
      <FilterSection />
      <UpcomingEvents />
      <EventSchedule video={pageData?.events_page_video} />
      <EventHost data={pageData?.events_page_host} />
      <VendorOsi data={pageData?.events_page_vendor} />
      <WhatYouGet data={pageData?.events_page_booth_features} />
      <EventGallery />
      <EventHighlight />
      <Sponsors />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
