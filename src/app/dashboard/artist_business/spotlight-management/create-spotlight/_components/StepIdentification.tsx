"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
} from "lucide-react";
import { TextField, StepCard } from "./FormFields";
import type { FormData } from "./types";

interface StepIdentificationProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepIdentification({ form, update }: StepIdentificationProps) {
  return (
    <StepCard
      index={1}
      title="Artist Identification"
      description="Verify who you are and create your clean profile. All required fields must be completed."
    >
      <TextField
        label="Full Legal Name"
        required
        placeholder="John Doe"
        value={form.fullLegalName}
        onChange={update("fullLegalName")}
        icon={User}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Email Address"
          required
          placeholder="artist@example.com"
          helper="Used for confirmation and spotlight approval"
          value={form.email}
          onChange={update("email")}
          icon={Mail}
        />
        <TextField
          label="Phone Number"
          required
          placeholder="(555) 123-4567"
          helper="Used ONLY for interview coordination"
          value={form.phone}
          onChange={update("phone")}
          icon={Phone}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TextField
          label="Date of Birth"
          required
          type="date"
          helper="Must be 18+"
          value={form.dateOfBirth}
          onChange={update("dateOfBirth")}
          icon={Calendar}
        />
        <TextField
          label="City"
          required
          placeholder="Los Angeles"
          helper="Current city"
          value={form.city}
          onChange={update("city")}
          icon={MapPin}
        />
        <TextField
          label="State"
          required
          placeholder="CA"
          helper="Current state"
          value={form.state}
          onChange={update("state")}
          icon={MapPin}
        />
      </div>

      <div className="pt-2">
        <h3 className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-800 mb-1.5">
          <Globe className="w-5 h-5 text-slate-400" />
          Social Media Handles
        </h3>
        <p className="text-sm md:text-base text-slate-500 mb-4">
          At least one social media handle is required
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Instagram"
            optional
            placeholder="@yourusername"
            value={form.instagram}
            onChange={update("instagram")}
          />
          <TextField
            label="TikTok"
            optional
            placeholder="@yourusername"
            value={form.tiktok}
            onChange={update("tiktok")}
          />
          <TextField
            label="Facebook"
            optional
            placeholder="facebook.com/yourpage"
            value={form.facebook}
            onChange={update("facebook")}
          />
          <TextField
            label="YouTube"
            optional
            placeholder="youtube.com/@yourchannel"
            value={form.youtube}
            onChange={update("youtube")}
          />
        </div>
        <div className="mt-6">
          <TextField
            label="Website or Portfolio Link"
            optional
            placeholder="https://yourportfolio.com"
            value={form.portfolioLink}
            onChange={update("portfolioLink")}
          />
        </div>
      </div>
    </StepCard>
  );
}
