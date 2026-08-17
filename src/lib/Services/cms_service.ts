import {
  CMSAbout,
  CMSArtistSpotlight,
  CMSBossBeginnings,
  CMSBusinessSpotlight,
  CMSRoundsPage,
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
  ArtistHistoricalWinnersResponse,
  BusinessHistoricalWinnersResponse,
  ArtistDetail,
  BusinessDetail,
  PastSixMonthsWinnersResponse,
  RoundCountdownResponse,
  SubscriptionPlan,
  LeaderboardResponse,
  ArtistSpotlightDetailsResponse,
  BusinessSpotlightDetailsResponse,
  RoundLeaderboardResponse,
  ActiveSeasonRoundsResponse,
  LiveStream,
} from "@/Types/cms";
import { getItem } from "@/lib/localStorage";

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
    cache: "no-store",
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
      cache: "no-store",
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
        cache: "no-store",
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
        cache: "no-store",
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
        cache: "no-store",
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
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getShopPageCms = async (): Promise<CMSShopPage> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/shop`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSShopPage;
};

export const getEventsPageCms = async (): Promise<CMSEventsPage> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/events`, {
    cache: "no-store",
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
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSBossBeginnings;
};

export const getRoundsCms = async (): Promise<CMSRoundsPage> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/osi-rounds`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch rounds CMS data — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as CMSRoundsPage;
};

export const getSponsorshipPageCms = async (): Promise<CMSSponsorshipPage> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/sponsorsip`;

  const res = await fetch(url, {
    cache: "no-store",
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
    { cache: "no-store" },
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
    { cache: "no-store" },
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
    { cache: "no-store" },
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
    { cache: "no-store" },
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
    { cache: "no-store" },
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
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch calendar events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as CalendarEventsResponse;
};

export const getFeaturedProducts = async (): Promise<FeaturedProductItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/products/featured`,
    { cache: "no-store" },
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/v1/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as FeaturedProductItem[];
};

export const getProductBySlug = async (
  slug: string,
): Promise<FeaturedProductDetail> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/products/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product by slug — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as FeaturedProductDetail;
};

export const getArtistHistoricalWinners =
  async (): Promise<ArtistHistoricalWinnersResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/historical-winners?type=artist`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch artist historical winners — Status: ${res.status}`,
      );
    }

    const result = await res.json();
    return result.data as ArtistHistoricalWinnersResponse;
  };

export const getBusinessHistoricalWinners =
  async (): Promise<BusinessHistoricalWinnersResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/historical-winners?type=business`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch business historical winners — Status: ${res.status}`,
      );
    }

    const result = await res.json();
    return result.data as BusinessHistoricalWinnersResponse;
  };

export const getCurrentContestWinner =
  async (): Promise<CurrentContestWinnerResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/winners/current`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch current contest winner — Status: ${res.status}`,
      );
    }

    const result = await res.json();
    return result.data as CurrentContestWinnerResponse;
  };

export const getPastSixMonthsWinners =
  async (): Promise<PastSixMonthsWinnersResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/winners/past-six-months`,
      { cache: "no-store" },
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
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch round countdown — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as RoundCountdownResponse;
};

export const getArtistById = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/artists/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch artist by ID — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as { artist: ArtistDetail };
};

export const getBusinessById = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/businesses/list/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch business by ID — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as { business: BusinessDetail };
};

