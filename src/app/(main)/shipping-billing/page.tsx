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
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
