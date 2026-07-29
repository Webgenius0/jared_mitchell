"use client";

import React from "react";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { getBusinessSpotlights } from "@/Hooks/api/cms_api";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ApiSpotlight {
  id: number;
  business_name: string;
  owner_founder_name: string | null;
  business_category: string;
  year_founded: number | null;
  business_website: string;
  city: string;
  state: string;
  business_story: string;
  products_services: string;
  email: string;
  phone_number: string;
  service_type: string;
  service_type_label: string | null;
  why_featured: string;
  growth_vision: string;
  status: string;
  current_step: number;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  likes_count: number;
  bookmarks_count: number;
  shares_count: number;
}

interface SpotlightRow {
  id: number;
  businessName: string;
  ownerName: string;
  status: "Approved" | "Terminated" | "Pending";
  votes: number;
  date: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function mapStatus(apiStatus: string): "Approved" | "Terminated" | "Pending" {
  const s = apiStatus.toLowerCase();
  if (s === "approved" || s === "active") return "Approved";
  if (s === "terminated" || s === "rejected") return "Terminated";
  return "Pending";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function mapApiSpotlight(api: ApiSpotlight): SpotlightRow {
  return {
    id: api.id,
    businessName: api.business_name,
    ownerName: api.owner_founder_name || "—",
    status: mapStatus(api.status),
    votes: api.likes_count,
    date: formatDate(api.created_at),
  };
}

const statusStyles: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-600",
  Terminated: "bg-red-50 text-red-500",
  Pending: "bg-amber-50 text-amber-500",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${statusStyles[status] || "bg-slate-50 text-slate-500"}`}
    >
      {status}
    </span>
  );
}

const columns = ["Business", "Owner", "Status", "Votes", "Date", "Actions"];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const { data: apiData, isLoading } = getBusinessSpotlights();

  const spotlights: SpotlightRow[] =
    apiData?.data?.spotlights?.map(mapApiSpotlight) || [];

  const handleView = (s: SpotlightRow) => console.log("View", s);
  const handleEdit = (s: SpotlightRow) => console.log("Edit", s);
  const handleDelete = (s: SpotlightRow) => console.log("Delete", s);

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Spotlight history
          </h1>
          <Link href="/dashboard/boss_beginning/leaderboards/create-spotlights">
            <button
              type="button"
              className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
              <span className="ml-3 text-sm text-slate-500">
                Loading spotlights...
              </span>
            </div>
          ) : spotlights.length === 0 ? (
            <div className="text-center py-20 text-sm text-slate-400">
              No spotlights found.
            </div>
          ) : (
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  {columns.map(col => (
                    <th
                      key={col}
                      className="text-left text-xs md:text-sm font-medium text-slate-500 px-5 md:px-6 py-3 md:py-4 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {spotlights.map(s => (
                  <tr
                    key={s.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {s.businessName}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {s.ownerName}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {s.votes.toLocaleString()}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {s.date}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-3">
                        <button
                          type="button"
                          title="View"
                          onClick={() => handleView(s)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          onClick={() => handleEdit(s)}
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button>
                        {/* <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(s)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
