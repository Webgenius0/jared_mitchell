"use client";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import PrivateLayout from "@/Private/PrivateLayout";
import DashboardSidebar from "@/Shared/DashboardSidebar";
import { PageLoader } from "@/Shared/PageLoader";
import { FaRegStar } from "react-icons/fa";
import { LuShoppingCart, LuCreditCard } from "react-icons/lu";

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
  NSixteenSvg,
  NTenSvg,
  NThirteenSvg,
  NTwelveSvg,
  NTwentySvg,
  NTwoSvg,
} from "@/Components/Svg/SvgContainer";
import DashboardHeader from "@/Shared/DashboardHeader";
import ChatbotWidget from "@/Components/Common/ChatbotWidget";
import {
  getDashboardTypeFromPathname,
  getUserDashboardRoute,
  getUserDashboardType,
} from "@/lib/utils";
import useCurrentRoundNumber from "@/Hooks/useCurrentRoundNumber";

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
    subMenu: [
      {
        label: "My Applications",
        path: "/dashboard/artist_business/spotlight-management/my-applications",
      },
      {
        label: "Vote Purchase",
        path: "/dashboard/artist_business/vote-purchase",
      },
    ],
  },
  {
    id: 42,
    label: "Purchase List",
    path: "/dashboard/artist_business/purchase-list",
    icon: <LuShoppingCart className="text-xl" />,
  },
  {
    id: 43,
    label: "Subscription",
    path: "/dashboard/subscription",
    icon: <LuCreditCard className="text-xl" />,
  },
  {
    id: 3,
    label: "Analytics",
    path: "/dashboard/artist_business/analytics",
    icon: <NFourSvg />,
  },

  {
    id: 4,
    label: "Events",
    path: "/dashboard/artist_business/events",
    icon: <NFiveSvg />,
  },

  {
    id: 5,
    label: "Setting",
    path: "/dashboard/artist_business/setting",
    icon: <NSevenSvg />,
    // subMenu: [
    //   {
    //     label: "Personal Settings",
    //     path: "/dashboard/artist_business/setting",
    //   },
    //   {
    //     label: "Notifications",
    //     path: "/dashboard/artist_business/setting/notifications",
    //   },
    //   { label: "Privacy", path: "/dashboard/artist_business/setting/privacy" },
    //   {
    //     label: "Connected Accounts",
    //     path: "/dashboard/artist_business/setting/connected-accounts",
    //   },
    // ],
  },
];

