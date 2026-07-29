import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { CMSSpotlight, PastSixMonthsWinner } from "@/Types/cms";

interface ArtistSpotlightCardProps {
  data?: CMSSpotlight;
  currentWinner?: PastSixMonthsWinner | null;
}

const getSpotlightLink = (winner: PastSixMonthsWinner): string => {
  return `/contest/contestants/${winner.id}`;
};

export default function ArtistSpotlightCard({
  data,
  currentWinner,
}: ArtistSpotlightCardProps) {
  const winner = currentWinner;

  const title = winner
    ? winner.display_name || winner.contestable.business_name
    : data?.description
      ? data.description.split(".")[0]
      : "How Aaliyah Monet Uses Art to Heal and Inspire";

  const description = winner
    ? winner.contestable.story ||
      winner.contestable.community_impact_statement ||
      ""
    : data?.description ||
      `Aaliyah Monet blends abstract artistry with personal storytelling to
            amplify voices often unheard. Her journey is a powerful reminder how
            creativity can heal and unite a community. Through vibrant murals
            and intimate portraits, she creates spaces for connection and
            healing.`;

  const imageSrc = winner
    ? winner.avatar_url
    : data?.image || "/home/artist-spotlight-img.jpg";

  const category = winner
    ? winner.contestable.type.includes("Business")
      ? "Business Spotlight"
      : "Artist Spotlight"
    : "Artist Spotlight";

  const spotlightLink = winner ? getSpotlightLink(winner) : null;

  return (
    <div className="container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        {data?.title || "Boss Beginning Winers showing"}
      </h2>

      <p className="section_sub_title">
        {data?.sub_title || "A story from our community making an impact."}
      </p>

      <div className="overflow-hidden max-w-[1396px] w-full mx-auto rounded-2xl bg-[#F5F5F7] custom_shadow custom_border mt-7 group">
        <figure className="w-full h-[250px] md:h-[400px] xl:h-[500px] overflow-hidden relative">
          <Image
            src={imageSrc}
            fill
            alt={title}
            className="object-cover size-full transition-transform duration-700 group-hover:scale-105"
          />

          {/* Season badge overlay */}
          {winner && (
            <div className="absolute top-4 right-4 bg-primary-blue/90 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
              {winner.season.title}
            </div>
          )}
        </figure>

        <div className="m-3 md:m-5 lg:m-7 2xl:m-10">
          <span className="inline-block rounded-full bg-[#EFF6FF] px-3 md:px-5 py-3 lg:py-4 lg:text-xl text-primary-blue tracking-wider">
            {category}
          </span>

          <h2 className="section_title !text-left mb-4 mt-1.5 md:mt-3 lg:mt-6 2xl:font-semibold 2xl:text-[56px]">
            {title}
          </h2>

          <p className="lg:text-base xl:text-xl text-secondary-black">
            {description}
          </p>

          <div className="mt-5">
            {spotlightLink ? (
              <Link href={spotlightLink}>
                <Button>View Spotlight</Button>
              </Link>
            ) : (
              <Button>View Spotlight</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
