import React from "react";
import { CMSBossBeginnings } from "@/Types/cms";
import ContestBanner from "./Components/ContestBanner";
import { getBossCms, getCMSHomepageData } from "@/lib/Services/cms_service";
import ContestSpotlights from "./Components/ContestSpotlights";
import ContestTable from "./Components/ContestTable";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();

  return (
    <div>
      <ContestBanner data={pageData?.boss_beginnings_hero} />
      <ContestSpotlights />
      <ContestTable />
      <Sponsors data={cmsData?.partners} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </div>
  );
};
export default page;
