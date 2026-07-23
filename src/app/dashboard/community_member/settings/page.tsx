"use client";
import React, { useState } from "react";
import { SquarePen, X } from "lucide-react";

const ProfilePage = () => {
  // Toggle between view mode and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form States
  const [profile, setProfile] = useState({
    name: "Arthur Taylor",
    username: "arthooo11",
    email: "john@example.com",
    phone: "12434*******",
    location:
      "7 Pepys Street, City of London, London, EC3N 4AF, United Kingdom",
    category1: "Artist spotlight",
    category2: "Artist spotlight",
    bio: "Contemporary artist exploring the intersection of digital and traditional media.",
    businessDescription: "Describe your business or creative practice...",
    websiteLink: "www.XYZ.com",
    youtubeLink: "www.abc.com",
    facebookLink: "www.abc.com",
    instagramLink: "www.abc.com",
    joinDate: "12 Apr 2026",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
  });

  // Handle input changes dynamically
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle local image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSave = () => {
    // Add API submission logic here
    console.log("Updated Profile Data: ", profile);
    setIsEditing(false);
  };

  return (
    <div className=" font-sans text-gray-800 flex flex-col justify-between">
      <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Profile
          </h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              <SquarePen size={16} strokeWidth={2.25} />
              <span>Edit</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center space-x-1.5 text-sm font-semibold text-red-500 hover:text-red-600 transition"
            >
              <X size={16} strokeWidth={2.25} />
              <span>Cancel</span>
            </button>
          )}
        </div>

        {/* Avatar Section */}
        <div className="py-6 flex">
          <div className="relative inline-block group">
            <img
              className="w-20 h-20 rounded-full object-cover border border-gray-100 transition duration-200"
              src={profile.avatar}
              alt="Avatar"
            />

            {isEditing ? (
              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer text-white opacity-90 hover:opacity-100 transition">
                <SquarePen size={16} strokeWidth={2} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm hover:bg-blue-700 transition"
              >
                <SquarePen size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* Details Fields Table */}
        <div className="divide-y divide-gray-100">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Name
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.name}</span>
              )}
            </div>
          </div>

          {/* Username */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Username
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.username}</span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Email
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.email}</span>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Phone
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.phone}</span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Location
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.location}</span>
              )}
            </div>
          </div>

          {/* Category 1 */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Category
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="category1"
                  value={profile.category1}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.category1}</span>
              )}
            </div>
          </div>

          {/* Category 2 */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Category
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="category2"
                  value={profile.category2}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.category2}</span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-start">
            <span className="font-semibold text-gray-600 md:col-span-1 pt-2">
              Bio
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              ) : (
                <span className="text-gray-900 block pt-2">{profile.bio}</span>
              )}
            </div>
          </div>

          {/* Business Description */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-start">
            <span className="font-semibold text-gray-600 md:col-span-1 pt-2">
              Business Description
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <textarea
                  name="businessDescription"
                  value={profile.businessDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              ) : (
                <span className="text-gray-900 block pt-2">
                  {profile.businessDescription}
                </span>
              )}
            </div>
          </div>

          {/* Website Link */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Website link
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="websiteLink"
                  value={profile.websiteLink}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.websiteLink}</span>
              )}
            </div>
          </div>

          {/* YouTube Channel Link */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Youtube channel link
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="youtubeLink"
                  value={profile.youtubeLink}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.youtubeLink}</span>
              )}
            </div>
          </div>

          {/* Facebook Channel Link */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Facebook channel link
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="facebookLink"
                  value={profile.facebookLink}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.facebookLink}</span>
              )}
            </div>
          </div>

          {/* Instagram Channel Link */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Instagram channel link
            </span>
            <div className="md:col-span-3">
              {isEditing ? (
                <input
                  type="text"
                  name="instagramLink"
                  value={profile.instagramLink}
                  onChange={handleChange}
                  className="w-full max-w-xl px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-900">{profile.instagramLink}</span>
              )}
            </div>
          </div>

          {/* Join Date */}
          <div className="grid grid-cols-1 md:grid-cols-4 py-4 text-sm items-center">
            <span className="font-semibold text-gray-600 md:col-span-1">
              Join Date
            </span>
            <div className="md:col-span-3">
              <span className="text-gray-900">{profile.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Action Panel */}
      <div className=" flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={!isEditing}
          className={`text-xs font-bold px-6 py-3 rounded-full transition shadow-md ${
            isEditing
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          }`}
        >
          Save Change
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
