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
  CurrentContestWinnerResponse,
  EventGalleryResponse,
  FeaturedEventsResponse,
  FeaturedProductDetail,
  FeaturedProductItem,
  EventsResponse,
  HistoricalWinnersResponse,
  PastSixMonthsWinnersResponse,
  RoundCountdownResponse,
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

export const getEventGallery = async (): Promise<EventGalleryResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/galary`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch event gallery — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as EventGalleryResponse;
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

export const getPastEvents = async (): Promise<EventsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/past-events`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch past events — Status: ${res.status}`);
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

export const getFeaturedProducts = async (): Promise<FeaturedProductItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/products/featured`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch featured products — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as FeaturedProductItem[];
};

export const getAllProducts = async (): Promise<FeaturedProductItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/products`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as FeaturedProductItem[];
};

export const getProductBySlug = async (
  slug: string,
): Promise<FeaturedProductDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/products/${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch product by slug — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as FeaturedProductDetail;
};

export const getHistoricalWinners = async (
  type: "business" | "artist",
): Promise<HistoricalWinnersResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/historical-winners?type=${type}`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${type} historical winners — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as HistoricalWinnersResponse;
};

export const getCurrentContestWinner = async (): Promise<CurrentContestWinnerResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/winners/current`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch current contest winner — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as CurrentContestWinnerResponse;
};

export const getPastSixMonthsWinners = async (): Promise<PastSixMonthsWinnersResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/winners/past-six-months`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch past six months winners — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as PastSixMonthsWinnersResponse;
};

export const getRoundCountdown = async (): Promise<RoundCountdownResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/round-countdown`,
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch round countdown — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as RoundCountdownResponse;
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
