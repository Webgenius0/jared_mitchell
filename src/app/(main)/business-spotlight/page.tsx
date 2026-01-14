"use client";
import submissionBg from "@/Assets/submission_form.png";
import {
  CheckBtnSvg,
  LeftArrowSvg,
  RightArrowSvg,
} from "@/Components/Svg/SvgContainer";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepOne from "./_Components/StepOne";
import StepTwo from "./_Components/StepTwo";
import StepThree from "./_Components/StepThree";
import StepFour from "./_Components/StepFour";
import StepFive from "./_Components/StepFive";
import StepSix from "./_Components/StepSix";

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
];

const Page = () => {
  const [step, setStep] = useState(0);
  const totalSteps = steps.length;
  const CurrentStep = steps[step].component;
  const progressPercent = ((step + 1) / totalSteps) * 100;
  const onNext = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const onPrev = () => setStep(prev => Math.max(prev - 1, 0));

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      category: "",
      story: "",
      media: null,
      consent: false,
    },
  });

  const onSubmit = async (data: any) => {
    if (step < totalSteps - 1) {
      onNext();
    } else {
      console.log("Final Submit Data:", data);
    }
  };

  return (
    <>
      {/* Banner */}
      <div
        className="h-[450px] bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${submissionBg.src})` }}
      >
        <span className="text-2xl text-white">
          <span className="font-semibold">Service</span> / Artist Spotlight
        </span>

        <h2 className="text-white font-semibold text-6xl py-7">
          Business Spotlight Submission
        </h2>

        <p className="text-2xl text-white max-w-[900px] leading-[150%]">
          Share your business story and get featured on OSI.
        </p>
      </div>

      {/* Form */}
      <div className="container py-10">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* Progress Header */}
            <div className="p-4 rounded-xl shadow border mb-10">
              <div className="flex justify-between pb-4">
                <span className="text-xl">
                  Section {step + 1} of {totalSteps}
                </span>
                <span className="text-green-500 text-xl">
                  {Math.round(progressPercent)}% Complete
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-4 bg-gray-100 rounded-lg overflow-hidden mb-6">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Step Indicators */}
              <div className="flex justify-between">
                {steps?.map((s, idx) => {
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
                        className={`size-12 rounded-full border grid place-items-center mb-1 ${
                          isActive
                            ? "bg-blue-100"
                            : isCompleted
                            ? "bg-primary-blue border-blue-500"
                            : "bg-gray-100"
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

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                type="button"
                disabled={step === 0}
                onClick={onPrev}
                className="flex items-center gap-3 px-12 py-4 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LeftArrowSvg />
                Previous
              </button>

              <button
                type="submit"
                className="flex items-center gap-3 px-12 py-4 bg-primary-blue text-white rounded-full"
              >
                {step === totalSteps - 1 ? "Submit" : "Next Section"}
                <RightArrowSvg />
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Page;
