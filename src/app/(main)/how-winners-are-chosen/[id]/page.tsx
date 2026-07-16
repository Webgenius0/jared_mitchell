import { getBossCms, getCMSAboutData } from "@/lib/Services/cms_service";
import Sponsors from "../../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import WinnersDetails from "../Components/WinnersDetails";
import WinnerDetailsBanner from "../Components/WinnerDetailsBanner";
import { CMSBossBeginnings } from "@/Types/cms";

const page = async () => {
  const CmsData = await getCMSAboutData();
  const pageData = (await getBossCms()) as CMSBossBeginnings;

  return (
    <>
      <WinnerDetailsBanner data={pageData?.boss_beginnings_hero} />
      <WinnersDetails />
      <Sponsors data={CmsData?.about_sponsors} title="Our Event Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
