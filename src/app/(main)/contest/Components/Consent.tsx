import React from "react";

interface ConsentProps {
  spotlight?: any;
  type?: "artist" | "business";
}

export default function Consent({ spotlight, type = "artist" }: ConsentProps) {
  const s = spotlight;

  if (s) {
    const isArtist = type === "artist";
    const consentPublicRelease = s?.consent_public_release;
    const consentOwnershipDeclaration = s?.consent_ownership_declaration;
    const consentInterviewPermission = s?.consent_interview_permission;

    const consentItems = [
      ...(isArtist && consentPublicRelease !== undefined
        ? [{ label: "Consent to Public Release", value: consentPublicRelease }]
        : []),
      ...(isArtist && consentOwnershipDeclaration !== undefined
        ? [{ label: "Ownership Declaration", value: consentOwnershipDeclaration }]
        : []),
      ...(isArtist && consentInterviewPermission !== undefined
        ? [{ label: "Interview Permission", value: consentInterviewPermission }]
        : []),
    ];

    if (consentItems.length === 0) return null;

    return (
      <section>
        <div className="container mx-auto px-4 rounded-[19.886px] border-[0.5px] border-black/15 bg-[#F5F5F7] p-4 md:p-6 lg:p-8">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">Consent & Rights</h3>
          <div className="mt-4 md:mt-5 space-y-4">
            {consentItems.map((item) => (
              <div key={item.label}>
                <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                  {item.label}
                </h4>
                <p className={`text-base md:text-lg font-normal pt-3 md:pt-4 ${
                  item.value ? "text-emerald-600" : "text-red-500"
                }`}>
                  {item.value ? "✓ Granted" : "✗ Not Granted"}
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
    <section>
      <div className="container mx-auto px-4 rounded-[19.886px] border-[0.5px] border-black/15 bg-[#F5F5F7] p-4 md:p-6 lg:p-8">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">Consent & Rights</h3>
        <div className="mt-4 md:mt-5">
          <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
            Full Artist story
          </h4>
          <p className="text-base md:text-lg font-normal text-[#364153] pt-3 md:pt-4">
            A cozy neighborhood café combining specialty coffee with a curated
            flower shop. We source beans from fair-trade roasters and partner
            with local flower farms to bring beauty and warmth to our community.
          </p>
        </div>
      </div>
    </section>
  );
}
