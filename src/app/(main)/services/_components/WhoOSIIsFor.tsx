import Image from "next/image";
import { CMSServicesWhoFor } from "@/Types/cms";

const WhoOSIIsFor = ({ data: cmsData }: { data?: CMSServicesWhoFor }) => {
  const items = cmsData?.metadata?.map((m, i) => ({
    id: i + 1,
    title: m.title,
    image: m.image,
  }));

  if (!items || items.length === 0) return null;

  const renderCard = (item: (typeof items)[0], keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${item.id}`}
      className="shrink-0 w-40 sm:w-48 md:w-52 lg:w-56 xl:w-64 p-2.5 md:p-2.5 lg:p-3 flex flex-col items-center justify-center gap-1.5 lg:gap-2 custom_border custom_shadow bg-white"
    >
      <div className="p-1.5 md:p-1.5 lg:p-2 rounded-full custom_shadow size-12 md:size-13 lg:size-15 2xl:size-[80px]">
        <div className="relative size-full overflow-hidden rounded-full">
          {item.image && (
            <Image
              src={item.image}
              alt={item.title || ""}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
      <p className="text-primary-black text-[10px] md:text-xs lg:text-sm xl:text-xl font-semibold uppercase text-center">
        {item.title}
      </p>
    </div>
  );

  return (
    <section className="section">
      {/* Standard CSS keyframes compatible with Server Components */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marqueeLeft {
              from { transform: translateX(0%); }
              to { transform: translateX(-50%); }
            }
          `,
        }}
      />

      <div className="container">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          {cmsData?.title || "Who OSI Is For"}
        </h2>

        <p className="section_sub_title">
          {cmsData?.sub_title ||
            "Below is a breakdown of exactly what each membership provides so you can make the best choice for your goals."}
        </p>

        {/* Marquee Container */}
        <div className="overflow-hidden w-full my-4 md:my-5 lg:my-6 xl:my-14 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            className="flex w-max gap-2 md:gap-2.5 lg:gap-3 xl:gap-5 hover:[animation-play-state:paused]"
            style={{
              animation: "marqueeLeft 45s linear infinite",
            }}
          >
            {items.map((item) => renderCard(item, "marquee-1"))}
            {items.map((item) => renderCard(item, "marquee-2"))}
          </div>
        </div>

        <p className="section_sub_title max-w-[790px] mx-auto">
          {cmsData?.description || (
            <>
              If you&apos;re working to build a brand, launch a business, express
              your creativity, or make an impact —{" "}
              <span className="text-primary-blue">
                OSI was designed for you
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default WhoOSIIsFor;