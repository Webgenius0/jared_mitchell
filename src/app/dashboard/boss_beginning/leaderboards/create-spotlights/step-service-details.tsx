"use client";

import { FormData } from "./types";
import { StepCard, RadioOption } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 5 — Service Details (Consent)                                 */
/* ------------------------------------------------------------------ */

export interface StepServiceDetailsProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepServiceDetails({ form, update }: StepServiceDetailsProps) {
  return (
    <StepCard
      index={5}
      title="Service Details"
      description="How do you serve your customers?"
    >
      <div>
        <label className="block text-sm md:text-base font-medium text-slate-700 mb-3">
          Do you offer in-person visits or online services?
          <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <RadioOption
            label="In-person only"
            selected={form.serviceMode === "in-person"}
            onSelect={() => update("serviceMode")("in-person")}
          />
          <RadioOption
            label="Online only"
            selected={form.serviceMode === "online"}
            onSelect={() => update("serviceMode")("online")}
          />
          <RadioOption
            label="Both in-person and online"
            selected={form.serviceMode === "both"}
            onSelect={() => update("serviceMode")("both")}
          />
        </div>
      </div>
    </StepCard>
  );
}