const communityMemberLinks = [
  {
    id: 8,
    label: "Dashboard",
    path: "/dashboard/community_member",
    icon: <NOneSvg />,
  },
  // {
  //   id: 25,
  //   label: "Boss Beginning",
  //   path: "/dashboard/community_member/boss-beginning",
  //   icon: <NTwentySvg />,
  // },
  // {
  //   id: 22,
  //   label: "Spotlight",
  //   path: "/dashboard/community_member/leaderboards",
  //   icon: <NEighteenSvg />,
  // },
  {
    id: 42,
    label: "Purchase List",
    path: "/dashboard/community_member/purchase-list",
    icon: <LuShoppingCart className="text-xl" />,
  },
  {
    id: 43,
    label: "Subscription",
    path: "/dashboard/subscription",
    icon: <LuCreditCard className="text-xl" />,
  },
  {
    id: 24,
    label: "Events",
    path: "/dashboard/community_member/events",
    icon: <NSixteenSvg />,
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
    id: 43,
    label: "Subscription",
    path: "/dashboard/subscription",
    icon: <LuCreditCard className="text-xl" />,
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
    label: "Business",
    path: "/dashboard/boss_beginning/business",
    icon: <NSeventeenSvg />,
  },
  {
    id: 31,
    label: "Current Session",
    path: "/dashboard/boss_beginning/current-session",
    icon: <FaRegStar className="text-xl" />,
    subMenu: [
      // {
      //   label: "List Business",
      //   path: "/dashboard/boss_beginning/listed-business",
      // },
      {
        label: "My Applications",
        path: "/dashboard/boss_beginning/current-session/my-applications",
      },
    ],
  },
  {
    id: 22,
    label: "Spotlight",
    path: "/dashboard/boss_beginning/leaderboards",
    icon: <NEighteenSvg />,
    subMenu: [
      {
        label: "My Applications",
        path: "/dashboard/boss_beginning/leaderboards/my-applications",
      },
      {
        label: "Vote Purchase",
        path: "/dashboard/boss_beginning/vote-purchase",
      },
    ],
  },
  {
    id: 42,
    label: "Purchase List",
    path: "/dashboard/boss_beginning/purchase-list",
    icon: <LuShoppingCart className="text-xl" />,
  },
  {
    id: 43,
    label: "Subscription",
    path: "/dashboard/subscription",
    icon: <LuCreditCard className="text-xl" />,
  },
  {
    id: 23,
    label: "Analytics",
    path: "/dashboard/boss_beginning/analytics",
    icon: <NNineTeenSvg />,
  },
  {
    id: 24,
    label: "Events",
    path: "/dashboard/boss_beginning/events",
    icon: <NSixteenSvg />,
  },
  {
    id: 25,
    label: "Boss Beginning",
    path: "/dashboard/boss_beginning/boss-beginning",
    icon: <NTwentySvg />,
    subMenu: [
      {
        label: "Round 1",
        path: "/dashboard/boss_beginning/boss-beginning/round-1",
      },
      {
        label: "Round 2",
        path: "/dashboard/boss_beginning/boss-beginning/round-2",
      },
      {
        label: "Round 3",
        path: "/dashboard/boss_beginning/boss-beginning/round-3",
      },
      {
        label: "Round 4",
        path: "/dashboard/boss_beginning/boss-beginning/round-4",
      },
      {
        label: "Round 5",
        path: "/dashboard/boss_beginning/boss-beginning/round-5",
      },
    ],
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
  const [open, setOpen] = useState<boolean>(false);
  const { user: authUser, loading } = useAuth();
  const resolvedType = getUserDashboardType(authUser);
  const router = useRouter();
  const pathname = usePathname();

  // ─── Role-based access control ────────────────────────────────────
  // The pathname decides which role section the user is asking for (e.g.
  // "/dashboard/boss_beginning" belongs to business users only). If the
  // logged-in user's role doesn't match, send them to their own dashboard
  // instead of rendering the section. Direct URL access can't bypass this.
  const requiredType = getDashboardTypeFromPathname(pathname);
  const roleBlocked =
    !loading && !!authUser && requiredType != null && resolvedType !== requiredType;

  useEffect(() => {
    if (roleBlocked) {
      router.replace(getUserDashboardRoute(authUser) || "/dashboard");
    }
  }, [roleBlocked, authUser, router]);

  if (roleBlocked) {
    return (
      <div className="h-svh flex justify-center items-center">
        <PageLoader />
      </div>
    );
  }

  // ─── Boss Beginning round access ───────────────────────────────────
  // Rounds open up one at a time over the season: a user can open their
  // current round (the season's active round) plus every round before it,
  // but not the rounds that come after it. While the season data hasn't
  // loaded (or errored) every round stays clickable so the nav never breaks.
  const isBossDashboard = resolvedType === "boss_beginning";
  const currentRound = useCurrentRoundNumber(isBossDashboard);

  const bossNavLinks = useMemo(
    () =>
      bossLinks.map(link => {
        if (link.id !== 25 || !link.subMenu) return link;
        return {
          ...link,
          subMenu: link.subMenu.map(sub => {
            const match = sub.label.match(/(\d+)/);
            const roundNum = match ? Number(match[1]) : null;
            return roundNum != null
              ? { ...sub, disabled: roundNum > currentRound }
              : sub;
          }),
        };
      }),
    [currentRound],
  );

  const navLinks = isBossDashboard
    ? bossNavLinks
    : resolvedType === "artist_business"
      ? artistLinks
      : resolvedType === "community_member"
        ? communityMemberLinks
        : sponsorLinks;

  return (
    <PrivateLayout>
      <section className="min-h-screen max-h-screen flex">
        {/* Sidebar */}
        <DashboardSidebar
          open={open}
          setOpen={setOpen}
          dashboardNavLinks={navLinks}
        />

        <section className="flex-1 bg-[#F8F8FA] overflow-y-auto">
          {/* Dashboard Header */}
          <DashboardHeader
            setOpen={setOpen}
            dashboardNavLinks={navLinks}
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

        {/* AI Chat Assistant (bottom-right, on every dashboard page) */}
        <ChatbotWidget />
      </section>
    </PrivateLayout>
  );
}
