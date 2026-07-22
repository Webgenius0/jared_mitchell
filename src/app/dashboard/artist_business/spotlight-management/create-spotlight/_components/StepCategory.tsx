"use client";

import React from "react";
import { Tag } from "lucide-react";
import { CategoryCard, InfoBox, StepCard } from "./FormFields";
import { CATEGORY_OPTIONS } from "./types";
import type { FormData } from "./types";

interface StepCategoryProps {
  form: FormData;
  update: <K extends keyof FormData>(key: K) => (value: FormData[K]) => void;
}

export function StepCategory({ form, update }: StepCategoryProps) {
  return (
    <StepCard
      index={2}
      title="Artist Category"
      description="Select your primary category. This determines your voting pool and spotlight placement."
    >
      <div>
        <h3 className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-800 mb-1.5">
          <Tag className="w-5 h-5 text-slate-400" />
          Select Your Category
        </h3>
        <p className="text-sm md:text-base text-slate-500 mb-5">
          Choose the category that best fits your work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORY_OPTIONS.map(opt => (
            <CategoryCard
              key={opt.title}
              title={opt.title}
              subtitle={opt.subtitle}
              selected={form.category === opt.title}
              onSelect={() => update("category")(opt.title)}
            />
          ))}
        </div>
      </div>

      <InfoBox variant="blue" title="Note:">
        Your selected category determines which weekly voting pool
        you&apos;ll enter and where you&apos;ll appear in the Artist
        Spotlight Hub. Category-specific review scoring will also be
        applied.
      </InfoBox>
    </StepCard>
  );
}
