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
  Lightbulb,
  Sparkles,
  Palette,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RoundThreeProfileProps {
  businessSlug: string;
}

export default function RoundThreeProfile({ businessSlug }: RoundThreeProfileProps) {
  const router = useRouter();

  const businessName = businessSlug
    ? businessSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Business";

  return (
    <div className="min-h-screen bg-[#FAF6FF]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-slate-500 hover:text-purple-600 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Contest
          </button>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-[12px] text-purple-700 font-medium border border-purple-200">
              <Target size={12} />
              Round 3
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 text-[12px] text-violet-700 font-medium border border-violet-200">
              <Sparkles size={12} />
              Business Story Round
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header Card */}
        <div className="rounded-2xl border border-purple-100 bg-white overflow-hidden mb-6 shadow-sm">
          <div className="bg-gradient-to-br from-purple-600 via-violet-500 to-fuchsia-500 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.08]">
              <div className="absolute top-10 right-10 w-40 h-40 border-[20px] border-white rounded-full" />
              <div className="absolute bottom-10 left-10 w-32 h-32 border-[15px] border-white rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-[12px] border-white -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <Lightbulb size={12} />
                  Innovative Vision
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm">
                  <Sparkles size={12} />
                  Storyteller
                </span>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{businessName}</h1>
                  <p className="text-purple-100 text-[14px] flex items-center gap-1.5">
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
            <h2 className="text-[13px] font-semibold text-purple-600 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Sparkles size={14} />
              Story &amp; Pitch Performance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
                <p className="text-[12px] text-purple-600/70 font-medium mb-1">Pitch Score</p>
                <p className="text-2xl font-bold text-purple-700">8.9</p>
                <p className="text-[11px] text-purple-600 flex items-center gap-1 mt-1.5">
                  <TrendingUp size={12} />
                  +0.6 from last round
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-white border border-violet-100">
                <p className="text-[12px] text-violet-600/70 font-medium mb-1">Story Quality</p>
                <p className="text-2xl font-bold text-violet-700">9.2</p>
                <p className="text-[11px] text-violet-600 mt-1.5">Exceptional narrative</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-fuchsia-50 to-white border border-fuchsia-100">
                <p className="text-[12px] text-fuchsia-600/70 font-medium mb-1">Vision Clarity</p>
                <p className="text-2xl font-bold text-fuchsia-700">8.5</p>
                <p className="text-[11px] text-fuchsia-600 mt-1.5">Clear &amp; compelling</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-white border border-pink-100">
                <p className="text-[12px] text-pink-600/70 font-medium mb-1">Audience Score</p>
                <p className="text-2xl font-bold text-pink-700">8.7</p>
                <p className="text-[11px] text-pink-500/60 mt-1.5">Community rated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Context Card */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Palette className="size-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-slate-800 mb-1">
                Round 3 — Business Story Round
              </h2>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Identify businesses with clarity and vision. Submit a 1-page pitch or 2-minute video
                telling your story. Show your mission, your journey, and why your business matters.
                Top 12 advance based on pitch quality and community resonance.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-purple-500" />
                  30 Participants
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={13} className="text-purple-500" />
                  Top 12 Advance
                </span>
                <span className="flex items-center gap-1">
                  <Award size={13} className="text-purple-500" />
                  60% Community / 40% Panel
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pitch Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb size={18} className="text-purple-500" />
              Business Pitch
            </h2>
            <div className="rounded-xl bg-gradient-to-br from-purple-50 to-white p-5 border border-purple-100">
              <p className="text-[13px] text-slate-600 italic leading-relaxed">
                "We believe in creating spaces where communities connect. Our business started in a
                small garage with a big dream — to bring people together through quality products
                and genuine service. Today, we serve over 5,000 customers and growing."
              </p>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-purple-600 font-medium">
                <Sparkles size={12} />
                Pitch submitted Week 8
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Target size={18} className="text-purple-500" />
              Core Strengths
            </h2>
            <div className="space-y-3">
              {[
                { label: "Vision & Mission", value: 92, color: "bg-purple-500" },
                { label: "Storytelling", value: 88, color: "bg-violet-500" },
                { label: "Unique Value Prop", value: 85, color: "bg-fuchsia-500" },
                { label: "Market Differentiation", value: 78, color: "bg-pink-500" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-slate-600">{metric.label}</span>
                    <span className="text-[12px] font-semibold text-slate-800">{metric.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-purple-50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
            The Story of {businessName}
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed">
            {businessName} has crafted a compelling narrative that resonates with both the community
            and the OSI panel. Their journey from concept to thriving business showcases the
            resilience and innovation that the Boss Beginnings program celebrates.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Visionary", "Purpose-Driven", "Customer First", "Resilient"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-purple-50 text-[12px] text-purple-700 font-medium border border-purple-200"
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