export const getEventBySlug = async (
  slug: string,
  token?: string,
): Promise<CMSEventItem> => {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/v1/events/${slug}`;

  const res = await fetch(url, {
    cache: "no-store",
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

export const getArtistSpotlightDetails = async (
  spotlightId: number,
): Promise<ArtistSpotlightDetailsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/details/artist/${spotlightId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch artist spotlight details — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result as ArtistSpotlightDetailsResponse;
};

export const getBusinessSpotlightDetails = async (
  spotlightId: number,
): Promise<BusinessSpotlightDetailsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/details/business/${spotlightId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch business spotlight details — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result as BusinessSpotlightDetailsResponse;
};

export const getLeaderboard = async (
  weekId: number = 2,
  types: ("artist" | "business")[] = ["artist", "business"],
): Promise<LeaderboardResponse | null> => {
  const params = new URLSearchParams();
  types.forEach(t => params.append("type", t));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/weeks/${weekId}/leaderboard?${params.toString()}`,
    { cache: "no-store" },
  );

  if (res.status === 404) {
    // No leaderboard for this week — expected state, not a fatal error.
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch leaderboard — Status: ${res.status}`);
  }

  const result = await res.json();
  return result as LeaderboardResponse;
};
export const getLiveStreams = async (tagType: string): Promise<LiveStream[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/live-streams`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch live streams — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  const streams = (result?.data ?? []) as LiveStream[];
  return streams.filter(s => s.tag_type === tagType);
};

export const getFeaturedStream = (
  streams: LiveStream[],
): { stream: LiveStream | undefined; hasPending: boolean } => {
  const live = streams.find(s => s.status === "live");
  if (live) return { stream: live, hasPending: false };

  const hasPending = streams.some(s => s.status === "pending");
  if (hasPending) return { stream: undefined, hasPending: true };

  return {
    stream: streams.find(s => s.status === "ended" && Boolean(s.vod_url)),
    hasPending: false,
  };
};

// The URL to feed the HLS player for a given stream: live channels play the
// IVS playback URL, ended channels play the recorded VOD.
export const getStreamPlaybackUrl = (
  stream?: LiveStream,
): string | undefined => {
  if (!stream) return undefined;
  return stream.status === "live"
    ? stream.playback_url
    : (stream.vod_url ?? undefined);
};

export const getCurrentSpotlightWeek =
  async (): Promise<LeaderboardResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/spotlight/weeks/current`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch current spotlight week — Status: ${res.status}`,
      );
    }

    const result = await res.json();
    return result as LeaderboardResponse;
  };

export const getContestantDetails = async (
  contestantId: number,
): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/contestants/${contestantId}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch contestant details — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result;
};

export const getActiveSeasonRounds =
  async (): Promise<ActiveSeasonRoundsResponse> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/active-season-rounds`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch active season rounds — Status: ${res.status}`,
      );
    }

    const result = await res.json();
    return result as ActiveSeasonRoundsResponse;
  };

export const getRoundLeaderboard = async (
  roundId: number,
  options?: { noCache?: boolean },
): Promise<RoundLeaderboardResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/rounds/${roundId}/leaderboard`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch round leaderboard — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result as RoundLeaderboardResponse;
};


const ROUND_SCORE_KEYS = [
  "innovation",
  "presentation",
  "impact",
  "quality",
  "growth",
];

export const submitRoundVotes = async ({
  roundId,
  contestantId,
  scores,
}: {
  roundId: number;
  contestantId: number;
  scores: number[];
}): Promise<any> => {
  const body = new URLSearchParams();
  body.append("contestant_id", String(contestantId));
  scores.forEach((score, i) => {
    body.append(`scores[${ROUND_SCORE_KEYS[i]}]`, String(score));
  });

  const token = typeof window !== "undefined" ? getItem("token") : undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/contest/rounds/${roundId}/votes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body.toString(),
    },
  );

  if (!res.ok) {
    // Parse the error body so the backend's real message (e.g. "You cannot
    // vote for your own entry.") survives instead of a raw JSON dump.
    let payload: any = null;
    try {
      payload = await res.json();
    } catch {
      // Non-JSON error body — fall back to status text below
    }

    const message =
      typeof payload?.message === "string" && payload.message.trim()
        ? payload.message
        : `Failed to submit round votes — Status: ${res.status}`;

    // Shape the error like an axios error so callers can read it through
    // getApiErrorMessage(err) (err.response.data.message). The `payload ??
    // { message }` fallback keeps the status message reachable when the
    // error body isn't JSON.
    const error: any = new Error(message);
    error.response = { data: payload ?? { message } };
    throw error;
  }

  return res.json();
};

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/v1/subscription-plans`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch subscription plans — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as SubscriptionPlan[];
};
