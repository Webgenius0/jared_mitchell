"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  FiUser,
  FiLayout,
  FiEdit3,
  FiUpload,
  FiCheckCircle,
  FiSend,
  FiAward,
  FiCheckSquare,
} from "react-icons/fi";

export interface GuideStep {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const bossBeginningSteps: GuideStep[] = [
  { id: "get-started", number: "01", title: "Get Started", icon: FiUser },
  { id: "dashboard", number: "02", title: "Go to Dashboard", icon: FiLayout },
  {
    id: "create-business",
    number: "03",
    title: "Create Business",
    icon: FiEdit3,
  },
  {
    id: "spotlight-profile",
    number: "04",
    title: "Spotlight Profile",
    icon: FiAward,
  },
  {
    id: "apply-contest",
    number: "05",
    title: "Apply to Contest",
    icon: FiSend,
  },
  {
    id: "apply-spotlight",
    number: "06",
    title: "Apply Spotlight",
    icon: FiCheckSquare,
  },
  {
    id: "whats-next",
    number: "07",
    title: "What Happens Next",
    icon: FiCheckCircle,
  },
];

interface BossBeginningGuideLayoutProps {
  children: React.ReactNode;
}

const BossBeginningGuideLayout = ({
  children,
}: BossBeginningGuideLayoutProps) => {
  const steps = bossBeginningSteps;
  const [activeStep, setActiveStep] = useState(steps[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = steps.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveStep(steps[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentIdx = steps.findIndex((s) => s.id === activeStep);

  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      {/* Sticky Progress Nav */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-[1548px] mx-auto max-xl:px-5">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-3">
            {steps.map((step, idx) => {
              const isActive = step.id === activeStep;
              const isDone = idx < currentIdx;

              return (
                <button
                  key={step.id}
                  onClick={() => scrollToSection(step.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all shrink-0",
                    isActive
                      ? "bg-primary-blue text-white"
                      : isDone
                        ? "bg-primary-blue/10 text-primary-blue"
                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : isDone
                          ? "bg-primary-blue text-white"
                          : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {isDone ? (
                      <FiCheckCircle className="w-3 h-3" />
                    ) : (
                      step.number
                    )}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1548px] mx-auto max-xl:px-5 py-8 md:py-12">
        {children}
      </div>
    </div>
  );
};

export default BossBeginningGuideLayout;
