import EventSponsors from "../services/_components/EventSponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import FAQAccordion from "../services/_components/FAQAccordion";
import TalentApplication from "./_components/TalentApplication";
import VendorOpportunities from "./_components/VendorOpportunities";
import GetInTouch from "./_components/GetInTouch";
import ContactBanner from "./_components/ContactBanner";
import { getCMSAboutData, getCMSFAQs } from "@/lib/Services/cms_service";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";

const page = async () => {
  const faqData = await getCMSFAQs();
  const CmsData = await getCMSAboutData();

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <>
      <ContactBanner />
      <GetInTouch />
      <TalentApplication />
      <VendorOpportunities />
      <FAQAccordion data={faqData} />
      {/* <EventSponsors /> */}
      <section className="py-10 xl:py-20">
        <h2 className="section_title">
          {"Proudly supported by our community partners"}
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
