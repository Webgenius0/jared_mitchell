"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Award,
  Calendar,
  Share2,
  Bookmark,
  ThumbsUp,
} from "lucide-react";

interface RoundInfo {
  label: string;
  phase: string;
  description: string;
}

const ROUND_INFO: Record<string, RoundInfo> = {
  "round-1": {
    label: "Round 1",
    phase: "Open Qualifier Round",
    description:
      "Narrow the field and generate buzz. Top 60% advance based on community engagement.",
  },
  "round-2": {
    label: "Round 2",
    phase: "Community Impact Round",
    description:
      "Filter for meaning, not just popularity. Submit 3-5 bullet points or 60-90 second video.",
  },
  "round-3": {
    label: "Round 3",
    phase: "Innovation Showcase Round",
    description:
      "Demonstrate your unique value proposition and market differentiation.",
  },
  "round-4": {
    label: "Round 4",
    phase: "Expert Review Round",
    description:
      "Industry experts evaluate business models and growth potential.",
  },
  "round-5": {
    label: "Round 5",
    phase: "Final Championship",
    description:
      "Present your complete vision to judges and community for the grand prize.",
  },
};

export default function BusinessProfilePage() {
  const params = useParams();
  const router = useRouter();
  const round = params?.round as string;
  const businessSlug = params?.businessSlug as string;

  const roundInfo = ROUND_INFO[round] || {
    label: round?.replace("-", " ").toUpperCase() || "Unknown",
    phase: "General",
    description: "View business profile and performance data.",
  };

  const businessName = businessSlug
    ? businessSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Business";

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-black/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Contest
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EEF1F6] text-[12px] text-black/60">
              <Calendar size={12} />
              {roundInfo.label}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[12px] text-[#2563EB] font-medium">
              {roundInfo.phase}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Business Header Card */}
        <div className="rounded-2xl border border-black/10 bg-white overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-8 py-10 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium">
                    <Award size={12} />
                    Top Performer
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium">
                    <Star size={12} />
                    Rising Star
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-1">{businessName}</h1>
                <p className="text-white/80 text-[14px] flex items-center gap-1">
                  <MapPin size={14} />
                  Indianapolis, IN
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                  <ThumbsUp size={18} />
                </button>
                <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                  <Bookmark size={18} />
                </button>
                <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-[#EEF1F6]">
                <p className="text-[12px] text-black/50 mb-1">Current Score</p>
                <p className="text-2xl font-bold text-[#2563EB]">4,821</p>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} />
                  +12.5% this round
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#EEF1F6]">
                <p className="text-[12px] text-black/50 mb-1">Rank</p>
                <p className="text-2xl font-bold text-black">#3</p>
                <p className="text-[11px] text-black/40 mt-1">Top 10%</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EEF1F6]">
                <p className="text-[12px] text-black/50 mb-1">Category</p>
                <p className="text-2xl font-bold text-black">Professional Services</p>
                <p className="text-[11px] text-black/40 mt-1">Industry verified</p>
              </div>
              <div className="p-4 rounded-xl bg-[#EEF1F6]">
                <p className="text-[12px] text-black/50 mb-1">Support Votes</p>
                <p className="text-2xl font-bold text-[#2563EB]">1,247</p>
                <p className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1">
                  <Users size={12} />
                  +89 this week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Context */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-6">
          <h2 className="text-[18px] font-semibold text-black mb-1">
            {roundInfo.label} — {roundInfo.phase}
          </h2>
          <p className="text-[13px] text-black/60">{roundInfo.description}</p>
        </div>

        {/* Performance Trends */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 mb-6">
          <h2 className="text-[18px] font-semibold text-black mb-4">
            Performance Trends
          </h2>
          <div className="space-y-4">
            {[
              { label: "Community Engagement", value: 85, color: "bg-[#2563EB]" },
              { label: "Innovation Score", value: 72, color: "bg-emerald-500" },
              { label: "Market Potential", value: 90, color: "bg-[#F4A623]" },
              { label: "Brand Presence", value: 68, color: "bg-[#EA6B2E]" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] text-black/70">{metric.label}</span>
                  <span className="text-[13px] font-semibold text-black">
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#EEF1F6] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${metric.color}`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About / Highlights */}
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="text-[18px] font-semibold text-black mb-3">
            About {businessName}
          </h2>
          <p className="text-[13px] text-black/60 leading-relaxed">
            {businessName} is a standout participant in the Boss Beginnings{" "}
            {roundInfo.phase}. With strong community support and a compelling
            business model, they have demonstrated exceptional potential in their
            category. Their commitment to innovation and community impact sets
            them apart as a top contender this round.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Community Focused", "Innovative", "Scalable", "High Impact"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#EEF1F6] text-[12px] text-black/60"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
}
