import ArtistSpotlightDetailsContent from "../../_components/ArtistSpotlightDetailsContent";
import ArtistStory from "../../../contest/Components/ArtistStory";
import MediaUpload from "../../../contest/Components/MediaUpload";
import Consent from "../../../contest/Components/Consent";
import OptionalInformation from "../../../contest/Components/OptionalInformation";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../../../_components/Sponsors";
import { getCMSAboutData } from "@/lib/Services/cms_service";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const artistId = parseInt(id, 10);
  const cmsData = await getCMSAboutData();

  return (
    <>
      <ArtistSpotlightDetailsContent id={artistId} />
      <ArtistStory />
      <MediaUpload />
      <Consent />
      <OptionalInformation />
      <Sponsors data={cmsData?.about_sponsors} showButton={false} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
