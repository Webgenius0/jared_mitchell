"use client";

import { SpotlightFormData, FormErrors } from "./types";
import { StepCard, UploadField } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 4 — Media / Images                                            */
/* ------------------------------------------------------------------ */

export interface StepMediaProps {
  form: SpotlightFormData;
  update: (key: keyof SpotlightFormData) => (file: File) => void;
  errors: FormErrors;
}

export function StepMedia({ form, update, errors }: StepMediaProps) {
  return (
    <StepCard
      index={4}
      title="Images"
      description="Show us your business through photos"
    >
      <UploadField
        index={1}
        label="Portrait Photo (Business Owner)"
        description="A professional or friendly headshot of the business owner."
        fileName={form.portraitPhoto}
        onChange={update("portraitPhoto")}
        error={errors.portraitPhoto}
      />
      <UploadField
        index={2}
        label="Storefront / Workspace Photo"
        description="Show where your business operates."
        fileName={form.storefrontWorkspacePhoto}
        onChange={update("storefrontWorkspacePhoto")}
        error={errors.storefrontWorkspacePhoto}
      />
      <UploadField
        index={3}
        label="Product / Service Photo 1"
        description="A photo of your product or service in action."
        fileName={form.productPhoto1}
        onChange={update("productPhoto1")}
        error={errors.productPhoto1}
      />
      <UploadField
        index={4}
        label="Product / Service Photo 2"
        description="Another photo showing your product or service."
        fileName={form.productPhoto2}
        onChange={update("productPhoto2")}
        error={errors.productPhoto2}
      />
      <UploadField
        index={5}
        label="Team Photo"
        description="A group photo of your team."
        required={false}
        fileName={form.teamPhoto}
        onChange={update("teamPhoto")}
      />
    </StepCard>
  );
}
