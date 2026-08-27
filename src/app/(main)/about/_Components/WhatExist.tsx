import { CMSAboutWhyExists } from "@/Types/cms";

const WhatExist = ({ data }: { data?: CMSAboutWhyExists }) => {
  return (
    <section className="py-8 md:py-10 lg:py-14 xl:py-20 bg-primary-blue text-center">
      <div className="container">
        <h2 className="text-white text-2xl md:text-2xl lg:text-3xl xl:text-5xl font-bold leading-[140%] mb-4 md:mb-4 lg:mb-5">
          {data?.title || "Why OSI Exists"}
        </h2>

        <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-white leading-[150%] max-w-[1200px] mx-auto">
          {data?.description || `Because visibility matters. Because support changes lives. Because
          community creates opportunity. OSI exists to break the cycle of being
          overlooked — and to replace it with recognition, collaboration, and
          growth. We believe that when one person rises, the entire community
          rises with them.`}
        </p>
      </div>
    </section>
  );
};

export default WhatExist;
