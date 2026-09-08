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
      <Sponsors data={CmsData?.partners} title="Our Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};

export const metadata = {
  title: "Shop - OSI Store | Open Spotlight Initiative",
  description:
    "Visit the OSI store to discover exclusive merchandise, digital resources, and products from featured artists and businesses. Support creators and get unique items from the Open Spotlight Initiative community.",
  keywords: [
    "OSI shop",
    "OSI store",
    "OSI merchandise",
    "OSI products",
    "buy OSI",
    "creator merchandise",
  ],
  openGraph: {
    title: "Shop - OSI Store | Open Spotlight Initiative",
    description:
      "Visit the OSI store to discover exclusive merchandise, digital resources, and products from featured artists and businesses.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-shop.png",
        width: 1200,
        height: 630,
        alt: "OSI Shop - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop - OSI Store | Open Spotlight Initiative",
    description:
      "Visit the OSI store to discover exclusive merchandise, digital resources, and products from featured artists and businesses.",
    images: ["/og-shop.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default page;
