"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Store,
  UploadCloud,
  X,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { getActiveSeasonRounds } from "@/Hooks/api/cms_api";
import {
  useContestantDetails,
  useGetAllBusinesses,
  useMyContestRounds,
  useSubmitRoundSubmission,
} from "@/Hooks/api/dashboard_api";

interface RoundAssetsSubmissionProps {
  /** Which round this form submits assets for (matches the round page). */
  roundNumber: number;
  /** Allow selecting multiple files at once (defaults to true). */
  multiple?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function PickerAvatar({ url, name }: { url?: string | null; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!url || failed) {
    return (
      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
        <Store className="w-4 h-4 text-blue-500" />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={name}
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-100 shrink-0"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RoundAssetsSubmission({
  roundNumber,
  multiple = true,
}: RoundAssetsSubmissionProps) {
  const {
    data: seasonData,
    isLoading: isSeasonLoading,
    isError: isSeasonError,
    refetch: refetchSeason,
  } = getActiveSeasonRounds();

  const rounds = seasonData?.data?.rounds ?? [];
  const round = rounds.find(
    (r: any) => r.round_number === roundNumber,
  ) ?? null;
  const roundId = round?.id ?? null;

  // Submission media rules for this round (from the backend round config).
  // Rounds that support video come back with a `video` rule (required +
  // max_duration_sec); rounds with document rules list their accepted formats.
  const videoRule = round?.submission_requirements?.video;
  const docRule = round?.submission_requirements?.document;
  const docFormats: string[] = Array.isArray(docRule?.formats)
    ? docRule.formats
    : [];
  const submissionType = String(round?.submission_type ?? "").toLowerCase();
  const videoAllowed =
    !!videoRule ||
    submissionType.includes("video") ||
    submissionType.includes("multi");

  // Build the file-picker accept string + helper label from the round rules.
  const acceptTypes = [
    "image/*",
    ...(videoAllowed ? ["video/*"] : []),
    ...docFormats,
  ].join(",");
  const formatLabel = [
    "PNG",
    "JPG",
    ...(videoAllowed ? ["MP4"] : []),
    ...docFormats.map(f => f.replace(/^.*\//, "").toUpperCase()),
  ].join(", ");
  const maxDurationSec = videoRule?.max_duration_sec ?? null;

  const {
    data: myRoundData,
    isLoading: isRoundLoading,
    isError: isRoundError,
    refetch: refetchRound,
  } = useMyContestRounds(roundId);
  const {
    data: myBizData,
    isLoading: isBizLoading,
    isError: isBizError,
  } = useGetAllBusinesses();

  // The logged-in user's own business ids (from /v1/businesses/list) so we can
  // pick their contestant entries out of the round's business list.
  const myBusinessIds = useMemo(() => {
    const biz = myBizData?.data?.businesses ?? [];
    return new Set(biz.map((b: any) => String(b.id)));
  }, [myBizData]);

  // The user's businesses that are ACTIVE contestants in this round — only
  // active contestants (in_round + current_status "active") can submit assets
  // for the round. (Eliminated businesses come back with in_round: false and
  // current_status: "eliminated".)
  const activeContestants = useMemo<Record<string, any>[]>(() => {
    const businesses: any[] = myRoundData?.data?.businesses ?? [];
    return businesses.filter(
      (b: any) =>
        myBusinessIds.has(String(b.business_id)) &&
        b?.in_round === true &&
        b?.current_status === "active",
    );
  }, [myRoundData, myBusinessIds]);

  // Selected contestant — with a picker when the user owns several active
  // businesses in the same round.
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedIdx = Math.min(selectedIndex, activeContestants.length - 1);
  const contestant = activeContestants[selectedIdx] ?? null;
  const showPicker = activeContestants.length > 1;

  // Already-submitted media for the selected contestant's current round.
  // The contestant profile endpoint returns `submission.media_urls` with any
  // photo/video already uploaded for this round.
  const { data: contestantDetailsData } = useContestantDetails(
    contestant?.contestant_id ?? null,
  );
  const submittedMedia: string[] =
    contestantDetailsData?.data?.contestant?.submission?.media_urls ?? [];
  const submittedAt: string | null =
    contestantDetailsData?.data?.contestant?.submission?.submitted_at ?? null;
  const submissionStatus: string | null =
    contestantDetailsData?.data?.contestant?.submission?.status ?? null;

  const queryClient = useQueryClient();

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { mutateAsync: submitRoundSubmission, isPending } =
    useSubmitRoundSubmission();

  // Keep the latest previews in a ref so the unmount cleanup doesn't capture a
  // stale (empty) array.
  const previewsRef = useRef<string[]>([]);
  useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);

  // Revoke object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      previewsRef.current.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    if (!multiple) {
      // Single-file mode: replace any previously selected file
      const url = URL.createObjectURL(selected[0]);
      setFiles(selected.slice(0, 1));
      setPreviews(prev => {
        prev.forEach(u => {
          if (u) URL.revokeObjectURL(u);
        });
        return [url];
      });
    } else {
      const newUrls = selected.map(file => URL.createObjectURL(file));
      setFiles(prev => [...prev, ...selected]);
      setPreviews(prev => [...prev, ...newUrls]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearAll = useCallback(() => {
    setFiles([]);
    setPreviews(prev => {
      prev.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
      return [];
    });
  }, []);

  const handleSave = async () => {
    if (!contestant || !roundId || files.length === 0) return;

    const fd = new FormData();
    fd.append("contestant_id", String(contestant.contestant_id));
    files.forEach(file => {
      fd.append("media_files[]", file);
    });

    await submitRoundSubmission(
      {
        endpoint: `/v1/contest/rounds/${roundId}/submissions`,
        data: fd,
      },
      {
        onSuccess: (res: any) => {
          if (res?.success) {
            clearAll();
            // Refresh the submitted-media section with the new uploads.
            queryClient.invalidateQueries({
              queryKey: ["contestant-details", contestant.contestant_id],
            });
          }
        },
      },
    );
  };

  const isLoading = isSeasonLoading || isRoundLoading || isBizLoading;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] flex items-center justify-center py-14">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="ml-3 text-sm text-slate-500">
          Loading submission details...
        </span>
      </div>
    );
  }

  if (isSeasonError) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-14 px-6">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <p className="text-sm text-slate-500">
          Could not load the round information.
        </p>
        <button
          type="button"
          onClick={() => refetchSeason()}
          className="mt-4 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Loader2 className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (isRoundError || isBizError) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-14 px-6">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <p className="text-sm text-slate-500">
          Could not load your round contestant details.
        </p>
        <button
          type="button"
          onClick={() => refetchRound()}
          className="mt-4 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Loader2 className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (!round) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-14">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <p className="text-sm text-slate-500">
          Round {roundNumber} is not available yet.
        </p>
      </div>
    );
  }

  if (!contestant) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] text-center py-14 px-6">
        <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
        <p className="text-sm text-slate-500">
          You are not an active contestant in this round.
        </p>
      </div>
    );
  }

  const isVideoUrl = (url: string) =>
    /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(url);

  const formatSubmittedDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-5">
      {/* Already-submitted media for this round */}
      {submittedMedia.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_2px_rgba(16,24,40,0.04)] p-4 md:p-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm md:text-base font-semibold text-slate-900">
                Submitted media
              </h3>
              <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                {formatSubmittedDate(submittedAt)}
                {submissionStatus ? ` • ${submissionStatus}` : ""}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Submitted
            </span>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {submittedMedia.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group"
              >
                {isVideoUrl(url) ? (
                  <video
                    src={url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={url}
                    alt={`Submitted media ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors"
                >
                  <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 rounded-full px-3 py-1.5 transition-opacity">
                    View full
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business picker (only when the user owns several businesses in this round) */}
      {showPicker && (
        <div>
          <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
            Select business<span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeContestants.map((b, idx) => {
              const selected = idx === selectedIdx;
              return (
                <button
                  key={b.contestant_id ?? b.business_id}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                    selected
                      ? "border-blue-400 bg-blue-50/60 ring-2 ring-blue-100"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <PickerAvatar
                    url={b.avatar_url}
                    name={b.business_name}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {b.business_name}
                    </p>
                    {b.owner_founder_name && (
                      <p className="text-xs text-slate-400 truncate">
                        {b.owner_founder_name}
                      </p>
                    )}
                  </div>
                  <CheckCircle2
                    className={`ml-auto w-4 h-4 shrink-0 transition-colors ${
                      selected ? "text-blue-500" : "text-slate-200"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submission info (only when there's nothing to pick) */}
      {!showPicker && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <p className="text-sm text-emerald-800">
            Submitting for{" "}
            <span className="font-semibold">{contestant.business_name}</span>
          </p>
        </div>
      )}

      {/* Photo/Video upload */}
      <div>
        <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
          Photo/Video<span className="text-red-500">*</span>
        </label>

        {files.length > 0 && (
          <div className="mb-4 grid grid-cols-3 md:grid-cols-4 gap-3">
            {files.map((file, idx) => {
              const previewUrl = previews[idx];
              return (
                <div
                  key={`${file.name}-${idx}`}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                >
                  {file.type.startsWith("video/") ? (
                    <video
                      src={previewUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs px-1 text-center">
                      {file.name}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <label
          htmlFor={`round-submission-${roundNumber}`}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl bg-white py-10 md:py-14 cursor-pointer hover:border-blue-300 transition-colors"
        >
          <UploadCloud className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
          <span className="text-sm md:text-base text-slate-600">
            {files.length > 0
              ? "Add more files"
              : "Click to upload image or video"}
          </span>
          <span className="text-xs md:text-sm text-slate-400">
            {formatLabel} up to 10MB
            {maxDurationSec
              ? ` — max ${maxDurationSec}s video`
              : ""}
            {multiple ? " — multiple files allowed" : ""}
          </span>
          <input
            id={`round-submission-${roundNumber}`}
            type="file"
            accept={acceptTypes}
            multiple={multiple}
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Save button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={isPending || files.length === 0}
        className="bg-blue-500 text-white text-sm md:text-base font-medium px-8 py-2.5 md:py-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
}
