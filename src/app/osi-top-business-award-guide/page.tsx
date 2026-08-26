"use client";

import Link from "next/link";
import {
  FiUser,
  FiArrowRight,
  FiArrowLeft,
  FiCheckCircle,
  FiInfo,
  FiLock,
} from "react-icons/fi";
import BossBeginningGuideLayout from "@/app/(main)/boss-beginnings/_components/BossBeginningGuideLayout";
import {
  StepSection,
  InfoCard,
  ButtonCallout,
  TipBox,
  MockScreen,
  Breadcrumb,
  FlowArrow,
} from "@/app/(main)/(spotlight)/_components/GuideUI";

export default function BossBeginningGuidePage() {
  return (
    <BossBeginningGuideLayout>
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            OSI Top Business Award Contest
          </h1>
          <p className="text-lg md:text-xl text-white/80 mt-3">
            Your step-by-step guide to entering the OSI Top Business Award.
          </p>
          <p className="text-sm md:text-base text-white/60 mt-3 max-w-2xl mx-auto">
            Everything you need to know — from creating your account and
            business profile to completing and submitting your contest entry.
          </p>

          {/* Visual Progress */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mt-8 flex-wrap">
            {["Account", "Business", "Spotlight", "Apply", "Submit"].map(
              (label, idx) => (
                <span key={label} className="flex items-center gap-2">
                  {idx > 0 && (
                    <FiArrowRight className="w-3 h-3 text-white/40" />
                  )}
                  <span className="px-3 py-1.5 rounded-full bg-white/15 text-white/80 text-xs md:text-sm font-medium">
                    {idx + 1} {label}
                  </span>
                </span>
              )
            )}
          </div>
        </div>

        {/* Step 01 — Get Started */}
        <StepSection
          id="get-started"
          stepNumber="01"
          title="Create an Account or Log In"
        >
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            To participate in the OSI Top Business Award, you need a <strong>Business</strong> account
            on OSI. If you don&apos;t have one yet, you&apos;ll need to register first.
          </p>

          <InfoCard
            title="Business Account Required"
            description="The OSI Top Business Award is exclusively for business accounts. Artist accounts cannot submit nominations or entries."
            variant="highlight"
          />

          <MockScreen title="Registration Page">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center text-[10px] font-bold text-primary-blue">
                  1
                </span>
                <span className="text-sm text-primary-black">
                  Go to{" "}
                  <strong className="text-primary-blue">
                    OSI Website
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center text-[10px] font-bold text-primary-blue">
                  2
                </span>
                <span className="text-sm text-primary-black">
                  Click <strong>&quot;Log In&quot;</strong> or{" "}
                  <strong>&quot;Sign Up&quot;</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center text-[10px] font-bold text-primary-blue">
                  3
                </span>
                <span className="text-sm text-primary-black">
                  Select <strong>&quot;Business Account&quot;</strong> during registration
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center text-[10px] font-bold text-primary-blue">
                  4
                </span>
                <span className="text-sm text-primary-black">
                  Complete your registration and verify your account
                </span>
              </div>
            </div>
          </MockScreen>

          <ButtonCallout
            label="Log In"
            description="Already have an account? Click here to log in."
            href="/auth/login"
          />

          <ButtonCallout
            label="Sign Up"
            description="Don't have an account? Create a business account."
            href="/auth/register"
          />

          <TipBox variant="important">
            <strong>Important:</strong> You must select &quot;Business Account&quot; during
            registration. Artist accounts cannot participate in the OSI Top Business Award.
            An active subscription is also required to create business profiles.
          </TipBox>
        </StepSection>

        <FlowArrow />

        {/* Step 02 — Go to Dashboard */}
        <StepSection id="dashboard" stepNumber="02" title="Go to Your Dashboard">
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            After logging in, you&apos;ll land on your dashboard. The OSI Top Business Award
            section is where you manage your business profiles, spotlight
            profiles, and contest applications.
          </p>

          <MockScreen title="Dashboard Navigation">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Sidebar Menu
              </p>
              {[
                { label: "Dashboard", active: false },
                { label: "Business", active: true },
                { label: "Current Session", active: false },
                { label: "Leaderboards", active: false },
                { label: "Vote Purchase", active: false },
                { label: "Settings", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                    item.active
                      ? "bg-primary-blue text-white font-medium"
                      : "text-slate-600"
                  }`}
                >
                  <span className="w-4 h-4 rounded bg-current/10" />
                  {item.label}
                  {item.active && (
                    <FiArrowRight className="w-3 h-3 ml-auto text-white/70" />
                  )}
                </div>
              ))}
            </div>
          </MockScreen>

          <Breadcrumb
            items={["Dashboard", "OSI Top Business Award", "Business"]}
          />

          <ButtonCallout
            label="Business"
            description="Click on 'Business' in the sidebar to manage your business profiles."
            href="/dashboard/boss_beginning/business"
          />

          <TipBox variant="tip">
            <strong>Tip:</strong> Your dashboard shows all OSI Top Business Award
            sections. You&apos;ll primarily use &quot;Business&quot; to create your
            business profile and &quot;Leaderboards&quot; for spotlight profiles.
          </TipBox>
        </StepSection>

        <FlowArrow />

        {/* Step 03 — Create Business */}
        <StepSection
          id="create-business"
          stepNumber="03"
          title="Create Your Business Profile"
        >
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            Before applying to the OSI Top Business Award, you need to create a business
            profile. This tells the community about your business and why it
            deserves to compete.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              title="Where to Go"
              description="Dashboard → OSI Top Business Award → Business → Click 'Create'"
              variant="highlight"
            />
            <InfoCard
              title="Subscription Required"
              description="You need an active subscription to create or edit a business profile."
              variant="default"
            />
          </div>

          <h4 className="text-base font-semibold text-primary-black pt-2">
            What Information You Need
          </h4>

          <div className="grid grid-cols-1 gap-3">
            <InfoCard
              title="Business Name"
              description="Enter the official name of your business."
              icon={<span className="text-xs font-bold">1</span>}
            />
            <InfoCard
              title="Owner / Founder Name"
              description="Your name as the business owner or founder."
              icon={<span className="text-xs font-bold">2</span>}
            />
            <InfoCard
              title="Story"
              description="Tell the story of your business — how it started, what drives you, and what makes it special. This is required."
              icon={<span className="text-xs font-bold">3</span>}
              variant="highlight"
            />
            <InfoCard
              title="Mission"
              description="Describe your business mission and purpose."
              icon={<span className="text-xs font-bold">4</span>}
            />
            <InfoCard
              title="Website / Social Media"
              description="Add your website URL (must start with http:// or https://)."
              icon={<span className="text-xs font-bold">5</span>}
            />
            <InfoCard
              title="Community Impact Statement"
              description="How does your business positively impact the community?"
              icon={<span className="text-xs font-bold">6</span>}
            />
            <InfoCard
              title="Revenue Stage"
              description="Describe your current revenue stage or business growth phase."
              icon={<span className="text-xs font-bold">7</span>}
            />
            <InfoCard
              title="Why They Deserve to Compete"
              description="Make your case for why your business deserves recognition in the OSI Top Business Award."
              icon={<span className="text-xs font-bold">8</span>}
            />
            <InfoCard
              title="Photo / Video Upload"
              description="Upload images or videos of your business. PNG, JPG, or MP4 up to 10MB each."
              icon={<span className="text-xs font-bold">9</span>}
            />
          </div>

          <MockScreen title="Create Business Form">
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <div className="rounded-full border border-slate-200 px-4 py-2.5 text-sm text-slate-400 bg-slate-50">
                  Enter your business name
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  Owner / Founder Name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="rounded-full border border-slate-200 px-4 py-2.5 text-sm text-slate-400 bg-slate-50">
                  Your name
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  Story <span className="text-red-500">*</span>
                </label>
                <div className="rounded-xl border border-slate-200 px-4 py-8 text-sm text-slate-400 bg-slate-50 text-center">
                  Rich text editor — tell your business story
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <div className="rounded-full bg-primary-blue text-white text-sm font-medium px-6 py-2.5">
                  Save
                </div>
                <div className="rounded-full border border-slate-200 text-slate-600 text-sm font-medium px-6 py-2.5">
                  Cancel
                </div>
              </div>
            </div>
          </MockScreen>

          <ButtonCallout
            label="Create"
            description="Click 'Create' on the Business page to open the form."
            href="/dashboard/boss_beginning/business/create-business"
          />

          <TipBox variant="note">
            <strong>After saving:</strong> Your business will appear in your
            Business list. You can edit it anytime by clicking the pencil icon.
            Once your business profile is ready, you can apply it to a contest
            session.
          </TipBox>
        </StepSection>

        <FlowArrow />

        {/* Step 04 — Create Spotlight Profile */}
        <StepSection
          id="spotlight-profile"
          stepNumber="04"
          title="Create Your Spotlight Profile"
        >
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            The spotlight profile is a detailed showcase of your business. It
            includes your story, images, contact information, and permissions.
            This profile is what voters and the OSI panel will see.
          </p>

          <Breadcrumb
            items={["Dashboard", "OSI Top Business Award", "Leaderboards", "Create"]}
          />

          <InfoCard
            title="6-Step Form"
            description="The spotlight profile creation is a 6-step wizard: Identification → Category → Contact → Media → Service → Consideration"
            variant="highlight"
          />

          {/* Step breakdown */}
          <div className="space-y-3 pt-2">
            <h4 className="text-base font-semibold text-primary-black">
              Form Sections
            </h4>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
              <p className="text-xs font-semibold text-primary-blue uppercase tracking-wider mb-2">
                Step 1 — Identification
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondary-black">
                <span>• Business Name</span>
                <span>• Owner / Founder Name</span>
                <span>• Business Category</span>
                <span>• Year Founded</span>
                <span>• Website</span>
                <span>• City & State</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
              <p className="text-xs font-semibold text-primary-blue uppercase tracking-wider mb-2">
                Step 2 — Contact
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondary-black">
                <span>• Email</span>
                <span>• Phone Number</span>
                <span>• Best Contact Time</span>
                <span>• Instagram</span>
                <span>• TikTok</span>
                <span>• Facebook</span>
                <span>• YouTube</span>
                <span>• LinkedIn</span>
                <span>• Google Business Profile</span>
                <span>• Fanbase URL</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
              <p className="text-xs font-semibold text-primary-blue uppercase tracking-wider mb-2">
                Step 3 — Your Story
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm text-secondary-black">
                <span>• Business Story</span>
                <span>• Products / Services</span>
                <span>• Challenges Overcome</span>
                <span>• What Makes You Unique</span>
                <span>• Target Customer</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
              <p className="text-xs font-semibold text-primary-blue uppercase tracking-wider mb-2">
                Step 4 — Media
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm text-secondary-black">
                <span>• Owner Portrait Photo</span>
                <span>• Storefront / Workspace Photo</span>
                <span>• Product / Service Photos</span>
                <span>• Team Photo</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
              <p className="text-xs font-semibold text-primary-blue uppercase tracking-wider mb-2">
                Step 5 — Service Details
              </p>
              <div className="text-sm text-secondary-black">
                <span>• Service Type (In-Person / Online / Both)</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 md:p-5">
              <p className="text-xs font-semibold text-primary-blue uppercase tracking-wider mb-2">
                Step 6 — Spotlight Consideration
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm text-secondary-black">
                <span>• Why Featured?</span>
                <span>• Growth Vision</span>
                <span>• Permission: Feature on OSI</span>
                <span>• Permission: Use Submitted Photos</span>
                <span>• Permission: Share Business Story</span>
              </div>
            </div>
          </div>

          <ButtonCallout
            label="Create"
            description="Click 'Create' on the Leaderboards page to open the spotlight form."
            href="/dashboard/boss_beginning/leaderboards/create-spotlights"
          />

          <TipBox variant="tip">
            <strong>Tip:</strong> You can save your progress and come back
            later. The form shows a progress bar at the top indicating which
            section you&apos;re on and how much is complete.
          </TipBox>
        </StepSection>

        <FlowArrow />

        {/* Step 05 — Apply to Contest */}
        <StepSection
          id="apply-contest"
          stepNumber="05"
          title="Apply to the OSI Top Business Award Contest"
        >
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            Once your business profile is created, you can apply it to the
            current OSI Top Business Award contest session. This submits your business
            to compete in the active season.
          </p>

          <MockScreen title="Apply to Contest Modal">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Season Title
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Description of the current season
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                  accepting_applications
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Applications open</p>
                  <p className="text-slate-700 mt-0.5">MM/DD/YYYY</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Applications close</p>
                  <p className="text-slate-700 mt-0.5">MM/DD/YYYY</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Contest starts</p>
                  <p className="text-slate-700 mt-0.5">MM/DD/YYYY</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Contest ends</p>
                  <p className="text-slate-700 mt-0.5">MM/DD/YYYY</p>
                </div>
              </div>

              <div className="rounded-full bg-primary-blue text-white text-sm font-medium px-6 py-2.5 text-center">
                Apply to this session
              </div>
            </div>
          </MockScreen>

          <InfoCard
            title="How to Apply"
            description="Go to your Business list → Click the 'Apply' button next to your business → A modal will show the current session → Click 'Apply to this session'"
            variant="highlight"
          />

          <InfoCard
            title="Already Applied?"
            description="If your business already has a live application for the current session, you'll see an 'Already applied' confirmation instead of the Apply button."
            variant="default"
          />

          <TipBox variant="important">
            <strong>Important:</strong> You can only apply to a session that is
            currently accepting applications. If no session is active, you&apos;ll
            see a message saying to check back when a new session opens.
          </TipBox>
        </StepSection>

        <FlowArrow />

        {/* Step 06 — Apply Spotlight */}
        <StepSection
          id="apply-spotlight"
          stepNumber="06"
          title="Apply to Spotlight (Optional)"
        >
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            In addition to the main contest, you can also apply your spotlight
            profile to weekly spotlight competitions. This gives your business
            additional visibility through the spotlight voting system.
          </p>

          <Breadcrumb
            items={["Dashboard", "Leaderboards", "Spotlight", "Apply"]}
          />

          <MockScreen title="Apply Spotlight Modal">
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      Week 3 · 2026
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-medium">
                      <FiCheckCircle className="w-3 h-3" />
                      Accepting
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Voting: MM/DD/YYYY — MM/DD/YYYY
                  </p>
                </div>
                <button className="shrink-0 inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-full">
                  Apply
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4 opacity-60">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      Week 2 · 2026
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium">
                      <FiLock className="w-3" />
                      Closed
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Voting: MM/DD/YYYY — MM/DD/YYYY
                  </p>
                </div>
                <button
                  disabled
                  className="shrink-0 inline-flex items-center gap-1.5 bg-slate-300 text-white text-xs font-medium px-4 py-2 rounded-full cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          </MockScreen>

          <InfoCard
            title="How Spotlight Application Works"
            description="After creating a spotlight profile on the Leaderboards page, click the 'Apply' button next to your spotlight entry. A modal will show open weeks. Select a week that is accepting applications."
            variant="highlight"
          />

          <TipBox variant="tip">
            <strong>Tip:</strong> Spotlight applications are separate from the
            main contest application. You can do both to maximize your
            business&apos;s visibility.
          </TipBox>
        </StepSection>

        <FlowArrow />

        {/* Step 07 — What Happens Next */}
        <StepSection
          id="whats-next"
          stepNumber="07"
          title="What Happens Next"
        >
          <p className="text-sm md:text-base text-secondary-black leading-relaxed">
            After submitting your application, here&apos;s what to expect:
          </p>

          <div className="space-y-3">
            <InfoCard
              title="Application Review"
              description="Your application will be reviewed. You can check the status on your Business list — statuses include Pending, Approved, or Terminated."
              icon={<FiCheckCircle className="w-4 h-4" />}
              variant="default"
            />
            <InfoCard
              title="Community Voting"
              description="During the voting period, community members can support your business through Clap, Love, and Fire interactions. Each interaction earns points."
              icon={<FiCheckCircle className="w-4 h-4" />}
              variant="default"
            />
            <InfoCard
              title="Leaderboard"
              description="Your business will appear on the leaderboard with a rank, total points, and trend indicator. Check the OSI Top Business Award Contest page to see live rankings."
              icon={<FiCheckCircle className="w-4 h-4" />}
              variant="default"
            />
            <InfoCard
              title="Rounds"
              description="The contest progresses through multiple rounds. Advancing businesses move to the next round. The final round determines the winner."
              icon={<FiCheckCircle className="w-4 h-4" />}
              variant="default"
            />
            <InfoCard
              title="Winner Announcement"
              description="The winner receives a Business Shower Event, Video Interview, Photography Package, Gift Packages, Homepage Feature, Social Media Promotion, and more."
              icon={<FiCheckCircle className="w-4 h-4" />}
              variant="success"
            />
          </div>

          <MockScreen title="Leaderboard">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-blue text-white">
                    <th className="text-left px-4 py-2.5 rounded-tl-lg">Rank</th>
                    <th className="text-left px-4 py-2.5">Business</th>
                    <th className="text-center px-4 py-2.5">Score</th>
                    <th className="text-right px-4 py-2.5 rounded-tr-lg">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-amber-400 text-white text-[10px] font-semibold">
                        #1
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-medium">Your Business</td>
                    <td className="px-4 py-2.5 text-center text-primary-blue font-semibold">1,250</td>
                    <td className="px-4 py-2.5 text-right text-emerald-500 font-medium">Up</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-gray-400 text-white text-[10px] font-semibold">
                        #2
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-medium">Another Business</td>
                    <td className="px-4 py-2.5 text-center text-primary-blue font-semibold">980</td>
                    <td className="px-4 py-2.5 text-right text-slate-400 font-medium">Natural</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MockScreen>

          <TipBox variant="note">
            <strong>Community Voting Points:</strong>
          </TipBox>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div className="border border-slate-200 rounded-2xl p-5 text-center">
              <p className="font-medium text-slate-700">Clap</p>
              <p className="text-2xl font-bold text-primary-blue mt-1">1 PT</p>
              <p className="text-sm text-slate-500 mt-1">1 per nominee per day</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 text-center">
              <p className="font-medium text-slate-700">Love</p>
              <p className="text-2xl font-bold text-rose-500 mt-1">3 PT</p>
              <p className="text-sm text-slate-500 mt-1">Once per nominee</p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 text-center">
              <p className="font-medium text-slate-700">Fire</p>
              <p className="text-2xl font-bold text-orange-500 mt-1">5 PT</p>
              <p className="text-sm text-slate-500 mt-1">Once per day per platform</p>
            </div>
          </div>
        </StepSection>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            You&apos;re Ready for the OSI Top Business Award
          </h2>
          <p className="text-base md:text-lg text-white/80 mt-3 max-w-lg mx-auto">
            Your business profile is complete and your application is ready to
            go. Follow the steps above to make sure everything is in place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              href="/dashboard/boss_beginning/business"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-blue text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Go to Dashboard
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/boss-beginnings-contest"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 text-white text-sm font-medium hover:bg-white/25 transition-colors"
            >
              View Contest
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Back to top */}
        <div className="text-center py-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-blue transition-colors"
          >
            <FiArrowLeft className="w-3 h-3 rotate-90" />
            Back to top
          </button>
        </div>
      </div>
    </BossBeginningGuideLayout>
  );
}
