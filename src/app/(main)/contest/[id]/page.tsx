import type { Metadata, ResolvingMetadata } from "next";
import React from "react";
import SpotlightDetails from "../Components/SpotlightDetails";
import ArtistStory from "../Components/ArtistStory";
import MediaUpload from "../Components/MediaUpload";
import Consent from "../Components/Consent";
import OptionalInformation from "../Components/OptionalInformation";
import NewsLetter from "@/Components/Common/NewsLetter";
import {
  getCMSAboutData,
  getArtistSpotlightDetails,
  getBusinessSpotlightDetails,
} from "@/lib/Services/cms_service";
import Sponsors from "../../_components/Sponsors";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { type } = await searchParams;
  const spotlightId = parseInt(id, 10);
  const spotlightType = type === "business" ? "business" : "artist";
  const CmsData = await getCMSAboutData();

  // Fetch spotlight details server-side
  let spotlight: any = null;
  try {
    if (spotlightType === "artist") {
      const res = await getArtistSpotlightDetails(spotlightId);
      spotlight = res?.data?.spotlight ?? null;
    } else {
      const res = await getBusinessSpotlightDetails(spotlightId);
      spotlight = res?.data?.spotlight ?? null;
    }
  } catch (e) {
    console.error("Failed to fetch spotlight details", e);
  }

  return (
    <>
      <SpotlightDetails
        spotlight={spotlight}
        type={spotlightType}
        isLoading={!spotlight}
      />
      {spotlight && (
        <>
          <ArtistStory spotlight={spotlight} type={spotlightType} />
          <MediaUpload spotlight={spotlight} />
          <Consent spotlight={spotlight} type={spotlightType} />
          <OptionalInformation spotlight={spotlight} type={spotlightType} />
        </>
      )}
      <Sponsors data={CmsData?.about_sponsors} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const { type } = await searchParams;
  const spotlightType = type === "business" ? "Business" : "Artist";

  return {
    title: `${spotlightType} Spotlight #${id} | OSI`,
    description: `View spotlight details for ${spotlightType} #${id} on OSI (Open Spotlight Initiative). Discover their story, achievements, and how to support them.`,
    openGraph: {
      title: `${spotlightType} Spotlight #${id} | OSI`,
      description: `View spotlight details for ${spotlightType} #${id} on OSI (Open Spotlight Initiative). Discover their story and achievements.`,
      type: "website",
      locale: "en_US",
      siteName: "OSI",
      images: [
        {
          url: "/og-spotlight.png",
          width: 1200,
          height: 630,
          alt: `${spotlightType} Spotlight #${id}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${spotlightType} Spotlight #${id} | OSI`,
      description: `View spotlight details for ${spotlightType} #${id} on OSI (Open Spotlight Initiative). Discover their story and achievements.`,
      images: ["/og-spotlight.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default page;
