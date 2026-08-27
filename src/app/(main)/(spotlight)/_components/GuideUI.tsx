"use client";

import { cn } from "@/lib/utils";
import { FiArrowRight, FiInfo, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

/* ─── Step Section ────────────────────────────────────────────────────── */

interface StepSectionProps {
  id: string;
  stepNumber: string;
  title: string;
  children: React.ReactNode;
}

export const StepSection = ({ id, stepNumber, title, children }: StepSectionProps) => (
  <section id={id} className="scroll-mt-20">
    <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl border border-slate-100 p-4 md:p-5 lg:p-6 xl:p-10">
      {/* Step Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5 lg:mb-6">
        <span className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-primary-blue text-white flex items-center justify-center text-base md:text-lg lg:text-xl font-bold shrink-0">
          {stepNumber}
        </span>
        <div>
          <span className="text-xs md:text-sm font-medium text-primary-blue uppercase tracking-wider">
            Step {stepNumber}
          </span>
          <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-primary-black mt-1">
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 md:space-y-5">{children}</div>
    </div>
  </section>
);

/* ─── Info Card ───────────────────────────────────────────────────────── */

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "highlight" | "success";
  children?: React.ReactNode;
}

export const InfoCard = ({
  title,
  description,
  icon,
  variant = "default",
  children,
}: InfoCardProps) => {
  const variantStyles = {
    default: "bg-slate-50 border-slate-100",
    highlight: "bg-primary-blue/5 border-primary-blue/20",
    success: "bg-emerald-50 border-emerald-200",
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-5 md:p-6",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
              variant === "highlight"
                ? "bg-primary-blue/10 text-primary-blue"
                : variant === "success"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
            )}
          >
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-base font-semibold text-primary-black">
            {title}
          </h4>
          <p className="text-sm text-secondary-black mt-1 leading-relaxed">
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ─── Button Callout ──────────────────────────────────────────────────── */

interface ButtonCalloutProps {
  label: string;
  description?: string;
  href?: string;
  onClick?: () => void;
}

export const ButtonCallout = ({ label, description, href, onClick }: ButtonCalloutProps) => (
  <div className="flex items-center gap-4 rounded-xl bg-primary-blue/5 border border-primary-blue/20 p-4 md:p-5">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <FiArrowRight className="w-4 h-4 text-primary-blue shrink-0" />
        <span className="text-sm md:text-base font-bold text-primary-blue">
          Click: &ldquo;{label}&rdquo;
        </span>
      </div>
      {description && (
        <p className="text-xs md:text-sm text-secondary-black mt-1 ml-6">
          {description}
        </p>
      )}
    </div>
    {href && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 bg-primary-blue text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-primary-blue/95 transition-colors"
      >
        Go →
      </a>
    )}
    {onClick && (
      <button
        onClick={onClick}
        className="shrink-0 bg-primary-blue text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-primary-blue/95 transition-colors"
      >
        Go →
      </button>
    )}
  </div>
);

/* ─── Tip Box ─────────────────────────────────────────────────────────── */

interface TipBoxProps {
  title?: string;
  children: React.ReactNode;
  variant?: "tip" | "important" | "note";
}

export const TipBox = ({ title, children, variant = "tip" }: TipBoxProps) => {
  const variants = {
    tip: {
      icon: <FiInfo className="w-4 h-4" />,
      bg: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-500",
      titleColor: "text-blue-700",
    },
    important: {
      icon: <FiAlertCircle className="w-4 h-4" />,
      bg: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-500",
      titleColor: "text-amber-700",
    },
    note: {
      icon: <FiCheckCircle className="w-4 h-4" />,
      bg: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-500",
      titleColor: "text-emerald-700",
    },
  };

  const v = variants[variant];

  return (
    <div className={cn("rounded-xl border p-4 md:p-5", v.bg)}>
      <div className="flex items-center gap-2 mb-2">
        <span className={v.iconColor}>{v.icon}</span>
        <span className={cn("text-sm font-semibold", v.titleColor)}>
          {title || (variant === "tip" ? "Tip" : variant === "important" ? "Important" : "Note")}
        </span>
      </div>
      <div className="text-sm text-secondary-black leading-relaxed">{children}</div>
    </div>
  );
};

/* ─── Visual Flow Arrow ───────────────────────────────────────────────── */

export const FlowArrow = () => (
  <div className="flex justify-center py-2">
    <div className="flex flex-col items-center gap-1">
      <div className="w-px h-6 bg-primary-blue/20" />
      <FiArrowRight className="w-4 h-4 text-primary-blue/40 rotate-90" />
      <div className="w-px h-6 bg-primary-blue/20" />
    </div>
  </div>
);

/* ─── Mock UI Screen ──────────────────────────────────────────────────── */

interface MockScreenProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const MockScreen = ({ title, children, className }: MockScreenProps) => (
  <div
    className={cn(
      "rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm",
      className
    )}
  >
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <span className="text-xs font-medium text-slate-400 ml-2">{title}</span>
    </div>
    <div className="p-4 md:p-5">{children}</div>
  </div>
);

/* ─── Breadcrumb Visual ───────────────────────────────────────────────── */

interface BreadcrumbProps {
  items: string[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <div className="flex items-center gap-2 flex-wrap text-xs md:text-sm">
    {items.map((item, idx) => (
      <span key={idx} className="flex items-center gap-2">
        {idx > 0 && <FiArrowRight className="w-3 h-3 text-slate-300" />}
        <span
          className={cn(
            "px-2 py-1 rounded-md",
            idx === items.length - 1
              ? "bg-primary-blue/10 text-primary-blue font-medium"
              : "bg-slate-100 text-slate-500"
          )}
        >
          {item}
        </span>
      </span>
    ))}
  </div>
);
