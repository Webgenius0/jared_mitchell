import ArtistDetailsContent from "../../_components/ArtistDetailsContent";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../../_components/Sponsors";
import { getCMSAboutData } from "@/lib/Services/cms_service";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const artistId = parseInt(id, 10);
  const cmsData = await getCMSAboutData();

  return (
    <>
      <ArtistDetailsContent id={artistId} />
      <Sponsors data={cmsData?.about_sponsors} showButton={false} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
