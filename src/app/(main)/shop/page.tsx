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
import {
  getCMSFAQs,
  getEventsPageCms,
  getShopPageCms,
} from "@/lib/Services/cms_service";
import VendorOsi from "../events/_Components/VendorOsi";
import { CMSEventsPage } from "@/Types/cms";

const page = async () => {
  const faqData = await getCMSFAQs();
  const shopData = await getShopPageCms();
  const pageData = (await getEventsPageCms()) as CMSEventsPage;

  return (
    <>
      <ShopBanner data={shopData?.shop_page_hero} />
      <IconSection data={shopData?.shop_page_features} />
      <FeaturedShop />
      <PurchaseSupports data={shopData?.shop_page_support} />
      {/* <DigitalResources /> */}
      {/* <VendorWithOSI /> */}
      <VendorOsi data={pageData?.events_page_vendor} />
      <LimitedDrops />
      <TrustFeatures data={shopData?.shop_page_footer_features} />
      <FAQAccordion data={faqData} />
      <OurSponsors />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
