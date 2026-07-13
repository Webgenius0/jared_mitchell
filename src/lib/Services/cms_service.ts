import {
  CMSAbout,
  CMSArtistSpotlight,
  CMSBossBeginnings,
  CMSBusinessSpotlight,
  CalendarEventsResponse,
  CMSEvent,
  CMSEventItem,
  CMSEventsPage,
  CMSFAQ,
  CMSHomepage,
  CMSServices,
  CMSShopPage,
  CMSSponsorshipPage,
  CMSSpotlightLadder,
  FeaturedEventsResponse,
  EventsResponse,
} from "@/Types/cms";

export const getCMSHomepageData = async (): Promise<CMSHomepage> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/homepage`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getCMSAboutData = async (): Promise<CMSAbout> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/about`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getCMSServicesData = async (): Promise<CMSServices> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/services`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getCMSArtistSpotlightData =
  async (): Promise<CMSArtistSpotlight> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/artist-spotlight`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch CMS data");
    }

    const result = await res.json();
    return result.data;
  };

export const getCMSBusinessSpotlightData =
  async (): Promise<CMSBusinessSpotlight> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/business-spotlight`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch CMS data");
    }

    const result = await res.json();
    return result.data;
  };

export const getCMSSpotlightLadderData =
  async (): Promise<CMSSpotlightLadder> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/spotlight-ladder`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch CMS data");
    }

    const result = await res.json();
    return result.data;
  };

export const getCMSFAQs = async (): Promise<CMSFAQ[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/faq`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getShopPageCms = async (): Promise<CMSShopPage> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/shop`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSShopPage;
};

export const getEventsPageCms = async (): Promise<CMSEventsPage> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/events`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSEventsPage;
};

export const getBossCms = async (): Promise<CMSBossBeginnings> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/boss-beginnings`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSBossBeginnings;
};

export const getSponsorshipPageCms = async (): Promise<CMSSponsorshipPage> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/sponsorsip`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch sponsorship CMS data — URL: ${url} | Status: ${res.status} ${res.statusText}`,
    );
  }

  const result = await res.json();
  return result.data as CMSSponsorshipPage;
};

export type EventTimeFilter = "upcoming" | "past";

export const getFeaturedEvents = async (): Promise<FeaturedEventsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/featured`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch featured events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as FeaturedEventsResponse;
};

export const getEventGallery = async (): Promise<FeaturedEventsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/galary`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch featured events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as FeaturedEventsResponse;
};

export const getUpcomingEvents = async (): Promise<EventsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/upcomming-events`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as EventsResponse;
};

export const getEvents = async (
  time?: EventTimeFilter,
  page: number = 1,
  perPage: number = 12,
): Promise<EventsResponse> => {
  const params = new URLSearchParams();
  if (time) params.append("time", time);
  params.append("page", String(page));
  params.append("per_page", String(perPage));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events?${params.toString()}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as EventsResponse;
};

export const getCalendarEvents = async (): Promise<CalendarEventsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/calendar-views`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch calendar events — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as CalendarEventsResponse;
};

export const getEventBySlug = async (
  slug: string,
  token?: string,
): Promise<CMSEventItem> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/${slug}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} — ${text}`);
  }

  const result = await res.json();
  return result.data as CMSEventItem;
};
