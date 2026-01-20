import DigitalResources from "./_components/DigitalResources";
import FeaturedShop from "./_components/FeaturedShop";
import IconSection from "./_components/IconSection";
import LimitedDrops from "./_components/LimitedDrops";
import TrustFeatures from "./_components/TrustFeatures";
import PurchaseSupports from "./_components/PurchaseSupports";
import NewsLetter from "@/Components/Common/NewsLetter";
import OurSponsors from "./_components/OurSponsors";
import FAQAccordion from "../services/_components/FAQAccordion";
import VendorWithOSI from "./_components/VendorWithOSI";
import ShopBanner from "./_components/ShopBanner";

const page = () => {
  return (
    <>
      <ShopBanner />
      <IconSection />
      <FeaturedShop />
      <PurchaseSupports />
      <DigitalResources />
      <VendorWithOSI />
      <LimitedDrops />
      <TrustFeatures />
      <FAQAccordion />
      <OurSponsors />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
