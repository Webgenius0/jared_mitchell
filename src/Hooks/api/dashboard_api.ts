import useClientApi from "../useClientApi";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

// Get Boss Beginning Dashboard Stats
export const useGetDashboardStats = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["boss-dashboard-stats"],
    endpoint: "/v1/dashboard/stats",
  });
};

// Get Artist Dashboard Stats
// GET /v1/artist/dashboard/stats
// Returns: { stats: { total_spotlight, approved_spotlight, ticket_purchasing },
//            spotlight_performance: [{ month, value }] }
export const useGetArtistDashboardStats = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["artist-dashboard-stats"],
    endpoint: "/v1/artist/dashboard/stats",
  });
};

// Get Artist Dashboard Analytics
// GET /v1/artist/dashboard/analytics
// Returns: { spotlight_reach: { total_reach, profile_visits, spotlight_view },
//            spotlight_performance: [{ month, clap, share, save }] }
export const useGetArtistDashboardAnalytics = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["artist-dashboard-analytics"],
    endpoint: "/v1/artist/dashboard/analytics",
  });
};

export const useGetBusinessDashboardStats = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["business-dashboard-stats"],
    endpoint: "/v1/dashboard/summary",
  });
};

// Get Boss Beginning Contest Summary (overview + per-round)
// GET /v1/dashboard/contest-summary
// Returns: {
//   overall_summary: { total_votes, todays_votes, this_weeks_votes, this_months_votes },
//   year_based_monthly_summary: [{ month, clap, share, fire }],
//   round_wise_summary: [
//     { round: "Round 1", total_votes, todays_votes, weekly_votes, monthly_votes,
//       voting_summary: { total_clap, total_save, total_fire, rank } },
//     { round: "Round 2", total_points, todays_points, weekly_points, monthly_points },
//     ... (Rounds 3-5 share Round 2's shape)
//   ]
// }
export const useGetContestSummary = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["boss-contest-summary"],
    endpoint: "/v1/dashboard/contest-summary",
  });
};

// Get Boss Beginning Dashboard Analytics
// GET /v1/dashboard/analytics
// Returns: { votes: { total_vote, todays_vote, weekly_vote, monthly_vote },
//            spotlight_reach: { total_reach, profile_visits, spotlight_view },
//            votes_performance: [{ month, clap, share, save }],
//            engagement_rate: { spotlight_view, profile_visits, total_vote } }
export const useGetBusinessDashboardAnalytics = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["business-dashboard-analytics"],
    endpoint: "/v1/dashboard/analytics",
  });
};

// Get Event Registrations (booking history)
export const useEventRegistrations = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["event-registrations", params],
    endpoint: "/v1/event-registrations",
    params,
  });
};

// Cancel an Event Registration (ticket)
// Usage: cancelRegistration({ endpoint: `/v1/event-registrations/${id}/cancel` })
export const useCancelEventRegistration = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["cancel-event-registration"],
    onSuccess: (res: any) => {
      if (res?.success) {
        const toast = import("react-hot-toast").then(m => m.default);
        toast.then(t =>
          t.success(res?.message || "Ticket cancelled successfully!"),
        );
      }
    },
    onError: (err: any) => {
      const toast = import("react-hot-toast").then(m => m.default);
      toast.then(t =>
        t.error(getApiErrorMessage(err)),
      );
    },
  });
};

// Get All Businesses (for boss-beginning business list)
export const useGetAllBusinesses = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["all-businesses", params],
    endpoint: "/v1/businesses/list",
    params,
  });
};

// Create a New Business (multipart/form-data)
export const useCreateBusiness = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["create-business"],
    endpoint: "/v1/businesses/store",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        const toast = import("react-hot-toast").then(m => m.default);
        toast.then(t =>
          t.success(res?.message || "Business created successfully!"),
        );
      }
    },
    onError: (err: any) => {
      const toast = import("react-hot-toast").then(m => m.default);
      toast.then(t =>
        t.error(getApiErrorMessage(err)),
      );
    },
  });
};

// Get Single Business Details
export const useGetBusinessDetails = (id: number | string | null) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["business-details", id],
    endpoint: `/v1/businesses/details/${id}`,
    enabled: !!id,
  });
};

