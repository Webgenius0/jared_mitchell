import type { Metadata } from "next";
import React, { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import EventDetailsBanner from "../_Components/Eventsdetails/EventDetailsBanner";
import { getEventBySlug, getCMSAboutData } from "@/Hooks/api/cms_api";
import { CMSEventItem } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";
import AboutThisEvent from "../_Components/Eventsdetails/AboutThisEvent";
import ThisEventGallery from "../_Components/Eventsdetails/ThisEventGallery";
import NewsLetter from "@/Components/Common/NewsLetter";
import Sponsors from "../../_components/Sponsors";

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
          event.short_description ||
          `Join us for ${event.title} - an exciting event in the OSI community.`,
        image: event.event_media?.[0]?.image || "/og-event.png",
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
  parent: Readonly<{ metadata: Metadata }>,
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

function EventDetails() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  // Coming from a "past events" section — hide the ticket/price area.
  const fromPast = searchParams.get("from") === "past";

  const { data, isLoading: isEventLoading, error } = getEventBySlug(slug ?? "");
  const { data: cmsRes } = getCMSAboutData();

  const event = data?.data as CMSEventItem | undefined;
  const CmsData = cmsRes?.data;

  if (isEventLoading) {
    return <PageLoader />;
  }

  if (error || !event) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            {(error as Error)?.message ||
              "The event you are looking for does not exist or has been removed."}
          </p>
          <a
            href="/events"
            className="inline-block bg-primary-blue text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Browse Events
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      <EventDetailsBanner event={event} />
      <AboutThisEvent event={event} hideTicketSection={fromPast} />
      <ThisEventGallery
        media={event.event_media}
        promoVideoUrl={event.promo_video_url}
      />
      <Sponsors data={CmsData?.partners} showButton={true} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <EventDetails />
    </Suspense>
  );
}
