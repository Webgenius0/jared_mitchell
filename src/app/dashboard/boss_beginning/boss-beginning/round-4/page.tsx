"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Heart,
  Sparkles,
  ThumbsUp,
  BarChart3,
  UploadCloud,
  X,
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

export default function Round4Page() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map(f => f.name);
    setPhotos(prev => [...prev, ...names]);
    e.target.value = "";
  };

  const removePhoto = (name: string) => {
    setPhotos(prev => prev.filter(p => p !== name));
  };

  const handleSave = () => {
    console.log("Saving", photos);
  };

  return (
    <div className=" bg-[#F5F6F8]">
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

        {/* Photo/Video upload — multiple */}
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
              {photos.length > 0
                ? `${photos.length} file${photos.length === 1 ? "" : "s"} selected`
                : "Click to upload images"}
            </span>
            <span className="text-xs md:text-sm text-slate-400">
              PNG, JPG up to 10MB — multiple files allowed
            </span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {photos.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {photos.map(name => (
                <span
                  key={name}
                  className="flex items-center gap-1.5 text-xs md:text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removePhoto(name)}
                    className="hover:text-blue-800"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
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
