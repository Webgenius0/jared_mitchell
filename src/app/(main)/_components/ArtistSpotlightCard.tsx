import { Button } from "@/Components/Common/Button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { RxShare1 } from "react-icons/rx";
import { CMSSpotlight } from "@/Types/cms";

export default function ArtistSpotlightCard({ data }: { data?: CMSSpotlight }) {
  return (
    <div className="container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        {data?.title || "Featured Spotlight"}
      </h2>

      <p className="section_sub_title">
        {data?.sub_title || "A story from our community making an impact."}
      </p>

      <div className="overflow-hidden max-w-[1396px] w-full mx-auto rounded-2xl bg-[#F5F5F7] custom_shadow custom_border mt-7">
        <figure className="w-full h-[250px] md:h-[400px] xl:h-[500px]  overflow-hidden relative">
          <Image
            src={data?.image || "/home/artist-spotlight-img.jpg"}
            fill
            alt="Artist painting"
            className="object-cover size-full"
          />
        </figure>

        <div className="m-3 md:m-5 lg:m-7 2xl:m-10">
          <span className="inline-block rounded-full bg-[#EFF6FF] px-3 md:px-5 py-3 lg:py-4 lg:text-xl text-primary-blue tracking-wider">
            Artist Spotlight
          </span>

          <h2 className="section_title !text-left mb-4 mt-1.5 md:mt-3 lg:mt-6 2xl:font-semibold 2xl:text-[56px]">
            {data?.description
              ? data.description.split(".")[0]
              : "How Aaliyah Monet Uses Art to Heal and Inspire"}
          </h2>

          <p className="lg:text-base xl:text-xl text-secondary-black">
            {data?.description ||
              `Aaliyah Monet blends abstract artistry with personal storytelling to
            amplify voices often unheard. Her journey is a powerful reminder how
            creativity can heal and unite a community. Through vibrant murals
            and intimate portraits, she creates spaces for connection and
            healing.`}
          </p>
          {/* 
          <div className="md:mt-3 xl:mt-8 mb-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-5 text-gray-500">
              <div className="flex items-center gap-2 md:gap-4 2xl:gap-6">
                <div className="flex items-center justify-center size-7 md:size-10 xl:size-[48px] aspect-square rounded-full bg-white custom_shadow">
                  <FaRegHeart className="size-4 md:size-5 xl:size-[28px] text-primary-black" />
                </div>
                <span className="text-secondary-black md:text-xl xl:text-2xl">
                  1,204
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4 2xl:gap-6">
                <div className="flex items-center justify-center size-7 md:size-10 xl:size-[48px] aspect-square rounded-full bg-white custom_shadow">
                  <FiBookmark className="size-4 md:size-5 xl:size-[28px] text-primary-black" />
                </div>
                <span className="text-secondary-black md:text-xl xl:text-2xl">
                  Save
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4 2xl:gap-6">
                <div className="flex items-center justify-center size-7 md:size-10 xl:size-[48px] aspect-square rounded-full bg-white custom_shadow">
                  <RxShare1 className="size-4 md:size-5 xl:size-[28px] text-primary-black" />
                </div>
                <span className="text-secondary-black md:text-xl xl:text-2xl">
                  Share
                </span>
              </div>
            </div>
          </div> */}
          <div className="mt-5">
            <Button>View Spotlight</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
