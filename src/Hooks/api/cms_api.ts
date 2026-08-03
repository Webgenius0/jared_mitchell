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

// Get Artist Spotlights
export const getArtistSpotlights = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["artist-spotlights", params],
    endpoint: "/v1/artist-spotlight",
    params,
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

// Get Business Spotlights
export const getBusinessSpotlights = (params?: any) => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["business-spotlights", params],
    endpoint: "/v1/business-spotlight",
    params,
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

// Get Active Round Session (current contest season)
export const useActiveRoundSession = () => {
  return useClientApi({
    method: "get",
    isPrivate: true,
    key: ["active-round-session"],
    endpoint: "/v1/active-round-session",
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
