import toast from "react-hot-toast";
import useClientApi from "../useClientApi";

// Create Business Spotlight
export const useCreateBusinessSpotlight = () => {
  return useClientApi({
    method: "post",
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
  return useClientApi({
    method: "post",
    key: ["artist-spotlight"],
    endpoint: "/v1/artist-spotlight",
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
    key: ["business-spotlights", params],
    endpoint: "/v1/business-spotlight",
    params,
  });
};

// Get Artist Spotlights
export const getArtistSpotlights = (params?: any) => {
  return useClientApi({
    method: "get",
    key: ["artist-spotlights", params],
    endpoint: "/v1/artist-spotlight",
    params,
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

// Get CMS About Data
export const getCMSAboutData = () => {
  return useClientApi({
    method: "get",
    key: ["cms-about"],
    endpoint: "/v1/cms/about",
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
          toast.success(res?.message || "Booking confirmed!")
        );
      }
    },
    onError: (err: any) => {
      import("react-hot-toast").then(({ default: toast }) =>
        toast.error(
          err?.response?.data?.message || "Booking failed. Please try again."
        )
      );
    },
  });
};


