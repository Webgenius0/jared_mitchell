"use client";

import { SpotlightFormData, FormErrors, CATEGORY_OPTIONS } from "./types";
import { StepCard, TextField, SelectField } from "./field-components";


export interface StepBusinessInfoProps {
  form: SpotlightFormData;
  update: <K extends keyof SpotlightFormData>(key: K) => (value: SpotlightFormData[K]) => void;
  errors: FormErrors;
}

export function StepBusinessInfo({ form, update, errors }: StepBusinessInfoProps) {
  return (
    <StepCard
      index={1}
      title="Business Information"
      description="Tell us the basics about your business"
    >
      <TextField
        label="Business Name"
        required
        placeholder="Enter your business name"
        value={form.businessName}
        onChange={update("businessName")}
        error={errors.businessName}
      />
      <TextField
        label="Owner / Founder Name"
        required
        placeholder="Your name"
        value={form.ownerName}
        onChange={update("ownerName")}
        error={errors.ownerName}
      />
      <SelectField
        label="Business Category"
        required
        placeholder="Select a category"
        value={form.businessCategory}
        options={CATEGORY_OPTIONS}
        onChange={update("businessCategory")}
        error={errors.businessCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="Year Founded"
          required
          placeholder="e.g. 2020"
          value={form.yearFounded}
          onChange={update("yearFounded")}
          error={errors.yearFounded}
        />
        <TextField
          label="Business Website"
          required
          placeholder="https://yourbusiness.com"
          value={form.businessWebsite}
          onChange={update("businessWebsite")}
          error={errors.businessWebsite}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="City"
          required
          placeholder="Enter city"
          value={form.city}
          onChange={update("city")}
          error={errors.city}
        />
        <TextField
          label="State"
          required
          placeholder="Enter state"
          value={form.state}
          onChange={update("state")}
          error={errors.state}
        />
      </div>
    </StepCard>
  );
}
