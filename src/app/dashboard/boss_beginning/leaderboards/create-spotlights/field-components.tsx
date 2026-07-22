"use client";

import React, { ChangeEvent } from "react";
import { ChevronDown, UploadCloud } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  TextField                                                          */
/* ------------------------------------------------------------------ */

export interface TextFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export function TextField({
  label,
  required,
  placeholder,
  value,
  onChange,
  icon,
}: TextFieldProps) {
  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className={`w-full rounded-full border border-slate-200 py-2.5 md:py-3 text-sm md:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors ${
            icon ? "pl-10 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SelectField                                                        */
/* ------------------------------------------------------------------ */

export interface SelectFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export function SelectField({
  label,
  required,
  placeholder = "Select an option",
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-full border border-slate-200 px-4 py-2.5 md:py-3 text-sm md:text-base text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors bg-white"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WordCountTextField                                                 */
/* ------------------------------------------------------------------ */

export interface WordCountTextFieldProps {
  index: number;
  label: string;
  required?: boolean;
  placeholder?: string;
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
  value,
  onChange,
  maxChars,
  rows = 4,
}: WordCountTextFieldProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-700 mb-1.5">
        {index}. {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxChars}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 md:py-3 text-sm md:text-base text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
      />
      <div className="flex items-center justify-between mt-1.5 text-[11px] md:text-xs text-slate-400">
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

export interface UploadFieldProps {
  index: number;
  label: string;
  required?: boolean;
  description?: string;
  fileName: string | null;
  onChange: (fileName: string) => void;
}

export function UploadField({
  index,
  label,
  required = true,
  description,
  fileName,
  onChange,
}: UploadFieldProps) {
  const inputId = `upload-${index}-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label className="block text-sm md:text-base font-medium text-slate-700 mb-1">
        {index}. {label}
        {required ? (
          <span className="text-red-500">*</span>
        ) : (
          <span className="text-slate-400 font-normal"> (optional)</span>
        )}
      </label>
      {description && (
        <p className="text-xs md:text-sm text-slate-500 mb-2">{description}</p>
      )}
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 py-8 md:py-10 cursor-pointer hover:border-blue-300 transition-colors"
      >
        <UploadCloud className="w-6 h-6 md:w-7 md:h-7 text-slate-400" />
        <span className="text-sm md:text-base text-slate-600">
          {fileName ?? "Click to upload image"}
        </span>
        <span className="text-xs md:text-sm text-slate-400">
          PNG, JPG up to 10MB
        </span>
        <input
          id={inputId}
          type="file"
          accept="image/*"
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


export interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function RadioOption({ label, selected, onSelect }: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 rounded-full border px-4 py-3 md:py-3.5 text-left transition-colors ${
        selected
          ? "border-blue-400 bg-blue-50/60 text-blue-600"
          : "border-slate-200 text-slate-700 hover:border-slate-300"
      }`}
    >
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-blue-500" : "border-slate-300"
        }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-blue-500" />}
      </span>
      <span className="text-sm md:text-base">{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  CheckboxField                                                      */
/* ------------------------------------------------------------------ */

export interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: CheckboxFieldProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 md:w-[18px] md:h-[18px] rounded border-slate-300 text-blue-500 focus:ring-blue-400 flex-shrink-0"
      />
      <span className="text-sm md:text-base text-slate-700">{label}</span>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  StepCard (section wrapper)                                         */
/* ------------------------------------------------------------------ */

export interface StepCardProps {
  index: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function StepCard({
  index,
  title,
  description,
  children,
}: StepCardProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-50 text-blue-500 text-xs md:text-sm font-semibold flex items-center justify-center">
          {index}
        </span>
        <h2 className="text-base md:text-lg font-semibold text-slate-900">
          {title}
        </h2>
      </div>
      <p className="text-xs md:text-sm text-slate-500 mb-5">{description}</p>
      <div className="h-px bg-slate-100 mb-5" />
      <div className="space-y-5">{children}</div>
    </div>
  );
}
