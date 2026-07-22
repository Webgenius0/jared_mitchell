"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState, useMemo } from "react";

import {
  FormData,
  initialFormData,
  steps,
  TOTAL_STEPS,
} from "./types";
import { StepBusinessInfo } from "./step-business-info";
import { StepContactInfo } from "./step-contact-info";
import { StepBusinessStory } from "./step-business-story";
import { StepMedia } from "./step-media";
import { StepServiceDetails } from "./step-service-details";
import { StepSpotlightConsideration } from "./step-spotlight-consideration";
import { SuccessScreen } from "./success-screen";


export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const update =
    <K extends keyof FormData>(key: K) =>
    (value: FormData[K]) => {
      setForm(prev => ({ ...prev, [key]: value }));
    };

  const percentComplete = useMemo(
    () => Math.round((completedSteps.size / TOTAL_STEPS) * 100),
    [completedSteps],
  );

  const goNext = () => {
    setCompletedSteps(prev => new Set(prev).add(currentStep));
    setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goPrevious = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
  };

  const goToStep = (idx: number) => {
    if (submitted) return;
    setCurrentStep(idx);
  };

  const handleSubmit = () => {
    setCompletedSteps(new Set(steps.map((_, i) => i)));
    setSubmitted(true);
    console.log("Submitting form", form);
  };

  const handleDone = () => {
    setSubmitted(false);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setForm(initialFormData);
  };

  return (
    <div className=" bg-[#F5F6F8]">
      <div className="space-y-5">
        {/* Progress stepper */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs md:text-sm text-slate-500">
              Section {currentStep + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-xs md:text-sm font-medium text-emerald-500">
              {percentComplete}% Complete
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
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
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-colors
                      ${
                        isDone
                          ? "bg-blue-500 text-white"
                          : isActive
                            ? "bg-blue-500 text-white"
                            : "bg-slate-100 text-slate-400"
                      }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span
                    className={`text-[10px] md:text-xs whitespace-nowrap ${
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

        {submitted ? (
          <SuccessScreen onDone={handleDone} />
        ) : (
          <>
            {/* Step content */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">
              {currentStep === 0 && (
                <StepBusinessInfo form={form} update={update} />
              )}
              {currentStep === 1 && (
                <StepContactInfo form={form} update={update} />
              )}
              {currentStep === 2 && (
                <StepBusinessStory form={form} update={update} />
              )}
              {currentStep === 3 && (
                <StepMedia form={form} update={update} />
              )}
              {currentStep === 4 && (
                <StepServiceDetails form={form} update={update} />
              )}
              {currentStep === 5 && (
                <StepSpotlightConsideration form={form} update={update} />
              )}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 text-sm md:text-base font-medium text-slate-500 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < TOTAL_STEPS - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-1.5 bg-blue-500 text-white text-sm md:text-base font-medium px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Next Section
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white text-sm md:text-base font-medium px-8 py-2.5 md:py-3 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
