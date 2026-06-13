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
import { getCMSAboutData, getEventsPageCms } from "@/lib/Services/cms_service";
import { CMSEventsPage } from "@/Types/cms";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";

const Page = async () => {
  const pageData = (await getEventsPageCms()) as CMSEventsPage;
  const CmsData = await getCMSAboutData();

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

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
      {/* <Sponsors /> */}
      <section className="py-10 xl:py-20">
        <h2 className="section_title">
          {CmsData?.about_sponsors?.title || "Our Event Sponsors"}
        </h2>
        <div className="flex flex-col gap-5">
          <SponsorSlider logos={logos} />
          <SponsorSlider logos={logos} reverse={true} />
        </div>
      </section>
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
