import {
  NotificationIconSvg,
  OkaySvg,
  SearchIconSvg,
} from "@/Components/Svg/SvgContainer";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import useAuth from "@/Hooks/useAuth";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import {
  normalizeSubscriptionStatus,
  subscriptionStatusStyles,
} from "@/Hooks/api/subscription_api";

const DashboardHeader = ({
  setOpen,
  dashboardNavLinks,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardNavLinks: {
    label: string;
    path: string;
    subMenu?: { label: string; path: string }[];
  }[];
}) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const activeLink = dashboardNavLinks.find(link => {
    if (link.path === pathname) return true;

    if (link.subMenu) {
      return link.subMenu.some(sub => sub.path === pathname);
    }

    return false;
  });

  const activeSubMenuLink = activeLink?.subMenu?.find(
    sub => sub.path === pathname,
  );

  const profileName = user?.profile?.name || "User";
  const profileEmail = user?.email || "";
  const profileAvatar = user?.profile?.avatar || "";
  const firstLetter = profileName?.charAt(0)?.toUpperCase() || "U";

  // Subscription pills — plan + status from the user profile
  const subscription = user?.subscription;
  const planName = subscription?.plan_name;
  const subStatus = normalizeSubscriptionStatus(
    subscription?.canceled ? "cancelled" : subscription?.status,
  );
  const statusMeta =
    subscriptionStatusStyles[subStatus] || subscriptionStatusStyles.inactive;

  return (
    <header className="flex justify-between items-center pt-3 md:pt-4 px-3 md:px-5 sticky top-0 bg-[#F8F8FA] z-50">
      {/* Left - Page Title + Hamburger */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        {/* Hamburger Menu - visible below xl */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="xl:hidden size-9 md:size-10 rounded-lg grid place-items-center bg-primary-blue text-white hover:bg-primary-blue/90 transition-colors duration-200 cursor-pointer shrink-0"
        >
          <FaBars className="text-lg md:text-xl" />
        </button>

        <h3 className="text-xl md:text-2xl xl:text-3xl font-medium text-black capitalize truncate">
          {activeSubMenuLink?.label || activeLink?.label}
        </h3>
      </div>

      {/* Right - Actions */}
      <div className="flex gap-2 md:gap-3 items-center bg-white px-2 md:px-3 py-2 md:py-3.5 rounded-xl shadow min-w-0">
        {/* Search - hidden on smallest screens */}
        {/* <button className="hidden sm:grid size-9 md:size-12 rounded-full place-items-center border border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer shrink-0">
          <SearchIconSvg />
        </button> */}

        {/* Notification */}
        {/* <button className="size-9 md:size-12 rounded-full grid place-items-center border border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer shrink-0">
          <NotificationIconSvg />
        </button> */}

        {/* Profile Avatar */}
        <div className="size-9 md:size-12 rounded-full grid place-items-center border border-gray-200 overflow-hidden shrink-0">
          {profileAvatar ? (
            <Image
              src={profileAvatar}
              alt={profileName}
              width={48}
              height={48}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-sm md:text-lg font-semibold text-gray-600">
              {firstLetter}
            </span>
          )}
        </div>

        {/* Name & Email - hidden on mobile */}
        <p className="hidden md:flex flex-col min-w-0">
          <span className="text-[#1D1D1F] text-sm xl:text-base font-semibold flex gap-1 items-center truncate">
            {profileName}
            <OkaySvg />
          </span>
          <span className="text-xs xl:text-sm text-gray-500 truncate">
            {profileEmail}
          </span>
        </p>

        {/* Plan + Status badges - hidden on smaller screens */}
        {subscription ? (
          <>
            <Link
              href="/dashboard/subscription"
              title="Manage subscription"
              className="hidden lg:inline-block self-end px-3 xl:px-4 text-xs xl:text-sm py-1.5 font-medium rounded-full text-primary-blue bg-[#155DFC26] hover:bg-[#155DFC33] capitalize shrink-0 transition-colors"
            >
              {planName || "Current Plan"}
            </Link>
            <span
              className={`hidden lg:inline-block self-end px-3 xl:px-4 text-xs xl:text-sm py-1.5 font-medium rounded-full border capitalize shrink-0 ${statusMeta.className}`}
            >
              {statusMeta.label}
            </span>
          </>
        ) : (
          <Link
            href="/pricing"
            className="hidden lg:inline-block self-end px-3 xl:px-4 text-xs xl:text-sm py-1.5 font-medium rounded-full text-primary-blue bg-[#155DFC26] hover:bg-[#155DFC33] capitalize shrink-0 transition-colors"
          >
            Get a Plan
          </Link>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
