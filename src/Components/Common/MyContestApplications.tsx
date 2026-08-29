"use client";
import { useState } from "react";
import WithdrawApplicationModal from "@/Components/Common/WithdrawApplicationModal";
import {
  getMyContestApplications,
  useWithdrawContestApplication,
} from "@/Hooks/api/cms_api";
import { formatDate } from "@/helper/formatDate";
import { AlertTriangle, Loader2, Send, Undo2 } from "lucide-react";
import Link from "next/link";

interface ContestApplicationBusiness {
  id: number;
  business_name: string;
  owner_founder_name: string | null;
}

interface ContestApplicationSeason {
  id: number;
  contest_type: string;
  title: string;
  status: string;
}

interface ContestApplication {
  id: number;
  business_id: number;
  season_id: number;
  status: string;
  ai_verdict: string | null;
  admin_note: string | null;
  rejected_reason: string | null;
  created_at: string;
  approved_at: string | null;
  business: ContestApplicationBusiness;
  season: ContestApplicationSeason;
}

const appStatusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-500",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-500",
  withdrawn: "bg-slate-100 text-slate-500",
  under_review: "bg-blue-50 text-blue-600",
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

const MyContestApplications = () => {
  const [withdrawTarget, setWithdrawTarget] =
    useState<ContestApplication | null>(null);
  const { data, isLoading, isError } = getMyContestApplications();
  const { mutateAsync: withdrawApplication, isPending: isWithdrawing } =
    useWithdrawContestApplication();

  const applications: ContestApplication[] =
    data?.data?.applications ?? [];

  const columns = [
    "Business",
    "Season",
    "Status",
    "Applied",
    "Approved",
    "Notes",
    "Actions",
  ];

  const canWithdraw = (status: string) => {
    const s = (status || "").toLowerCase();
    return s !== "withdrawn" && s !== "rejected";
  };

  const confirmWithdraw = async () => {
    if (!withdrawTarget) return;
    try {
      await withdrawApplication(
        {
          endpoint: `/v1/contest-applications/${withdrawTarget.id}/withdraw`,
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

  return (
    <div className="bg-white border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5">
        <div>
          <h1 className="text-base md:text-lg font-semibold text-slate-900">
            My Contest Applications
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Every season your business applied to, along with its review status.
          </p>
        </div>

        <Link
          href="/dashboard/boss_beginning/business"
          className="bg-blue-500 text-white text-xs md:text-sm font-medium px-5 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-blue-600 transition-colors"
        >
          View Businesses
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
              No contest applications yet.
            </p>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Apply your business to the current session to start competing.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[860px] border-collapse">
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
                    {entry.business?.business_name || "—"}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap max-w-[260px]">
                    <span className="block truncate" title={entry.season?.title}>
                      {entry.season?.title || "—"}
                    </span>
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 whitespace-nowrap">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {formatDate(entry.created_at)}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 whitespace-nowrap">
                    {formatDate(entry.approved_at)}
                  </td>
                  <td className="px-5 md:px-6 py-3.5 md:py-5 text-sm md:text-base text-slate-600 max-w-[240px]">
                    <span
                      className="block truncate"
                      title={
                        entry.rejected_reason || entry.admin_note || undefined
                      }
                    >
                      {entry.rejected_reason || entry.admin_note || "—"}
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

      {/* Withdraw confirmation modal */}
      <WithdrawApplicationModal
        open={!!withdrawTarget}
        onClose={() => setWithdrawTarget(null)}
        spotlightName={withdrawTarget?.business?.business_name}
        weekLabel={withdrawTarget?.season?.title}
        isPending={isWithdrawing}
        onConfirm={confirmWithdraw}
      />
    </div>
  );
};

export default MyContestApplications;
