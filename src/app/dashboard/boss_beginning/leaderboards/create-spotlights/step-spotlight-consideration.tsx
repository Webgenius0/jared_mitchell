"use client";

import { SpotlightFormData, FormErrors } from "./types";
import { StepCard, WordCountTextField, CheckboxField, ErrorText } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 6 — Spotlight Consideration                                   */
/* ------------------------------------------------------------------ */

export interface StepSpotlightConsiderationProps {
  form: SpotlightFormData;
  update: <K extends keyof SpotlightFormData>(key: K) => (value: SpotlightFormData[K]) => void;
  errors: FormErrors;
}

export function StepSpotlightConsideration({
  form,
  update,
  errors,
}: StepSpotlightConsiderationProps) {
  return (
    <StepCard
      index={6}
      title="Spotlight Consideration"
      description="Help us understand your goals"
    >
      <WordCountTextField
        index={1}
        label="Why do you want your business featured?"
        placeholder="Tell us what drives your interest in being featured..."
        value={form.whyFeatured}
        onChange={update("whyFeatured")}
        maxChars={3000}
        rows={3}
      />
      <WordCountTextField
        index={2}
        label="What is your growth vision?"
        placeholder="Share your vision for how this exposure could benefit your growth..."
        value={form.growthVision}
        onChange={update("growthVision")}
        maxChars={3000}
        rows={3}
      />

      <div className="pt-2">
        <h3 className="text-sm md:text-base font-medium text-slate-800 mb-1">
          Permissions
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mb-4">
          Please review and accept the following (all are required)
        </p>
        <div className="h-px bg-slate-100 mb-4" />
        <div className="space-y-4">
          <CheckboxField
            label="I give permission to feature my business on OSI"
            checked={form.permissionFeaturedOnOsi}
            onChange={update("permissionFeaturedOnOsi")}
          />
          <CheckboxField
            label="I give permission to use submitted photos on OSI channels"
            checked={form.permissionUseSubmittedPhotos}
            onChange={update("permissionUseSubmittedPhotos")}
          />
          <CheckboxField
            label="I give permission to share my business story on OSI channels (website, social media, newsletters)"
            checked={form.permissionShareBusinessStory}
            onChange={update("permissionShareBusinessStory")}
          />
        </div>
        <ErrorText error={errors.permissionFeaturedOnOsi} />
      </div>
    </StepCard>
  );
}
