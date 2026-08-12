"use client";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSingleArtistSpotlightDetails,
  useCreateArtistSpotlight,
  useUpdateArtistSpotlight,
} from "@/Hooks/api/cms_api";
import toast from "react-hot-toast";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import StepFive from "./_components/StepFive";
import StepSix from "./_components/StepSix";
import StepSeven from "./_components/StepSeven";
import RequireSubscription from "@/Components/Common/RequireSubscription";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";

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

const TOTAL_FORM_STEPS = steps.length - 1; // 6 form steps + success screen

function CreateSpotlightForm() {
  const searchParams = useSearchParams();

  const [id, setId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("id") || "";
  });

  const isEditMode = Boolean(id);
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLDivElement | null>(null);
  const hasHydrated = useRef(false);
  useEffect(() => {
    const rawId =
      new URLSearchParams(window.location.search).get("id") ||
      searchParams.get("id") ||
      "";
    setId(prev => {
      if (prev !== rawId) {
        hasHydrated.current = false;
        return rawId;
      }
      return prev;
    });
  }, [searchParams]);

  const totalSteps = steps.length;
  const CurrentStep = steps[step].component;
  const progressPercent = Math.round(
    ((step + 1) / TOTAL_FORM_STEPS) * 100,
  );
  const onNext = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const onPrev = () => setStep(prev => Math.max(prev - 1, 0));

  const { mutateAsync: createSpotlight, isPending: isCreating } =
    useCreateArtistSpotlight();
  const { mutateAsync: updateSpotlight, isPending: isUpdating } =
    useUpdateArtistSpotlight(id);
  const isPending = isCreating || isUpdating;

  const {
    data: spotlightDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = getSingleArtistSpotlightDetails(id);

  useEffect(() => {
    if (!isEditMode || !isDetailsError) return;
    toast.error(getApiErrorMessage(detailsError));
  }, [isEditMode, isDetailsError, detailsError]);

  useEffect(() => {
    if (!isEditMode || isDetailsLoading || isDetailsError) return;
    if (!spotlightDetails?.data) {
      toast.error("Failed to load your spotlight data. Please try again.");
    }
  }, [isEditMode, isDetailsLoading, isDetailsError, spotlightDetails]);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  // Hydrate
  useEffect(() => {
    if (!isEditMode) return;
    if (hasHydrated.current) return;
    const spotlight = spotlightDetails?.data;
    if (!spotlight) return;

    methods.reset({
      full_legal_name: spotlight.full_legal_name ?? "",
      artist_stage_name: spotlight.artist_stage_name ?? "",
      email: spotlight.email ?? "",
      phone_number: spotlight.phone_number ?? "",
      date_of_birth: spotlight.date_of_birth
        ? spotlight.date_of_birth.slice(0, 10)
        : "",
      city: spotlight.city ?? "",
      state: spotlight.state ?? "",

      instagram_handle: spotlight.social_media?.instagram_handle ?? "",
      tiktok_handle: spotlight.social_media?.tiktok_handle ?? "",
      facebook_url: spotlight.social_media?.facebook_url ?? "",
      youtube_url: spotlight.social_media?.youtube_url ?? "",
      website_portfolio_url:
        spotlight.social_media?.website_portfolio_url ?? "",

      artist_category_id: spotlight.artist_category_id
        ? String(spotlight.artist_category_id)
        : "",
      category_other_description: spotlight.category_other_description ?? "",

      short_bio: spotlight.short_bio ?? "",
      full_artist_story: spotlight.full_artist_story ?? "",
      why_spotlighted: spotlight.why_spotlighted ?? "",
      community_message: spotlight.community_message ?? "",
      current_goals: spotlight.current_goals ?? "",

      existing_headshot: spotlight.media?.headshot ?? null,
      existing_artwork_photos: spotlight.media?.artwork_photos ?? [],
      existing_behind_scenes_photo:
        spotlight.media?.behind_scenes_photo ?? null,
      existing_intro_video: spotlight.media?.intro_video ?? null,

      consent_public_release: spotlight.consent?.public_release ?? false,
      consent_ownership_declaration:
        spotlight.consent?.ownership_declaration ?? false,
      consent_interview_permission:
        spotlight.consent?.interview_permission ?? false,

      talent_manager_contact: spotlight.talent_manager_contact ?? "",
      agent_contact: spotlight.agent_contact ?? "",
      press_kit_url: spotlight.press_kit_url ?? "",
      previous_interviews: spotlight.previous_interviews ?? "",
      awards_recognition: spotlight.awards_recognition ?? "",
      preferred_pronouns: spotlight.preferred_pronouns ?? "",
      preferred_contact_method: spotlight.preferred_contact_method ?? "",
      interview_availability: spotlight.interview_availability ?? "",
    });

    hasHydrated.current = true;
  }, [isEditMode, spotlightDetails, methods]);

  const singleFileFields: Record<string, string> = {
    headshot: "existing_headshot",
    behind_scenes_photo: "existing_behind_scenes_photo",
    intro_video: "existing_intro_video",
  };

  const multiFileFields: Record<string, string> = {
    artwork_photos: "existing_artwork_photos",
  };

  const onSubmit = async (data: any) => {
    if (step < totalSteps - 2) {
      onNext();
      return;
    }

    const formData = new FormData();

    Object.keys(data).forEach(key => {
      const value = data[key];

      if (key.startsWith("existing_")) return;

      if (key in singleFileFields) {
        const fileList = value as FileList | undefined;
        const newFile = fileList?.[0];

        if (newFile instanceof File) {
          formData.append(key, newFile);
        } else {
          const existingUrl = data[singleFileFields[key]];
          if (existingUrl) {
            formData.append(key, existingUrl);
          }
        }
        return;
      }

      if (key in multiFileFields) {
        const fileList = value as FileList | undefined;
        const hasNewFiles = fileList instanceof FileList && fileList.length > 0;

        if (hasNewFiles) {
          Array.from(fileList).forEach(file => {
            formData.append(`${key}[]`, file);
          });
        } else {
          const existingUrls: string[] = data[multiFileFields[key]] ?? [];
          existingUrls.forEach(url => {
            formData.append(`${key}[]`, url);
          });
        }
        return;
      }

      if (value === undefined || value === null) return;

      // Handle Booleans (Consent)
      if (key.startsWith("consent_")) {
        formData.append(key, value ? "1" : "0");
        return;
      }

      // Handle Everything else
      formData.append(key, value);
    });

    if (isEditMode) {
      await updateSpotlight(formData, {
        onSuccess: (res: any) => {
          if (res?.success) onNext();
        },
      });
    } else {
      await createSpotlight(formData, {
        onSuccess: (res: any) => {
          if (res?.success) onNext();
        },
      });
    }
  };
  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  if (isEditMode && isDetailsLoading) {
    return (
      <div className="bg-[#F5F6F8]">
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-sm text-slate-500">
            Loading spotlight data...
          </span>
        </div>
      </div>
    );
  }

  const isSuccessStep = step === totalSteps - 1;

  return (
    <RequireSubscription
      title="Subscription required"
      description="You need an active subscription to create or edit an artist spotlight. Subscribe to unlock the application form."
    >
      <div className="bg-[#F5F6F8]">
        <div ref={formRef} className="space-y-5">
          {isSuccessStep ? (
            <StepSeven />
          ) : (
            <>
              {/* Header */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
                <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                  {isEditMode ? "Edit Spotlight" : "Create Spotlight"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {isEditMode
                    ? "Update your artist spotlight information below"
                    : "Fill in the details to create an artist spotlight"}
                </p>
              </div>

              {/* Progress stepper */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs md:text-sm text-slate-500">
                    Section {step + 1} of {TOTAL_FORM_STEPS}
                  </span>
                  <span className="text-xs md:text-sm font-medium text-emerald-500">
                    {progressPercent}% Complete
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-start justify-between">
                  {steps.slice(0, TOTAL_FORM_STEPS).map((s, i) => {
                    const isActive = i === step;
                    const isDone = i < step;
                    return (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() => setStep(i)}
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
                            isActive
                              ? "text-blue-500 font-medium"
                              : "text-slate-400"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  {/* Step content */}
                  <CurrentStep
                    step={step}
                    setStep={setStep}
                    totalSteps={totalSteps}
                  />

                  {/* Nav buttons */}
                  <div className="flex items-center justify-between mt-5">
                    <button
                      type="button"
                      onClick={onPrev}
                      disabled={step === 0}
                      className="flex items-center gap-1.5 text-sm md:text-base font-medium text-slate-500 px-5 py-2.5 md:px-10 md:py-3 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>

                    {step < TOTAL_FORM_STEPS - 1 ? (
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
                            {isEditMode ? "Updating..." : "Submitting..."}
                          </>
                        ) : isEditMode ? (
                          "Update"
                        ) : (
                          "Submit"
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </div>
    </RequireSubscription>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F5F6F8] p-8 text-slate-500">Loading form...</div>
      }
    >
      <CreateSpotlightForm />
    </Suspense>
  );
}
