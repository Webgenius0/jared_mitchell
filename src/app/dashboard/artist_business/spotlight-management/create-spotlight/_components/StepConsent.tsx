"use client";

import React from "react";
import { ShieldCheck, FileCheck, Video } from "lucide-react";
import { ConsentCard, InfoBox, StepCard } from "./FormFields";
import type { FormData } from "./types";

interface StepConsentProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepConsent({ form, update }: StepConsentProps) {
  return (
    <StepCard
      index={5}
      title="Consent & Rights"
      description="Legal protection and content permission. Please read carefully before agreeing."
    >
      <InfoBox variant="blue" title="Important Legal Information">
        By checking the boxes below, you grant OSI (Our Spotlight
        Initiative) permission to feature your work and story across
        our platform, social media, and promotional materials. You
        retain full rights to your original work.
      </InfoBox>

      <ConsentCard
        icon={ShieldCheck}
        title="Public Release Agreement"
        description="I agree that OSI can publish my photos, story, interview name, and lifestory for spotlight features, social media posts, and promotional materials. I understand this content may be shared across multiple platforms."
        checked={form.publicRelease}
        onChange={update("publicRelease")}
      />
      <ConsentCard
        icon={FileCheck}
        title="Ownership Declaration"
        description="I confirm that I own the rights to all submitted artwork, photos, videos, and content. I have not infringed on any copyrights, trademarks, or intellectual property rights. I am legally authorized to grant OSI permission to use this content."
        checked={form.ownershipDeclaration}
        onChange={update("ownershipDeclaration")}
      />
      <ConsentCard
        icon={Video}
        title="Interview Permission"
        description="I agree to participate in video interviews and grant OSI permission to record, edit, and publish these interviews. I understand that interviews may be used for spotlight features, media, and promotional content."
        checked={form.interviewPermission}
        onChange={update("interviewPermission")}
      />

      <InfoBox variant="blue" title="Note:">
        All agreements are required to complete your submission. You
        retain full ownership of your work — we&apos;re only asking
        for permission to feature you on our platform and help
        promote your artistry.
      </InfoBox>
    </StepCard>
  );
}
