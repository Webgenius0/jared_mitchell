import NewsLetter from "@/Components/Common/NewsLetter";
import FAQAccordion from "../services/_components/FAQAccordion";
import TalentApplication from "./_components/TalentApplication";
import VendorOpportunities from "./_components/VendorOpportunities";
import GetInTouch from "./_components/GetInTouch";
import ContactBanner from "./_components/ContactBanner";
import { getCMSAboutData, getCMSFAQs } from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const faqData = await getCMSFAQs();
  const CmsData = await getCMSAboutData();

  return (
    <div className="xl:px-5">
      <ContactBanner />
      <GetInTouch />
      <TalentApplication />
      <VendorOpportunities />
      <FAQAccordion data={faqData} />
      <Sponsors
        data={CmsData?.partners}
        showButton={false}
        title="Proudly supported by our community partners"
      />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};

export default page;