// Update an Existing Business (multipart/form-data)
export const useUpdateBusiness = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["update-business"],
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        const toast = import("react-hot-toast").then(m => m.default);
        toast.then(t =>
          t.success(res?.message || "Business updated successfully!"),
        );
      }
    },
    onError: (err: any) => {
      const toast = import("react-hot-toast").then(m => m.default);
      toast.then(t =>
        t.error(getApiErrorMessage(err)),
      );
    },
  });
};

// Delete a Business
export const useDeleteBusiness = () => {
  return useClientApi({
    method: "delete",
    isPrivate: true,
    key: ["delete-business"],
    onSuccess: (res: any) => {
      if (res?.success) {
        const toast = import("react-hot-toast").then(m => m.default);
        toast.then(t =>
          t.success(res?.message || "Business deleted successfully!"),
        );
      }
    },
    onError: (err: any) => {
      const toast = import("react-hot-toast").then(m => m.default);
      toast.then(t =>
        t.error(getApiErrorMessage(err)),
      );
    },
  });
};

// Get purchase list
export const usePurchaseList = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["purchase-list", params],
    endpoint: "/v1/orders",
    params,
  });
};

// Get Contestant Details — includes the contestant's current round and any
// already-submitted media for it (submission.media_urls).
// GET /v1/contest/contestants/:contestantId
// NOTE: this endpoint is PUBLIC — the public contestant profile pages
// (RoundOneProfile..RoundFiveProfile, how-winners-are-chosen) fetch it
// without any auth. Sending the Authorization header with a stale/expired
// token can make the backend answer with a 302 redirect (→ login) instead
// of JSON, so we deliberately use the public instance here.
export const useContestantDetails = (
  contestantId: number | null | undefined,
) => {
  return useClientApi({
    method: "get",
    isPrivate: false,
    key: ["contestant-details", contestantId],
    endpoint: contestantId
      ? `/v1/contest/contestants/${contestantId}`
      : "",
    enabled: !!contestantId,
  });
};

// Get My Contest Rounds — the logged-in business owner's round check: the
// current round plus the businesses competing in it (rank, points, status).
// GET /v1/contest/my-rounds?round_number=<round_id>
// Note: the backend expects the round's *id* (e.g. 58) under the
// `round_number` query param.
export const useMyContestRounds = (roundId: number | null | undefined) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["my-contest-rounds", roundId],
    endpoint: "/v1/contest/my-rounds",
    params: { round_number: roundId },
    enabled: !!roundId,
  });
};

// Submit Round Assets — upload the round's photo/video submission for a
// contestant in a round.
// POST /v1/contest/rounds/:round_id/submissions
// Payload (multipart/form-data): contestant_id, media_files[]
// Usage: submitRoundSubmission({
//   endpoint: `/v1/contest/rounds/${roundId}/submissions`,
//   data: formData,
// })
export const useSubmitRoundSubmission = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["submit-round-submission"],
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        const toast = import("react-hot-toast").then(m => m.default);
        toast.then(t =>
          t.success(res?.message || "Submission uploaded successfully!"),
        );
      }
    },
    onError: (err: any) => {
      const toast = import("react-hot-toast").then(m => m.default);
      toast.then(t =>
        t.error(getApiErrorMessage(err)),
      );
    },
  });
};

// Update Round Assets — replace the photo/video for an already-submitted
// round submission (the previous media stays as the default until a new
// file is chosen).
// POST /v1/contest/rounds/:round_id/submissions/:submission_id/update
// Payload (multipart/form-data): contestant_id, media_files[]
// Usage: updateRoundSubmission({
//   endpoint: `/v1/contest/rounds/${roundId}/submissions/${submissionId}/update`,
//   data: formData,
// })
export const useUpdateRoundSubmission = () => {
  return useClientApi({
    method: "post",
    isPrivate: true,
    key: ["update-round-submission"],
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onSuccess: (res: any) => {
      if (res?.success) {
        const toast = import("react-hot-toast").then(m => m.default);
        toast.then(t =>
          t.success(res?.message || "Submission updated successfully!"),
        );
      }
    },
    onError: (err: any) => {
      const toast = import("react-hot-toast").then(m => m.default);
      toast.then(t =>
        t.error(getApiErrorMessage(err)),
      );
    },
  });
};
