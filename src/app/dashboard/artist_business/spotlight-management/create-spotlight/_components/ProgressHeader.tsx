"use client";

import React from "react";
import { Check } from "lucide-react";

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  percentComplete: number;
  completedSteps: Set<number>;
  steps: { label: string }[];
  submitted: boolean;
  goToStep: (idx: number) => void;
}

export function ProgressHeader({
  currentStep,
  totalSteps,
  percentComplete,
  completedSteps,
  steps,
  submitted,
  goToStep,
}: ProgressHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm md:text-base text-slate-500">
          Section {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm md:text-base font-medium text-emerald-500">
          {percentComplete}% Complete
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      <div className="flex items-start justify-between">
        {steps.map((step, i) => {
          const isActive = i === currentStep && !submitted;
          const isDone = completedSteps.has(i);
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => goToStep(i)}
              className="flex flex-col items-center gap-1.5 flex-1 group"
            >
              <span
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-medium transition-colors
                  ${
                    isDone
                      ? "bg-blue-500 text-white"
                      : isActive
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`text-xs md:text-sm whitespace-nowrap ${
                  isActive ? "text-blue-500 font-medium" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
