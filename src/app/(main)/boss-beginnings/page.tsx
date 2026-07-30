import BusinessShower from "./_components/BusinessShower";
import BossBeginningWinner from "./_components/BossBeginningWinner";
import NewBusiness from "./_components/NewBusiness";
import WinnerReceives from "./_components/WinnerReceives";
import NewsLetter from "@/Components/Common/NewsLetter";
import BossBeginningBanner from "./_components/BossBeginningBanner";
import BusinessChosenChart from "./_components/BusinessChosenChart";
import {
  getBossCms,
  getCMSHomepageData,
  getCurrentContestWinner,
} from "@/lib/Services/cms_service";
import { CMSBossBeginnings } from "@/Types/cms";
import Sponsors from "../_components/Sponsors";
import BossBeginningSponsor from "./_components/BossBeginningSponsor";

const page = async () => {
  const pageData = (await getBossCms()) as CMSBossBeginnings;
  const cmsData = await getCMSHomepageData();
  const winnerData = await getCurrentContestWinner();

  return (
    <>
      <BossBeginningBanner data={pageData?.boss_beginnings_hero} />

      <BusinessShower data={pageData?.boss_beginnings_features} />

      <BossBeginningWinner
        data={pageData?.boss_beginnings_winner}
        winner={winnerData?.winner}
      />

      <BusinessChosenChart data={pageData?.boss_beginnings_steps} />

      <NewBusiness data={pageData?.boss_beginnings_section5} />

      <WinnerReceives data={pageData?.boss_beginnings_dynamic} />

      <BossBeginningSponsor />

      <Sponsors data={cmsData?.partners} showButton={false} />

      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;