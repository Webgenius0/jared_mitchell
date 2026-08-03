import React from "react";
import BossBegginingsConstestBanner from "./Components/BossBegginingsConstestBanner";
import { CMSBossBeginnings, CMSRoundsPage } from "@/Types/cms";
import { getBossCms, getCMSAboutData, getRoundsCms } from "@/lib/Services/cms_service";
import Sponsors from "../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import OpenQualifierRound from "./Components/Openqualifierround";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const CmsData = await getCMSAboutData();
  // Rounds data is optional — fall back gracefully if the endpoint is unavailable
  let roundsData: CMSRoundsPage | undefined;
  try {
    roundsData = await getRoundsCms();
  } catch {
    roundsData = undefined;
  }

  return (
    <>
      <BossBegginingsConstestBanner data={pageData?.boss_beginnings_hero} />
      <OpenQualifierRound roundsData={roundsData?.rounds} />
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};
export default page;
