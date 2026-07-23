"use client";

import useAuth from "@/Hooks/useAuth";
import { getUserDashboardRoute } from "@/lib/utils";
import { PageLoader } from "@/Shared/PageLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const dashboardRoute = getUserDashboardRoute(user);

    if (dashboardRoute) {
      router.replace(dashboardRoute);
    } else {
      // Fallback to community member dashboard if role is unknown
      router.replace("/dashboard/community_member");
    }
  }, [user, loading, router]);

  return (
    <div className="h-full flex items-center justify-center">
      <PageLoader />
    </div>
  );
}
