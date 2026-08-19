import {
  CMSAbout,
  CMSArtistSpotlight,
  CMSBossBeginnings,
  CMSBusinessSpotlight,
  CMSRoundsPage,
  CalendarEventsResponse,
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// ---------------------------------------------------------------------------
// CMS content pages
// These are editor-managed content — they don't change every minute, so we
// cache with a moderate window and a tag so a CMS publish webhook can call
// `revalidateTag(...)` to bust the cache immediately instead of waiting.
// ---------------------------------------------------------------------------

export const getCMSHomepageData = async (): Promise<CMSHomepage> => {
  const res = await fetch(`${SITE_URL}/v1/cms/homepage`, {
    next: { revalidate: 60, tags: ["cms-homepage"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getCMSAboutData = async (): Promise<CMSAbout> => {
  const res = await fetch(`${SITE_URL}/v1/cms/about`, {
    next: { revalidate: 300, tags: ["cms-about"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getCMSServicesData = async (): Promise<CMSServices> => {
  const res = await fetch(`${SITE_URL}/v1/cms/services`, {
    next: { revalidate: 300, tags: ["cms-services"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getCMSArtistSpotlightData =
  async (): Promise<CMSArtistSpotlight> => {
    const res = await fetch(`${SITE_URL}/v1/cms/artist-spotlight`, {
      next: { revalidate: 300, tags: ["cms-artist-spotlight"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch CMS data");
    }

    const result = await res.json();
    return result.data;
  };

export const getCMSBusinessSpotlightData =
  async (): Promise<CMSBusinessSpotlight> => {
    const res = await fetch(`${SITE_URL}/v1/cms/business-spotlight`, {
      next: { revalidate: 300, tags: ["cms-business-spotlight"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch CMS data");
    }

    const result = await res.json();
    return result.data;
  };

export const getCMSSpotlightLadderData =
  async (): Promise<CMSSpotlightLadder> => {
    const res = await fetch(`${SITE_URL}/v1/cms/spotlight-ladder`, {
      next: { revalidate: 300, tags: ["cms-spotlight-ladder"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch CMS data");
    }

    const result = await res.json();
    return result.data;
  };

export const getCMSFAQs = async (): Promise<CMSFAQ[]> => {
  const res = await fetch(`${SITE_URL}/v1/cms/faq`, {
    next: { revalidate: 600, tags: ["cms-faq"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data;
};

export const getShopPageCms = async (): Promise<CMSShopPage> => {
  const res = await fetch(`${SITE_URL}/v1/cms/shop`, {
    next: { revalidate: 300, tags: ["cms-shop"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSShopPage;
};

export const getEventsPageCms = async (): Promise<CMSEventsPage> => {
  const res = await fetch(`${SITE_URL}/v1/cms/events`, {
    next: { revalidate: 300, tags: ["cms-events"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSEventsPage;
};

export const getBossCms = async (): Promise<CMSBossBeginnings> => {
  const res = await fetch(`${SITE_URL}/v1/cms/boss-beginnings`, {
    next: { revalidate: 300, tags: ["cms-boss-beginnings"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CMS data");
  }

  const result = await res.json();
  return result.data as CMSBossBeginnings;
};

export const getRoundsCms = async (): Promise<CMSRoundsPage> => {
  const res = await fetch(`${SITE_URL}/v1/cms/osi-rounds`, {
    next: { revalidate: 300, tags: ["cms-rounds"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch rounds CMS data — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as CMSRoundsPage;
};

export const getSponsorshipPageCms = async (): Promise<CMSSponsorshipPage> => {
  const url = `${SITE_URL}/v1/cms/sponsorsip`;

  const res = await fetch(url, {
    next: { revalidate: 300, tags: ["cms-sponsorship"] },
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
  const res = await fetch(`${SITE_URL}/v1/events/featured`, {
    next: { revalidate: 180, tags: ["featured-events"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch featured events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as FeaturedEventsResponse;
};

export const getEventGallery = async (): Promise<EventGalleryResponse> => {
  const res = await fetch(`${SITE_URL}/v1/events/galary`, {
    next: { revalidate: 300, tags: ["event-gallery"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event gallery — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as EventGalleryResponse;
};

export const getUpcomingEvents = async (): Promise<EventsResponse> => {
  const res = await fetch(`${SITE_URL}/v1/events/upcomming-events`, {
    next: { revalidate: 120, tags: ["upcoming-events"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as EventsResponse;
};

export const getPastEvents = async (): Promise<EventsResponse> => {
  const res = await fetch(`${SITE_URL}/v1/events/past-events`, {
    next: { revalidate: 600, tags: ["past-events"] },
  });

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

  const res = await fetch(`${SITE_URL}/v1/events?${params.toString()}`, {
    next: { revalidate: 180, tags: ["events", `events-${time ?? "all"}`] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as EventsResponse;
};

export const getCalendarEvents = async (): Promise<CalendarEventsResponse> => {
  const res = await fetch(`${SITE_URL}/v1/events/calendar-views`, {
    next: { revalidate: 180, tags: ["calendar-events"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch calendar events — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as CalendarEventsResponse;
};

export const getFeaturedProducts = async (): Promise<FeaturedProductItem[]> => {
  const res = await fetch(`${SITE_URL}/v1/products/featured`, {
    next: { revalidate: 300, tags: ["featured-products"] },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch featured products — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as FeaturedProductItem[];
};

export const getAllProducts = async (): Promise<FeaturedProductItem[]> => {
  const res = await fetch(`${SITE_URL}/v1/products`, {
    next: { revalidate: 300, tags: ["all-products"] },
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
  const res = await fetch(`${SITE_URL}/v1/products/${slug}`, {
    next: { revalidate: 600, tags: ["product", `product-${slug}`] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product by slug — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as FeaturedProductDetail;
};

export const getArtistHistoricalWinners =
  async (): Promise<ArtistHistoricalWinnersResponse> => {
    const res = await fetch(
      `${SITE_URL}/v1/spotlight/historical-winners?type=artist`,
      { next: { revalidate: 3600, tags: ["artist-historical-winners"] } },
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
      `${SITE_URL}/v1/spotlight/historical-winners?type=business`,
      { next: { revalidate: 3600, tags: ["business-historical-winners"] } },
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
    const res = await fetch(`${SITE_URL}/v1/contest/winners/current`, {
      next: { revalidate: 120, tags: ["current-contest-winner"] },
    });

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
    const res = await fetch(`${SITE_URL}/v1/contest/winners/past-six-months`, {
      next: { revalidate: 3600, tags: ["past-six-months-winners"] },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch past six months winners — Status: ${res.status}`,
      );
    }

    const result = await res.json();
    return result.data as PastSixMonthsWinnersResponse;
  };

export const getRoundCountdown = async (): Promise<RoundCountdownResponse> => {
  const res = await fetch(`${SITE_URL}/v1/round-countdown`, {
    next: { revalidate: 30, tags: ["round-countdown"] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch round countdown — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as RoundCountdownResponse;
};

export const getArtistById = async (id: number) => {
  const res = await fetch(`${SITE_URL}/v1/artists/${id}`, {
    next: { revalidate: 600, tags: ["artist", `artist-${id}`] },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch artist by ID — Status: ${res.status}`);
  }

  const result = await res.json();
  return result.data as { artist: ArtistDetail };
};

export const getBusinessById = async (id: number) => {
  const res = await fetch(`${SITE_URL}/v1/businesses/list/${id}`, {
    next: { revalidate: 600, tags: ["business", `business-${id}`] },
  });

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
  const url = `${SITE_URL}/v1/events/${slug}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    // Authenticated requests are user-specific (e.g. reveal RSVP status) —
    // never cache those. Anonymous requests are the same for every visitor,
    // so they're safe to cache.
    ...(token
      ? { cache: "no-store" as const }
      : { next: { revalidate: 300, tags: ["event", `event-${slug}`] } }),
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
    `${SITE_URL}/v1/spotlight/details/artist/${spotlightId}`,
    {
      next: {
        revalidate: 300,
        tags: ["artist-spotlight-details", `artist-spotlight-${spotlightId}`],
      },
    },
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
    `${SITE_URL}/v1/spotlight/details/business/${spotlightId}`,
    {
      next: {
        revalidate: 300,
        tags: [
          "business-spotlight-details",
          `business-spotlight-${spotlightId}`,
        ],
      },
    },
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
    `${SITE_URL}/v1/spotlight/weeks/${weekId}/leaderboard?${params.toString()}`,
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

export const getLiveStreams = async (
  tagType: string,
): Promise<LiveStream[]> => {
  const res = await fetch(`${SITE_URL}/v1/live-streams`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch live streams — Status: ${res.status}`);
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
    const res = await fetch(`${SITE_URL}/v1/spotlight/weeks/current`, {
      cache: "no-store",
    });

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
    `${SITE_URL}/v1/contest/contestants/${contestantId}`,
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
    const res = await fetch(`${SITE_URL}/v1/contest/active-season-rounds`, {
      cache: "no-store",
    });

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
  void options;

  const res = await fetch(
    `${SITE_URL}/v1/contest/rounds/${roundId}/leaderboard`,
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

  const res = await fetch(`${SITE_URL}/v1/contest/rounds/${roundId}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body.toString(),
  });

  if (!res.ok) {
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
    const error: any = new Error(message);
    error.response = { data: payload ?? { message } };
    throw error;
  }

  return res.json();
};

export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  const res = await fetch(`${SITE_URL}/v1/subscription-plans`, {
    next: { revalidate: 3600, tags: ["subscription-plans"] },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch subscription plans — Status: ${res.status}`,
    );
  }

  const result = await res.json();
  return result.data as SubscriptionPlan[];
};
