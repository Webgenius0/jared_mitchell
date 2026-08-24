import React from "react";

interface RoundTwoAboutProps {
  contestant?: any;
  /** Round number used in the heading (2 for round 2, 3 for round 3, …) */
  roundNumber?: number;
}

// website_social_media can be a JSON string, a plain URL, or null — normalize it
const parseWebsiteSocial = (raw: string | null | undefined) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export default function RoundTwoAbout({
  contestant,
  roundNumber = 2,
}: RoundTwoAboutProps) {
  const parsedSocial = parseWebsiteSocial(contestant?.website_social_media);
  const website =
    (typeof parsedSocial === "object" && parsedSocial !== null
      ? parsedSocial?.website || parsedSocial?.social
      : parsedSocial) || "";

  const facebook =
    typeof parsedSocial === "object" && parsedSocial !== null
      ? parsedSocial?.facebook ||
        parsedSocial?.social?.facebook ||
        parsedSocial?.facebook_url
      : "";

  const instagram =
    typeof parsedSocial === "object" && parsedSocial !== null
      ? parsedSocial?.instagram ||
        parsedSocial?.social?.instagram ||
        parsedSocial?.instagram_url
      : "";

  const aboutText = contestant?.story || "No information provided yet.";

  // Rounds 2-5 are weighted-score rounds: the "Support This Business" box
  // shows the total weighted score from the contestant's voting data.
  const totalWeightedScore = contestant?.voting?.total_weighted_score ?? 0;
  const isAboutHtml = /<[a-z][\s\S]*>/i.test(aboutText);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-normal text-[#101828]">
          Round {roundNumber}
        </h3>
        <h5 className="text-sm md:text-base text-black/50">
          Phase {roundNumber}
        </h5>
        <div className="flex flex-col lg:flex-row gap-6 mt-6 md:mt-10">
          <div className="w-full lg:w-3/4 ">
            <div className="bg-[#F5F5F7] rounded-xl p-4 md:p-6 flex flex-col gap-6 md:gap-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
                About
              </h2>
              {isAboutHtml ? (
                <div
                  className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153]"
                  dangerouslySetInnerHTML={{ __html: aboutText }}
                />
              ) : (
                <p className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153]">
                  {aboutText}
                </p>
              )}
              {website && (
                <div>
                  <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                    Website:
                  </h4>
                  <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                    {website}
                  </h5>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-center">
                {website && (
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                      Website:
                    </h4>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                      {website}
                    </h5>
                  </div>
                )}
                {facebook && (
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                      Facebook
                    </h4>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                      {facebook}
                    </h5>
                  </div>
                )}
                {instagram && (
                  <div>
                    <h4 className="text-lg md:text-xl lg:text-2xl font-normal text-[#1D1D1F]">
                      Instagram
                    </h4>
                    <h5 className="text-lg md:text-xl lg:text-2xl font-normal text-[#364153] pt-2 md:pt-3 break-all">
                      {instagram}
                    </h5>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/4 bg-[#F5F5F7] rounded-xl p-4 md:p-6 h-fit">
            <h4 className="text-xl md:text-2xl font-semibold text-[#1D1D1F]">
              Support This Business
            </h4>
            <div className="my-4 bg-[#1977DD] p-4 md:p-6 w-full rounded-xl">
              <p className="text-white font-normal text-balance text-center text-sm md:text-base">
                Total Weighted Score
              </p>
              <h3 className="text-xl md:text-2xl font-normal text-white text-center">
                {totalWeightedScore.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
