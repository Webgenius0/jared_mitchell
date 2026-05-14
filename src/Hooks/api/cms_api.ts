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
