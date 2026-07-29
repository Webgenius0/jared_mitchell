"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import StepOne from "@/app/(main)/business-spotlight/_Components/StepOne";
import StepTwo from "@/app/(main)/business-spotlight/_Components/StepTwo";
import StepThree from "@/app/(main)/business-spotlight/_Components/StepThree";
import StepFour from "@/app/(main)/business-spotlight/_Components/StepFour";
import StepFive from "@/app/(main)/business-spotlight/_Components/StepFive";
import StepSix from "@/app/(main)/business-spotlight/_Components/StepSix";
import StepSeven from "@/app/(main)/business-spotlight/_Components/StepSeven";
import { useCreateBusinessSpotlight } from "@/Hooks/api/cms_api";

/* ------------------------------------------------------------------ */
/*  Step definitions                                                    */
/* ------------------------------------------------------------------ */

const steps = [
  { label: "Identification", component: StepOne },
  { label: "Category", component: StepTwo },
  { label: "Contact", component: StepThree },
  { label: "Media", component: StepFour },
  { label: "Service", component: StepFive },
  { label: "Consideration", component: StepSix },
];

const TOTAL_STEPS = steps.length;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: createSpotlight, isPending } =
    useCreateBusinessSpotlight();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const CurrentStepComponent = steps[currentStep]?.component;

  const percentComplete = Math.round(
    ((currentStep + 1) / TOTAL_STEPS) * 100,
  );

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scrollToTop();
  }, [currentStep]);

  const goNext = () => {
    setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goPrevious = () => {
    setCurrentStep(s => Math.max(s - 1, 0));
  };

  const goToStep = (idx: number) => {
    if (submitted) return;
    setCurrentStep(idx);
  };

  const onSubmit = async (data: any) => {
    // If not on last step, just advance
    if (currentStep < TOTAL_STEPS - 1) {
      goNext();
      return;
    }

    // Build FormData payload for the API
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      const value = data[key];

      if (value === undefined || value === null) return;

      // Handle Files
      if (
        value instanceof FileList ||
        (Array.isArray(value) && value[0] instanceof File)
      ) {
        if (key === "product_service_photos") {
          Array.from(value as FileList).forEach(file => {
            formData.append("product_service_photos[]", file);
          });
        } else {
          formData.append(key, value[0]);
        }
        return;
      }

      // Handle Booleans (Permissions)
      if (key.startsWith("permission_")) {
        formData.append(key, value ? "1" : "0");
        return;
      }

      // Handle everything else
      formData.append(key, value);
    });

    await createSpotlight(formData, {
      onSuccess: (res: any) => {
        if (res?.success) {
          setSubmitted(true);
        }
      },
    });
  };

  return (
    <div className="bg-[#F5F6F8]">
      <div ref={formRef} className="space-y-5">
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

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          <div className="flex items-start justify-between">
            {steps.map((step, i) => {
              const isActive = i === currentStep && !submitted;
              const isDone = i < currentStep || submitted;
              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => goToStep(i)}
                  className="flex flex-col items-center gap-1.5 flex-1 group"
                >
                  <span
                    className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-colors
                      ${
                        isDone
                          ? "bg-blue-500 text-white"
                          : isActive
                            ? "bg-blue-500 text-white"
                            : "bg-slate-100 text-slate-400"
                      }`}
                  >
                    {isDone ? (
                      <svg
                        className="w-3.5 h-3.5 md:w-4 md:h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
          <StepSeven />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* Step content — step_box styling comes from the imported components */}
              {CurrentStepComponent && <CurrentStepComponent />}

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-5">
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 text-sm md:text-base font-medium text-slate-500 px-5 py-2.5 md:px-10 md:py-3 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentStep < TOTAL_STEPS - 1 ? (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-blue-500 text-white text-sm md:text-base font-normal px-5 py-2.5 md:px-10 md:py-3 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Next Section
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-500 text-white text-sm md:text-base font-medium px-10 py-2.5 md:py-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
}
