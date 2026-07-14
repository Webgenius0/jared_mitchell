"use client";

import React from "react";
import { useParams } from "next/navigation";
import EventDetailsBanner from "../_Components/Eventsdetails/EventDetailsBanner";
import { getEventBySlug } from "@/Hooks/api/cms_api";
import { CMSEventItem } from "@/Types/cms";
import { PageLoader } from "@/Shared/PageLoader";
import AboutThisEvent from "../_Components/Eventsdetails/AboutThisEvent";

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, isLoading, error } = getEventBySlug(slug ?? "");

  const event = data?.data as CMSEventItem | undefined;

  if (isLoading) {
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
      <AboutThisEvent />
    </>
  );
}
