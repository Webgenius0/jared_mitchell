"use client";

import { Globe } from "lucide-react";
import { BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";

import { FormData, CONTACT_TIME_OPTIONS } from "./types";
import { StepCard, TextField, SelectField } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 2 — Contact Information                                       */
/* ------------------------------------------------------------------ */

export interface StepContactInfoProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepContactInfo({ form, update }: StepContactInfoProps) {
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
        />
        <TextField
          label="Phone Number"
          required
          placeholder="(555) 123-4567"
          value={form.phone}
          onChange={update("phone")}
        />
      </div>
      <SelectField
        label="Best time to contact you"
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
            label="Instagram"
            placeholder="@yourbusiness"
            value={form.instagram}
            onChange={update("instagram")}
            icon={<BsInstagram className="w-4 h-4" />}
          />
          <TextField
            label="TikTok"
            placeholder="@yourbusiness"
            value={form.tiktok}
            onChange={update("tiktok")}
          />
          <TextField
            label="Facebook"
            placeholder="facebook.com/yourbusiness"
            value={form.facebook}
            onChange={update("facebook")}
            icon={<FaFacebook className="w-4 h-4" />}
          />
          <TextField
            label="YouTube"
            placeholder="youtube.com/@yourchannel"
            value={form.youtube}
            onChange={update("youtube")}
            icon={<BsYoutube className="w-4 h-4" />}
          />
          <TextField
            label="Google Business Profile"
            placeholder="Google Business URL"
            value={form.googleBusinessProfile}
            onChange={update("googleBusinessProfile")}
          />
          <TextField
            label="LinkedIn"
            placeholder="linkedin.com/company/yourbusiness"
            value={form.linkedin}
            onChange={update("linkedin")}
            icon={<BsLinkedin className="w-4 h-4" />}
          />
        </div>
        <div className="mt-5">
          <TextField
            label="Website URL"
            placeholder="https://yourbusiness.com"
            value={form.websiteUrl}
            onChange={update("websiteUrl")}
            icon={<Globe className="w-4 h-4" />}
          />
        </div>
      </div>
    </StepCard>
  );
}
