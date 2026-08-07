import toast from "react-hot-toast";
import useClientApi from "../useClientApi";
import { useQueryClient } from "@tanstack/react-query";

// Create Business Spotlight
export const useCreateBusinessSpotlight = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["business-spotlight"],
    endpoint: "/v1/business-spotlight",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Create Artist Spotlight
export const useCreateArtistSpotlight = () => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["artist-spotlight"],
    endpoint: "/v1/artist-spotlight",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["artist-spotlights"],
        });
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Update Artist Spotlight
export const useUpdateArtistSpotlight = (id: number) => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["artist-spotlight-update", id],
    endpoint: `/v1/artist-spotlight/update/${id}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
        queryClient.invalidateQueries({ queryKey: ["artist-spotlights"] });
        queryClient.invalidateQueries({
          queryKey: ["artist-spotlight-details", id],
        });
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Get Artist Spotlights (the logged-in user's own artist spotlights)
// `enabled` lets callers skip this request for non-artist roles (avoids 403s).
export const getArtistSpotlights = (params?: any, enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["artist-spotlights", params],
    endpoint: "/v1/artist-spotlight",
    params,
    enabled,
  });
};

// Get Artist spotlight details
export const getSingleArtistSpotlightDetails = (id: any) => {
  return useClientApi({
    method: "get",
    enabled: !!id,
    isPrivate: true,
    key: ["artist-spotlight-details", id],
    endpoint: `/v1/artist-spotlight/${id}`,
  });
};

// Artist Categories
export const getArtistCategories = () => {
  return useClientApi({
    method: "get",
    key: ["artist-categories"],
    endpoint: "/v1/artist-categories",
  });
};

// Get Business Spotlights (the logged-in user's own business spotlights)
// `enabled` lets callers skip this request for non-business roles (avoids 403s).
export const getBusinessSpotlights = (params?: any, enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["business-spotlights", params],
    endpoint: "/v1/business-spotlight",
    params,
    enabled,
  });
};

// Get Single Business Spotlight Details (for editing)
export const getSingleBusinessSpotlightDetails = (id: number) => {
  return useClientApi({
    method: "get",
    enabled: !!id,
    isPrivate: true,
    key: ["dashboard-business-spotlight-single", id],
    endpoint: `/v1/business-spotlight/${id}`,
  });
};

// Update Business Spotlight (supports dynamic endpoint override)
export const useUpdateBusinessSpotlight = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["update-business-spotlight"],
    endpoint: "/v1/business-spotlight/update",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message);
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

// Withdraw a Spotlight Application
// Usage: withdrawApplication({
//   endpoint: `/v1/spotlight/applications/${applicationId}/withdraw`,
//   data: {},
// })
export const useWithdrawSpotlightApplication = () => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["spotlight-application-withdraw"],
    endpoint: "/v1/spotlight/applications/withdraw",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Application withdrawn successfully!");
        queryClient.invalidateQueries({
          queryKey: ["my-spotlight-applications"],
        });
      }
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to withdraw application.",
      );
    },
  });
};

// Get My Spotlight Applications (list of weekly applications across my spotlights)
export const getMySpotlightApplications = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["my-spotlight-applications", params],
    endpoint: "/v1/spotlight/my-applications",
    params,
  });
};

// Get Open Spotlight Weeks (weeks that are accepting applications)
export const useOpenSpotlightWeeks = (enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["open-spotlight-weeks"],
    endpoint: "/v1/spotlight/weeks/open",
    enabled,
  });
};

// Apply a Spotlight to a Weekly Spotlight Competition
// Usage: applySpotlight({
//   endpoint: `/v1/spotlight/weeks/${weekId}/apply`,
//   data: { spotlightable_id: spotlightId, spotlightable_type: "artist" | "business" },
// })
export const useApplySpotlightToWeek = () => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["spotlight-week-apply"],
    endpoint: "/v1/spotlight/weeks/apply",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Applied successfully!");
        queryClient.invalidateQueries({ queryKey: ["artist-spotlights"] });
        queryClient.invalidateQueries({ queryKey: ["business-spotlights"] });
        queryClient.invalidateQueries({
          queryKey: ["my-spotlight-applications"],
        });
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to apply.");
    },
  });
};

// Get Event By Slug
// Get Featured Products
export const getFeaturedProducts = (params?: any) => {
  return useClientApi({
    method: "get",
    key: ["featured-products", params],
    endpoint: "/v1/products/featured",
    params,
  });
};

// Get All Products
export const getAllProducts = (params?: any) => {
  return useClientApi({
    method: "get",
    key: ["all-products", params],
    endpoint: "/v1/products",
    params,
  });
};

// Get Product By Slug
export const getProductBySlug = (slug: string) => {
  return useClientApi({
    method: "get",
    key: ["product-by-slug", slug],
    endpoint: `/v1/products/${slug}`,
    enabled: !!slug,
  });
};

export const getEventBySlug = (slug: string) => {
  return useClientApi({
    method: "get",
    key: ["event-by-slug", slug],
    endpoint: `/v1/events/${slug}`,
    enabled: !!slug,
  });
};

// Get Upcoming Events (public list)
export const getUpcomingEvents = () => {
  return useClientApi({
    method: "get",
    key: ["upcoming-events"],
    endpoint: "/v1/events/upcomming-events",
  });
};

// Get All Artists (paginated list)
export const getArtists = (params?: any) => {
  return useClientApi({
    method: "get",
    key: ["artists", params],
    endpoint: "/v1/artists",
    params,
  });
};

// Get Artist By ID
export const getArtistById = (id: number) => {
  return useClientApi({
    method: "get",
    key: ["artist-by-id", id],
    endpoint: `/v1/artists/${id}`,
    enabled: !!id,
  });
};

// Get Business By ID
export const getBusinessById = (id: number) => {
  return useClientApi({
    method: "get",
    key: ["business-by-id", id],
    endpoint: `/v1/businesses/list/${id}`,
    enabled: !!id,
  });
};

// Get Artist Spotlight Details (rich data with voting, media, contacts, story)
export const getArtistSpotlightDetails = (id: number) => {
  return useClientApi({
    method: "get",
    key: ["artist-spotlight-details", id],
    endpoint: `/v1/spotlight/details/artist/${id}`,
    enabled: !!id,
  });
};

// Get Business Spotlight Details (rich data with voting, media, contacts, story)
export const getBusinessSpotlightDetails = (id: number) => {
  return useClientApi({
    method: "get",
    key: ["business-spotlight-details", id],
    endpoint: `/v1/spotlight/details/business/${id}`,
    enabled: !!id,
  });
};

// Get CMS About Data
export const getCMSAboutData = () => {
  return useClientApi({
    method: "get",
    key: ["cms-about"],
    endpoint: "/v1/cms/about",
  });
};

// Get Vote Packages (for vote purchase)
export const getVotePackages = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["vote-packages"],
    endpoint: "/v1/spotlight/vote-packages",
  });
};

// Purchase Votes for a Nominee (initiate a purchase)
// POST /v1/spotlight/nominees/:nominee_id/purchase-votes
// Usage: purchaseVotes({
//   endpoint: `/v1/spotlight/nominees/${nomineeId}/purchase-votes`,
//   data: { package_slug },
// })
export const usePurchaseVotes = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["purchase-votes"],
    endpoint: "/v1/spotlight/nominees/purchase-votes",
    onSuccess: (res: any) => {
      if (res?.success) {
        import("react-hot-toast").then(({ default: toast }) =>
          toast.success(res?.message || "Purchase initiated successfully!"),
        );
      }
    },
    onError: (err: any) => {
      import("react-hot-toast").then(({ default: toast }) =>
        toast.error(
          err?.response?.data?.message || "Failed to initiate purchase.",
        ),
      );
    },
  });
};

// Pay for a Vote Purchase (creates a Stripe Checkout session)
// POST /v1/spotlight/vote/purchases/:purchase_id/pay
// Usage: payVotePurchase({
//   endpoint: `/v1/spotlight/vote/purchases/${purchaseId}/pay`,
// })
// Response data: { purchase_id, checkout_url, session_id } — redirect to checkout_url.
export const usePayVotePurchase = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["pay-vote-purchase"],
    endpoint: "/v1/spotlight/vote/purchases/pay",
    onSuccess: (res: any) => {
      if (res?.success) {
        import("react-hot-toast").then(({ default: toast }) =>
          toast.success(res?.message || "Redirecting to payment..."),
        );
      }
    },
    onError: (err: any) => {
      import("react-hot-toast").then(({ default: toast }) =>
        toast.error(
          err?.response?.data?.message || "Payment failed.",
        ),
      );
    },
  });
};

// Get My Pending Purchases
// GET /v1/spotlight/vote/my-pending-purchases
export const useMyPendingPurchases = (enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["my-pending-purchases"],
    endpoint: "/v1/spotlight/vote/my-pending-purchases",
    enabled,
  });
};

// Get Nominee Purchases
// GET /v1/spotlight/nominees/:nominee_id/purchases
export const useNomineePurchases = (nomineeId: number | null) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["nominee-purchases", nomineeId],
    endpoint: nomineeId
      ? `/v1/spotlight/nominees/${nomineeId}/purchases`
      : "",
    enabled: !!nomineeId,
  });
};

// Get Nominated Spotlights (Discover More Artists/Businesses)
export const useGetNominatedSpotlights = (
  weekId: number | string,
  type: "artist" | "business",
) => {
  return useClientApi({
    method: "get",
    key: ["nominated-spotlights", weekId, type],
    endpoint: "/v1/spotlight/nominated",
    params: { week_id: weekId, type },
  });
};

// Get Current Spotlight Week (dynamic week id for leaderboards/nominations)
export const useCurrentSpotlightWeek = (enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    enabled,
    key: ["current-spotlight-week"],
    endpoint: "/v1/spotlight/weeks/current",
  });
};

// Get Active Round Session (current contest season)
export const useActiveRoundSession = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["active-round-session"],
    endpoint: "/v1/active-round-session",
  });
};

// Get Active Season Rounds (live contest season + its rounds)
// GET /v1/contest/active-season-rounds
// `enabled` lets callers skip the request for roles that don't need it
// (e.g. the dashboard layout only fetches it for boss-beginning users).
export const getActiveSeasonRounds = (enabled: boolean = true) => {
  return useClientApi({
    method: "get",
    enabled,
    key: ["active-season-rounds"],
    endpoint: "/v1/contest/active-season-rounds",
  });
};

// ─── Contest Applications (Boss Beginnings seasons) ────────────────────────

// Apply a Business to a Contest Season
// POST /v1/contest-applications  Body: { season_id, business_id }
// Usage: applyToContest({ data: { season_id, business_id } })
export const useApplyToContest = () => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["contest-application-apply"],
    endpoint: "/v1/contest-applications",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Applied successfully!");
        queryClient.invalidateQueries({
          queryKey: ["my-contest-applications"],
        });
      }
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to apply to the session.",
      );
    },
  });
};

// Get My Contest Applications (list of my season-based applications)
// GET /v1/contest-applications/my
export const getMyContestApplications = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["my-contest-applications", params],
    endpoint: "/v1/contest-applications/my",
    params,
  });
};

// Withdraw a Contest Application
// POST /v1/contest-applications/:application_id/withdraw
// Usage: withdrawContestApplication({
//   endpoint: `/v1/contest-applications/${applicationId}/withdraw`,
//   data: {},
// })
export const useWithdrawContestApplication = () => {
  const queryClient = useQueryClient();

  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["contest-application-withdraw"],
    endpoint: "/v1/contest-applications/withdraw",
    onSuccess: (res: any) => {
      if (res?.success) {
        toast.success(res?.message || "Application withdrawn successfully!");
        queryClient.invalidateQueries({
          queryKey: ["my-contest-applications"],
        });
      }
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to withdraw application.",
      );
    },
  });
};

// Register / Buy Ticket for an Event
export const useEventRegister = () => {
  return useClientApi({
    method: "post",
    key: ["event-register"],
    endpoint: "/v1/events/register",
    onSuccess: (res: any) => {
      if (res?.success) {
        import("react-hot-toast").then(({ default: toast }) =>
          toast.success(res?.message || "Booking confirmed!"),
        );
      }
    },
    onError: (err: any) => {
      import("react-hot-toast").then(({ default: toast }) =>
        toast.error(
          err?.response?.data?.message || "Booking failed. Please try again.",
        ),
      );
    },
  });
};
