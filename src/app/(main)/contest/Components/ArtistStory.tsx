interface ArtistStoryProps {
  spotlight?: any;
  type?: "artist" | "business";
}

export default function ArtistStory({
  spotlight,
  type = "artist",
}: ArtistStoryProps) {
  const s = spotlight;
  if (!s) return null;

  const isArtist = type === "artist";

  const sections = [
    {
      heading: isArtist ? "Full Artist story" : "Full Story",
      content: isArtist ? s?.full_artist_story : s?.business_story || s?.full_story,
    },
    {
      heading: isArtist
        ? "Why should your story be Spotlighted?"
        : "Why should this business be Spotlighted?",
      content: isArtist ? s?.why_spotlighted : s?.why_featured,
    },
    {
      heading: isArtist
        ? "What message do you want to share with the community?"
        : "Products & Services",
      content: isArtist ? s?.community_message : s?.products_services,
    },
    {
      heading: isArtist
        ? "What are your current goals as an artist?"
        : "Growth Vision",
      content: isArtist ? s?.current_goals : s?.growth_vision,
    },
  ].filter(section => section.content);

  return (
    <section>
      <div className="container mx-auto px-4 rounded-[19.886px] border-[0.5px] border-black/15 bg-[#F5F5F7] p-4 md:p-6 lg:p-8">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
          {isArtist ? "Artist Story" : "Business Story"}
        </h3>
        {sections.length === 0 ? (
          <p className="text-base md:text-lg font-normal text-[#364153] pt-5 md:pt-6">
            No information provided yet.
          </p>
        ) : (
          <div className="flex flex-col gap-5 md:gap-6 lg:gap-8 mt-5 md:mt-6 lg:mt-8">
            {sections.map(section => (
              <div key={section.heading}>
                <h4 className="text-lg md:text-xl font-medium text-[#1D1D1F]">
                  {section.heading}
                </h4>
                <p className="text-base md:text-lg font-normal text-[#364153] pt-3 md:pt-4">
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
