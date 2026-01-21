"use client";
import React, { useState } from "react";
import PrivateLayout from "@/Private/PrivateLayout";
import { FaBars } from "react-icons/fa";
import DashboardSidebar from "@/Shared/DashboardSidebar";
import {
  NFiveSvg,
  NFourSvg,
  NOneSvg,
  NSevenSvg,
  NSixSvg,
  NThreeSvg,
  NTwoSvg,
} from "@/Components/Svg/SvgContainer";
import DashboardHeader from "@/Shared/DashboardHeader";

const artistLinks = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard/artist_business",
    icon: <NOneSvg />,
  },
  {
    id: 2,
    label: "Spotlight Management",
    path: "/dashboard/artist_business/spotlight-management",
    icon: <NTwoSvg />,
  },
  {
    id: 3,
    label: "Promotion Tools",
    path: "/dashboard/artist_business/promotion-tools",
    icon: <NThreeSvg />,
  },
  {
    id: 4,
    label: "Analytics",
    path: "/dashboard/artist_business/analytics",
    icon: <NFourSvg />,
  },
  {
    id: 5,
    label: "Events",
    path: "/dashboard/artist_business/events",
    icon: <NFiveSvg />,
  },
  {
    id: 6,
    label: "Billing",
    path: "/dashboard/artist_business/billing",
    icon: <NSixSvg />,
  },
  {
    id: 7,
    label: "Setting",
    path: "/dashboard/artist_business/setting",
    icon: <NSevenSvg />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = "artist_business"; // artist_business || boss_beginning || community_member || sponsor
  const [open, setOpen] = useState<boolean>(false);

  return (
    // <PrivateLayout>
    <section className="min-h-screen max-h-screen flex">
      {/* Sidebar */}
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        dashboardNavLinks={
          user === "artist_business" ? artistLinks : artistLinks
        }
      />

      <section className="flex-1 bg-gray-100">
        {/* Dashboard Header */}
        <DashboardHeader
          setOpen={setOpen}
          dashboardNavLinks={
            user === "artist_business" ? artistLinks : artistLinks
          }
        />

        {/* Dashboard Outlet */}
        <main className="p-5 overflow-y-auto">{children}</main>
      </section>

      {/* Blur Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 2xl:hidden z-50 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
    </section>
    // </PrivateLayout>
  );
}
