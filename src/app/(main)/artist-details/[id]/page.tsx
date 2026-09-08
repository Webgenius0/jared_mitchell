import type { Metadata } from "next";
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

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: Readonly<{ metadata: Metadata }>,
): Promise<Metadata> {
  const { id } = await params;
  const artistId = parseInt(id, 10);

  return {
    title: `Artist Details #${artistId} | OSI Artist Spotlight`,
    description: `Discover artist #${artistId} on OSI (Open Spotlight Initiative). Learn about their story, journey, and creative work. Support talented artists in our community.`,
    openGraph: {
      title: `Artist Details #${artistId} | OSI Artist Spotlight`,
      description: `Discover artist #${artistId} on OSI (Open Spotlight Initiative). Learn about their story, journey, and creative work.`,
      type: "website",
      locale: "en_US",
      siteName: "OSI",
      images: [
        {
          url: "/og-artist.png",
          width: 1200,
          height: 630,
          alt: `Artist #${artistId} - OSI Spotlight`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Artist Details #${artistId} | OSI Artist Spotlight`,
      description: `Discover artist #${artistId} on OSI (Open Spotlight Initiative). Learn about their story, journey, and creative work.`,
      images: ["/og-artist.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default Page;
