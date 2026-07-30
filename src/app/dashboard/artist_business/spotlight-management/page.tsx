"use client";
import { Pagination } from "@/Components/Common/Pagination";
import { SpotlightRowSkeleton } from "@/Components/Loader/Loader";
import { getArtistSpotlights } from "@/Hooks/api/cms_api";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SpotlightStatus = "submitted" | "approved" | "rejected" | "pending";

interface SpotlightCategory {
  id: number;
  name: string;
  slug: string;
}

interface SpotlightApiItem {
  id: number;
  full_legal_name: string;
  artist_stage_name: string;
  category_name: string;
  category: SpotlightCategory;
  status: SpotlightStatus;
  duration: string | null;
  likes_count: number;
  submitted_at: string | null;
  created_at: string;
}

interface SpotlightsPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const statusStyles: Record<string, string> = {
  submitted: "bg-blue-50 text-blue-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-500",
  pending: "bg-amber-50 text-amber-500",
};

function StatusBadge({ status }: { status: SpotlightStatus }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 capitalize rounded-full text-xs md:text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

const columns = [
  "Name",
  "Category",
  "Duration",
  "Status",
  "Votes",
  "Date",
  "Actions",
];

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = getArtistSpotlights({ page });
  const spotlights: SpotlightApiItem[] = data?.data?.spotlights ?? [];
  const pagination: SpotlightsPagination | undefined = data?.data?.pagination;

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className=" bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            Spotlight history
          </h1>

          <Link
            href="/dashboard/artist_business/spotlight-management/create-spotlight"
            className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
          >
            Create
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
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
              {isLoading ? (
                <SpotlightRowSkeleton />
              ) : spotlights?.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-5 md:px-6 py-10 text-center text-sm md:text-base text-slate-500"
                  >
                    No spotlight submissions yet.
                  </td>
                </tr>
              ) : (
                spotlights.map(entry => (
                  <tr
                    key={entry.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-800 whitespace-nowrap">
                      {entry.full_legal_name || entry.artist_stage_name}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {entry.category_name}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {entry.duration ?? "—"}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-5 whitespace-nowrap">
                      <StatusBadge status={entry.status} />
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {entry.likes_count}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                      {formatDate(entry.submitted_at ?? entry.created_at)}
                    </td>
                    <td className="px-5 md:px-6 py-3.5 md:py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 md:gap-4">
                        <Link
                          href={`/dashboard/artist_business/spotlight-management/${entry.id}`}
                          title="View"
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </Link>

                        <Link
                          href={`/artist-spotlight?id=${entry.id}`}
                          title="Edit"
                          className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && pagination && pagination.last_page > 1 && (
          <div className="px-5 md:px-6 py-4 border-t border-slate-100">
            <Pagination
              currentPage={pagination.current_page}
              lastPage={pagination.last_page}
              // total={pagination.total}
              // perPage={pagination.per_page}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
