"use client";

import React from "react";
import { Check } from "lucide-react";

interface SuccessScreenProps {
  onViewDashboard: () => void;
}

export function SuccessScreen({ onViewDashboard }: SuccessScreenProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-10 md:p-16 flex flex-col items-center text-center">
      <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <Check className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
      </span>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
        Submission Successful!
      </h2>
      <p className="text-base md:text-lg text-slate-500 max-w-lg mb-8">
        Thank you for submitting your artist spotlight application.
        We&apos;re excited to review your story and work!
      </p>
      <button
        type="button"
        onClick={onViewDashboard}
        className="bg-blue-500 text-white text-base md:text-lg font-medium px-10 py-3 md:py-3.5 rounded-full hover:bg-blue-600 transition-colors"
      >
        View Dashboard
      </button>
    </div>
  );
}
