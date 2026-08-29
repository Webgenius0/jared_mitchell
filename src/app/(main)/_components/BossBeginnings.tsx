"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { useRouter } from "next/navigation";
import { isBusinessUser } from "@/lib/utils";
import { Button } from "@/Components/Common/Button";
import { isUserSubscribed } from "@/Hooks/api/subscription_api";
import { CMSBossBeginnings, PastSixMonthsWinner } from "@/Types/cms";

const BOSS_BEGINNINGS_URL = "/boss-beginnings";

const BossBeginnings = ({
  data,
  currentWinner,
}: {
  data?: CMSBossBeginnings;
  currentWinner?: PastSixMonthsWinner | null;
}) => {
  const router = useRouter();
  const { token, user } = useAuth();

  const isBusiness = isBusinessUser(user);
  const restricted = Boolean(token) && !isBusiness;

  const handleNominate = () => {
    if (!token) {
      toast.error("Please login to nominate a business");
      router.push(
        `/auth/login?redirect=${encodeURIComponent(BOSS_BEGINNINGS_URL)}`,
      );
      return;
    }
    if (!isBusiness) {
      toast.error("Only business accounts can nominate a business");
      return;
    }
    if (!isUserSubscribed(user)) {
      toast.error("An active subscription is required to nominate a business");
      router.push("/pricing");
      return;
    }
    router.push(BOSS_BEGINNINGS_URL);
  };

  const winner = currentWinner;
  const winnerMedia = winner?.contestable?.media ?? [];
  const winnerName =
    winner?.display_name || winner?.contestable?.business_name || "";

  // Headshot from avatar_url
  const headshotSrc = winner?.avatar_url || null;

  // Media items with file_path
  const mediaItems: string[] = winnerMedia
    .map((m: any) => m.file_path)
    .filter((src: string | undefined): src is string => Boolean(src));

  // Main banner image: first media or fallback
  const bannerImage =
    mediaItems[0] ||
    headshotSrc ||
    data?.image ||
    "/home/boss-beginnings-banner.jpg";

  // Description: prefer contestable story, then community impact, then CMS
  const description =
    winner?.contestable?.story ||
    winner?.contestable?.community_impact_statement ||
    data?.description ||
    `OSI Top Business Award is our signature celebration for brand‑new
            entrepreneurs. We highlight their story, support their launch, and
            bring the community together to give resources and opportunities.`;

  return (
    <section className="text-center bg-[#F5F5F7] py-8 md:py-8 lg:py-10 2xl:py-12">
      <div className="container">
        <h2 className="text-primary-black text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold leading-tight xl:leading-[1.1] tracking-[-1.28px]">
          {data?.title || "OSI Top Business Award"}
        </h2>
        <h3 className="section_title mt-1 md:mt-2">
          {data?.sub_title || "A Business Shower"}
        </h3>

        <div className="max-w-[1179px] w-full mx-auto my-3 md:my-4 lg:my-6">
          {/* Main media area */}
          <div className="relative w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] xl:h-[420px] overflow-hidden">
            <div className="absolute top-0 left-0 size-full bg-black/40 z-[1]" />
            {mediaItems.length > 0 ? (
              <Image
                src={mediaItems[0]}
                fill
                alt={winnerName || "OSI Top Business Award"}
                className="object-cover size-full"
                priority
              />
            ) : (
              <Image
                src={bannerImage}
                fill
                alt={winnerName || "OSI Top Business Award"}
                className="object-cover size-full"
                priority
              />
            )}

            {winner && (winnerName || winner.season?.title) && (
              <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
                {winnerName && (
                  <span className="max-w-[70%] truncate bg-white/95 text-primary-black px-3 py-1.5 rounded-full text-sm font-medium">
                    {winnerName}
                  </span>
                )}
                {winner.season?.title && (
                  <span className="bg-[#155DFC] text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    {winner.season.title}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Headshot + media thumbnails row */}
          {(headshotSrc || mediaItems.length > 1) && (
            <div className="flex items-center gap-3 mt-3 md:mt-4">
              {headshotSrc && (
                <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                  <Image
                    src={headshotSrc}
                    fill
                    sizes="80px"
                    alt={`${winnerName} headshot`}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex gap-2 overflow-x-auto">
                {mediaItems.slice(1).map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0"
                  >
                    <Image
                      src={src}
                      fill
                      sizes="64px"
                      alt="Contest media"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-secondary-black max-w-4xl mx-auto text-xs md:text-sm lg:text-base xl:text-xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-6 mt-4 md:mt-5 xl:mt-8">
          <Button
            variant={"outline"}
            onClick={handleNominate}
            title={
              restricted
                ? "Only business accounts can nominate a business"
                : undefined
            }
            className={
              restricted
                ? "opacity-50 cursor-not-allowed hover:border-[#D1D5DC]"
                : ""
            }
          >
            Nominate a Business
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BossBeginnings;
