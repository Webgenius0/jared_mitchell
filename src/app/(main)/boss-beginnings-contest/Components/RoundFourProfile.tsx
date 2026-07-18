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
  Briefcase,
  BarChart3,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RoundFourProfileProps {
  businessSlug: string;
}

export default function RoundFourProfile({ businessSlug }: RoundFourProfileProps) {
  const router = useRouter();

  const businessName = businessSlug
    ? businessSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Business";

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-amber-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-slate-500 hover:text-amber-600 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Contest
          </button>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-[12px] text-amber-700 font-medium border border-amber-200">
              <Briefcase size={12} />
              Round 4
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-[12px] text-orange-700 font-medium border border-orange-200">
              <BarChart3 size={12} />
              Semi-Finals
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header Card */}
        <div className="rounded-2xl border border-amber-100 bg-white overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-br from-amber-600 via-orange-500 to-orange-400 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full" />
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white rounded-full" />
              <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <ShieldCheck size={12} />
                  Panel Approved
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <TrendingUp size={12} />
                  Top Contender
                </span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{businessName}</h1>
                  <p className="text-amber-100 text-[14px] flex items-center gap-1.5">
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
            <h2 className="text-[13px] font-semibold text-amber-600 uppercase tracking-wider mb-5 flex items-center gap-2">
              <BarChart3 size={14} />
              Semi-Finals Evaluation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                <p className="text-[12px] text-amber-600/70 font-medium mb-1">Panel Score</p>
                <p className="text-2xl font-bold text-amber-700">92</p>
                <p className="text-[11px] text-amber-600 flex items-center gap-1 mt-1.5">
                  <TrendingUp size={12} />
                  +5 pts this round
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-100">
                <p className="text-[12px] text-orange-600/70 font-medium mb-1">Business Score</p>
                <p className="text-2xl font-bold text-orange-700">88</p>
                <p className="text-[11px] text-orange-600 mt-1.5">Strong fundamentals</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                <p className="text-[12px] text-amber-600/70 font-medium mb-1">Growth Potential</p>
                <p className="text-2xl font-bold text-amber-700">A+</p>
                <p className="text-[11px] text-amber-600 mt-1.5">High scalability</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-100">
                <p className="text-[12px] text-orange-600/70 font-medium mb-1">Journey Score</p>
                <p className="text-2xl font-bold text-orange-700">90</p>
                <p className="text-[11px] text-orange-500/60 mt-1.5">Resilience &amp; growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Context Card */}
        <div className="rounded-2xl border border-amber-100 bg-white p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <Building2 className="size-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-slate-800 mb-1">
                Round 4 — Semi-Finals
              </h2>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                The OSI panel evaluates business models, growth potential, and operational readiness.
                This round filters for sustainable businesses with real potential. Top 6 advance to
                the final championship round.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-amber-500" />
                  15 Participants
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={13} className="text-amber-500" />
                  Top 6 Advance
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-amber-500" />
                  50% Community / 50% Panel
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Evaluation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-amber-500" />
              OSI Panel Evaluation
            </h2>
            <div className="space-y-4">
              {[
                { criterion: "Business Model Viability", score: 92, max: 100 },
                { criterion: "Market Opportunity", score: 88, max: 100 },
                { criterion: "Operational Readiness", score: 85, max: 100 },
                { criterion: "Scalability Potential", score: 90, max: 100 },
                { criterion: "Team & Leadership", score: 87, max: 100 },
              ].map((item) => (
                <div key={item.criterion}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-slate-600">{item.criterion}</span>
                    <span className="text-[12px] font-semibold text-slate-800">{item.score}/{item.max}</span>
                  </div>
                  <div className="w-full h-2 bg-amber-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-amber-500" />
              Business Journey
            </h2>
            <div className="space-y-4">
              {[
                { milestone: "Founded", date: "2019", detail: "Started with a clear mission" },
                { milestone: "First Hire", date: "2020", detail: "Grew from solo to team" },
                { milestone: "Break Even", date: "2021", detail: "Achieved profitability" },
                { milestone: "Expansion", date: "2023", detail: "Opened second location" },
                { milestone: "Boss Beginnings", date: "2025", detail: "Semi-Finalist" },
              ].map((item) => (
                <div key={item.milestone} className="flex items-center gap-4">
                  <div className="w-20 text-right">
                    <span className="text-[11px] font-mono font-semibold text-amber-600">{item.date}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[13px] font-medium text-slate-800">{item.milestone}</span>
                    <span className="text-[12px] text-slate-500 ml-2">— {item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
            {businessName}&apos;s Journey
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed">
            {businessName} has demonstrated exceptional business acumen and resilience throughout
            the competition. The OSI panel has evaluated their business model, growth trajectory,
            and operational readiness, ranking them among the top contenders in the semi-finals.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Scalable", "Sustainable", "Innovative", "Panel Favorite", "Investment Ready"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-amber-50 text-[12px] text-amber-700 font-medium border border-amber-200"
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