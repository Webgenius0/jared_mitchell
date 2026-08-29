"use client";

import Link from "next/link";
import Container from "@/Components/Common/Container";
import {
  FiUser,
  FiEdit3,
  FiUpload,
  FiCheckCircle,
  FiArrowRight,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";

type SpotlightType = "artist" | "business";

interface SpotlightGuideProps {
  type: SpotlightType;
}

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up or log in to your OSI account",
    icon: FiUser,
  },
  {
    number: "02",
    title: "Create Profile",
    description: "Build your spotlight profile with your story",
    icon: FiEdit3,
  },
  {
    number: "03",
    title: "Complete Application",
    description: "Upload media and review your submission",
    icon: FiUpload,
  },
  {
    number: "04",
    title: "Submit",
    description: "Apply to compete in the weekly spotlight",
    icon: FiCheckCircle,
  },
];

const SpotlightGuide = ({ type }: SpotlightGuideProps) => {
  const isArtist = type === "artist";

  return (
    <section className="section">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="section_title 2xl:text-5xl">
            How to Enter the Spotlight
          </h2>
          <p className="section_sub_title max-w-[800px] mx-auto">
            Not sure where to start? Follow the simple step-by-step guide to
            create your profile, complete your application, and enter the
            Spotlight Contest.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="mt-6 md:mt-8 lg:mt-10 xl:mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white custom_border custom_shadow p-3.5 md:p-4 lg:p-5 xl:p-6 text-center flex flex-col items-center gap-2 lg:gap-3 h-full transition-transform duration-300 hover:-translate-y-1">
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

        {/* Two Choice Cards */}
        <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {/* Artist Card */}
          <div
            className={`relative p-4 md:p-5 lg:p-6 xl:p-8 transition-all duration-300 hover:shadow-lg ${
              isArtist
                ? "bg-primary-blue text-white ring-2 ring-primary-blue ring-offset-2"
                : "bg-white custom_border custom_shadow"
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center shrink-0 ${
                  isArtist ? "bg-white/20" : "bg-primary-blue/10"
                }`}
              >
                <FiAward
                  className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${
                    isArtist ? "text-white" : "text-primary-blue"
                  }`}
                />
              </span>

              <div className="flex-1">
                <h3
                  className={`text-base md:text-lg lg:text-xl font-semibold ${
                    isArtist ? "text-white" : "text-primary-black"
                  }`}
                >
                  Artist Spotlight
                </h3>
                <p
                  className={`text-xs md:text-sm lg:text-base mt-1.5 lg:mt-2 ${
                    isArtist ? "text-white/80" : "text-secondary-black"
                  }`}
                >
                  For artists ready to showcase their talent and enter the
                  Spotlight.
                </p>

                <Link
                  href="/spotlight-guide/artist"
                  className={`inline-flex items-center gap-2 mt-3 lg:mt-4 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                    isArtist
                      ? "bg-white text-primary-blue hover:bg-white/90"
                      : "bg-primary-blue text-white hover:bg-primary-blue/95"
                  }`}
                >
                  View Artist Guide
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Business Card */}
          <div
            className={`relative p-4 md:p-5 lg:p-6 xl:p-8 transition-all duration-300 hover:shadow-lg ${
              !isArtist
                ? "bg-primary-blue text-white ring-2 ring-primary-blue ring-offset-2"
                : "bg-white custom_border custom_shadow"
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center shrink-0 ${
                  !isArtist ? "bg-white/20" : "bg-primary-blue/10"
                }`}
              >
                <FiBriefcase
                  className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${
                    !isArtist ? "text-white" : "text-primary-blue"
                  }`}
                />
              </span>

              <div className="flex-1">
                <h3
                  className={`text-base md:text-lg lg:text-xl font-semibold ${
                    !isArtist ? "text-white" : "text-primary-black"
                  }`}
                >
                  Business Spotlight
                </h3>
                <p
                  className={`text-xs md:text-sm lg:text-base mt-1.5 lg:mt-2 ${
                    !isArtist ? "text-white/80" : "text-secondary-black"
                  }`}
                >
                  For businesses ready to create their profile and enter
                  Business Spotlight.
                </p>

                <Link
                  href="/spotlight-guide/business"
                  className={`inline-flex items-center gap-2 mt-3 lg:mt-4 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                    !isArtist
                      ? "bg-white text-primary-blue hover:bg-white/90"
                      : "bg-primary-blue text-white hover:bg-primary-blue/95"
                  }`}
                >
                  View Business Guide
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpotlightGuide;
