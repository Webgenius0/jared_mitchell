"use client";

import Link from "next/link";
import Container from "@/Components/Common/Container";
import {
  FiUser,
  FiEdit3,
  FiUpload,
  FiCheckCircle,
  FiArrowRight,
  FiBriefcase,
  FiSend,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up for a business account on OSI",
    icon: FiUser,
  },
  {
    number: "02",
    title: "Complete Profile",
    description: "Build your business profile with your story",
    icon: FiEdit3,
  },
  {
    number: "03",
    title: "Prepare Entry",
    description: "Upload media and add your business details",
    icon: FiUpload,
  },
  {
    number: "04",
    title: "Apply",
    description: "Submit your entry to the contest",
    icon: FiSend,
  },
  {
    number: "05",
    title: "You're Entered",
    description: "Your business is now competing in the OSI Top Business Award",
    icon: FiCheckCircle,
  },
];

const BossBeginningGuide = () => {
  return (
    <section className="section">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="section_title 2xl:text-5xl">
            How to Enter the OSI Top Business Award
          </h2>
          <p className="section_sub_title max-w-[800px] mx-auto">
            Not sure where to start? Follow the step-by-step guide to create
            your profile, complete your entry, and submit your OSI Top Business
            Award application.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="mt-10 md:mt-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white custom_border custom_shadow rounded-2xl p-5 md:p-6 text-center flex flex-col items-center gap-3 h-full transition-transform duration-300 hover:-translate-y-1">
                  {/* Number Badge */}
                  <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-blue/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-blue" />
                  </span>

                  {/* Step Number */}
                  <span className="text-xs md:text-sm font-bold text-primary-blue/40">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-semibold text-primary-black">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-secondary-black leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector (hidden on mobile, visible on md+) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 md:-right-3 lg:-right-4 transform -translate-y-1/2 z-10">
                    <FiArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary-blue/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Dedicated Guide Page */}
        <div className="mt-12 md:mt-16">
          <div className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 bg-primary-blue text-white text-center">
            <div className="flex flex-col items-center">
              <span className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <FiBriefcase className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </span>

              <h3 className="text-xl md:text-2xl font-semibold text-white">
                Ready to Get Started?
              </h3>
              <p className="text-sm md:text-base text-white/80 mt-2 max-w-lg">
                Follow the complete step-by-step guide to understand exactly
                what to do, where to click, and how to submit your OSI Top Business Award
                entry.
              </p>

              <Link
                href="/osi-top-business-award-guide"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white text-primary-blue text-sm font-medium hover:bg-white/90 transition-colors"
              >
                View OSI Top Business Award Guide
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BossBeginningGuide;
