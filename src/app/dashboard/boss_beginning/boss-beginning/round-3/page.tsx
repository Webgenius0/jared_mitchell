"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Heart,
  Sparkles,
  ThumbsUp,
  BarChart3,
  UploadCloud,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pointStats: StatCard[] = [
  { label: "Total point", value: 1248, icon: Heart },
  { label: "Todays point", value: 124, icon: Sparkles },
  { label: "Weekly point", value: 842, icon: ThumbsUp },
  { label: "Monthly point", value: 3210, icon: BarChart3 },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function StatCardItem({ label, value, icon: Icon }: StatCard) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-2 mb-4 md:mb-5">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-blue-500" />
        </div>
        <span className="text-sm md:text-base text-slate-500">{label}</span>
      </div>
      <div className="text-xl md:text-2xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Round2Page() {
  const [photoName, setPhotoName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoName(file.name);
  };

  const handleSave = () => {
    console.log("Saving", photoName);
  };

  return (
    <div className=" bg-[#F5F6F8] ">
      <div className=" space-y-6">
        {/* Votes */}
        <div>
          <h2 className="text-sm md:text-base font-medium text-slate-800 mb-3">
            Votes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {pointStats.map(stat => (
              <StatCardItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        {/* Photo/Video upload */}
        <div>
          <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
            Photo/Video<span className="text-red-500">*</span>
          </label>
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl bg-white py-10 md:py-14 cursor-pointer hover:border-blue-300 transition-colors"
          >
            <UploadCloud className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
            <span className="text-sm md:text-base text-slate-600">
              {photoName ?? "Click to upload image"}
            </span>
            <span className="text-xs md:text-sm text-slate-400">
              PNG, JPG up to 10MB
            </span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white text-sm md:text-base font-medium px-8 py-2.5 md:py-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
