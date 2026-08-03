import { getBossCms, getCMSAboutData, getContestantDetails } from "@/lib/Services/cms_service";
import Sponsors from "../../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import WinnersDetails from "../Components/WinnersDetails";
import WinnerDetailsBanner from "../Components/WinnerDetailsBanner";
import { CMSBossBeginnings } from "@/Types/cms";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const contestantId = parseInt(id, 10);

  const CmsData = await getCMSAboutData();
  const pageData = (await getBossCms()) as CMSBossBeginnings;


  let contestant: any = null;
  if (!Number.isNaN(contestantId)) {
    try {
      const res = await getContestantDetails(contestantId);
      contestant = res?.data?.contestant || res?.data || null;
    } catch (e) {
      console.error("Failed to fetch contestant details", e);
    }
  }

  return (
    <>
      <WinnerDetailsBanner data={pageData?.boss_beginnings_hero} />
      <WinnersDetails contestant={contestant} />
      <Sponsors data={CmsData?.about_sponsors} title="Our Event Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
