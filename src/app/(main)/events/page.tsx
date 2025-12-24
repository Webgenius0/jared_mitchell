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

const page = () => {
  return (
    <>
      <EventsBanner />
      <CreatorMarket />
      <FilterSection />
      <UpcomingEvents />
      <EventSchedule />
      <EventHost />
      <VendorOsi />
      <WhatYouGet />
      <EventGallery />
      <EventHighlight />
    </>
  );
};

export default page;
