import type { Metadata, ResolvingMetadata } from "next";
import React, { Suspense } from "react";
import { getEventBySlug } from "@/Hooks/api/cms_api";
import { CMSEventItem } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";
import EventDetailsClient from "./_components/EventDetailsClient";

async function getEventMetadata(
  slug: string,
): Promise<{ title: string; description: string; image?: string }> {
  try {
    const { data } = await getEventBySlug(slug);
    const event = data?.data as CMSEventItem | undefined;
    if (event) {
      return {
        title: event.title || `Event: ${slug}`,
        description:
          event.description ||
          `Join us for ${event.title} - an exciting event in the OSI community.`,
        image: event.event_media?.[0]?.full_url || "/og-event.png",
      };
    }
  } catch {
    // Fall through to default metadata
  }
  return {
    title: `Event: ${slug}`,
    description: "Join us for this exciting event in the OSI community.",
    image: "/og-event.png",
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getEventMetadata(slug);

  return {
    title: `${meta.title} | OSI Events`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | OSI Events`,
      description: meta.description,
      type: "website",
      locale: "en_US",
      siteName: "OSI",
      images: [
        {
          url: meta.image || "/og-event.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | OSI Events`,
      description: meta.description,
      images: [meta.image || "/og-event.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <EventDetailsClient slug={``} />
    </Suspense>
  );
}
