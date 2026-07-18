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
  Crown,
  Trophy,
  Flame,
  Medal,
  Star,
  Gem,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface RoundFiveProfileProps {
  businessSlug: string;
}

export default function RoundFiveProfile({ businessSlug }: RoundFiveProfileProps) {
  const router = useRouter();

  const businessName = businessSlug
    ? businessSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Business";

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-yellow-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[14px] text-slate-500 hover:text-amber-600 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Contest
          </button>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 text-[12px] text-amber-700 font-medium border border-yellow-200 shadow-sm">
              <Crown size={12} className="text-amber-500" />
              Round 5
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 text-[12px] text-orange-700 font-medium border border-amber-200 shadow-sm">
              <Trophy size={12} className="text-orange-500" />
              Finals
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header Card */}
        <div className="rounded-2xl border border-yellow-200 bg-white overflow-hidden mb-6 shadow-lg shadow-yellow-200/30">
          <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 px-8 py-12 text-white relative overflow-hidden">
            {/* Championship glow effect */}
            <div className="absolute inset-0">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full opacity-20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-300 rounded-full opacity-20 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-amber-300 rounded-full opacity-10 blur-2xl -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* Decorative stars */}
            <div className="absolute inset-0 opacity-[0.08]">
              <Star className="absolute top-8 left-12 size-6 fill-white" />
              <Star className="absolute top-16 right-20 size-4 fill-white" />
              <Star className="absolute bottom-12 left-24 size-5 fill-white" />
              <Star className="absolute bottom-20 right-12 size-3 fill-white" />
            </div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm border border-white/30">
                  <Crown size={14} />
                  Finalist
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 text-[12px] font-medium backdrop-blur-sm border border-white/30">
                  <Trophy size={14} />
                  Championship Contender
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{businessName}</h1>
              <p className="text-amber-100 text-[14px] flex items-center justify-center gap-1.5">
                <MapPin size={14} />
                Indianapolis, IN
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
                  <ThumbsUp size={18} />
                </button>
                <button className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
                  <Bookmark size={18} />
                </button>
                <button className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-8">
            <h2 className="text-[13px] font-semibold text-amber-600 uppercase tracking-wider mb-5 flex items-center justify-center gap-2">
              <Trophy size={14} />
              Championship Scoreboard
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 text-center">
                <p className="text-[12px] text-amber-600/70 font-medium mb-1">Final Score</p>
                <p className="text-3xl font-bold text-amber-700">96</p>
                <p className="text-[11px] text-amber-600 flex items-center justify-center gap-1 mt-1.5">
                  <TrendingUp size={12} />
                  +4 pts this round
                </p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 text-center">
                <p className="text-[12px] text-yellow-600/70 font-medium mb-1">OSI Rating</p>
                <p className="text-3xl font-bold text-yellow-700">9.8</p>
                <p className="text-[11px] text-yellow-600 mt-1.5">Exceptional experience</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-200 text-center">
                <p className="text-[12px] text-orange-600/70 font-medium mb-1">Experience Score</p>
                <p className="text-3xl font-bold text-orange-700">98</p>
                <p className="text-[11px] text-orange-600 mt-1.5">Customer delight</p>
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 text-center">
                <p className="text-[12px] text-amber-600/70 font-medium mb-1">Final Rank</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-3xl font-bold text-amber-700">#1</p>
                  <Gem className="size-6 text-amber-500" />
                </div>
                <p className="text-[11px] text-amber-600 mt-1.5">Championship leader</p>
              </div>
            </div>
          </div>
        </div>

        {/* Round Context Card */}
        <div className="rounded-2xl border border-yellow-200 bg-white p-6 mb-6 shadow-lg shadow-yellow-200/20">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center shrink-0 border border-yellow-200">
              <Crown className="size-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-slate-800 mb-1">
                Round 5 — Final Championship
              </h2>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                The ultimate round. OSI experiences each finalist firsthand by purchasing a product
                or service. Evaluations are based on communication, quality, delivery, and overall
                customer experience. The highest combined score wins the Boss Beginnings title.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[12px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users size={13} className="text-amber-500" />
                  8 Finalists
                </span>
                <span className="flex items-center gap-1">
                  <Trophy size={13} className="text-amber-500" />
                  1 Winner
                </span>
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-amber-500" />
                  OSI Customer Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OSI Customer Experience Evaluation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-lg shadow-yellow-200/20">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Flame size={18} className="text-amber-500" />
              OSI Experience Evaluation
            </h2>
            <div className="space-y-4">
              {[
                { criterion: "Communication", score: 98, detail: "Prompt, professional responses" },
                { criterion: "Product/Service Quality", score: 96, detail: "Exceeded expectations" },
                { criterion: "Delivery & Execution", score: 95, detail: "On time, flawless" },
                { criterion: "Professionalism", score: 97, detail: "Exceptional service" },
              ].map((item) => (
                <div key={item.criterion}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-slate-600">{item.criterion}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[12px] text-amber-600 font-semibold">{item.score}%</span>
                      <span className="text-[11px] text-slate-400">{item.detail}</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-amber-50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-lg shadow-yellow-200/20">
            <h2 className="text-[16px] font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Medal size={18} className="text-amber-500" />
              Championship Standings
            </h2>
            <div className="space-y-3">
              {[
                { rank: 1, name: businessName, score: "96.2", highlight: true },
                { rank: 2, name: "Business Two", score: "93.8", highlight: false },
                { rank: 3, name: "Business Three", score: "91.5", highlight: false },
              ].map((finalist) => (
                <div
                  key={finalist.rank}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                    finalist.highlight
                      ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 shadow-sm"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    finalist.rank === 1 ? "bg-amber-400 text-white" :
                    finalist.rank === 2 ? "bg-slate-400 text-white" :
                    "bg-orange-400 text-white"
                  }`}>
                    #{finalist.rank}
                  </div>
                  <div className="flex-1">
                    <span className={`text-[13px] font-medium ${
                      finalist.highlight ? "text-amber-800" : "text-slate-600"
                    }`}>
                      {finalist.name}
                    </span>
                  </div>
                  <div className={`text-[14px] font-bold ${
                    finalist.highlight ? "text-amber-700" : "text-slate-500"
                  }`}>
                    {finalist.score}
                  </div>
                  {finalist.highlight && (
                    <Crown size={16} className="text-amber-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl border border-yellow-200 bg-white p-6 shadow-lg shadow-yellow-200/20">
          <h2 className="text-[16px] font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Award size={18} className="text-amber-500" />
            Why {businessName} Deserves the Crown
          </h2>
          <p className="text-[13px] text-slate-500 leading-relaxed">
            {businessName} has demonstrated exceptional performance across all rounds of the Boss
            Beginnings competition. From community engagement to business storytelling, and now to
            the final OSI customer experience evaluation — they have proven that they have what it
            takes to be crowned the champion.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Champion Material", "Community Loved", "Quality Focused", "Investment Ready", "Future Leader"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 text-[12px] text-amber-700 font-medium border border-amber-200 shadow-sm"
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