import EventSponsors from "../services/_components/EventSponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import FAQAccordion from "../services/_components/FAQAccordion";
import TalentApplication from "./_components/TalentApplication";
import VendorOpportunities from "./_components/VendorOpportunities";
import GetInTouch from "./_components/GetInTouch";
import ContactBanner from "./_components/ContactBanner";

const page = () => {
  return (
    <>
      <ContactBanner />
      <GetInTouch />
      <TalentApplication />
      <VendorOpportunities />
      <FAQAccordion />
      <EventSponsors />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
