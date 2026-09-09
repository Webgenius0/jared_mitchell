import type { Metadata } from "next";
import React from "react";
import ShippingBillingForm from "../_components/ShippingBillingform";
import Sponsors from "../_components/Sponsors";
import { getCMSAboutData } from "@/lib/Services/cms_service";
import NewsLetter from "@/Components/Common/NewsLetter";

const Page = async () => {
  const CmsData = await getCMSAboutData();

  return (
    <>
      <ShippingBillingForm />
      <Sponsors data={CmsData?.partners} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export const metadata = {
  title: "Shipping & Billing - OSI Checkout | Open Spotlight Initiative",
  description:
    "Complete your purchase on OSI. Enter your shipping and billing information to finalize your order, ticket purchase, or subscription payment in the Open Spotlight Initiative checkout.",
  keywords: [
    "OSI checkout",
    "OSI shipping",
    "OSI billing",
    "OSI payment",
    "OSI order",
    "OSI purchase",
  ],
  openGraph: {
    title: "Shipping & Billing - OSI Checkout | Open Spotlight Initiative",
    description:
      "Complete your purchase on OSI. Enter your shipping and billing information to finalize your order or payment.",
    type: "website",
    locale: "en_US",
    siteName: "OSI",
    images: [
      {
        url: "/og-checkout.png",
        width: 1200,
        height: 630,
        alt: "OSI Checkout - Open Spotlight Initiative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Billing - OSI Checkout | Open Spotlight Initiative",
    description:
      "Complete your purchase on OSI. Enter your shipping and billing information to finalize your order or payment.",
    images: ["/og-checkout.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default Page;
