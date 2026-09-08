import type { Metadata } from "next";

"use client";
import React from "react";
import DashboardProfileSettings from "@/Components/Common/DashboardProfileSettings";
import useAuth from "@/Hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();

  const initialData = {
    name: user?.profile?.name || "",
    username: user?.profile?.username || "",
    email: user?.email || "",
    location: user?.profile?.address || "",
    category1:
      typeof user?.artist_category === "object"
        ? user?.artist_category?.name || ""
        : user?.artist_category || "",
    category2:
      typeof user?.business_category === "object"
        ? user?.business_category?.name || ""
        : user?.business_category || "",
    bio: user?.profile?.biography || "",
    businessDescription: user?.profile?.business_description || "",
    websiteLink: user?.profile?.website_link || "",
    youtubeLink: user?.profile?.social_links?.youtube || "",
    facebookLink: user?.profile?.social_links?.facebook || "",
    instagramLink: user?.profile?.social_links?.instagram || "",
    avatar: user?.profile?.avatar || "",
  };

  return <DashboardProfileSettings initialData={initialData} />;
};

export const metadata = {
  title: "Business Settings - Profile & Preferences | OSI Dashboard",
  description:
    "Manage your business profile settings on OSI. Update your personal information, social media links, bio, and preferences in the Open Spotlight Initiative dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default ProfilePage;
