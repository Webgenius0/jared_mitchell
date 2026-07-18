import React from "react";
import BossBegginingsConstestBanner from "./Components/BossBegginingsConstestBanner";
import { CMSBossBeginnings } from "@/Types/cms";
import { getBossCms, getCMSAboutData } from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import OpenQualifierRound from "./Components/Openqualifierround";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();

  return (
    <>
      <BossBegginingsConstestBanner data={pageData?.boss_beginnings_hero} />
      <OpenQualifierRound />
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};
export default page;
