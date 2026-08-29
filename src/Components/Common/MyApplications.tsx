"use client";
import { useState } from "react";
import { Pagination } from "@/Components/Common/Pagination";
import WithdrawApplicationModal from "@/Components/Common/WithdrawApplicationModal";
import {
  getMySpotlightApplications,
  useWithdrawSpotlightApplication,
} from "@/Hooks/api/cms_api";
import { formatDate } from "@/helper/formatDate";
import { AlertTriangle, Loader2, Send, Undo2 } from "lucide-react";
import Link from "next/link";

interface ApplicationWeek {
  id: number;
  week_number: number;
  year: number;
  status: string;
  voting_starts_at: string | null;
  voting_ends_at: string | null;
}

interface ApplicationSpotlightable {
  id: number;
  type: string;
  name: string;
  city: string;
  state: string;
  email: string;
  status: string;
}

interface ApplicationItem {
  id: number;
  spotlight_week_id: number;
  status: string;
  applied_at: string | null;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  week: ApplicationWeek;
  spotlightable: ApplicationSpotlightable;
}

interface ApplicationsPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

const appStatusStyles: Record<string, string> = {
  applied: "bg-blue-50 text-blue-600",
  pending: "bg-amber-50 text-amber-500",
  approved: "bg-emerald-50 text-emerald-600",
  selected: "bg-purple-50 text-purple-600",
  nominated: "bg-indigo-50 text-indigo-600",
  rejected: "bg-red-50 text-red-500",
  withdrawn: "bg-slate-100 text-slate-500",
};


function StatusBadge({ status }: { status: string }) {
  const style = appStatusStyles[(status || "").toLowerCase()];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 capitalize rounded-full text-xs md:text-sm font-medium ${
        style ?? "bg-slate-50 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

const MyApplications = ({ type }: { type: "artist" | "business" }) => {
  const isArtist = type === "artist";
  const [page, setPage] = useState(1);
  const [withdrawTarget, setWithdrawTarget] = useState<ApplicationItem | null>(
    null,
  );
  const { data, isLoading, isError } = getMySpotlightApplications({ page });
  const { mutateAsync: withdrawApplication, isPending: isWithdrawing } =
    useWithdrawSpotlightApplication();

  const allApplications: ApplicationItem[] =
    data?.data?.applications ?? [];
  const applications = allApplications.filter(
    entry => entry.spotlightable?.type === type,
  );
  const pagination: ApplicationsPagination | undefined = data?.data?.pagination;

  const columns = [
    "Spotlight",
    "Week",
    "Status",
    "Applied",
    "Reviewed",
    "Notes",
    "Actions",
  ];

  // Backend validates which statuses can be withdrawn — we only hide the
  // button for applications that are already withdrawn, selected, or rejected.
  const canWithdraw = (status: string) => {
    const s = (status || "").toLowerCase();
    return s !== "withdrawn" && s !== "selected" && s !== "rejected";
  };

  const confirmWithdraw = async () => {
    if (!withdrawTarget) return;
    try {
      await withdrawApplication(
        {
          endpoint: `/v1/spotlight/applications/${withdrawTarget.id}/withdraw`,
          data: {},
        },
        {
          onSuccess: () => setWithdrawTarget(null),
        },
      );
    } catch {
      // Error is surfaced by the hook's toast — nothing else to do here.
    }
  };

  const spotlightListPath = isArtist
    ? "/dashboard/artist_business/spotlight-management"
    : "/dashboard/boss_beginning/leaderboards";

  return (
    <div className="bg-white border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
        <div>
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            My Applications
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Every week your {type} spotlight was applied to, along with its
            review status.
          </p>
        </div>

        <Link
          href={spotlightListPath}
          className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
        >
          View Spotlights
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            <span className="ml-3 text-sm text-slate-500">
              Loading applications...
            </span>
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <p className="text-sm md:text-base text-slate-500">
              Could not load your applications.
            </p>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Please try again later.
            </p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20">
            <Send className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm md:text-base text-slate-500">
              No applications yet.
            </p>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Apply your spotlight from the Spotlight page to start competing.
            </p>
          </div>
        ) : (
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
              {applications.map(entry => (
                <tr
                  key={entry.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-800 whitespace-nowrap">
                    {entry.spotlightable?.name || "—"}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {entry.week
                      ? `Week ${entry.week.week_number} · ${entry.week.year}`
                      : "—"}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 whitespace-nowrap">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {formatDate(entry.applied_at)}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {formatDate(entry.reviewed_at)}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 max-w-[260px]">
                    <span
                      className="block truncate"
                      title={entry.reviewer_notes ?? ""}
                    >
                      {entry.reviewer_notes ?? "—"}
                    </span>
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 whitespace-nowrap">
                    {canWithdraw(entry.status) ? (
                      <button
                        type="button"
                        onClick={() => setWithdrawTarget(entry)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-200 text-red-500 text-xs md:text-sm font-medium hover:bg-red-50 transition-colors"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        Withdraw
                      </button>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && pagination && pagination.last_page > 1 && (
        <div className="px-5 md:px-6 py-4 border-t border-slate-100">
          <Pagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={(newPage: number) => setPage(newPage)}
          />
        </div>
      )}

      {/* Withdraw confirmation modal */}
      <WithdrawApplicationModal
        open={!!withdrawTarget}
        onClose={() => setWithdrawTarget(null)}
        spotlightName={withdrawTarget?.spotlightable?.name}
        weekLabel={
          withdrawTarget?.week
            ? `Week ${withdrawTarget.week.week_number} · ${withdrawTarget.week.year}`
            : undefined
        }
        isPending={isWithdrawing}
        onConfirm={confirmWithdraw}
      />
    </div>
  );
};

export default MyApplications;
