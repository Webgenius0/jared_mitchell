import React from "react";
import { CMSBossBeginnings } from "@/Types/cms";
import ContestBanner from "./Components/ContestBanner";
import { getBossCms } from "@/lib/Services/cms_service";
import ContestSpotlights from "./Components/ContestSpotlights";
import ContestTable from "./Components/ContestTable";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  return (
    <div>
      <ContestBanner data={pageData?.boss_beginnings_hero} />
      <ContestSpotlights />
      <ContestTable />
    </div>
  );
};
export default page;
