"use client";

import Link from "next/link";
import Container from "@/Components/Common/Container";
import { Button } from "@/Components/Common/Button";
import GuideLayout, {
  artistSteps,
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
  FiVideo,
  FiShield,
  FiStar,
  FiLayout,
} from "react-icons/fi";

const ArtistGuidePage = () => {
  return (
    <GuideLayout type="artist">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-blue to-secondary-blue rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 xl:p-16 text-center text-white mb-6 md:mb-8 lg:mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-4">
          Artist Spotlight Guide
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold leading-tight">
          Your Step-by-Step Guide to Entering the Spotlight Contest
        </h1>
        <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl mt-3 md:mt-4 lg:mt-6 max-w-[800px] mx-auto">
          From creating your account to submitting your application, we&apos;ll
          show you exactly where to go and what to do next.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-1.5 md:gap-2 lg:gap-3 mt-5 md:mt-6 lg:mt-8 flex-wrap">
          {artistSteps.map((step, idx) => (
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
              Before you can participate in the Spotlight Contest, you need an
              OSI account. If you already have one, simply log in.
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
              When you register, you&apos;ll choose your account type. For the
              Artist Spotlight, you need an{" "}
              <strong>Artisan</strong> account.
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
                        artisan ✓
                      </span>
                      <FiArrowRight className="w-4 h-4 text-primary-blue" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1.5">
                    Artist Category
                  </label>
                  <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-400">
                    Choose your category
                  </div>
                </div>
              </div>
            </MockScreen>

            <InfoCard
              title="Artist Account (Artisan)"
              description="For individuals participating as artists. Choose this if you are a musician, visual artist, performer, or creative professional."
              icon={<FiStar className="w-4 h-4" />}
              variant="highlight"
            />

            <InfoCard
              title="What is this?"
              description="Select 'artisan' as your role during registration. You'll also need to choose an Artist Category (e.g., Music, Visual Art, Performance)."
              icon={<FiEdit3 className="w-4 h-4" />}
            />

            <TipBox variant="important">
              <strong>Important:</strong> You must select &ldquo;artisan&rdquo; as
              your role to access the Artist Spotlight. If you registered as a
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
              After logging in, navigate to your dashboard. This is where
              you&apos;ll manage your spotlight profile and applications.
            </p>

            <Breadcrumb
              items={["Dashboard", "Spotlight Management", "Create"]}
            />

            <MockScreen title="Dashboard Sidebar">
              <div className="space-y-2">
                {[
                  { label: "Dashboard", active: false },
                  { label: "Spotlight Management", active: true },
                  { label: "  └ My Applications", active: false },
                  { label: "  └ Vote Purchase", active: false },
                  { label: "Purchase List", active: false },
                  { label: "Subscription", active: false },
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
              description="Click on 'Spotlight Management' in the sidebar. This is where you create and manage your spotlight profiles."
              icon={<FiArrowRight className="w-4 h-4" />}
              variant="highlight"
            />

            <ButtonCallout
              label="Spotlight Management"
              description="Navigate to your dashboard"
              href="/dashboard/artist_business/spotlight-management"
            />
          </StepSection>

          <FlowArrow />

          {/* ─── STEP 04: Create Spotlight Profile ───────────────────── */}
          <StepSection
            id="create-profile"
            stepNumber="04"
            title="Create Your Spotlight Profile"
          >
            <p className="text-secondary-black text-sm md:text-base">
              Click the <strong>&ldquo;Create&rdquo;</strong> button on the
              Spotlight Management page to start building your profile. The form
              has 6 sections that you&apos;ll complete step by step.
            </p>

            <ButtonCallout
              label="Create"
              description="Click the blue 'Create' button in the top right of the Spotlight Management page"
            />

            {/* Step 4a: Identification */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  1
                </span>
                Section 1: Identification
              </h3>

              <MockScreen title="Step 1 — Artist Identification">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Full Legal Name *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      John Doe
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Artist / Stage Name *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      The name that will appear publicly
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Email Address *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      artist@example.com
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Phone *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      (555) 123-4567
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      Date of Birth *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      MM/DD/YYYY
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      City *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400">
                      Los Angeles
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1">
                      State *
                    </label>
                    <div className="px-3 py-2 rounded-full border border-slate-200 text-xs text-slate-400 max-w-[200px]">
                      CA
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Social Media Handles (at least one required)
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-400">
                      <FiInstagram className="w-3 h-3" /> Instagram
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-400">
                      <FiGlobe className="w-3 h-3" /> Website
                    </div>
                  </div>
                </div>
              </MockScreen>

              <div className="mt-4 space-y-3">
                <InfoCard
                  title="What should I enter?"
                  description="Your real legal name, the stage name you want displayed publicly, your contact info, and location. You must be at least 18 years old."
                  icon={<FiUser className="w-4 h-4" />}
                />
                <InfoCard
                  title="Social Media"
                  description="Add at least one social media handle — Instagram, TikTok, Facebook, YouTube, or a website/portfolio link."
                  icon={<FiGlobe className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Step 4b: Category */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  2
                </span>
                Section 2: Artist Category
              </h3>

              <MockScreen title="Step 2 — Artist Category">
                <div className="grid grid-cols-2 gap-2">
                  {["Music", "Visual Art", "Performance", "Other"].map(
                    (cat, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-sm ${
                          idx === 0
                            ? "border-primary-blue bg-primary-blue/5 text-primary-blue font-medium"
                            : "border-slate-200 text-slate-500"
                        }`}
                      >
                        {cat}
                        {idx === 0 && (
                          <span className="ml-2 text-xs">✓</span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </MockScreen>

              <TipBox>
                Your category determines your voting pool. You&apos;ll compete
                only against other artists in the same category.
              </TipBox>
            </div>

            {/* Step 4c: Your Story */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  3
                </span>
                Section 3: Your Story
              </h3>

              <div className="space-y-3">
                <InfoCard
                  title="Short Bio (2-4 sentences)"
                  description="This appears on your spotlight card. Describe who you are as an artist and what your work represents."
                  icon={<FiEdit3 className="w-4 h-4" />}
                />
                <InfoCard
                  title="Full Artist Story (5-20 sentences)"
                  description="Your long-form story for the main spotlight page. How did you get started? What struggles shaped you? What does your work stand for?"
                  icon={<FiFileText className="w-4 h-4" />}
                />
                <InfoCard
                  title="Why Should Your Story Be Spotlighted?"
                  description="Explain your uniqueness, impact, message, and authenticity in 3-6 sentences."
                  icon={<FiStar className="w-4 h-4" />}
                />
                <InfoCard
                  title="Community Message"
                  description="What message do you want to share? This becomes the 'pull quote' section of your spotlight."
                  icon={<FiUser className="w-4 h-4" />}
                />
                <InfoCard
                  title="Current Goals"
                  description="What are your goals as an artist? This creates the 'what's next' section of your spotlight page."
                  icon={<FiArrowRight className="w-4 h-4" />}
                />
              </div>

              <TipBox variant="important">
                <strong>This is the most important section.</strong> Your story
                content will be used for spotlight pages and interviews. Be
                authentic and tell your real story.
              </TipBox>
            </div>

            {/* Step 4d: Media */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  4
                </span>
                Section 4: Media Uploads
              </h3>

              <MockScreen title="Step 4 — Media Uploads">
                <div className="space-y-3">
                  {[
                    {
                      label: "Professional Headshot / Portrait",
                      required: true,
                      hint: "PNG, JPG up to 10MB",
                    },
                    {
                      label: "Photos of Your Art / Work (3-5 photos)",
                      required: true,
                      hint: "PNG, JPG up to 10MB each",
                    },
                    {
                      label: "Behind-the-Scenes Photo",
                      required: true,
                      hint: "PNG, JPG up to 10MB",
                    },
                    {
                      label: "Short Intro Video (15-30 seconds)",
                      required: true,
                      hint: "MP4 format",
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

              <div className="mt-4 space-y-3">
                <InfoCard
                  title="What is this?"
                  description="Upload high-quality photos and a short video introduction. These visuals make your spotlight page stand out."
                  icon={<FiImage className="w-4 h-4" />}
                />
                <InfoCard
                  title="Important"
                  description="Your intro video should be 15-30 seconds. Introduce yourself on camera — this helps the community connect with you."
                  icon={<FiVideo className="w-4 h-4" />}
                  variant="highlight"
                />
              </div>
            </div>

            {/* Step 4e: Consent */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  5
                </span>
                Section 5: Consent & Rights
              </h3>

              <div className="space-y-3">
                <InfoCard
                  title="Public Release Agreement"
                  description="I agree that OSI can publish my photos, videos, story, and likeness across platforms."
                  icon={<FiShield className="w-4 h-4" />}
                />
                <InfoCard
                  title="Ownership Declaration"
                  description="I confirm that I own all submitted content and have full rights to share it."
                  icon={<FiCheck className="w-4 h-4" />}
                />
                <InfoCard
                  title="Interview Permission"
                  description="I agree to participate in interviews and allow OSI to publish them."
                  icon={<FiUser className="w-4 h-4" />}
                />
              </div>

              <TipBox variant="note">
                By checking these boxes, you grant OSI permission to feature
                your work. You still keep ownership of your content.
              </TipBox>
            </div>

            {/* Step 4f: Optional */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary-black mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary-blue/10 flex items-center justify-center text-xs font-bold text-primary-blue">
                  6
                </span>
                Section 6: Optional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoCard
                  title="Talent Management Contact"
                  description="Manager name and email (optional)"
                  icon={<FiPhone className="w-4 h-4" />}
                />
                <InfoCard
                  title="Agent's Contact"
                  description="Agent name and email (optional)"
                  icon={<FiPhone className="w-4 h-4" />}
                />
                <InfoCard
                  title="Press Kit URL"
                  description="Link to your press kit or media kit"
                  icon={<FiGlobe className="w-4 h-4" />}
                />
                <InfoCard
                  title="Previous Interviews"
                  description="Links to previous interviews, podcasts, or features"
                  icon={<FiFileText className="w-4 h-4" />}
                />
                <InfoCard
                  title="Awards or Recognition"
                  description="List any awards or notable achievements"
                  icon={<FiStar className="w-4 h-4" />}
                />
                <InfoCard
                  title="Interview Availability"
                  description="When are you available for interviews?"
                  icon={<FiCalendar className="w-4 h-4" />}
                />
              </div>

              <TipBox>
                These fields are optional but can enhance your spotlight profile
                and help OSI serve you better.
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

            <MockScreen title="Create Spotlight — Progress">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Section 6 of 6</span>
                  <span className="text-emerald-500 font-medium">
                    100% Complete
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-full" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {["Identification", "Category", "Your Story", "Media", "Consent", "Optional"].map(
                    (step, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium"
                      >
                        <FiCheck className="w-3 h-3" />
                        {step}
                      </span>
                    )
                  )}
                </div>
              </div>
            </MockScreen>

            <InfoCard
              title="What do I do?"
              description="Click 'Submit' on the final step to complete your spotlight profile. You can edit your profile later from the Spotlight Management page."
              icon={<FiSend className="w-4 h-4" />}
              variant="highlight"
            />

            <TipBox variant="important">
              <strong>Subscription required:</strong> You need an active
              subscription to create or edit an artist spotlight. Subscribe to
              unlock the application form.
            </TipBox>
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
                        Your Spotlight Name
                      </p>
                      <p className="text-xs text-slate-500">Category • Status</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400" title="View">
                        <FiFileText className="w-4 h-4" />
                      </span>
                      <span className="text-slate-400" title="Edit">
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
              in the Spotlight Contest process.
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
                description="The nominee with the highest votes becomes that week's Artist Spotlight of the Week."
                icon={<FiStar className="w-4 h-4" />}
                variant="highlight"
              />
              <InfoCard
                title="5. Winners Are Featured"
                description="The winning artist is displayed prominently as the current Spotlight of the Week, and added to the historical winners archive."
                icon={<FiUser className="w-4 h-4" />}
                variant="success"
              />
            </div>

            <TipBox>
              You can track your application status at any time from{" "}
              <strong>Dashboard → Spotlight Management → My Applications</strong>
            </TipBox>
          </StepSection>

          {/* ─── Final CTA ───────────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-primary-blue to-secondary-blue rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              You&apos;re Ready for the Spotlight.
            </h2>
            <p className="text-white/80 mt-3 max-w-[600px] mx-auto">
              Your profile is complete and your application is ready to go. Good
              luck in the competition!
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              <Link href="/dashboard/artist_business/spotlight-management">
                <Button className="bg-white text-primary-blue hover:bg-white/90">
                  Go to Spotlight Management
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

export default ArtistGuidePage;
