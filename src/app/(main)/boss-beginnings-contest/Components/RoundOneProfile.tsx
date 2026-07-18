"use client";

import React from "react";
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Share2,
  Bookmark,
  ThumbsUp,
  Trophy,
  Star,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RoundOneProfileProps {
  businessSlug: string;
}

export default function RoundOneProfile({ businessSlug }: RoundOneProfileProps) {
  const router = useRouter();

  const businessName = businessSlug
    ? businessSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Business";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-slate-500 hover:text-emerald-600 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Contest
          </button>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-[12px] text-emerald-700 font-medium border border-emerald-200">
              <Trophy size={12} />
              Round 1
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-[12px] text-amber-700 font-medium border border-amber-200">
              <Star size={12} />
              Open Qualifier
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header Card */}
        <div className="rounded-2xl border border-emerald-100 bg-white overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 px-8 py-10 text-white relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <Award size={12} />
                  Rising Star
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <Users size={12} />
                  Community Favorite
                </span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{businessName}</h1>
                  <p className="text-emerald-100 text-[14px] flex items-center gap-1.5">
                    <MapPin size={14} />
                    Indianapolis, IN
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95">
                    <ThumbsUp size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95">
                    <Bookmark size={18} />
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-8">
            <h2 className="text-[13px] font-semibold text-emerald-600 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Target size={14} />
              Qualifier Performance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100">
                <p className="text-[12px] text-emerald-600/70 font-medium mb-1">Current Score</p>
                <p className="text-2xl font-bold text-emerald-700">4,821</p>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1.5">
                  <TrendingUp size={12} />
                  +12.5% this round
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200">
                <p className="text-[12px] text-slate-500 font-medium mb-1">Current Rank</p>
                <p className="text-2xl font-bold text-slate-800">#3</p>
                <p className="text-[11px] text-slate-400 mt-1.5">Top 10% of participants</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <p className="text-[12px] text-blue-600/70 font-medium mb-1">Category</p>
                <p className="text-2xl font-bold text-blue-700 truncate">Professional Svcs</p>
                <p className="text-[11px] text-blue-500/60 mt-1.5">Industry verified</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-white border border-violet-100">
                <p className="text-[12px] text-violet-600/70 font-medium mb-1">Support Votes</p>
                <p className="text-2xl font-bold text-violet-700">1,247</p>
                <p className="text-[11px] text-violet-600 flex items-center gap-1 mt-1.5">
                  <Users size={12} />
                  +89 this week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Context Card */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Calendar className="size-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-slate-800 mb-1">
                Round 1 — Open Qualifier Round
              </h2>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Narrow the field and generate buzz. Top 60% advance based on community engagement.
                Every business starts here — build momentum through community votes, saves, and shares
                to secure your spot in the next round.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-emerald-500" />
                  100 Participants
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={13} className="text-emerald-500" />
                  Top 60 Advance
                </span>
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-emerald-500" />
                  100% Community Vote
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 mb-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-500" />
            Qualifier Metrics
          </h2>
          <div className="space-y-5">
            {[
              { label: "Community Engagement", value: 85, color: "bg-emerald-500" },
              { label: "Nomination Strength", value: 72, color: "bg-teal-500" },
              { label: "Market Potential", value: 90, color: "bg-emerald-400" },
              { label: "Brand Presence", value: 68, color: "bg-teal-400" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-slate-600">{metric.label}</span>
                  <span className="text-[13px] font-semibold text-slate-800">
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-emerald-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${metric.color}`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
            About {businessName}
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed">
            {businessName} is a standout participant in the Boss Beginnings Open Qualifier Round.
            With strong community support and a compelling business model, they have demonstrated
            exceptional potential in their category. Their commitment to innovation and community
            impact sets them apart as a top contender in this opening round.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Community Focused", "Innovative", "Scalable", "High Impact", "Local"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-emerald-50 text-[12px] text-emerald-700 font-medium border border-emerald-200"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}