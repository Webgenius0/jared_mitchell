import React from "react";
import SpotlightDetails from "../Components/SpotlightDetails";
import ArtistStory from "../Components/ArtistStory";
import MediaUpload from "../Components/MediaUpload";
import Consent from "../Components/Consent";

export default function page() {
  return (
    <>
      <SpotlightDetails />
      <ArtistStory />
      <MediaUpload />
      <Consent />
    </>
  );
}
