import CustomVideoPlayer from "@/Components/Common/CustomVideoPlayer";
import SponsorshipMatters from "./_components/SponsorshipMatters";
import HowSponsorshipWorks from "./_components/HowSponsorshipWorks";
import SponsorshipLevel from "./_components/SponsorshipLevel";
import BecomeSponsor from "./_components/BecomeSponsor";
import FAQAccordion from "../services/_components/FAQAccordion";
import EventSponsors from "../services/_components/EventSponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import SponsorshipBanner from "./_components/SponsorshipBanner";
import {
  getCMSAboutData,
  getCMSFAQs,
  getSponsorshipPageCms,
} from "@/lib/Services/cms_service";
import { CMSSponsorshipPage } from "@/Types/cms";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";

const page = async () => {
  const faqData = await getCMSFAQs();
  const pageData = (await getSponsorshipPageCms()) as CMSSponsorshipPage;
  const CmsData = await getCMSAboutData();

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <>
      <SponsorshipBanner data={pageData?.sponsorship_page_hero} />
      <section className="section container">
        <div className="w-full h-[627px]">
          <CustomVideoPlayer
            videoSrc={
              pageData?.sponsorship_page_video?.sub_title ??
              "/home/hero-video.mp4"
            }
            className={"!rounded-[40px]"}
          />
        </div>
      </section>
      <SponsorshipMatters data={pageData?.sponsorship_page_why} />
      <HowSponsorshipWorks data={pageData?.sponsorship_page_steps} />
      <SponsorshipLevel data={pageData?.sponsorship_page_levels_header} />
      <BecomeSponsor data={pageData?.sponsorship_page_footer} />
      <FAQAccordion data={faqData} />
      {/* <EventSponsors /> */}
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

export default page;
