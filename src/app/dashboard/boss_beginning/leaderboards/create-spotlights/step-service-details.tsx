"use client";

import { SpotlightFormData, FormErrors } from "./types";
import { StepCard, RadioOption, ErrorText } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 5 — Service Details                                           */
/* ------------------------------------------------------------------ */

export interface StepServiceDetailsProps {
  form: SpotlightFormData;
  update: <K extends keyof SpotlightFormData>(key: K) => (value: SpotlightFormData[K]) => void;
  errors: FormErrors;
}

export function StepServiceDetails({ form, update, errors }: StepServiceDetailsProps) {
  return (
    <StepCard
      index={5}
      title="Service Details"
      description="How do you serve your customers?"
    >
      <div>
        <label className="block text-sm md:text-base font-medium text-slate-700 mb-3">
          Service Type
          <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <RadioOption
            label="In-person only"
            selected={form.serviceType === "in-person"}
            onSelect={() => update("serviceType")("in-person")}
          />
          <RadioOption
            label="Online only"
            selected={form.serviceType === "online"}
            onSelect={() => update("serviceType")("online")}
          />
          <RadioOption
            label="Both in-person and online"
            selected={form.serviceType === "both"}
            onSelect={() => update("serviceType")("both")}
          />
        </div>
        <ErrorText error={errors.serviceType} />
      </div>
    </StepCard>
  );
}
