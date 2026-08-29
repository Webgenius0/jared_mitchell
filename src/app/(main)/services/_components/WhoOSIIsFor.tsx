import Image from "next/image";
import { CMSServicesWhoFor } from "@/Types/cms";

const WhoOSIIsFor = ({ data: cmsData }: { data?: CMSServicesWhoFor }) => {
  const items = cmsData?.metadata?.map((m, i) => ({
    id: i + 1,
    title: m.title,
    image: m.image,
  }));

  if (!items || items.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
          {cmsData?.title || "Who OSI Is For"}
        </h2>

        <p className="section_sub_title">
          {cmsData?.sub_title ||
            "Below is a breakdown of exactly what each membership provides so you can make the best choice for your goals."}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-2.5 lg:gap-3 xl:gap-5 my-4 md:my-5 lg:my-6 xl:my-14">
          {items.map(item => (
            <div
              key={item.id}
              className="p-2.5 md:p-2.5 lg:p-3 flex flex-col items-center justify-center gap-1.5 lg:gap-2 custom_border custom_shadow rounded-[14px] bg-white"
            >
              <div className="p-1.5 md:p-1.5 lg:p-2 bg-primary-blue rounded-full custom_shadow size-12 md:size-13 lg:size-15 2xl:size-[80px]">
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
          ))}
        </div>

        <p className="section_sub_title max-w-[790px] mx-auto">
          {cmsData?.description || (
            <>
              If you're working to build a brand, launch a business, express
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
