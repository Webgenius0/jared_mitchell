"use client";

import React, { ChangeEvent } from "react";
import { UploadCloud, Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TextField                                                          */
/* ------------------------------------------------------------------ */

interface TextFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  helper?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  type?: string;
}

export function TextField({
  label,
  required,
  optional,
  placeholder,
  helper,
  value,
  onChange,
  icon: Icon,
  type = "text",
}: TextFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-700 mb-2">
        {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && (
          <span className="text-slate-400 font-normal text-sm md:text-base">
            (optional)
          </span>
        )}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-200 px-5 py-3 md:py-3.5 text-base md:text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
      />
      {helper && (
        <p className="text-xs md:text-sm text-slate-400 mt-1.5">{helper}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TextAreaField                                                      */
/* ------------------------------------------------------------------ */

interface TextAreaFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  helper?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  rows?: number;
}

export function TextAreaField({
  label,
  required,
  optional,
  placeholder,
  helper,
  value,
  onChange,
  icon: Icon,
  rows = 3,
}: TextAreaFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-700 mb-2">
        {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && (
          <span className="text-slate-400 font-normal text-sm md:text-base">
            (optional)
          </span>
        )}
      </label>
      {helper && (
        <p className="text-xs md:text-sm text-slate-400 mb-2">{helper}</p>
      )}
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        className="w-full resize-none rounded-xl border border-slate-200 px-5 py-3 md:py-3.5 text-base md:text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WordCountTextField                                                 */
/* ------------------------------------------------------------------ */

interface WordCountTextFieldProps {
  index: number;
  label: string;
  required?: boolean;
  placeholder?: string;
  helper?: string;
  icon?: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
  maxChars: number;
  rows?: number;
}

export function WordCountTextField({
  index,
  label,
  required = true,
  placeholder,
  helper,
  icon: Icon,
  value,
  onChange,
  maxChars,
  rows = 4,
}: WordCountTextFieldProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div>
      <label className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-700 mb-1.5">
        {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />}
        {index}. {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {helper && (
        <p className="text-xs md:text-sm text-slate-400 mb-2">{helper}</p>
      )}
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxChars}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        className="w-full resize-none rounded-xl border border-slate-200 px-5 py-3 md:py-3.5 text-base md:text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
      />
      <div className="flex items-center justify-between mt-1.5 text-xs md:text-sm text-slate-400">
        <span>
          {wordCount} Word{wordCount === 1 ? "" : "s"}
        </span>
        <span>
          {value.length}/{maxChars} characters
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  UploadField                                                        */
/* ------------------------------------------------------------------ */

interface UploadFieldProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  description?: string;
  formats: string;
  icon: React.ComponentType<{ className?: string }>;
  fileName: string | null;
  onChange: (fileName: string) => void;
  accept?: string;
}

export function UploadField({
  label,
  required,
  optional,
  description,
  formats,
  icon: Icon,
  fileName,
  onChange,
  accept = "image/*",
}: UploadFieldProps) {
  const inputId = `upload-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-700 mb-1.5">
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && (
          <span className="text-slate-400 font-normal text-sm md:text-base">
            (optional)
          </span>
        )}
      </label>
      {description && (
        <p className="text-xs md:text-sm text-slate-400 mb-2">
          {description}
        </p>
      )}
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 py-10 md:py-12 cursor-pointer hover:border-blue-300 transition-colors"
      >
        <UploadCloud className="w-8 h-8 md:w-9 md:h-9 text-slate-400" />
        <span className="text-base md:text-lg text-slate-600">
          {fileName ?? "Click to upload or drag and drop"}
        </span>
        <span className="text-sm md:text-base text-slate-400">{formats}</span>
        <input
          id={inputId}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) onChange(file.name);
          }}
        />
      </label>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  InfoBox                                                            */
/* ------------------------------------------------------------------ */

interface InfoBoxProps {
  variant: "amber" | "blue";
  title?: string;
  children: React.ReactNode;
}

export function InfoBox({ variant, title, children }: InfoBoxProps) {
  const styles =
    variant === "amber"
      ? "bg-amber-50 border-amber-100 text-amber-800"
      : "bg-blue-50 border-blue-100 text-blue-800";
  return (
    <div
      className={`rounded-xl border p-5 md:p-6 text-sm md:text-base leading-relaxed ${styles}`}
    >
      {title && <p className="font-semibold mb-1.5">{title}</p>}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CategoryCard                                                       */
/* ------------------------------------------------------------------ */

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryCard({
  title,
  subtitle,
  selected,
  onSelect,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative text-left rounded-xl border p-5 md:p-6 transition-colors ${
        selected
          ? "border-blue-400 bg-blue-50/50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </span>
      )}
      <p className="text-base md:text-lg font-medium text-slate-800">
        {title}
      </p>
      {subtitle && (
        <p className="text-sm md:text-base text-slate-400 mt-1">{subtitle}</p>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  ConsentCard                                                        */
/* ------------------------------------------------------------------ */

interface ConsentCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ConsentCard({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: ConsentCardProps) {
  return (
    <label
      className={`flex items-start gap-4 rounded-xl border p-5 md:p-6 cursor-pointer transition-colors ${
        checked
          ? "border-blue-300 bg-blue-50/40"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 md:w-[22px] md:h-[22px] rounded border-slate-300 text-blue-500 focus:ring-blue-400 flex-shrink-0"
      />
      <div>
        <p className="flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-800">
          <Icon className="w-5 h-5 text-blue-500" />
          {title}
        </p>
        <p className="text-sm md:text-base text-slate-500 mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  StepCard (section wrapper)                                         */
/* ------------------------------------------------------------------ */

interface StepCardProps {
  index: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function StepCard({ index, title, description, children }: StepCardProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-50 text-blue-500 text-sm md:text-base font-semibold flex items-center justify-center">
          {index}
        </span>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
          {title}
        </h2>
      </div>
      <p className="text-sm md:text-base text-slate-500 mb-6">{description}</p>
      <div className="h-px bg-slate-100 mb-6" />
      <div className="space-y-6">{children}</div>
    </div>
  );
}
