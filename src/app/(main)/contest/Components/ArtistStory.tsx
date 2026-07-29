import React from "react";

interface ArtistStoryProps {
  spotlight?: any;
  type?: "artist" | "business";
}

export default function ArtistStory({ spotlight, type = "artist" }: ArtistStoryProps) {
  const s = spotlight;
  const isArtist = type === "artist";

  // Fallback hardcoded data when no spotlight is provided (for spotlight-artist/business pages)
  const fullStory = s
    ? isArtist
      ? s?.full_artist_story
      : s?.business_story || s?.full_story
    : "A cozy neighborhood café combining specialty coffee with a curated flower shop. We source beans from fair-trade roasters and partner with local flower farms to bring beauty and warmth to our community.";

  const whySpotlighted = s
    ? isArtist
      ? s?.why_spotlighted
      : s?.why_featured
    : "A cozy neighborhood café combining specialty coffee with a curated flower shop. We source beans from fair-trade roasters and partner with local flower farms to bring beauty and warmth to our community.";

  const communityMessage = s
    ? isArtist
      ? s?.community_message
      : s?.products_services
    : "A cozy neighborhood café combining specialty coffee with a curated flower shop. We source beans from fair-trade roasters and partner with local flower farms to bring beauty and warmth to our community.";

  const currentGoals = s
    ? isArtist
      ? s?.current_goals
      : s?.growth_vision
    : "A cozy neighborhood café combining specialty coffee with a curated flower shop. We source beans from fair-trade roasters and partner with local flower farms to bring beauty and warmth to our community.";

  return (
    <section>
      <div className="container mx-auto px-4 rounded-[19.886px] border-[0.5px] border-black/15 bg-[#F5F5F7] p-4 md:p-6 lg:p-8">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
          {isArtist ? "Artist Story" : "Business Story"}
        </h3>
        <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 mt-5 md:mt-6 lg:mt-8">
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              {isArtist ? "Full Artist story" : "Full Story"}
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-3 md:pt-4">
              {fullStory}
            </p>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              {isArtist
                ? "Why should your story be Spotlighted?"
                : "Why should this business be Spotlighted?"}
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-3 md:pt-4">
              {whySpotlighted}
            </p>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              {isArtist
                ? "What message do you want to share with the community?"
                : "Products & Services"}
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-3 md:pt-4">
              {communityMessage}
            </p>
          </div>
          <div>
            <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
              {isArtist
                ? "What are your current goals as an artist?"
                : "Growth Vision"}
            </h4>
            <p className="text-base md:text-lg font-normal text-[#364153] pt-3 md:pt-4">
              {currentGoals}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
