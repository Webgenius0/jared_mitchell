import Image from "next/image";
import { PastSixMonthsWinner } from "@/Types/cms";

const BossBeginningWinner = ({
  winner,
}: {
  winner: PastSixMonthsWinner | null;
}) => {
  const winnerMedia = winner?.contestable?.media ?? [];

  const images = winnerMedia
    .map(m => m.file_path)
    .filter((src): src is string => Boolean(src));

  const renderCaption = (winner: PastSixMonthsWinner) => (
    <figcaption className="absolute bottom-6 left-6 z-10 text-white">
      <p className="text-sm  tracking-wider text-white/70 capitalize">
        {winner.season?.title}
      </p>
      <p className="text-2xl font-bold capitalize">
        {winner.contestable?.business_name}
      </p>
      <p className="text-sm text-white/80 capitalize">
        by {winner.contestable?.owner_founder_name}
      </p>
    </figcaption>
  );

  return (
    <section className="container lg:mt-10 mt-5">
      <h2 className="section_title">BOSS BEGINNINGS Winner</h2>
      <p className="text-base md:text-lg lg:text-2xl xl:text-3xl text-center text-primary-black leading-relaxed">
        See the joy, support, and community love from our previous Boss
        Beginnings events.
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
                  alt={winner?.contestable?.business_name ?? ""}
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
                  alt={winner?.contestable?.business_name ?? ""}
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
                alt={winner?.contestable?.business_name ?? ""}
                className="size-full object-cover"
              />
              {winner && renderCaption(winner)}
            </figure>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-black/10 bg-white p-10 text-center text-sm sm:text-base text-black/50 my-6">
          No winner media available yet.
        </div>
      )}
    </section>
  );
};

export default BossBeginningWinner;
