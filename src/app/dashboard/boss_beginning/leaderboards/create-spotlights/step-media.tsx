"use client";

import { FormData } from "./types";
import { StepCard, UploadField } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 4 — Media / Images                                            */
/* ------------------------------------------------------------------ */

export interface StepMediaProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepMedia({ form, update }: StepMediaProps) {
  return (
    <StepCard
      index={4}
      title="Images"
      description="Show us your business through photos"
    >
      <UploadField
        index={1}
        label="Business Owner Portrait"
        fileName={form.ownerPortrait}
        onChange={update("ownerPortrait")}
      />
      <UploadField
        index={2}
        label="Storefront / Workspace Photo"
        fileName={form.storefrontPhoto}
        onChange={update("storefrontPhoto")}
      />
      <UploadField
        index={3}
        label="Product or Service Photos"
        description="Show your creative process. This adds authenticity to your story."
        fileName={form.productPhotos}
        onChange={update("productPhotos")}
      />
      <UploadField
        index={4}
        label="Team Photo"
        required={false}
        fileName={form.teamPhoto}
        onChange={update("teamPhoto")}
      />
    </StepCard>
  );
}
