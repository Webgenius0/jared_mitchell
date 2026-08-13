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
  useUpdateRoundSubmission,
} from "@/Hooks/api/dashboard_api";
import {
  clearCachedRoundSubmission,
  getCachedRoundSubmission,
  setCachedRoundSubmission,
} from "@/lib/localStorage";

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

  // Contestant id used to load the submission/profile. The my-rounds payload
  // names it `contestant_id` (see CurrentRoundBusinessList); some payloads
  // nest it under `contestant.id` instead, so fall back along that chain.
  const contestantId: number | null =
    contestant?.contestant_id ??
    contestant?.contestant?.id ??
    contestant?.id ??
    null;

  // Already-submitted media for the selected contestant's current round.
  // The contestant profile endpoint
  // (GET /v1/contest/contestants/:contestant_id, already integrated) returns
  // `data.contestant.submission` with `id`, `media_urls` / `media_full_urls`
  // and `submitted_at`. The round's business item may also embed a submission,
  // so fall back to it when the profile call yields nothing.
  //
  // After a hard refresh the contestant-details request can come back as a
  // 302 redirect (the backend answers stale/expired sessions with a redirect
  // to login instead of JSON), leaving no submission data. To keep the
  // existing video as the default value we mirror the last-known submission
  // into localStorage and restore it here when the live request yields nothing.
  const { data: contestantDetailsData } = useContestantDetails(contestantId);

  // Synchronously restored cache — shows the previous upload immediately,
  // even on the very first render after a refresh (no flash of "no video").
  // Scoped by (roundId, contestantId): a contestant has a separate submission
  // per round, so the round-2 cache must never leak into round 3.
  const cachedSubmission = useMemo(
    () => getCachedRoundSubmission(roundId, contestantId),
    [roundId, contestantId],
  );

  const liveSubmission =
    contestantDetailsData?.data?.contestant?.submission ??
    contestant?.submission ??
    null;

  // Prefer the live response; fall back to the cached copy when the request
  // got redirected (302) and returned no JSON.
  const submission = liveSubmission ?? cachedSubmission ?? null;
  const submissionId: number | null = submission?.id ?? null;
  const submittedMedia: string[] =
    submission?.media_full_urls?.length > 0
      ? submission.media_full_urls
      : (submission?.media_urls ?? []);
  const submittedAt: string | null = submission?.submitted_at ?? null;

  // Keep the cache in sync: whenever the API returns a real submission, save
  // it; whenever it definitively says there is none, drop the stale copy.
  useEffect(() => {
    if (!roundId || !contestantId) return;
    const hasMedia =
      liveSubmission?.media_urls?.length > 0 ||
      liveSubmission?.media_full_urls?.length > 0;
    if (hasMedia) {
      setCachedRoundSubmission(roundId, contestantId, liveSubmission);
    } else if (
      contestantDetailsData?.data?.contestant &&
      !contestantDetailsData.data.contestant.submission?.media_urls?.length &&
      !contestantDetailsData.data.contestant.submission?.media_full_urls?.length
    ) {
      clearCachedRoundSubmission(roundId, contestantId);
    }
  }, [roundId, contestantId, liveSubmission, contestantDetailsData]);

  // A submission already exists when the backend returned media for it (this
  // is what drives the default preview + update mode).
  const hasSubmission = submittedMedia.length > 0;
  // The update endpoint needs the submission id — without one we can only
  // fall back to the create endpoint.
  const canUpdate = hasSubmission && !!submissionId;

  const queryClient = useQueryClient();

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const { mutateAsync: submitRoundSubmission, isPending } =
    useSubmitRoundSubmission();
  const { mutateAsync: updateRoundSubmission, isPending: isUpdating } =
    useUpdateRoundSubmission();

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
    if (!contestantId || !roundId || files.length === 0) return;

    const fd = new FormData();
    fd.append("contestant_id", String(contestantId));
    files.forEach(file => {
      fd.append("media_files[]", file);
    });

    // Existing submission (with an id) → update it; otherwise create a new one.
    const endpoint = canUpdate
      ? `/v1/contest/rounds/${roundId}/submissions/${submissionId}/update`
      : `/v1/contest/rounds/${roundId}/submissions`;
    const mutate = canUpdate ? updateRoundSubmission : submitRoundSubmission;

    await mutate(
      {
        endpoint,
        data: fd,
      },
      {
        onSuccess: (res: any) => {
          if (res?.success) {
            clearAll();
            // Refresh the submitted-media section with the new uploads.
            queryClient.invalidateQueries({
              queryKey: ["contestant-details", contestantId],
            });
            // Best-effort: persist the fresh submission returned by the API
            // so the default value survives the next refresh even if the
            // details request gets redirected again.
            const freshSubmission = res?.data?.submission ?? res?.submission;
            const freshMedia = freshSubmission?.media_full_urls?.length
              ? freshSubmission.media_full_urls
              : (freshSubmission?.media_urls ?? []);
            if (freshSubmission && freshMedia.length > 0) {
              setCachedRoundSubmission(roundId, contestantId, freshSubmission);
            }
          }
        },
      },
    );
  };

  const isSaving = isPending || isUpdating;

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
          The round is not available yet. Please check back later.
        </p>
        {/* <button
          type="button"
          onClick={() => refetchSeason()}
          className="mt-4 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Loader2 className="w-3.5 h-3.5" />
          Retry
        </button> */}
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
                  <PickerAvatar url={b.avatar_url} name={b.business_name} />
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
            {hasSubmission ? "Updating submission for " : "Submitting for "}
            <span className="font-semibold">{contestant.business_name}</span>
          </p>
        </div>
      )}

      {/* Photo/Video upload — always shown, like a new-video upload. If the
          user already submitted, the existing video appears as the default
          value and can be replaced with a new upload. */}
      <div>
        <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
          Photo/Video
          {!hasSubmission && <span className="text-red-500">*</span>}
        </label>

        {hasSubmission && (
          <div className="mb-4 flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Submission already exists — this is your current video
                {submittedAt
                  ? ` (submitted ${formatSubmittedDate(submittedAt)})`
                  : ""}
                .
              </p>
              <p className="text-xs text-blue-700/80 mt-0.5">
                Upload a new video below to replace it, or leave it as is.
              </p>
            </div>
          </div>
        )}

        <div className="mb-4 grid grid-cols-3 md:grid-cols-4 gap-3">
          {/* Current submission shown as the default value until a new file is chosen */}
          {hasSubmission &&
            files.length === 0 &&
            submittedMedia.map((url, idx) => (
              <div
                key={`current-${url}-${idx}`}
                className="relative aspect-square rounded-xl overflow-hidden border-2 border-blue-200 bg-slate-50 group"
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
                    alt={`Current submission ${idx + 1}`}
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
                <span className="absolute bottom-1 left-1 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-white/90 rounded-full px-2 py-0.5">
                  <CheckCircle2 className="w-3 h-3 text-blue-500" />
                  Current
                </span>
              </div>
            ))}

          {/* Newly chosen files */}
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
                    muted
                    playsInline
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

        {/* Confirmation once a new file is chosen to replace the current one */}
        {hasSubmission && files.length > 0 && (
          <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            New video selected — this will replace your current video on save
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
              : hasSubmission
                ? "Click to choose a new video"
                : "Click to upload image or video"}
          </span>
          <span className="text-xs md:text-sm text-slate-400">
            {hasSubmission && files.length === 0
              ? "Current video shown above — upload a new one to replace it"
              : `${formatLabel} up to 10MB${
                  maxDurationSec ? ` — max ${maxDurationSec}s video` : ""
                }${multiple ? " — multiple files allowed" : ""}`}
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

      {/* Save button — "Update Submission" when a submission already exists,
          "Save" for a brand-new submission */}
      <div className="flex flex-col items-end gap-1.5">
        {canUpdate && files.length === 0 && (
          <p className="text-xs text-slate-400">
            Choose a new video above to enable "Update Submission".
          </p>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || files.length === 0}
          className="bg-blue-500 text-white text-sm md:text-base font-medium px-8 py-2.5 md:py-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {canUpdate ? "Updating..." : "Submitting..."}
            </>
          ) : canUpdate ? (
            "Update Submission"
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
