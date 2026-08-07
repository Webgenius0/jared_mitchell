"use client";

import { Button } from "@/Components/Common/Button";
import useAuth from "@/Hooks/useAuth";
import { getUserDashboardRoute } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CREATE_SPOTLIGHT_URL =
  "/dashboard/artist_business/spotlight-management/create-spotlight";

const ArtistSpotlightApplyButton = () => {
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

    // Logged in as an artist → go to the artist spotlight submission form
    if (getUserDashboardRoute(user) === "/dashboard/artist_business") {
      router.push(CREATE_SPOTLIGHT_URL);
      return;
    }

    // Logged in but not an artist
    toast.error("You have to be an artist to submit the form.");
  };

  return (
    <div className="text-center block w-fit mx-auto">
      <Button onClick={handleApply}>Apply Now</Button>
    </div>
  );
};

export default ArtistSpotlightApplyButton;
