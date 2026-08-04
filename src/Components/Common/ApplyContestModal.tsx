"use client";
import { useMemo } from "react";
import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import {
  getMyContestApplications,
  useActiveRoundSession,
  useApplyToContest,
} from "@/Hooks/api/cms_api";
import { formatDate } from "@/helper/formatDate";
import Modal from "./Modal";

interface ApplyContestModalProps {
  open: boolean;
  onClose: () => void;
  businessId: string | number;
  businessName: string;
}

const sessionStatusStyles: Record<string, string> = {
  draft: "bg-slate-100 text-slate-500",
  accepting_applications: "bg-emerald-50 text-emerald-600",
  in_progress: "bg-blue-50 text-blue-600",
  completed: "bg-purple-50 text-purple-600",
  cancelled: "bg-red-50 text-red-500",
};

function sessionStatusBadge(status: string) {
  const style = sessionStatusStyles[(status || "").toLowerCase()];
  return (
    <span
      className={`inline-flex items-center px-3 py-1 capitalize rounded-full text-xs md:text-sm font-medium ${
        style ?? "bg-slate-50 text-slate-500"
      }`}
    >
      {status || "—"}
    </span>
  );
}

const ApplyContestModal = ({
  open,
  onClose,
  businessId,
  businessName,
}: ApplyContestModalProps) => {
  const { data: sessionData, isLoading, isError, refetch } =
    useActiveRoundSession();
  const { data: myAppsData } = getMyContestApplications();
  const { mutateAsync: applyToContest, isPending } = useApplyToContest();

  const session =
    sessionData?.data?.data || sessionData?.data?.session || sessionData?.data;

  // Hide the apply button if this business already has a live application
  // (anything except withdrawn/rejected) for the current session.
  const alreadyApplied = useMemo(() => {
    if (!session || !myAppsData) return false;
    const apps = myAppsData?.data?.applications ?? [];
    return apps.some(
      (app: any) =>
        String(app?.business_id) === String(businessId) &&
        app?.season_id === session?.id &&
        !["withdrawn", "rejected"].includes((app?.status || "").toLowerCase()),
    );
  }, [session, myAppsData, businessId]);

  const handleApply = async () => {
    if (!session) return;
    try {
      await applyToContest(
        {
          data: {
            season_id: session.id,
            business_id: Number(businessId),
          },
        },
        {
          onSuccess: () => onClose(),
        },
      );
    } catch {
      // Error is surfaced by the hook's toast — nothing else to do here.
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="!max-w-xl">
      <div className="pt-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Apply to Contest
        </h3>
        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-slate-700">{businessName}</span>
        </p>

        <div className="mt-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              <span className="ml-3 text-sm text-slate-500">
                Loading session...
              </span>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Could not load the current session.
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
          ) : !session ? (
            <div className="text-center py-12">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                No active session is accepting applications right now.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Check back when a new session opens for applications.
              </p>
            </div>
          ) : alreadyApplied ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
              <p className="text-sm md:text-base font-medium text-slate-700">
                Already applied
              </p>
              <p className="text-sm text-slate-500 mt-1">
                This business is already applied to{" "}
                <span className="font-medium text-slate-700">
                  {session.title}
                </span>
                .
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {session.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {session.description}
                  </p>
                </div>
                {sessionStatusBadge(session.status)}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Applications open</p>
                  <p className="text-slate-700 mt-0.5">
                    {formatDate(session.applications_starts_at)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Applications close</p>
                  <p className="text-slate-700 mt-0.5">
                    {formatDate(session.applications_ends_at)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Contest starts</p>
                  <p className="text-slate-700 mt-0.5">
                    {formatDate(session.starts_at)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Contest ends</p>
                  <p className="text-slate-700 mt-0.5">
                    {formatDate(session.ends_at)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={handleApply}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Apply to this session
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ApplyContestModal;
