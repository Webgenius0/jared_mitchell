"use client";
import {
  CheckBtnSvg,
  LeftArrowSvg,
  RightArrowSvg,
} from "@/Components/Svg/SvgContainer";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import {
  getSingleArtistSpotlightDetails,
  useCreateArtistSpotlight,
  useUpdateArtistSpotlight,
} from "@/Hooks/api/cms_api";
import toast from "react-hot-toast";
import { TbLoader2 } from "react-icons/tb";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import StepFour from "./_components/StepFour";
import StepFive from "./_components/StepFive";
import StepSix from "./_components/StepSix";
import StepSeven from "./_components/StepSeven";
import RequireSubscription from "@/Components/Common/RequireSubscription";

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
  const progressPercent = ((step + 1) / totalSteps) * 100;
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
    toast.error(
      (detailsError as any)?.response?.data?.message ||
        "Failed to load your spotlight data. Please try again.",
    );
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
      <div className="container py-10 flex justify-center">
        <TbLoader2 className="animate-spin text-3xl text-primary-blue" />
      </div>
    );
  }

  return (
    <RequireSubscription
      title="Subscription required"
      description="You need an active subscription to create or edit an artist spotlight. Subscribe to unlock the application form."
    >
    <div ref={formRef} className=" py-10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Progress Header */}
          <div className="p-4 rounded-xl shadow border border-gray-200 mb-3">
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
                      <TbLoader2 className="animate-spin" />
                      {isEditMode ? "Updating..." : "Submitting..."}
                    </span>
                  ) : isEditMode ? (
                    "Update"
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
    </RequireSubscription>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container py-10 flex justify-center">
          <TbLoader2 className="animate-spin text-3xl text-primary-blue" />
        </div>
      }
    >
      <CreateSpotlightForm />
    </Suspense>
  );
}
