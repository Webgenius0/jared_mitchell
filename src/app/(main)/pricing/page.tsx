import React from "react";
import PricingPlan from "../_components/PricingPlan";
import PricingTable from "../_components/PricingTable";
import { getCMSAboutData, getCMSFAQs } from "@/lib/Services/cms_service";
import FAQAccordion from "../services/_components/FAQAccordion";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const faqData = await getCMSFAQs();
  const CmsData = await getCMSAboutData();

  return (
    <div>
      <PricingPlan />
      <PricingTable />
      <FAQAccordion data={faqData} />
      <Sponsors data={CmsData?.about_sponsors} title="Our Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};
export default page;

