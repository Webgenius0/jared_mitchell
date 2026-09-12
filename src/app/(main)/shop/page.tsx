import type { Metadata } from "next";
import DigitalResources from "./_components/DigitalResources";
import FeaturedShop from "./_components/FeaturedShop";
import IconSection from "./_components/IconSection";
import LimitedDrops from "./_components/LimitedDrops";
import PurchaseSupports from "./_components/PurchaseSupports";
import NewsLetter from "@/Components/Common/NewsLetter";
import FAQAccordion from "../services/_components/FAQAccordion";
import ShopBanner from "./_components/ShopBanner";
import {
  getCMSAboutData,
  getCMSFAQs,
  getEventsPageCms,
  getFeaturedProducts,
  getAllProducts,
  getShopPageCms,
} from "@/lib/Services/cms_service";
import { CMSEventsPage } from "@/Types/cms";
import Sponsors from "../_components/Sponsors";

const page = async () => {
  const faqData = await getCMSFAQs();
  const shopData = await getShopPageCms();
  const pageData = (await getEventsPageCms()) as CMSEventsPage;
  const CmsData = await getCMSAboutData();
  const featuredProducts = await getFeaturedProducts();
  const allProducts = await getAllProducts();

  return (
    <div className="xl:px-5 px-0">
      <ShopBanner data={shopData?.shop_page_hero} />
      <IconSection data={shopData?.shop_page_features} />
      <FeaturedShop products={featuredProducts} />
      <PurchaseSupports data={shopData?.shop_page_support} />
      <LimitedDrops products={allProducts} />
      <LimitedDrops />
      <FAQAccordion data={faqData} />
      <Sponsors data={CmsData?.about_sponsors} title="Our Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};

export const metadata: Metadata = {
  title: {
    absolute: "OSI Community Shop | Merchandise & Local Products",
  },
  description:
    "Shop official Our Social Image apparel, merchandise, and featured goods created by local Indianapolis partners and makers.",
  openGraph: {
    title: "OSI Community Shop | Merchandise & Local Products",
    description:
      "Shop official Our Social Image apparel, merchandise, and featured goods created by local Indianapolis partners and makers.",
    type: "website",
    locale: "en_US",
    siteName: "Our Social Image",
    images: [
      {
        url: "/home/osi-apparel-banner.png",
        width: 1200,
        height: 630,
        alt: "OSI Community Shop - Our Social Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSI Community Shop | Merchandise & Local Products",
    description:
      "Shop official Our Social Image apparel, merchandise, and featured goods created by local Indianapolis partners and makers.",
    images: ["/home/osi-apparel-banner.png"],
  },
};

export default page;
