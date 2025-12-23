import EventsBanner from "./_Components/EventsBanner";
import CreatorMarket from "./_Components/CreatorMarket";
import FilterSection from "./_Components/FilterSection";
import UpcomingEvents from "./_Components/UpcomingEvents";
import EventSchedule from "./_Components/EventSchedule";

const page = () => {
  return (
    <>
      <EventsBanner />
      <CreatorMarket />
      <FilterSection />
      <UpcomingEvents />
      <EventSchedule />
    </>
  );
};

export default page;
