"use client";

import Link from "next/link";
import { Loader2, FileText, Users } from "lucide-react";
import { useActiveRoundSession } from "@/Hooks/api/cms_api";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatShortDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const CurrentSessionPage = () => {
  const { data: sessionData, isLoading, isSuccess } = useActiveRoundSession();

  // Extract session from possible API response paths
  const session =
    sessionData?.data?.data || sessionData?.data?.session || sessionData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-3 text-sm text-slate-500">
          Loading session details...
        </span>
      </div>
    );
  }

  if (!session || !isSuccess) {
    return (
      <div className="text-center py-24">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-sm text-slate-400">No active session found.</p>
      </div>
    );
  }

  // Requirements can come back as an array of strings or objects with a `question`/`label` field
  const requirements: string[] = Array.isArray(session.requirements)
    ? session.requirements.map((r: any) =>
        typeof r === "string" ? r : r?.question || r?.label || "",
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-5 md:px-8 md:py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Round {session.round_number ?? 1}
            </span>
            <h1 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">
              {session.title || "Untitled Session"}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Description */}
          {session.description && (
            <div>
              <h3 className="text-sm font-semibold text-blue-600 mb-2">
                Description:
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {session.description}
              </p>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div>
              <h4 className="text-sm font-semibold text-blue-600 mb-1">
                Start Date:
              </h4>
              <p className="text-sm text-slate-700">
                {formatShortDate(session.starts_at)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-600 mb-1">
                End Date:
              </h4>
              <p className="text-sm text-slate-700">
                {formatShortDate(session.ends_at)}
              </p>
            </div>
          </div>

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-blue-600 mb-2">
                Requirements:
              </h3>
              <ul className="space-y-2">
                {requirements.map((req, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-2 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      {/* <Link
        href="/dashboard/boss_beginning/listed-business"
        className="inline-flex items-center gap-2 font-medium px-10 py-3 rounded-full bg-primary-blue text-white hover:bg-blue-600 transition-colors"
      >
        List Business
      </Link> */}
    </div>
  );
};

export default CurrentSessionPage;
