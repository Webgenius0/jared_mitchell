"use client";

import Link from "next/link";
import Container from "@/Components/Common/Container";
import { Button } from "@/Components/Common/Button";
import GuideLayout, {
  businessSteps,
} from "@/app/(main)/(spotlight)/_components/GuideLayout";
import {
  StepSection,
  InfoCard,
  ButtonCallout,
  TipBox,
  MockScreen,
  Breadcrumb,
  FlowArrow,
} from "@/app/(main)/(spotlight)/_components/GuideUI";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEdit3,
  FiImage,
  FiFileText,
  FiCheck,
  FiSend,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiGlobe,
  FiInstagram,
  FiBriefcase,
  FiShield,
  FiStar,
  FiLayout,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

const BusinessGuidePage = () => {
  return (
    <GuideLayout type="business">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-blue to-secondary-blue rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 xl:p-16 text-center text-white mb-6 md:mb-8 lg:mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-4">
          Business Spotlight Guide
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight">
          Your Step-by-Step Guide to Entering Business Spotlight
        </h1>
        <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl mt-3 md:mt-4 lg:mt-6 max-w-[800px] mx-auto">
          From creating your account to submitting your application, we&apos;ll
          show you exactly where to go and what to do next.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-1.5 md:gap-2 lg:gap-3 mt-5 md:mt-6 lg:mt-8 flex-wrap">
          {businessSteps.map((step, idx) => (
            <span
              key={step.id}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-xs md:text-sm"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                {step.number}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </span>
          ))}
        </div>
      </div>

      <Container>
        <div className="max-w-[900px] mx-auto space-y-6 md:space-y-8 lg:space-y-10">
          {/* ─── STEP 01: Create Account ─────────────────────────────── */}
          <StepSection id="get-started" stepNumber="01" title="Create an Account or Log In">
            <p className="text-secondary-black text-sm md:text-base">
              Before you can participate in Business Spotlight, you need an OSI
              account. If you already have one, simply log in.
            </p>

            <MockScreen title="auth/login">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Email address
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <FiMail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">
                      Type your email address...
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Password
                  </label>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <FiLock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Password...</span>
                  </div>
                </div>
                <div className="bg-primary-blue text-white text-center py-2.5 rounded-xl font-medium text-sm">
                  Log in
                </div>
                <p className="text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <span className="text-primary-blue font-medium">Sign up</span>
                </p>
              </div>
            </MockScreen>

            <InfoCard
              title="What happens here?"
              description="Enter your email and password to access your account. If you don't have an account yet, click 'Sign up' to create one."
              icon={<FiUser className="w-4 h-4" />}
            />

            <ButtonCallout
              label="Log In"
              description="Go to the login page at /auth/login"
              href="/auth/login"
            />
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 02: Choose Account Type ────────────────────────── */}
          <StepSection id="account-type" stepNumber="02" title="Choose Your Account Type">
            <p className="text-secondary-black text-sm md:text-base">
              When you register, you&apos;ll choose your account type. For
              Business Spotlight, you need a{" "}
              <strong>Business</strong> account.
            </p>

            <MockScreen title="auth/register">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                      Full Name
                    </label>
                    <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-400">
                      Your name
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-1.5">
                      Email
                    </label>
                    <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-400">
                      Email address
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Choose Your Role
                  </label>
                  <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary-blue font-medium">
                        Business ✓
                      </span>
                      <FiArrowRight className="w-4 h-4 text-primary-blue" />
                    </div>
                  </div>
                </div>
              </div>
            </MockScreen>

            <InfoCard
              title="Business Account"
              description="For businesses, entrepreneurs, and community leaders. Choose this if you own or operate a business that you want to spotlight."
              icon={<FiBriefcase className="w-4 h-4" />}
              variant="highlight"
            />

            <InfoCard
              title="What is this?"
              description="Select 'Business' as your role during registration. This gives you access to the Business Spotlight features."
              icon={<FiEdit3 className="w-4 h-4" />}
            />

            <TipBox variant="important">
              <strong>Important:</strong> You must select &ldquo;Business&rdquo;
              as your role to access Business Spotlight. If you registered as a
              different role, you&apos;ll need to contact support to change it.
            </TipBox>

            <ButtonCallout
              label="Sign Up"
              description="Create your account at /auth/register"
              href="/auth/register"
            />
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 03: Go to Dashboard ────────────────────────────── */}
          <StepSection id="dashboard" stepNumber="03" title="Go to Your Dashboard">
            <p className="text-secondary-black text-sm md:text-base">
              After logging in, navigate to your dashboard. For Business
              accounts, the spotlight features are accessible from the{" "}
              <strong>OSI Top Business Award</strong> dashboard section.
            </p>

            <Breadcrumb
              items={["Dashboard", "OSI Top Business Award", "Spotlight", "Create"]}
            />

            <MockScreen title="Dashboard Sidebar">
              <div className="space-y-2">
                {[
                  { label: "Dashboard", active: false },
                  { label: "Business", active: false },
                  { label: "Current Session", active: false },
                  { label: "Spotlight", active: true },
                  { label: "  └ My Applications", active: false },
                  { label: "  └ Vote Purchase", active: false },
                  { label: "Purchase List", active: false },
                  { label: "Analytics", active: false },
                  { label: "Events", active: false },
                  { label: "Setting", active: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      item.active
                        ? "bg-primary-blue/10 text-primary-blue font-medium border-l-2 border-primary-blue"
                        : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </MockScreen>

            <InfoCard
              title="Where am I?"
              description="You're on the main dashboard. Look at the sidebar on the left side of the screen."
              icon={<FiLayout className="w-4 h-4" />}
            />

            <InfoCard
              title="What do I do?"
              description="Click on 'Spotlight' in the sidebar under OSI Top Business Award. This is where you create and manage your business spotlight profiles."
              icon={<FiArrowRight className="w-4 h-4" />}
              variant="highlight"
            />

            <ButtonCallout
              label="Spotlight"
              description="Navigate to your dashboard"
              href="/dashboard/boss_beginning/leaderboards"
            />
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 04: Create Spotlight Profile ───────────────────── */}
          <StepSection
            id="create-profile"
            stepNumber="04"
            title="Create Your Business Spotlight Profile"
          >
            <p className="text-secondary-black text-sm md:text-base">
              Click the <strong>&ldquo;Create&rdquo;</strong> button to start
              building your business profile. The form has 6 sections that
              you&apos;ll complete step by step.
            </p>

            <ButtonCallout
              label="Create"
              description="Click the blue 'Create' button to start a new business spotlight"
            />

            {/* Step 4a: Business Information */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  1
                </span>
                Section 1: Business Information
              </h3>

              <MockScreen title="Step 1 — Business Information">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Business Name *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Enter your business name
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Owner / Founder Name *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Your name
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Business Category *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Select a category
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Year Founded *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      2020
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Business Website *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      https://yourbusiness.com
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      City *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Enter city
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      State *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Enter state
                    </div>
                  </div>
                </div>
              </MockScreen>

              <div className="mt-4 space-y-3">
                <InfoCard
                  title="What should I enter?"
                  description="Your business name, the owner/founder name, category, founding year, website, and location."
                  icon={<FiBriefcase className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Step 4b: Business Story */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  2
                </span>
                Section 2: Business Story
              </h3>

              <div className="space-y-3">
                <InfoCard
                  title="Tell Us Your Business Story"
                  description="Where it started, why it exists, and the mission behind it. (Max 500 characters)"
                  icon={<FiFileText className="w-4 h-4" />}
                />
                <InfoCard
                  title="What Products or Services Do You Offer?"
                  description="List what customers can purchase or experience. (Max 500 characters)"
                  icon={<FiBriefcase className="w-4 h-4" />}
                />
                <InfoCard
                  title="What Challenges Has Your Business Overcome?"
                  description="Share the milestones, struggles, or turning points. (Max 500 characters)"
                  icon={<FiStar className="w-4 h-4" />}
                />
                <InfoCard
                  title="What Makes Your Business Unique?"
                  description="What separates you from competitors. (Max 500 characters)"
                  icon={<FiEdit3 className="w-4 h-4" />}
                />
                <InfoCard
                  title="Who Is Your Target Customer?"
                  description="Describe their demographics, needs, or interests. (Max 500 characters)"
                  icon={<FiUser className="w-4 h-4" />}
                />
              </div>

              <TipBox variant="important">
                <strong>Character limit:</strong> Each story field has a maximum
                of 500 characters. Be concise and impactful with your words.
              </TipBox>
            </div>

            {/* Step 4c: Contact Information */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  3
                </span>
                Section 3: Contact Information
              </h3>

              <MockScreen title="Step 3 — Contact Information">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Email *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      your@email.com
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Phone Number
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      (555) 123-4567
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Best Time to Contact *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Select a time
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Social Media Links
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: FiInstagram, label: "Instagram" },
                      { icon: FiTwitter, label: "TikTok" },
                      { icon: FiLinkedin, label: "LinkedIn" },
                    ].map(({ icon: Icon, label }, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-400"
                      >
                        <Icon className="w-3 h-3" /> {label}
                      </div>
                    ))}
                  </div>
                </div>
              </MockScreen>

              <div className="mt-4 space-y-3">
                <InfoCard
                  title="Social Media"
                  description="Connect your social profiles: Instagram, TikTok, Facebook, YouTube, Google Business Profile, LinkedIn, and Fanbase."
                  icon={<FiGlobe className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Step 4d: Images */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  4
                </span>
                Section 4: Images
              </h3>

              <MockScreen title="Step 4 — Images">
                <div className="space-y-3">
                  {[
                    {
                      label: "Business Owner Portrait",
                      required: true,
                      hint: "PNG, JPG up to 10MB",
                    },
                    {
                      label: "Storefront / Workspace Photo",
                      required: true,
                      hint: "PNG, JPG up to 10MB",
                    },
                    {
                      label: "Product or Service Photos",
                      required: true,
                      hint: "PNG, JPG up to 10MB (multiple)",
                    },
                    {
                      label: "Team Photo",
                      required: true,
                      hint: "PNG, JPG up to 10MB",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-dashed border-slate-200"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {item.label}{" "}
                          {item.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </p>
                        <p className="text-xs text-slate-400">{item.hint}</p>
                      </div>
                      <FiImage className="w-5 h-5 text-slate-300" />
                    </div>
                  ))}
                </div>
              </MockScreen>

              <InfoCard
                title="What is this?"
                description="Upload high-quality photos of your business. These visuals make your spotlight page stand out and help the community connect with your brand."
                icon={<FiImage className="w-4 h-4" />}
              />
            </div>

            {/* Step 4e: Service Details */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  5
                </span>
                Section 5: Service Details
              </h3>

              <MockScreen title="Step 5 — Service Details">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Do you offer in-person visits or online services? *
                  </p>
                  {[
                    "In-person only",
                    "Online only",
                    "Both in-person and online",
                  ].map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-full border ${
                        idx === 2
                          ? "border-primary-blue bg-primary-blue/5"
                          : "border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          idx === 2
                            ? "border-primary-blue bg-primary-blue"
                            : "border-slate-300"
                        }`}
                      />
                      <span className="text-sm text-slate-700">{option}</span>
                    </div>
                  ))}
                </div>
              </MockScreen>
            </div>

            {/* Step 4f: Optional */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  6
                </span>
                Section 6: Optional Information
              </h3>

              <TipBox>
                This section may include optional fields to enhance your
                profile. Fill in what applies to your business.
              </TipBox>
            </div>
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 05: Complete Application ───────────────────────── */}
          <StepSection
            id="complete-profile"
            stepNumber="05"
            title="Complete the Application"
          >
            <p className="text-secondary-black text-sm md:text-base">
              After filling in all sections, review your information carefully.
              You can navigate back to any step using the progress bar at the
              top.
            </p>

            <MockScreen title="Business Spotlight Submission — Progress">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Section 6 of 6</span>
                  <span className="text-emerald-500 font-medium">
                    100% Complete
                  </span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-full" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    "Identification",
                    "Category",
                    "Your Story",
                    "Media",
                    "Consent",
                    "Optional",
                  ].map((step, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium"
                    >
                      <FiCheck className="w-3 h-3" />
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </MockScreen>

            <InfoCard
              title="What do I do?"
              description="Click 'Submit' on the final step to complete your business spotlight profile. You can edit your profile later."
              icon={<FiSend className="w-4 h-4" />}
              variant="highlight"
            />
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 06: Submit & Apply ─────────────────────────────── */}
          <StepSection id="submit" stepNumber="06" title="Submit & Apply to the Contest">
            <p className="text-secondary-black text-sm md:text-base">
              After creating your spotlight profile, you need to{" "}
              <strong>apply</strong> to a specific weekly competition. This is a
              separate step from creating your profile.
            </p>

            <MockScreen title="Spotlight Management">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-800">
                    Spotlight History
                  </h4>
                  <span className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-full">
                    Create
                  </span>
                </div>
                <div className="border border-slate-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Your Business Name
                      </p>
                      <p className="text-xs text-slate-500">Category • Status</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">
                        <FiFileText className="w-4 h-4" />
                      </span>
                      <span className="text-slate-400">
                        <FiEdit3 className="w-4 h-4" />
                      </span>
                      <button className="inline-flex items-center gap-1 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full">
                        <FiSend className="w-3 h-3" />
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </MockScreen>

            <div className="mt-4 space-y-3">
              <InfoCard
                title="Step 1: Click 'Apply'"
                description="On the Spotlight Management page, find your profile and click the blue 'Apply' button."
                icon={<FiArrowRight className="w-4 h-4" />}
              />
              <InfoCard
                title="Step 2: Select a Weekly Competition"
                description="A modal will show available weeks that are accepting applications. Click 'Apply' next to the week you want to compete in."
                icon={<FiCalendar className="w-4 h-4" />}
              />
              <InfoCard
                title="Step 3: Confirmation"
                description="Once applied, your profile will be entered into that week's competition. You can track your status from the Spotlight Management page."
                icon={<FiCheck className="w-4 h-4" />}
                variant="success"
              />
            </div>

            <TipBox variant="important">
              <strong>Timing matters:</strong> Applications are only open during
              specific weeks. Check the &ldquo;Accepting&rdquo; badge to see if
              applications are currently open.
            </TipBox>
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 07: What Happens Next ──────────────────────────── */}
          <StepSection
            id="whats-next"
            stepNumber="07"
            title="What Happens After Submitting?"
          >
            <p className="text-secondary-black text-sm md:text-base">
              Once your application is submitted, here&apos;s what happens next
              in the Business Spotlight process.
            </p>

            <div className="space-y-3">
              <InfoCard
                title="1. Application Review"
                description="Your submission status will show as 'Submitted' on your dashboard. The team reviews applications before the voting period begins."
                icon={<FiFileText className="w-4 h-4" />}
              />
              <InfoCard
                title="2. Public Voting Opens"
                description="During the voting period, visitors can support you with free votes or by purchasing additional paid votes."
                icon={<FiStar className="w-4 h-4" />}
              />
              <InfoCard
                title="3. Votes Are Tracked Automatically"
                description="The platform tracks every vote electronically. Voting data is managed automatically."
                icon={<FiCheck className="w-4 h-4" />}
              />
              <InfoCard
                title="4. Weekly Winners Are Determined"
                description="The nominee with the highest votes becomes that week's Business Spotlight of the Week."
                icon={<FiStar className="w-4 h-4" />}
                variant="highlight"
              />
              <InfoCard
                title="5. Winners Are Featured"
                description="The winning business is displayed prominently as the current Spotlight of the Week, and added to the historical winners archive."
                icon={<FiBriefcase className="w-4 h-4" />}
                variant="success"
              />
            </div>

            <TipBox>
              You can track your application status at any time from{" "}
              <strong>Dashboard → OSI Top Business Award → Spotlight → My Applications</strong>
            </TipBox>
          </StepSection>

          {/* ─── Final CTA ───────────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-primary-blue to-secondary-blue rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              You&apos;re Ready for Business Spotlight.
            </h2>
            <p className="text-white/80 mt-3 max-w-[600px] mx-auto">
              Your profile is complete and your application is ready to go. Good
              luck in the competition!
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              <Link href="/dashboard/boss_beginning/leaderboards">
                <Button className="bg-white text-primary-blue hover:bg-white/90">
                  Go to Spotlight Dashboard
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  Start Your Application
                  <FiArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </GuideLayout>
  );
};

export default BusinessGuidePage;
