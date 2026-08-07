import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { GoGift } from "react-icons/go";
import { CMSBossBeginnings, PastSixMonthsWinner } from "@/Types/cms";
import Link from "next/link";

const BossBeginnings = ({
  data,
  currentWinner,
}: {
  data?: CMSBossBeginnings;
  currentWinner?: PastSixMonthsWinner | null;
}) => {
  const winner = currentWinner;
  const winnerMedia = winner?.contestable?.media ?? [];
  const winnerName =
    winner?.display_name || winner?.contestable?.business_name || "";
  const bannerImage =
    winnerMedia[0]?.file_path ||
    winner?.avatar_url ||
    data?.image ||
    "/home/boss-beginnings-banner.jpg";
  const description =
    winner?.contestable?.story ||
    winner?.contestable?.community_impact_statement ||
    data?.description ||
    `Boss Beginnings is our signature celebration for brand‑new
            entrepreneurs. We highlight their story, support their launch, and
            bring the community together to give resources and opportunities.`;

  return (
    // Kept standard vertical padding light
    <section className="text-center bg-[#F5F5F7] py-10 2xl:py-12">
      <div className="container">
        {/* Reduced text line-height from xl:leading-[100px] to tight/snug options */}
        <h2 className="text-primary-black text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl font-bold leading-tight xl:leading-[1.1] tracking-[-1.28px]">
          {data?.title || "Boss Beginnings"}
        </h2>

        {/* Removed fallback extra margin if section_title has high defaults */}
        <h3 className="section_title mt-1 md:mt-2">
          {data?.sub_title || "A Business Shower"}
        </h3>

        {/* Scaled down the explicit heights across all responsive breakpoints and lowered vertical margin to my-4 md:my-5 */}
        <div className="relative flex items-center max-w-[1179px] w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[360px] xl:h-[420px] justify-center my-3 md:my-4 rounded-2xl md:rounded-[32px] overflow-hidden mx-auto">
          <div className="absolute top-0 left-0 size-full bg-black/40" />
          <Image
            src={bannerImage}
            fill
            alt={winnerName || "boss beginnings"}
            className="object-cover size-full"
            priority // Added priority since it is a large key banner image
          />

          {winner && (winnerName || winner.season?.title) && (
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
              {winnerName && (
                <span className="max-w-[70%] truncate bg-white/95 text-primary-black px-3 py-1.5 rounded-full text-sm font-medium">
                  {winnerName}
                </span>
              )}
              {winner.season?.title && (
                <span className="bg-primary-blue/90 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {winner.season.title}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tuned down typography scale slightly for better tight spatial structure */}
        <p className="text-secondary-black max-w-4xl mx-auto text-sm md:text-base xl:text-xl">
          {description}
        </p>

        {/* Trimmed down top margins above the actions block */}
        <Link href={"/boss-beginnings"}>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 mt-5 md:mt-6 xl:mt-8">
            {/* <Button>
              <div className="flex items-center justify-center size-6 shrink-0 aspect-square rounded-lg custom_border bg-gray-100">
                <GoGift className="text-primary-blue" />
              </div>
              Learn More
            </Button> */}
            <Button variant={"outline"}>Nominate a Business</Button>
            {/* <Button variant={"outline"}>Sponsor Event</Button> */}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BossBeginnings;
