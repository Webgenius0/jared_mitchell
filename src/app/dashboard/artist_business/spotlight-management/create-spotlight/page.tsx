"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { initialFormData, steps, TOTAL_STEPS } from "./_components/types";
import type { FormData } from "./_components/types";
import { ProgressHeader } from "./_components/ProgressHeader";
import { SuccessScreen } from "./_components/SuccessScreen";
import { StepIdentification } from "./_components/StepIdentification";
import { StepCategory } from "./_components/StepCategory";
import { StepStory } from "./_components/StepStory";
import { StepMedia } from "./_components/StepMedia";
import { StepConsent } from "./_components/StepConsent";
import { StepOptional } from "./_components/StepOptional";

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

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

  const handleViewDashboard = () => {
    console.log("Navigate to dashboard");
  };

  /* Map step index to component */
  const stepComponents = [
    <StepIdentification key="step0" form={form} update={update} />,
    <StepCategory key="step1" form={form} update={update} />,
    <StepStory key="step2" form={form} update={update} />,
    <StepMedia key="step3" form={form} update={update} />,
    <StepConsent key="step4" form={form} update={update} />,
    <StepOptional key="step5" form={form} update={update} />,
  ];

  return (
    <div className=" bg-[#F5F6F8] py-6 md:py-8">
      <div className="space-y-6 md:space-y-8">
        {/* Progress header */}
        <ProgressHeader
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          percentComplete={percentComplete}
          completedSteps={completedSteps}
          steps={steps}
          submitted={submitted}
          goToStep={goToStep}
        />

        {submitted ? (
          <SuccessScreen onViewDashboard={handleViewDashboard} />
        ) : (
          <>
            {/* Step content */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 lg:p-10">
              {stepComponents[currentStep]}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-500 px-6 py-3 md:px-8 md:py-3.5 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>

              {currentStep < TOTAL_STEPS - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-1.5 bg-blue-500 text-white text-base md:text-lg font-normal px-6 py-3 md:px-8 md:py-3.5 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Next Section
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white text-base md:text-lg font-normal px-10 py-3 md:py-3.5 rounded-full hover:bg-blue-600 transition-colors"
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
