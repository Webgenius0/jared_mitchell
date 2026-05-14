"use client";
import React, { useState } from "react";
import PrivateLayout from "@/Private/PrivateLayout";
import DashboardSidebar from "@/Shared/DashboardSidebar";
import {
  NEighteenSvg,
  NEightSvg,
  NElevenSvg,
  NFifteenSvg,
  NFiveSvg,
  NFourSvg,
  NFourteenSvg,
  NNineSvg,
  NNineTeenSvg,
  NOneSvg,
  NSevenSvg,
  NSeventeenSvg,
  NSixSvg,
  NSixteenSvg,
  NTenSvg,
  NThirteenSvg,
  NThreeSvg,
  NTwelveSvg,
  NTwentyOneSvg,
  NTwentySvg,
  NTwentyTwoSvg,
  NTwoSvg,
} from "@/Components/Svg/SvgContainer";
import DashboardHeader from "@/Shared/DashboardHeader";
import { CanvaSvg } from "@/Components/Svg/SvgContainer2";

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
    id: 6,
    label: "Canva",
    path: "/dashboard/artist_business/canva",
    icon: <CanvaSvg />,
  },
  {
    id: 77,
    label: "Post",
    path: "/dashboard/artist_business/post",
    icon: <NSevenSvg />,
    subMenu: [
      {
        label: "Create Post",
        path: "/dashboard/artist_business/post",
      },
      {
        label: "Save Draft",
        path: "/dashboard/artist_business/post/draft",
      },
      {
        label: "Schedule Post",
        path: "/dashboard/artist_business/post/schedule",
      },
      {
        label: "Publish",
        path: "/dashboard/artist_business/post/publish",
      },
      {
        label: "Ask OSI AI",
        path: "/dashboard/artist_business/post/ask-osi",
      },
    ],
  },
  {
    id: 7,
    label: "Setting",
    path: "/dashboard/artist_business/setting",
    icon: <NSevenSvg />,
    subMenu: [
      {
        label: "Personal Settings",
        path: "/dashboard/artist_business/setting",
      },
      {
        label: "Notifications",
        path: "/dashboard/artist_business/setting/notifications",
      },
      { label: "Privacy", path: "/dashboard/artist_business/setting/privacy" },
      {
        label: "Connected Accounts",
        path: "/dashboard/artist_business/setting/connected-accounts",
      },
    ],
  },
];

const communityMemberLinks = [
  {
    id: 8,
    label: "Dashboard",
    path: "/dashboard/community_member",
    icon: <NOneSvg />,
  },
  {
    id: 9,
    label: "Voting Center",
    path: "/dashboard/community_member/voting-center",
    icon: <NEightSvg />,
  },
  {
    id: 10,
    label: "Saved Content",
    path: "/dashboard/community_member/saved-content",
    icon: <NNineSvg />,
  },
  {
    id: 11,
    label: "Support Votes",
    path: "/dashboard/community_member/support-votes",
    icon: <NTenSvg />,
  },
  {
    id: 12,
    label: "Setting",
    path: "/dashboard/community_member/settings",
    icon: <NElevenSvg />,
  },
];

const sponsorLinks = [
  {
    id: 13,
    label: "Dashboard",
    path: "/dashboard/sponsor",
    icon: <NOneSvg />,
  },
  {
    id: 14,
    label: "Ad Performance",
    path: "/dashboard/sponsor/ad-performance",
    icon: <NTwelveSvg />,
  },
  {
    id: 15,
    label: "Placement Schedule",
    path: "/dashboard/sponsor/placement-schedule",
    icon: <NThirteenSvg />,
  },
  {
    id: 16,
    label: "Impression Estimates",
    path: "/dashboard/sponsor/impression-estimates",
    icon: <NFourteenSvg />,
  },
  {
    id: 17,
    label: "Campaign Assets",
    path: "/dashboard/sponsor/campaign-assets",
    icon: <NFifteenSvg />,
  },
  {
    id: 18,
    label: "Billing",
    path: "/dashboard/sponsor/billing",
    icon: <NSixteenSvg />,
  },
  {
    id: 19,
    label: "Setting",
    path: "/dashboard/sponsor/settings",
    icon: <NElevenSvg />,
  },
];

const bossLinks = [
  {
    id: 20,
    label: "Dashboard",
    path: "/dashboard/boss_beginning",
    icon: <NOneSvg />,
  },
  {
    id: 21,
    label: "Voting Center",
    path: "/dashboard/boss_beginning/voting-center",
    icon: <NSeventeenSvg />,
  },
  {
    id: 22,
    label: "Leaderboards",
    path: "/dashboard/boss_beginning/leaderboards",
    icon: <NEighteenSvg />,
  },
  {
    id: 23,
    label: "Promotion Tools",
    path: "/dashboard/boss_beginning/promotion-tools",
    icon: <NNineTeenSvg />,
  },
  {
    id: 24,
    label: "Billing & Payments",
    path: "/dashboard/boss_beginning/payments",
    icon: <NSixteenSvg />,
  },
  {
    id: 25,
    label: "Events & Vendors",
    path: "/dashboard/boss_beginning/events",
    icon: <NTwentySvg />,
  },
  {
    id: 25,
    label: "Community Hub",
    path: "/dashboard/boss_beginning/community-hub",
    icon: <NTwentyOneSvg />,
  },
  {
    id: 25,
    label: "Activity Log",
    path: "/dashboard/boss_beginning/activity-log",
    icon: <NTwentyTwoSvg />,
  },
  {
    id: 26,
    label: "Setting",
    path: "/dashboard/boss_beginning/settings",
    icon: <NElevenSvg />,
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
          user === "artist_business"
            ? artistLinks
            : user === "community_member"
              ? communityMemberLinks
              : user === "sponsor"
                ? sponsorLinks
                : bossLinks
        }
      />

      <section className="flex-1 bg-[#F8F8FA] overflow-y-auto">
        {/* Dashboard Header */}
        <DashboardHeader
          setOpen={setOpen}
          dashboardNavLinks={
            user === "artist_business"
              ? artistLinks
              : user === "community_member"
                ? communityMemberLinks
                : user === "sponsor"
                  ? sponsorLinks
                  : bossLinks
          }
        />

        {/* Dashboard Outlet */}
        <main className="p-5">{children}</main>
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
