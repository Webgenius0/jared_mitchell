"use client";

import React from "react";
import { User, Image as ImageIcon, Video } from "lucide-react";
import { UploadField, InfoBox, StepCard } from "./FormFields";
import type { FormData } from "./types";

interface StepMediaProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepMedia({ form, update }: StepMediaProps) {
  return (
    <StepCard
      index={4}
      title="Media Uploads"
      description="Upload photos and videos for your spotlight card, video intro, and page visuals. High-quality images make a better impression."
    >
      <InfoBox variant="amber" title="Requirements:">
        At least 1 professional headshot and 3-5 photos of your
        artwork are required. Accepted formats: JPG, PNG, HEIC for
        images; MP4, MOV for videos. Max size: 150MB per file.
      </InfoBox>

      <UploadField
        label="Professional Headshot / Portrait"
        required
        description="A clear, professional photo of you. This will be your main spotlight image."
        formats="JPG, PNG, HEIC (max 150MB)"
        icon={User}
        fileName={form.headshot}
        onChange={update("headshot")}
      />
      <UploadField
        label="Photos of Your Art / Work (3-5 photos)"
        required
        description="High-quality photos showcasing your best work. These will appear in your spotlight gallery."
        formats="JPG, PNG, HEIC (max 150MB) — Up to 5 files"
        icon={ImageIcon}
        fileName={form.artPhotos}
        onChange={update("artPhotos")}
      />
      <UploadField
        label="Behind-the-Scenes Photo"
        optional
        description="Show your creative process. This adds authenticity to your story."
        formats="JPG, PNG, HEIC (max 150MB)"
        icon={ImageIcon}
        fileName={form.behindTheScenes}
        onChange={update("behindTheScenes")}
      />
      <UploadField
        label="Short Intro Video (15-30 seconds)"
        optional
        description="Introduce yourself on camera! This helps the community connect with you."
        formats="MP4, MOV (max 150MB)"
        icon={Video}
        fileName={form.introVideo}
        onChange={update("introVideo")}
        accept="video/*"
      />

      <InfoBox variant="blue" title="Image Tips:">
        <ul className="list-disc pl-5 space-y-1 mt-1.5">
          <li>Use high-resolution images (at least 1200px wide)</li>
          <li>Ensure good lighting and clear focus</li>
          <li>
            Images will be auto-compressed for cards, grid, and
            spotlight pages
          </li>
          <li>Avoid heavily filtered or low-quality photos</li>
        </ul>
      </InfoBox>
    </StepCard>
  );
}
