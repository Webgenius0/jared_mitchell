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
  Heart,
  Zap,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RoundTwoProfileProps {
  businessSlug: string;
}

export default function RoundTwoProfile({ businessSlug }: RoundTwoProfileProps) {
  const router = useRouter();

  const businessName = businessSlug
    ? businessSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Business";

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-slate-500 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Contest
          </button>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[12px] text-blue-700 font-medium border border-blue-200">
              <Zap size={12} />
              Round 2
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-[12px] text-teal-700 font-medium border border-teal-200">
              <Activity size={12} />
              Momentum Round
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header Card */}
        <div className="rounded-2xl border border-blue-100 bg-white overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="absolute top-0 right-0 w-72 h-72" viewBox="0 0 200 200">
                <path d="M 0 100 C 40 40, 160 40, 200 100 C 160 160, 40 160, 0 100" fill="white" />
              </svg>
              <svg className="absolute bottom-0 left-0 w-56 h-56" viewBox="0 0 200 200">
                <path d="M 100 0 C 150 50, 200 150, 100 200 C 0 150, 50 50, 100 0" fill="white" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <TrendingUp size={12} />
                  Gaining Momentum
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <Heart size={12} />
                  Community Builder
                </span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{businessName}</h1>
                  <p className="text-blue-100 text-[14px] flex items-center gap-1.5">
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
            <h2 className="text-[13px] font-semibold text-blue-600 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Activity size={14} />
              Momentum Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <p className="text-[12px] text-blue-600/70 font-medium mb-1">Community Score</p>
                <p className="text-2xl font-bold text-blue-700">3,458</p>
                <p className="text-[11px] text-blue-600 flex items-center gap-1 mt-1.5">
                  <TrendingUp size={12} />
                  +18.3% this round
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100">
                <p className="text-[12px] text-cyan-600/70 font-medium mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold text-cyan-700">92%</p>
                <p className="text-[11px] text-cyan-600 mt-1.5 flex items-center gap-1">
                  <Users size={12} />
                  Highly engaged
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-teal-50 to-white border border-teal-100">
                <p className="text-[12px] text-teal-600/70 font-medium mb-1">Supporters</p>
                <p className="text-2xl font-bold text-teal-700">847</p>
                <p className="text-[11px] text-teal-600 mt-1.5 flex items-center gap-1">
                  <Heart size={12} />
                  +124 this week
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
                <p className="text-[12px] text-indigo-600/70 font-medium mb-1">Momentum Rank</p>
                <p className="text-2xl font-bold text-indigo-700">#5</p>
                <p className="text-[11px] text-indigo-500/60 mt-1.5">Top 15% overall</p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Context Card */}
        <div className="rounded-2xl border border-blue-100 bg-white p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Zap className="size-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-slate-800 mb-1">
                Round 2 — Community Impact Round
              </h2>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Filter for meaning, not just popularity. Businesses demonstrate how they serve their
                community through impact stories. Submit bullet points or a short video. Top 30 advance
                based on impact and community engagement.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-blue-500" />
                  60 Participants
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={13} className="text-blue-500" />
                  Top 30 Advance
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={13} className="text-blue-500" />
                  70% Community Vote
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="rounded-2xl border border-blue-100 bg-white p-6 mb-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <Heart size={18} className="text-blue-500" />
            Community Impact Score
          </h2>
          <div className="space-y-5">
            {[
              { label: "Community Reach", value: 88, color: "bg-blue-500" },
              { label: "Impact Story", value: 75, color: "bg-cyan-500" },
              { label: "Local Engagement", value: 92, color: "bg-teal-500" },
              { label: "Social Proof", value: 70, color: "bg-indigo-500" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-slate-600">{metric.label}</span>
                  <span className="text-[13px] font-semibold text-slate-800">
                    {metric.value}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-blue-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${metric.color}`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-4">
            Community Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Heart, label: "Community Impact", desc: "Supports local youth programs and education initiatives" },
              { icon: Users, label: "Customer Love", desc: "4.9 stars from 200+ verified customer reviews" },
              { icon: Award, label: "Local Recognition", desc: "Featured in Indianapolis Business Journal 2024" },
              { icon: TrendingUp, label: "Growth Story", desc: "Expanded from 2 to 15 employees in 2 years" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <item.icon className="size-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-[14px] font-medium text-slate-800">{item.label}</h4>
                  <p className="text-[12px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}