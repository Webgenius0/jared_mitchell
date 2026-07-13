import React from "react";
import PricingPlan from "../_components/PricingPlan";
import PricingTable from "../_components/PricingTable";
import { getCMSAboutData, getCMSFAQs } from "@/lib/Services/cms_service";
import FAQAccordion from "../services/_components/FAQAccordion";
import NewsLetter from "@/Components/Common/NewsLetter";
import { Button } from "@/Components/Common/Button";
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
    <div>
      <PricingPlan />
      <PricingTable />
      <FAQAccordion data={faqData} />
      <section className="py-10 xl:py-20">
        <h2 className="section_title">{"Our  Sponsors"}</h2>
        <div className="flex flex-col gap-5">
          <SponsorSlider logos={logos} />
          <SponsorSlider logos={logos} reverse={true} />
          <div className="flex justify-center mt-5">
            <Button>Become a Sponsor</Button>
          </div>
        </div>
      </section>
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};
export default page;
