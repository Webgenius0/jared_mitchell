"use client";
import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SquarePen, X, Loader2, User } from "lucide-react";
import { useUpdateAvatar, useUpdateProfile } from "@/Hooks/api/auth_api";
import useAuth from "@/Hooks/useAuth";
import CurrentPlanCard from "./CurrentPlanCard";

type ProfileData = {
  name: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  category1: string;
  category2: string;
  bio: string;
  businessDescription: string;
  websiteLink: string;
  youtubeLink: string;
  facebookLink: string;
  instagramLink: string;
  joinDate: string;
  avatar: string;
};

// Defaults are intentionally empty — real values come from the logged-in
// user's profile via `initialData`. No fabricated placeholder data.
const defaultProfile: ProfileData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  location: "",
  category1: "",
  category2: "",
  bio: "",
  businessDescription: "",
  websiteLink: "",
  youtubeLink: "",
  facebookLink: "",
  instagramLink: "",
  joinDate: "",
  avatar: "",
};

type FieldConfig = {
  key: keyof ProfileData;
  label: string;
  type: "text" | "email" | "textarea" | "readonly";
};

type DashboardProfileSettingsProps = {
  title?: string;
  initialData?: Partial<ProfileData>;
  fields?: FieldConfig[];
  onSave?: (data: ProfileData) => void;
};

const defaultFields: FieldConfig[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "username", label: "Username", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "category1", label: "Category", type: "text" },
  { key: "category2", label: "Category", type: "text" },
  { key: "bio", label: "Bio", type: "textarea" },
  { key: "businessDescription", label: "Business Description", type: "textarea" },
  { key: "websiteLink", label: "Website link", type: "text" },
  { key: "youtubeLink", label: "Youtube channel link", type: "text" },
  { key: "facebookLink", label: "Facebook channel link", type: "text" },
  { key: "instagramLink", label: "Instagram channel link", type: "text" },
  { key: "joinDate", label: "Join Date", type: "readonly" },
];

const DashboardProfileSettings = ({
  title = "Profile",
  initialData,
  fields = defaultFields,
  onSave,
}: DashboardProfileSettingsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);

  const queryClient = useQueryClient();
  const { token, user } = useAuth();

  const { mutateAsync: updateAvatar } = useUpdateAvatar();
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const [profile, setProfile] = useState<ProfileData>({
    ...defaultProfile,
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      selectedFileRef.current = file;
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const hasNewAvatar = selectedFileRef.current !== null;

  /** Upload only the avatar — independent of profile save */
  const handleUploadAvatar = async () => {
    if (!selectedFileRef.current) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", selectedFileRef.current);

      const res = await updateAvatar({ data: formData });
      if (res?.success && res?.data?.avatar) {
        setProfile(prev => ({ ...prev, avatar: res.data.avatar }));
        if (token) {
          queryClient.invalidateQueries({ queryKey: ["user", token] });
        }
      }
      selectedFileRef.current = null;
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Failed to upload avatar:", err);
      selectedFileRef.current = null;
    } finally {
      setIsUploading(false);
    }
  };

  /** Save only profile fields — avatar is uploaded separately */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        name: profile.name,
        username: profile.username,
        address: profile.location,
        biography: profile.bio,
        business_description: profile.businessDescription,
        website_link: profile.websiteLink,
        social_links: {
          youtube: profile.youtubeLink,
          facebook: profile.facebookLink,
          instagram: profile.instagramLink,
        },
      };

      await updateProfile({ data: payload });

      if (token) {
        queryClient.invalidateQueries({ queryKey: ["user", token] });
      }

      onSave?.(profile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="font-sans text-gray-800 flex flex-col justify-between">
      {/* Current plan — from the user profile subscription */}
      <div className="mb-6">
        <CurrentPlanCard subscription={user?.subscription} />
      </div>

      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition cursor-pointer"
            >
              <SquarePen size={16} strokeWidth={2.25} />
              <span>Edit</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center space-x-1.5 text-sm font-semibold text-red-500 hover:text-red-600 transition cursor-pointer"
            >
              <X size={16} strokeWidth={2.25} />
              <span>Cancel</span>
            </button>
          )}
        </div>

        {/* Avatar Section */}
        <div className="py-6 flex items-center gap-6">
          <div className="relative inline-block group shrink-0">
            {profile.avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover border border-gray-100 transition duration-200"
                src={profile.avatar}
                alt="Avatar"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}

            {isEditing ? (
              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer text-white opacity-90 hover:opacity-100 transition">
                <SquarePen size={16} strokeWidth={2} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm hover:bg-blue-700 transition cursor-pointer"
              >
                <SquarePen size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Dedicated Upload Avatar button — appears when a new file is selected */}
          {hasNewAvatar && (
            <button
              onClick={handleUploadAvatar}
              disabled={isUploading}
              className={`text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md flex items-center gap-2 ${
                isUploading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Uploading Avatar...
                </>
              ) : (
                "Upload Avatar"
              )}
            </button>
          )}
        </div>

        {/* Details Fields Table */}
        <div className="divide-y divide-gray-100">
          {fields.map(field => (
            <div
              key={field.key}
              className={`grid grid-cols-1 md:grid-cols-4 py-4 text-sm ${
                field.type === "textarea" ? "items-start" : "items-center"
              }`}
            >
              <span className={`font-semibold text-gray-600 md:col-span-1 ${field.type === "textarea" ? "pt-2" : ""}`}>
                {field.label}
              </span>
              <div className="md:col-span-3">
                {field.type === "readonly" ? (
                  <span className={`text-gray-900`}>
                    {profile[field.key]}
                  </span>
                ) : isEditing ? (
                  field.type === "textarea" ? (
                    <textarea
                      name={field.key}
                      value={profile[field.key]}
                      onChange={handleChange}
                      rows={3}
                      className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.key}
                      value={profile[field.key]}
                      onChange={handleChange}
                      className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  )
                ) : (
                  <span className="text-gray-900">
                    {profile[field.key]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Action Panel — only saves profile fields, avatar is uploaded separately */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={!isEditing || isSaving}
          className={`text-xs font-bold px-6 py-3 rounded-full transition shadow-md cursor-pointer flex items-center gap-2 ${
            isSaving
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default DashboardProfileSettings;
