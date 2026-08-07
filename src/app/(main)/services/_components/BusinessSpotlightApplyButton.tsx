"use client";

import { Button } from "@/Components/Common/Button";
import useAuth from "@/Hooks/useAuth";
import { getUserDashboardRoute } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CREATE_SPOTLIGHT_URL =
  "/dashboard/boss_beginning/leaderboards/create-spotlights";

const BusinessSpotlightApplyButton = () => {
  const { token, user, loading } = useAuth();
  const router = useRouter();

  const handleApply = () => {
    // Not logged in → show message and send to login page
    if (!token) {
      toast.error("You must login to apply");
      router.push("/auth/login");
      return;
    }

    // User data still loading → wait for it before deciding role
    if (loading) return;

    // Logged in as a business user → go to the business spotlight submission form
    if (getUserDashboardRoute(user) === "/dashboard/boss_beginning") {
      router.push(CREATE_SPOTLIGHT_URL);
      return;
    }

    // Logged in but not a business user
    toast.error("You have to be a business user to submit the form.");
  };

  return (
    <div className="text-center block w-fit mx-auto">
      <Button onClick={handleApply}>Apply Now</Button>
    </div>
  );
};

export default BusinessSpotlightApplyButton;
