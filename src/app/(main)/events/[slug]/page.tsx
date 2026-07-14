"use client";

import React from "react";
import { useParams } from "next/navigation";
import EventDetailsBanner from "../_Components/Eventsdetails/EventDetailsBanner";
import { getEventBySlug, getCMSAboutData } from "@/Hooks/api/cms_api";
import { CMSEventItem } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";
import AboutThisEvent from "../_Components/Eventsdetails/AboutThisEvent";
import ThisEventGallery from "../_Components/Eventsdetails/ThisEventGallery";
import SponsorSlider from "@/Components/Common/SponsorSlider";
import { Button } from "@/Components/Common/Button";
import { sponsorsData } from "@/Components/Data/data";
import NewsLetter from "@/Components/Common/NewsLetter";

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, isLoading: isEventLoading, error } = getEventBySlug(slug ?? "");
  const { data: cmsRes } = getCMSAboutData();

  const event = data?.data as CMSEventItem | undefined;
  const CmsData = cmsRes?.data;

  const logos =
    CmsData?.about_sponsors?.metadata?.map((m: any, i: number) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

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
      <AboutThisEvent event={event} />
      <ThisEventGallery
        media={event.event_media}
        promoVideoUrl={event.promo_video_url}
      />
      <div className="flex flex-col gap-5">
        <SponsorSlider logos={logos} />
        <SponsorSlider logos={logos} reverse={true} />
        <div className="flex justify-center mt-5">
          <Button>Become a Sponsor</Button>
        </div>
      </div>
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
}
