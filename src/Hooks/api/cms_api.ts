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
