"use client";

import { FormData } from "./types";
import { StepCard, WordCountTextField, CheckboxField } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 6 — Spotlight Consideration (Optional)                        */
/* ------------------------------------------------------------------ */

export interface StepSpotlightConsiderationProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepSpotlightConsideration({
  form,
  update,
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
        maxChars={500}
        rows={3}
      />
      <WordCountTextField
        index={2}
        label="How would a spotlight help your business grow?"
        placeholder="Share your vision for how this exposure could benefit you..."
        value={form.howHelpGrow}
        onChange={update("howHelpGrow")}
        maxChars={500}
        rows={3}
      />

      <div className="pt-2">
        <h3 className="text-sm md:text-base font-medium text-slate-800 mb-1">
          Permissions
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mb-4">
          Please review and accept the following
        </p>
        <div className="h-px bg-slate-100 mb-4" />
        <div className="space-y-4">
          <CheckboxField
            label="I give permission to feature my business on OSI"
            checked={form.permissionFeature}
            onChange={update("permissionFeature")}
          />
          <CheckboxField
            label="I give permission to use submitted photos on OSI channels"
            checked={form.permissionPhotos}
            onChange={update("permissionPhotos")}
          />
          <CheckboxField
            label="I give permission to share my business story on OSI channels (website, social media, newsletters)"
            checked={form.permissionShareStory}
            onChange={update("permissionShareStory")}
          />
        </div>
      </div>
    </StepCard>
  );
}
