"use client";
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

export default ProfilePage;
