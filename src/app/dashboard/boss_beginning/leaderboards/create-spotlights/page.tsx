"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useRef, useState, Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import StepFour, {
  type ExistingImages,
} from "@/app/(main)/business-spotlight/_Components/StepFour";
import StepOne from "@/app/(main)/business-spotlight/_Components/StepOne";
import StepTwo from "@/app/(main)/business-spotlight/_Components/StepTwo";
import StepThree from "@/app/(main)/business-spotlight/_Components/StepThree";
import StepFive from "@/app/(main)/business-spotlight/_Components/StepFive";
import StepSix from "@/app/(main)/business-spotlight/_Components/StepSix";
import StepSeven from "@/app/(main)/business-spotlight/_Components/StepSeven";
import {
  useCreateBusinessSpotlight,
  useUpdateBusinessSpotlight,
  getSingleBusinessSpotlightDetails,
} from "@/Hooks/api/cms_api";

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
/*  Data flatten helper                                                */
/* ------------------------------------------------------------------ */

function flattenApiSpotlightData(apiData: any): Record<string, any> {
  const flat: Record<string, any> = {};

  // Copy top-level fields
  const topFields = [
    "business_name",
    "owner_founder_name",
    "business_category",
    "year_founded",
    "business_website",
    "city",
    "state",
    "business_story",
    "products_services",
    "challenges_overcome",
    "unique_factor",
    "target_customer",
    "email",
    "phone_number",
    "best_contact_time",
    "service_type",
    "why_featured",
    "growth_vision",
  ];
  topFields.forEach(f => {
    if (apiData[f] !== undefined && apiData[f] !== null) {
      flat[f] = apiData[f];
    }
  });

  // Flatten social_media
  if (apiData.social_media) {
    const socialFields = [
      "instagram_url",
      "tiktok_url",
      "facebook_url",
      "youtube_url",
      "google_business_profile_url",
      "linkedin_url",
      "fanbase_url",
    ];
    socialFields.forEach(f => {
      if (apiData.social_media[f]) {
        flat[f] = apiData.social_media[f];
      }
    });
  }

  // Flatten permissions (map to form field names)
  if (apiData.permissions) {
    if (apiData.permissions.feature_on_osi !== undefined)
      flat.permission_feature_on_osi = apiData.permissions.feature_on_osi;
    if (apiData.permissions.use_submitted_photos !== undefined)
      flat.permission_use_submitted_photos =
        apiData.permissions.use_submitted_photos;
    if (apiData.permissions.share_business_story !== undefined)
      flat.permission_share_business_story =
        apiData.permissions.share_business_story;
  }

  // Stringify year_founded if it's a number
  if (flat.year_founded !== undefined) {
    flat.year_founded = String(flat.year_founded);
  }

  return flat;
}

/* ------------------------------------------------------------------ */
/*  Existing images helper                                             */
/* ------------------------------------------------------------------ */

function extractExistingImages(apiData: any): ExistingImages {
  const imgs = apiData.images || {};
  return {
    portrait_photo: imgs.portrait_photo || null,
    storefront_workspace_photo: imgs.storefront_workspace_photo || null,
    product_service_photos: imgs.product_service_photos || [],
    team_photo: imgs.team_photo || null,
  };
}

/* ------------------------------------------------------------------ */
/*  Inner form (wraps the form logic that needs searchParams)          */
/* ------------------------------------------------------------------ */

function CreateSpotlightForm() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const isEditing = !!editId;

  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [existingImages, setExistingImages] = useState<ExistingImages | null>(
    null,
  );
  const [formInitialized, setFormInitialized] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync: createSpotlight, isPending: isCreatePending } =
    useCreateBusinessSpotlight();
  const { mutateAsync: updateSpotlight, isPending: isUpdatePending } =
    useUpdateBusinessSpotlight();

  const isPending = isCreatePending || isUpdatePending;

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  // Fetch existing data if editing
  const { data: existingData, isLoading: isFetching } =
    getSingleBusinessSpotlightDetails(editId ? Number(editId) : 0);

  // Pre-populate form when existing data arrives
  useEffect(() => {
    if (formInitialized) return;

    if (isEditing && existingData) {
      // Try different possible API response paths
      const spotlight =
        existingData?.data?.spotlight ||
        existingData?.data?.business ||
        existingData?.data?.data ||
        existingData?.data;

      if (spotlight && typeof spotlight === "object") {
        const flat = flattenApiSpotlightData(spotlight);
        methods.reset(flat);
        setExistingImages(extractExistingImages(spotlight));
        setFormInitialized(true);
      } else {
        // Data loaded but no spotlight found — still initialize
        setFormInitialized(true);
      }
    } else if (!isEditing) {
      setFormInitialized(true);
    }
    // If isEditing but existingData is still undefined, wait for fetch
  }, [isEditing, existingData, methods, formInitialized]);

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

  const buildFormData = (data: any): FormData => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      const value = data[key];

      if (value === undefined || value === null) return;

      // Handle Files
      if (
        value instanceof FileList ||
        (Array.isArray(value) && value[0] instanceof File)
      ) {
        // Skip empty file inputs (user didn't select new files — keep existing)
        if (value instanceof FileList && value.length === 0) return;

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

    // Append existing image URLs so API knows which to keep
    if (existingImages) {
      if (existingImages.portrait_photo)
        formData.append("existing_portrait_photo", existingImages.portrait_photo);
      if (existingImages.storefront_workspace_photo)
        formData.append(
          "existing_storefront_workspace_photo",
          existingImages.storefront_workspace_photo,
        );
      existingImages.product_service_photos.forEach((url, i) => {
        formData.append(`existing_product_service_photos[${i}]`, url);
      });
      if (existingImages.team_photo)
        formData.append("existing_team_photo", existingImages.team_photo);
    }



    return formData;
  };

  const onSubmit = async (data: any) => {
    // If not on last step, just advance
    if (currentStep < TOTAL_STEPS - 1) {
      goNext();
      return;
    }

    const payload = buildFormData(data);

    if (isEditing && editId) {
      await updateSpotlight(
        {
          endpoint: `/v1/business-spotlight/update/${editId}`,
          data: payload,
        },
        {
          onSuccess: (res: any) => {
            if (res?.success) {
              setSubmitted(true);
            }
          },
        },
      );
    } else {
      await createSpotlight(payload, {
        onSuccess: (res: any) => {
          if (res?.success) {
            setSubmitted(true);
          }
        },
      });
    }
  };

  // Show loading while fetching existing data
  if (isEditing && isFetching && !formInitialized) {
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

  return (
    <div className="bg-[#F5F6F8]">
      <div ref={formRef} className="space-y-5">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6">
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">
            {isEditing ? "Edit Spotlight" : "Create Spotlight"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isEditing
              ? "Update your business spotlight information below"
              : "Fill in the details to create a business spotlight"}
          </p>
        </div>

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
              {/* Step content */}
              {CurrentStepComponent && (
                <CurrentStepComponent existingImages={existingImages} />
              )}

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
                        {isEditing ? "Updating..." : "Submitting..."}
                      </>
                    ) : (
                      isEditing ? "Update" : "Submit"
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

/* ------------------------------------------------------------------ */
/*  Page (wrapped in Suspense for useSearchParams)                     */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F5F6F8] p-8 text-slate-500">
          Loading form...
        </div>
      }
    >
      <CreateSpotlightForm />
    </Suspense>
  );
}
