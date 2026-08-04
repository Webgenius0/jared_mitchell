import BusinessSpotlightDetailsContent from "../../_components/BusinessSpotlightDetailsContent";
import ArtistStory from "../../../contest/Components/ArtistStory";
import MediaUpload from "../../../contest/Components/MediaUpload";
import Consent from "../../../contest/Components/Consent";
import OptionalInformation from "../../../contest/Components/OptionalInformation";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../../../_components/Sponsors";
import { getCMSAboutData, getBusinessSpotlightDetails } from "@/lib/Services/cms_service";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const businessId = parseInt(id, 10);
  const cmsData = await getCMSAboutData();

  // Fetch spotlight details server-side
  let spotlight: any = null;
  try {
    const res = await getBusinessSpotlightDetails(businessId);
    spotlight = res?.data?.spotlight ?? null;
  } catch (e) {
    console.error("Failed to fetch spotlight details", e);
  }

  return (
    <>
      <BusinessSpotlightDetailsContent id={businessId} />
      {spotlight && (
        <>
          <ArtistStory spotlight={spotlight} type="business" />
          <MediaUpload spotlight={spotlight} />
          <Consent spotlight={spotlight} type="business" />
          <OptionalInformation spotlight={spotlight} type="business" />
        </>
      )}
      <Sponsors data={cmsData?.partners} showButton={false} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default Page;
