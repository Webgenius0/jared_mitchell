"use client";

import { SpotlightFormData, FormErrors } from "./types";
import { StepCard, WordCountTextField } from "./field-components";

/* ------------------------------------------------------------------ */
/*  Step 3 — Business Story                                            */
/* ------------------------------------------------------------------ */

export interface StepBusinessStoryProps {
  form: SpotlightFormData;
  update: <K extends keyof SpotlightFormData>(key: K) => (value: SpotlightFormData[K]) => void;
  errors: FormErrors;
}

export function StepBusinessStory({ form, update, errors }: StepBusinessStoryProps) {
  return (
    <StepCard
      index={3}
      title="Business Story"
      description="Help us understand your journey and what makes you special"
    >
      <WordCountTextField
        index={1}
        label="Tell us your business story"
        placeholder="Where it started, why it exists, and the mission behind it..."
        value={form.businessStory}
        onChange={update("businessStory")}
        maxChars={3000}
        rows={5}
        error={errors.businessStory}
      />
      <WordCountTextField
        index={2}
        label="What products or services do you offer?"
        placeholder="List what customers can purchase or experience..."
        value={form.productsServices}
        onChange={update("productsServices")}
        maxChars={3000}
        rows={5}
        error={errors.productsServices}
      />
      <WordCountTextField
        index={3}
        label="What challenges has your business overcome?"
        placeholder="Share the milestones, struggles, or turning points..."
        value={form.challengesOvercome}
        onChange={update("challengesOvercome")}
        maxChars={3000}
        rows={5}
        error={errors.challengesOvercome}
      />
      <WordCountTextField
        index={4}
        label="What makes your business unique? (Unique Factor)"
        placeholder="What separates you from competitors..."
        value={form.uniqueFactor}
        onChange={update("uniqueFactor")}
        maxChars={2000}
        rows={3}
        error={errors.uniqueFactor}
      />
      <WordCountTextField
        index={5}
        label="Who is your target customer?"
        placeholder="Describe their demographics, needs, or interests..."
        value={form.targetCustomer}
        onChange={update("targetCustomer")}
        maxChars={2000}
        rows={3}
        error={errors.targetCustomer}
      />
    </StepCard>
  );
}
