import React from "react";
import SpotlightDetails from "../Components/SpotlightDetails";
import ArtistStory from "../Components/ArtistStory";
import MediaUpload from "../Components/MediaUpload";

export default function page() {
  return (
    <>
      <SpotlightDetails />
      <ArtistStory />
      <MediaUpload />
    </>
  );
}
