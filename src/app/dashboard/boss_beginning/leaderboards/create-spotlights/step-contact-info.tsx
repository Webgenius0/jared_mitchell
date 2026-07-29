"use client";

import { BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaFacebook, FaTiktok } from "react-icons/fa6";

import { SpotlightFormData, FormErrors, CONTACT_TIME_OPTIONS } from "./types";
import { StepCard, TextField, SelectField } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 2 — Contact Information                                       */
/* ------------------------------------------------------------------ */

export interface StepContactInfoProps {
  form: SpotlightFormData;
  update: <K extends keyof SpotlightFormData>(key: K) => (value: SpotlightFormData[K]) => void;
  errors: FormErrors;
}

export function StepContactInfo({ form, update, errors }: StepContactInfoProps) {
  return (
    <StepCard
      index={2}
      title="Contact Information"
      description="How can people reach you?"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TextField
          label="Email"
          required
          placeholder="you@email.com"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
        />
        <TextField
          label="Phone Number"
          required
          placeholder="(555) 123-4567"
          value={form.phone}
          onChange={update("phone")}
          error={errors.phone}
        />
      </div>
      <SelectField
        label="Best time to contact you"
        required
        placeholder="Select a time"
        value={form.bestTimeToContact}
        options={CONTACT_TIME_OPTIONS}
        onChange={update("bestTimeToContact")}
      />

      <div className="pt-2">
        <h3 className="text-sm md:text-base font-medium text-slate-800 mb-1">
          Social Media Links
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mb-4">
          Connect your business profiles
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TextField
            label="Instagram URL"
            placeholder="https://instagram.com/yourbusiness"
            value={form.instagram}
            onChange={update("instagram")}
            icon={<BsInstagram className="w-4 h-4" />}
          />
          <TextField
            label="TikTok URL"
            placeholder="https://tiktok.com/@yourbusiness"
            value={form.tiktok}
            onChange={update("tiktok")}
            icon={<FaTiktok className="w-4 h-4" />}
          />
          <TextField
            label="Facebook URL"
            placeholder="https://facebook.com/yourbusiness"
            value={form.facebook}
            onChange={update("facebook")}
            icon={<FaFacebook className="w-4 h-4" />}
          />
          <TextField
            label="YouTube URL"
            placeholder="https://youtube.com/@yourchannel"
            value={form.youtube}
            onChange={update("youtube")}
            icon={<BsYoutube className="w-4 h-4" />}
          />
          <TextField
            label="Google Business Profile URL"
            placeholder="https://business.google.com/..."
            value={form.googleBusinessProfile}
            onChange={update("googleBusinessProfile")}
          />
          <TextField
            label="LinkedIn URL"
            placeholder="https://linkedin.com/company/yourbusiness"
            value={form.linkedin}
            onChange={update("linkedin")}
            icon={<BsLinkedin className="w-4 h-4" />}
          />
          <TextField
            label="Fanbase URL"
            placeholder="https://fanbase.com/yourbusiness"
            value={form.fanbaseUrl}
            onChange={update("fanbaseUrl")}
          />
        </div>
      </div>
    </StepCard>
  );
}
