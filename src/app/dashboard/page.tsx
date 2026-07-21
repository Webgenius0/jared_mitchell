"use client";

import useAuth from "@/Hooks/useAuth";
import { getUserDashboardRoute } from "@/lib/utils";
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
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
