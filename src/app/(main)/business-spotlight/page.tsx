"use client";
import submissionBg from "@/Assets/submission_form.png";
import {
  CheckBtnSvg,
  LeftArrowSvg,
  RightArrowSvg,
} from "@/Components/Svg/SvgContainer";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepOne from "./_Components/StepOne";
import StepTwo from "./_Components/StepTwo";
import StepThree from "./_Components/StepThree";
import StepFour from "./_Components/StepFour";
import StepFive from "./_Components/StepFive";
import StepSix from "./_Components/StepSix";
import StepSeven from "./_Components/StepSeven";
import { useCreateBusinessSpotlight } from "@/Hooks/api/cms_api";
import { TbLoader2 } from "react-icons/tb";

type StepItem = {
  title: string;
  component: React.ComponentType<any>;
};

const steps: StepItem[] = [
  { title: "Identification", component: StepOne },
  { title: "Category", component: StepTwo },
  { title: "Your Story", component: StepThree },
  { title: "Media", component: StepFour },
  { title: "Consent", component: StepFive },
  { title: "Optional", component: StepSix },
  { title: "Success", component: StepSeven },
];

const Page = () => {
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLDivElement | null>(null);
  const totalSteps = steps.length;
  const CurrentStep = steps[step].component;
  const progressPercent = ((step + 1) / totalSteps) * 100;
  const onNext = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const onPrev = () => setStep(prev => Math.max(prev - 1, 0));

  const { mutateAsync: businessSpotlightMutation, isPending } =
    useCreateBusinessSpotlight();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const onSubmit = async (data: any) => {
    if (step < totalSteps - 2) {
      onNext();
    } else {
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        const value = data[key];

        if (value === undefined || value === null) return;

        // Handle Files
        if (value instanceof FileList || (Array.isArray(value) && value[0] instanceof File)) {
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

        // Handle Everything else
        formData.append(key, value);
      });

      await businessSpotlightMutation(formData, {
        onSuccess: (res: any) => {
          if (res?.success) {
            onNext();
          }
        },
      });
    }
  };

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  return (
    <section className="pb-20">
      {/* Banner */}
      <div
        className="h-[450px] bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${submissionBg.src})` }}
      >
        <span className="text-2xl text-white">
          <span className="font-semibold">Service</span> / Business Spotlight
        </span>

        <h2 className="text-white font-semibold text-6xl py-7">
          Business Spotlight Submission
        </h2>

        <p className="text-2xl text-white max-w-[900px] leading-[150%]">
          Share your business story and get featured on OSI.
        </p>
      </div>

      {/* Form */}
      <div ref={formRef} className="container pt-24">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Progress Header */}
            <div className="p-4 rounded-xl shadow border border-gray-200 mb-10">
              <div className="flex justify-between pb-4">
                <span className="text-xl">
                  Section {step > 5 ? 6 : step + 1} of {totalSteps - 1}
                </span>
                <span className="text-green-500 text-xl">
                  {Math.round(progressPercent)}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <div
                  className="h-full bg-blue-500 transition-all rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Step Indicators */}
              <div className="flex justify-between">
                {steps?.slice(0, 6).map((s, idx) => {
                  const isActive = idx === step;
                  const isCompleted = idx < step;

                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setStep(idx)}
                      className={`flex flex-col items-center w-1/6 ${
                        isActive || isCompleted
                          ? "text-primary-blue"
                          : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`size-14 rounded-full border grid place-items-center text-xl mb-2 ${
                          isActive
                            ? "bg-blue-100"
                            : isCompleted
                              ? "bg-primary-blue border-blue-500"
                              : "bg-gray-100 border-gray-200"
                        }`}
                      >
                        {isCompleted ? <CheckBtnSvg /> : idx + 1}
                      </span>

                      <span className="text-lg">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <div className="py-10">
              <CurrentStep
                step={step}
                setStep={setStep}
                totalSteps={totalSteps}
              />
            </div>

            {step < 6 && (
              <div className="flex justify-between">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={onPrev}
                  className="flex items-center gap-3 px-12 py-4 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LeftArrowSvg />
                  Previous
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-3 px-12 py-4 bg-primary-blue text-white rounded-full disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {step === totalSteps - 2 ? (
                    isPending ? (
                      <span className="flex gap-2 items-center">
                        <TbLoader2 className="animate-spin" /> Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )
                  ) : (
                    "Next Section"
                  )}
                  <RightArrowSvg />
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Page;
