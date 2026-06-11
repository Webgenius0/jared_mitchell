"use client";

import EventsBanner from "./EventsBanner";
import CreatorMarket from "./CreatorMarket";
import FilterSection from "./FilterSection";
import UpcomingEvents from "./UpcomingEvents";
import EventSchedule from "./EventSchedule";
import EventHost from "./EventHost";
import VendorOsi from "./VendorOsi";
import WhatYouGet from "./WhatYouGet";
import EventGallery from "./EventGallery";
import EventHighlight from "./EventHighlight";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../../_components/Sponsors";
import EventHero from "./EventHero";
import { getEventsPage } from "@/Hooks/api/cms_api";
import { CMSEventsPage } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";

const EventsContent = () => {
  const { data: cmsData, isLoading } = getEventsPage();
  const pageData = cmsData?.data as CMSEventsPage | undefined;

  if (isLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <EventsBanner />
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

export default EventsContent;
