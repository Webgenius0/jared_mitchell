"use client";

import React from "react";
import {
  BookOpen,
  Sparkles,
  MessageCircle,
  Target,
} from "lucide-react";
import { WordCountTextField, InfoBox, StepCard } from "./FormFields";
import type { FormData } from "./types";

interface StepStoryProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepStory({ form, update }: StepStoryProps) {
  return (
    <StepCard
      index={3}
      title="Artist Story"
      description="This is the most important window. Share your authentic story — this content will be used for spotlight pages and interviews."
    >
      <WordCountTextField
        index={1}
        label="Short Bio (2-4 sentences)"
        icon={BookOpen}
        helper="This appears on your spotlight card. Describe who you are as an artist and what your art represents."
        placeholder="I'm a visual artist from Los Angeles who creates vibrant murals that celebrate community and culture..."
        value={form.shortBio}
        onChange={update("shortBio")}
        maxChars={500}
        rows={3}
      />
      <WordCountTextField
        index={2}
        label="Full Artist Story (5-20 sentences)"
        icon={Sparkles}
        helper="This is your storytelling space — tell the full spotlight story. How did you get started? What struggles shaped you? What does art mean to you? What do you most want the community to know?"
        placeholder="My journey as an artist began when I was 15 years old..."
        value={form.fullStory}
        onChange={update("fullStory")}
        maxChars={3000}
        rows={6}
      />
      <WordCountTextField
        index={3}
        label="Why Should Your Story Be Spotlighted? (3-6 sentences)"
        icon={Sparkles}
        helper="Explain your uniqueness, impact, message, and authenticity."
        placeholder="My work deserves to be spotlighted because..."
        value={form.whySpotlighted}
        onChange={update("whySpotlighted")}
        maxChars={2000}
        rows={5}
      />
      <WordCountTextField
        index={4}
        label="What Message Do You Want to Share with the Community?"
        icon={MessageCircle}
        helper="This will be used for the 'pull quote' section of your spotlight."
        placeholder="I want to inspire others to..."
        value={form.messageToCommunity}
        onChange={update("messageToCommunity")}
        maxChars={1000}
        rows={4}
      />
      <WordCountTextField
        index={5}
        label="What Are Your Current Goals as an Artist?"
        icon={Target}
        helper="This informs the 'what's next' section of your spotlight page."
        placeholder="In the next year, I plan to..."
        value={form.currentGoals}
        onChange={update("currentGoals")}
        maxChars={1000}
        rows={4}
      />

      <InfoBox variant="blue" title="Tip:">
        Be authentic and specific. The best stories are genuine and
        help readers connect with your journey. Don&apos;t worry
        about perfection — focus on sharing your truth.
      </InfoBox>
    </StepCard>
  );
}
