import React from "react";

interface OptionalInformationProps {
  spotlight?: any;
  type?: "artist" | "business";
}

export default function OptionalInformation({ spotlight, type = "artist" }: OptionalInformationProps) {
  const s = spotlight;

  if (s) {
    const isArtist = type === "artist";

    const fields: { label: string; value: string | null | undefined }[] = [
      // Artist-specific fields
      ...(isArtist
        ? [
            { label: "Talent Management Contact", value: s?.talent_manager_contact },
            { label: "Agent's Contact", value: s?.agent_contact },
          ]
        : []),
      // Shared fields
      { label: "Link to Press Kit", value: s?.press_kit_url },
      { label: "Previous Interviews", value: s?.previous_interviews },
      { label: "Awards or Recognition", value: s?.awards_recognition },
      // Artist-only fields
      ...(isArtist
        ? [
            { label: "Preferred Pronouns", value: s?.preferred_pronouns },
            { label: "Preferred Contact Method", value: s?.preferred_contact_method },
            { label: "Interview Availability", value: s?.interview_availability },
          ]
        : // Business-only fields
        [
            { label: "Products & Services", value: s?.products_services },
            { label: "Challenges Overcome", value: s?.challenges_overcome },
            { label: "Unique Factor", value: s?.unique_factor },
            { label: "Target Customer", value: s?.target_customer },
            { label: "Year Founded", value: s?.year_founded?.toString() },
            { label: "Service Type", value: s?.service_type },
            { label: "Best Contact Time", value: s?.best_contact_time },
            { label: "Why Featured", value: s?.why_featured },
            { label: "Instagram", value: s?.instagram_url },
            { label: "TikTok", value: s?.tiktok_url },
            { label: "Facebook", value: s?.facebook_url },
            { label: "YouTube", value: s?.youtube_url },
            { label: "Google Business Profile", value: s?.google_business_profile_url },
            { label: "LinkedIn", value: s?.linkedin_url },
            { label: "Fanbase", value: s?.fanbase_url },
          ]),
    ].filter((f) => f.value);

    if (fields.length === 0) return null;

    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 rounded-[19.886px] border-[0.5px] border-black/15 bg-[#F5F5F7] p-4 md:p-6 lg:p-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
            Optional Information
          </h3>
          <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 mt-5 md:mt-6 lg:mt-8">
            {fields.map((field) => (
              <div key={field.label}>
                <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                  {field.label}
                </h4>
                <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: original hardcoded content
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 rounded-[19.886px] border-[0.5px] border-black/15 bg-[#F5F5F7] p-4 md:p-6 lg:p-8">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
          Optional Information
        </h3>
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 mt-5 md:mt-6 lg:mt-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                Talent Management Contact
              </h4>
              <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                jared_mitchell
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                Agent&rsquo;s Contact
              </h4>
              <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                jared_mitchell
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                Link to press Kit
              </h4>
              <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                jared_mitchell
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              Previous Interviews
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
              A cozy neighborhood café combining specialty coffee with a curated
              flower shop. We source beans from fair-trade roasters and partner
              with local flower farms to bring beauty and warmth to our community.
            </p>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              Awards or Recognition
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
              A cozy neighborhood café combining specialty coffee with a curated
              flower shop. We source beans from fair-trade roasters and partner
              with local flower farms to bring beauty and warmth to our community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                Preferred Pronouns
              </h4>
              <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                jared_mitchell
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                Preferred Contact Method
              </h4>
              <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                jared_mitchell
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                Link to press Kit
              </h4>
              <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
                jared_mitchell
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              Interview Availability
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-2 md:pt-4">
              A cozy neighborhood café combining specialty coffee with a curated
              flower shop. We source beans from fair-trade roasters and partner
              with local flower farms to bring beauty and warmth to our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
