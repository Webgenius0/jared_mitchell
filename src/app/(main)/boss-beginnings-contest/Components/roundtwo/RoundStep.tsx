"use client";

import React, { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { submitRoundVotes } from "@/lib/Services/cms_service";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

type Tag = {
  label: string;
  position: number;
};

type Question = {
  title: string;
  tags: Tag[];
};

const QUESTIONS: Question[] = [
  {
    title: "Did the contestant successfully complete this challenge?",
    tags: [
      { label: "Prepration", position: 1 },
      { label: "Execution", position: 4 },
      { label: "Result", position: 6 },
      { label: "Overall performance", position: 9 },
    ],
  },
  {
    title: "Did this feel genuine?",
    tags: [
      { label: "Honest", position: 1 },
      { label: "Personal", position: 4 },
      { label: "Passionate", position: 6 },
      { label: "Real", position: 9 },
    ],
  },
  {
    title: "How unique or memorable was their approach?",
    tags: [
      { label: "Orginal", position: 1 },
      { label: "Intersting", position: 4 },
      { label: "Innovative", position: 6 },
      { label: "Engaging", position: 9 },
    ],
  },
  {
    title: "How unique or memorable was their approach?",
    tags: [
      { label: "Did the pitch convince you?", position: 1 },
      { label: "Did the community project inspire you?", position: 4 },
      { label: "Did the fundraiser make a difference?", position: 6 },
      { label: "Did the business impress you?", position: 9 },
    ],
  },
  {
    title: '"Overall, how well did this contestant perform in this challenge?"',
    tags: [{ label: "How It Applies", position: 1 }],
  },
];

const SCALE = Array.from({ length: 10 }, (_, i) => i + 1);

interface RatingRowProps {
  question: Question;
  selected?: number;
  onSelect: (value: number) => void;
}

const RatingRow = ({ question, selected, onSelect }: RatingRowProps) => {
  const tagByPosition = new Map(question.tags.map(t => [t.position, t]));

  return (
    <div className="border border-gray-200 rounded-xl px-6 pt-5 pb-4 ">
      <h3 className="text-base font-medium text-gray-900 mb-5">
        {question.title}
      </h3>

      {/* Scale row — each mark is a selectable button */}
      <div className="relative">
        <div className="grid grid-cols-10 gap-0">
          {SCALE.map(n => (
            <div key={n} className="flex flex-col items-center gap-1 md:gap-2">
              <button
                type="button"
                onClick={() => onSelect(n)}
                aria-pressed={selected === n}
                aria-label={`${question.title} — score ${n} out of 10`}
                className={`flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full border transition-all duration-150 ${
                  selected === n
                    ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-sm"
                    : "border-gray-300 text-transparent hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                }`}
              >
                {selected === n && (
                  <Check
                    className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white"
                    strokeWidth={3}
                  />
                )}
              </button>
              <span
                className={`text-[10px] md:text-sm transition-colors ${
                  selected === n ? "text-blue-600 font-medium" : "text-gray-400"
                }`}
              >
                {n}
              </span>
            </div>
          ))}
        </div>
        <div className="h-px bg-gray-200 mt-2 md:mt-3" />
      </div>

      {/* Tags row - horizontal scroll on mobile, grid on desktop */}
      <div className="mt-3 overflow-x-auto -mx-2 px-2 md:overflow-visible md:mx-0 md:px-0">
        <div className="flex md:hidden gap-2 min-w-max pb-2">
          {SCALE.map(n => {
            const tag = tagByPosition.get(n);
            if (!tag) return null;
            return (
              <span
                key={n}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[11px] text-gray-700 whitespace-nowrap"
              >
                <Check className="w-2.5 h-2.5 text-blue-600 shrink-0" strokeWidth={3} />
                {tag.label}
              </span>
            );
          })}
        </div>
        <div className="hidden md:grid grid-cols-10">
          {SCALE.map(n => {
            const tag = tagByPosition.get(n);
            if (!tag) return <div key={n} />;
            return (
              <div
                key={n}
                className="col-span-1 flex items-start gap-1.5 pr-2 -ml-1"
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
                </span>
                <span className="text-[11px] lg:text-sm text-gray-700">{tag.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface RoundStepProps {
  /** Round to submit votes for (from contestant.current_round.id) */
  roundId?: number;
  /** Contestant being evaluated */
  contestantId?: number;
}

const RoundStep = ({ roundId, contestantId }: RoundStepProps) => {
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEvaluation =
    roundId != null && contestantId != null && contestantId > 0;
  const answeredCount = QUESTIONS.reduce(
    (count, _, i) => count + (selections[i] != null ? 1 : 0),
    0,
  );
  const canSubmit =
    isEvaluation && answeredCount === QUESTIONS.length && !submitted;

  const handleSelect = (qIndex: number, value: number) => {
    if (submitted) return;
    setSelections(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = async () => {
    if (!canSubmit || roundId == null || contestantId == null) return;
    setSubmitting(true);
    try {
      const scores = QUESTIONS.map((_, i) => selections[i]);
      await submitRoundVotes({ roundId, contestantId, scores });
      setSubmitted(true);
      toast.success("Ratings submitted successfully!");
    } catch (err) {
      console.error("Failed to submit round votes:", err);
      // Show the backend's message (e.g. "You cannot vote for your own
      // entry.") when available, otherwise a friendly fallback.
      toast.error(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // `relative z-10` keeps the ratings section above the Roundhero's video
    // layer so its rating dots always receive clicks even when the video is
    // playing (Chromium video compositing quirk).
    <div className="py-10 px-4 relative z-10">
      <div className="container  mx-auto flex flex-col gap-6">
        {isEvaluation && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-normal text-[#101828]">
                OSI Panel Evaluation
              </h2>
              <p className="text-sm md:text-base text-black/50 mt-1">
                Select a score from 1 to 10 for each question.
              </p>
            </div>
            <span className="text-sm text-black/50 shrink-0">
              {answeredCount} of {QUESTIONS.length} answered
            </span>
          </div>
        )}
        {QUESTIONS.map((q, i) => (
          <RatingRow
            key={i}
            question={q}
            selected={selections[i]}
            onSelect={value => handleSelect(i, value)}
          />
        ))}
        {isEvaluation && (
          <div className="flex justify-end">
            {submitted ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-5 py-2.5">
                <Check className="size-4" strokeWidth={3} />
                Ratings submitted
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-sm md:text-base font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit Ratings
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoundStep;
