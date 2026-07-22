"use client";

import { FormData, CATEGORY_OPTIONS } from "./types";
import { StepCard, TextField, SelectField } from "./field-components";


export interface StepBusinessInfoProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepBusinessInfo({ form, update }: StepBusinessInfoProps) {
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
      />
      <TextField
        label="Owner / Founder Name"
        required
        placeholder="Your name"
        value={form.ownerName}
        onChange={update("ownerName")}
      />
      <SelectField
        label="Business Category"
        required
        placeholder="Select a category"
        value={form.businessCategory}
        options={CATEGORY_OPTIONS}
        onChange={update("businessCategory")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="Year Founded"
          required
          placeholder="2020"
          value={form.yearFounded}
          onChange={update("yearFounded")}
        />
        <TextField
          label="Business Website"
          required
          placeholder="https://yourbusiness.com"
          value={form.businessWebsite}
          onChange={update("businessWebsite")}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="City"
          required
          placeholder="Enter city"
          value={form.city}
          onChange={update("city")}
        />
        <TextField
          label="State"
          required
          placeholder="Enter state"
          value={form.state}
          onChange={update("state")}
        />
      </div>
    </StepCard>
  );
}
