import React from "react";
import SpotlightDetails from "../Components/SpotlightDetails";
import ArtistStory from "../Components/ArtistStory";
import MediaUpload from "../Components/MediaUpload";
import Consent from "../Components/Consent";
import OptionalInformation from "../Components/OptionalInformation";
import NewsLetter from "@/Components/Common/NewsLetter";
import { getCMSAboutData } from "@/lib/Services/cms_service";
import Sponsors from "../../_components/Sponsors";
const page = async () => {
  const CmsData = await getCMSAboutData();
  return (
    <>
      <SpotlightDetails />
      <ArtistStory />
      <MediaUpload />
      <Consent />
      <OptionalInformation />
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export default page;
