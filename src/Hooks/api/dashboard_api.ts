import useClientApi from "../useClientApi";

// Get Boss Beginning Dashboard Stats
export const useGetDashboardStats = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["boss-dashboard-stats"],
    endpoint: "/v1/dashboard/stats",
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
        t.error(err?.response?.data?.message || "Failed to cancel ticket."),
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
        t.error(err?.response?.data?.message || "Failed to create business."),
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
        t.error(err?.response?.data?.message || "Failed to update business."),
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
        t.error(err?.response?.data?.message || "Failed to delete business."),
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
export const useContestantDetails = (
  contestantId: number | null | undefined,
) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
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
        t.error(err?.response?.data?.message || "Failed to upload submission."),
      );
    },
  });
};
