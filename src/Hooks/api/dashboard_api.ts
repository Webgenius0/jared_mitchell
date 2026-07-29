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
