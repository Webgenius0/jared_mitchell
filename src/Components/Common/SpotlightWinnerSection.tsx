import Image from "next/image";
import { SpotlightHistoricalWinnerItem } from "@/Types/cms";

interface SpotlightWinnerSectionProps {
  winner: SpotlightHistoricalWinnerItem | null;
  type: "artist" | "business";
}

const SpotlightWinnerSection = ({
  winner,
  type,
}: SpotlightWinnerSectionProps) => {
  const media = winner?.spotlight?.media;
  const images = [
    media?.headshot,
    media?.artwork_photos?.[0],
    media?.behind_scenes_photo,
  ].filter((src): src is string => Boolean(src));

  const renderCaption = (w: SpotlightHistoricalWinnerItem) => (
    <figcaption className="absolute bottom-6 left-6 z-10 text-white">
      <p className="text-sm tracking-wider text-white/70 capitalize">
        Week {w.week_number}, {w.year}
      </p>
      <p className="text-2xl font-bold capitalize">
        {w.spotlight?.name}
      </p>
      <p className="text-sm text-white/80 capitalize">
        by {w.owner?.name}
      </p>
    </figcaption>
  );

  const sectionTitle =
    type === "artist"
      ? "ARTIST SPOTLIGHT Winner"
      : "BUSINESS SPOTLIGHT Winner";

  return (
    <section className="container lg:mt-10 mt-5">
      <h2 className="section_title">{sectionTitle}</h2>
      <p className="text-base md:text-lg lg:text-2xl xl:text-3xl text-center text-primary-black leading-relaxed">
        See the joy, support, and community love from our previous{" "}
        {type === "artist" ? "Artist" : "Business"} Spotlight events.
      </p>

      {images.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center my-6 gap-6">
            {images[0] && (
              <figure className="max-h-[808px] !h-full relative">
                <div className="size-full absolute bg-black/30" />
                <Image
                  src={images[0]}
                  width={762}
                  height={808}
                  alt={winner?.spotlight?.name ?? ""}
                  className="size-full object-cover"
                />
                {images.length === 1 && winner && renderCaption(winner)}
              </figure>
            )}
            {images[1] && (
              <figure className="max-h-[808px] !h-full relative">
                <div className="size-full absolute bg-black/30" />
                <Image
                  src={images[1]}
                  width={762}
                  height={808}
                  alt={winner?.spotlight?.name ?? ""}
                  className="size-full object-cover"
                />
                {images.length === 2 && winner && renderCaption(winner)}
              </figure>
            )}
          </div>

          {images[2] && (
            <figure className="h-[400px] md:h-[550px] xl:h-[808px] relative">
              <div className="size-full absolute bg-black/30" />
              <Image
                src={images[2]}
                width={762}
                height={808}
                alt={winner?.spotlight?.name ?? ""}
                className="size-full object-cover"
              />
              {winner && renderCaption(winner)}
            </figure>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-black/10 bg-white p-10 text-center text-sm sm:text-base text-black/50 my-6">
          No {type} spotlight winner media available yet.
        </div>
      )}
    </section>
  );
};

export default SpotlightWinnerSection;
