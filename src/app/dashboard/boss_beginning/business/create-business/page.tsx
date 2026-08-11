"use client";

import { useState, useEffect, ChangeEvent, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { X, UploadCloud, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCreateBusiness, useUpdateBusiness } from "@/Hooks/api/dashboard_api";
import { resolveMediaUrl } from "@/lib/utils";
import RequireSubscription from "@/Components/Common/RequireSubscription";
import RichTextEditor, {
  isRichTextEmpty,
} from "@/Components/Common/RichTextEditor";

interface TextInputFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function TextInputField({
  label,
  required = true,
  placeholder,
  value,
  onChange,
  error,
}: TextInputFieldProps) {
  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className={`w-full rounded-full border px-4 py-2.5 md:py-3 text-sm md:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-300 focus:ring-red-100 focus:border-red-400"
            : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs md:text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

interface FormState {
  businessName: string;
  ownerName: string;
  story: string;
  mission: string;
  website: string;
  communityImpact: string;
  revenueStage: string;
  whyCompete: string;
}

interface FormErrors {
  businessName?: string;
  ownerName?: string;
  story?: string;
  website?: string;
}

function CreateBusinessForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const editId = searchParams.get("editId");
  const isEditing = !!editId;

  // Read edit data from sessionStorage (more reliable than URL params)
  const getEditData = (): (FormState & { existingMedia?: string[] }) | null => {
    try {
      const raw = sessionStorage.getItem("editBusinessData");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const prefill = getEditData();

  // Clean up sessionStorage after reading
  useEffect(() => {
    if (prefill) {
      sessionStorage.removeItem("editBusinessData");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState<FormState>(
    prefill
      ? {
          businessName: prefill.businessName || "",
          ownerName: prefill.ownerName || "",
          story: prefill.story || "",
          mission: prefill.mission || "",
          website: prefill.website || "",
          communityImpact: prefill.communityImpact || "",
          revenueStage: prefill.revenueStage || "",
          whyCompete: prefill.whyCompete || "",
        }
      : {
          businessName: "",
          ownerName: "",
          story: "",
          mission: "",
          website: "",
          communityImpact: "",
          revenueStage: "",
          whyCompete: "",
        },
  );
  const [existingMedia, setExistingMedia] = useState<string[]>(
    prefill?.existingMedia ?? [],
  );
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [newFilePreviews, setNewFilePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  // Revoke object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      newFilePreviews.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync: createBusiness, isPending: isCreatePending } =
    useCreateBusiness();
  const { mutateAsync: updateBusiness, isPending: isUpdatePending } =
    useUpdateBusiness();

  const isPending = isCreatePending || isUpdatePending;

  const updateField = (key: keyof FormState) => (value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    // Clear the error for this field when user starts typing
    if (errors[key as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setPhotoFiles(prev => [...prev, ...fileArray]);
      // Create preview URLs for image files
      fileArray.forEach(file => {
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          setNewFilePreviews(prev => [...prev, url]);
        } else {
          setNewFilePreviews(prev => [...prev, ""]);
        }
      });
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    // Revoke the object URL to free memory
    setNewFilePreviews(prev => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingMedia = (index: number) => {
    setExistingMedia(prev => prev.filter((_, i) => i !== index));
  };

  const validate = useCallback((): boolean => {
    // In edit mode, no fields are required — user can update just one field
    if (isEditing) {
      setErrors({});
      return true;
    }

    const newErrors: FormErrors = {};

    if (!form.businessName.trim()) {
      newErrors.businessName = "Business name is required.";
    }

    if (!form.ownerName.trim()) {
      newErrors.ownerName = "Owner / founder name is required.";
    }

    if (isRichTextEmpty(form.story)) {
      newErrors.story = "Story is required.";
    }

    if (form.website.trim()) {
      const hasProtocol =
        form.website.startsWith("http://") ||
        form.website.startsWith("https://");
      if (!hasProtocol) {
        newErrors.website = "Website must start with http:// or https://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, isEditing]);

  const formToApiPayload = (): FormData => {
    const fd = new FormData();
    fd.append("business_name", form.businessName);
    fd.append("owner_founder_name", form.ownerName);
    fd.append("story", form.story);
    fd.append("mission", form.mission);
    fd.append("website_social_media", form.website);
    fd.append("community_impact_statement", form.communityImpact);
    fd.append("revenue_stage", form.revenueStage);
    fd.append("why_they_deserve_to_compete", form.whyCompete);
    photoFiles.forEach(file => {
      fd.append("photo_video[]", file);
    });
    // Pass existing media URLs so the API knows which to keep
    existingMedia.forEach((url, i) => {
      fd.append(`existing_media[${i}]`, url);
    });
    return fd;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const payload = formToApiPayload();

    if (isEditing && editId) {
      // Use dynamic endpoint for update
      await updateBusiness(
        {
          endpoint: `/v1/businesses/update/${editId}`,
          data: payload,
        },
        {
          onSuccess: (res: any) => {
            if (res?.success) {
              router.push("/dashboard/boss_beginning/business");
            }
          },
        },
      );
    } else {
      await createBusiness(payload, {
        onSuccess: (res: any) => {
          if (res?.success) {
            router.push("/dashboard/boss_beginning/business");
          }
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-xl py-4 px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">
            {isEditing ? "Edit Business" : "Create Business"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isEditing
              ? "Update your business information below"
              : "Fill in the details to register your business"}
          </p>
        </div>
        <Link href="/dashboard/boss_beginning/business">
          <button
            type="button"
            className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors"
          >
            Back to list
          </button>
        </Link>
      </div>

      <div className="space-y-5">
        <TextInputField
          label="Business Name"
          placeholder="Enter your business name"
          value={form.businessName}
          onChange={updateField("businessName")}
          error={errors.businessName}
        />

        <TextInputField
          label="Owner / Founder Name"
          placeholder="Your name"
          value={form.ownerName}
          onChange={updateField("ownerName")}
          error={errors.ownerName}
        />

        <RichTextEditor
          label="Story"
          value={form.story}
          onChange={updateField("story")}
          error={errors.story}
        />

        <RichTextEditor
          label="Mission"
          value={form.mission}
          onChange={updateField("mission")}
        />

        <TextInputField
          label="Website/social media"
          placeholder="https://example.com"
          value={form.website}
          onChange={updateField("website")}
          error={errors.website}
        />

        <RichTextEditor
          label="Community impact statement"
          value={form.communityImpact}
          onChange={updateField("communityImpact")}
        />

        <RichTextEditor
          label="Revenue stage"
          value={form.revenueStage}
          onChange={updateField("revenueStage")}
        />

        <RichTextEditor
          label="Why they deserve to compete"
          value={form.whyCompete}
          onChange={updateField("whyCompete")}
        />

        <div>
          <label className="block text-sm md:text-base font-medium text-slate-800 mb-2">
            Photo/Video
          </label>

          {/* Existing media preview */}
          {existingMedia.length > 0 && (
            <div className="mb-4">
              <p className="text-xs md:text-sm text-slate-500 mb-2">
                Existing media
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {existingMedia.map((url, idx) => (
                  <div
                    key={`existing-${idx}`}
                    className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={resolveMediaUrl(url)}
                      alt={`Media ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingMedia(idx)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New uploads preview */}
          {photoFiles.length > 0 && (
            <div className="mb-4">
              <p className="text-xs md:text-sm text-slate-500 mb-2">
                New uploads
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {photoFiles.map((file, idx) => {
                  const previewUrl = newFilePreviews[idx];
                  return (
                    <div
                      key={`new-${idx}`}
                      className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                    >
                      {file.type.startsWith("video/") ? (
                        <video
                          src={previewUrl || undefined}
                          className="w-full h-full object-cover"
                          controls={false}
                        />
                      ) : previewUrl ? (
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                          {file.name}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Upload button */}
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl bg-white py-8 md:py-10 cursor-pointer hover:border-blue-300 transition-colors"
          >
            <UploadCloud className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
            <span className="text-sm md:text-base text-slate-600">
              {photoFiles.length > 0 || existingMedia.length > 0
                ? "Add more files"
                : "Click to upload images or videos"}
            </span>
            <span className="text-xs md:text-sm text-slate-400">
              PNG, JPG, MP4 up to 10MB each
            </span>
            <input
              id="photo-upload"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="bg-blue-500 text-white text-sm md:text-base font-medium px-6 py-2.5 md:px-10 md:py-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : isEditing ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
          <Link href="/dashboard/boss_beginning/business">
            <button
              type="button"
              className="text-sm md:text-base font-medium px-6 py-2.5 md:px-10 md:py-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading...</div>}>
      <RequireSubscription
        title="Subscription required"
        description="You need an active subscription to register or edit a business. Subscribe to unlock the form."
      >
        <CreateBusinessForm />
      </RequireSubscription>
    </Suspense>
  );
}