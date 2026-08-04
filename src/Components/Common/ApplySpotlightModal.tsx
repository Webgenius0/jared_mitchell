"use client";
import { useState } from "react";
import { AlertTriangle, Calendar, CheckCircle2, Loader2 } from "lucide-react";
import {
  useApplySpotlightToWeek,
  useOpenSpotlightWeeks,
} from "@/Hooks/api/cms_api";
import { formatDate } from "@/helper/formatDate";
import Modal from "./Modal";

interface OpenWeek {
  id: number;
  week_number: number;
  year: number;
  status: string;
  is_accepting_applications: boolean;
  voting_starts_at: string | null;
  voting_ends_at: string | null;
}

interface ApplySpotlightModalProps {
  open: boolean;
  onClose: () => void;
  spotlightId: number;
  spotlightName: string;
  type: "artist" | "business";
}

const ApplySpotlightModal = ({
  open,
  onClose,
  spotlightId,
  spotlightName,
  type,
}: ApplySpotlightModalProps) => {
  const { data, isLoading, isError, refetch } = useOpenSpotlightWeeks(
    open && !!spotlightId,
  );
  const { mutateAsync: applySpotlight, isPending } =
    useApplySpotlightToWeek();
  const [applyingWeekId, setApplyingWeekId] = useState<number | null>(null);

  const weeks: OpenWeek[] = data?.data?.weeks ?? [];

  const handleApply = async (week: OpenWeek) => {
    setApplyingWeekId(week.id);
    try {
      await applySpotlight(
        {
          endpoint: `/v1/spotlight/weeks/${week.id}/apply`,
          data: {
            spotlightable_id: spotlightId,
            spotlightable_type: type,
          },
        },
        {
          onSuccess: () => onClose(),
        },
      );
    } catch {
      // Error is surfaced by the hook's toast — nothing else to do here.
    } finally {
      setApplyingWeekId(null);
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="!max-w-xl">
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-slate-900">Apply Spotlight</h3>
        <p className="text-sm text-slate-500 mt-1">
          Apply{" "}
          <span className="font-medium text-slate-700">{spotlightName}</span> to
          compete in a weekly spotlight competition.
        </p>

        <div className="mt-5 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="ml-3 text-sm text-slate-500">
                Loading open weeks...
              </span>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Could not load open weeks.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Please try again or check your connection.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Loader2 className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          ) : weeks.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                No open spotlight weeks right now.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Check back when a new week opens for applications.
              </p>
            </div>
          ) : (
            weeks.map(week => (
              <div
                key={week.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      Week {week.week_number} · {week.year}
                    </p>
                    {week.is_accepting_applications ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Accepting
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium">
                        Closed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Voting: {formatDate(week.voting_starts_at)} —{" "}
                    {formatDate(week.voting_ends_at)}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!week.is_accepting_applications || isPending}
                  onClick={() => handleApply(week)}
                  className="shrink-0 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isPending && applyingWeekId === week.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Applying...
                    </>
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ApplySpotlightModal;
