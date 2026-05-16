"use client";
import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import { artists } from "@/Components/Data/data";
import { BookmarkSvg, LikeSvg, ShareSvg } from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { BsArrowRight } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";

const tabs = [
  {
    id: "1",
    tab: "All",
    isActive: true,
  },
  {
    id: "2",
    tab: "Visual Artists",
    isActive: false,
  },
  {
    id: "3",
    tab: "Photographers",
    isActive: false,
  },
  {
    id: "4",
    tab: "Models",
    isActive: false,
  },
  {
    id: "5",
    tab: "Digital Creators",
    isActive: false,
  },
  {
    id: "6",
    tab: "Mixed Media",
    isActive: false,
  },
];

import {
  getArtistSpotlights,
  getBusinessSpotlights,
} from "@/Hooks/api/cms_api";
import { ArtistCategorySkeleton } from "@/Components/Loader/Loader";

const DiscoverArtists = ({
  type = "artist",
  data: cmsData
}: {
  type?: "artist" | "business";
  data?: any;
}) => {
  const { data: artistData, isLoading: artistLoading } = getArtistSpotlights();
  const { data: businessData, isLoading: businessLoading } =
    getBusinessSpotlights();

  const data = type === "artist" ? artistData?.data : businessData?.data;
  const isLoading = type === "artist" ? artistLoading : businessLoading;

  return (
    <section className="section">
      <Container>
        <h2 className="section_title">
          {cmsData?.title || `Discover More ${type === "artist" ? "Artists" : "Businesses"}`}
        </h2>
        <p className="section_sub_title">
          {cmsData?.sub_title || (
            <>
              Meet the {type === "artist" ? "creatives" : "businesses"} shaping our
              neighborhoods.
              <br />
              From innovative startups to community anchors, these stories highlight
              the courage, creativity, and commitment behind every brand.
            </>
          )}
        </p>
        <div className="flex items-center justify-between mt-20">
          <div className="w-full max-w-[370px] py-4 pl-5 flex items-center gap-3 pr-4 custom_border bg-white rounded-full">
            <LuSearch className="text-2xl" />
            <input
              type="search"
              className="w-full outline-none"
              placeholder="Search"
            />
          </div>
          <div className="max- w-[1000px] -full">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={12}
              watchOverflow={true}
              freeMode={{
                enabled: true,
                momentum: false,
              }}
              modules={[FreeMode]}
              className="w-full"
            >
              {tabs.map(tab => (
                <SwiperSlide key={tab.id} className="!w-fit">
                  <button
                    className={`tracking-wide whitespace-nowrap font-medium transition-colors px-[34px] py-3.5 rounded-full text-xl ${tab.isActive ? "bg-primary-blue text-white border border-primary-blue" : "bg-[#F3F4F6] text-black border-current hover:bg-primary-blue/85 hover:text-white cursor-pointer"}`}
                    disabled={tab.isActive}
                  >
                    {tab.tab}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[300px] bg-gray-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {data?.map((item: any, index: number) => (
              <div
                key={item.id || index}
                className="p-5 rounded-xl custom_border custom_shadow bg-white space-y-4"
              >
                <div className="flex  items-center gap-5">
                  <figure className="size-[118px]">
                    <Image
                      src={
                        type === "artist"
                          ? item.media?.headshot
                          : item.images?.portrait_photo
                      }
                      width={118}
                      height={118}
                      alt=""
                      className="size-full rounded-full object-cover"
                    />
                  </figure>
                  <div className="space-y-3">
                    <h4 className="text-2xl text-primary-black font-semibold">
                      {type === "artist"
                        ? item.artist_stage_name
                        : item.business_name}
                    </h4>
                    <span className="px-3.5 py-1 rounded-full bg-[#8F8F8F2E] text-sm text-primary-black">
                      {type === "artist" ? item.city : item.business_category}
                    </span>
                  </div>
                </div>
                <p className="text-xl text-[#909090] line-clamp-3">
                  {type === "artist" ? item.short_bio : item.business_story}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="py-4 px-6 flex items-center gap-5 flex-1">
                    <LikeSvg size={24} />
                    <BookmarkSvg size={24} />
                    <ShareSvg size={24} />
                  </div>
                  {/* <Button>View Spotlight <BsArrowRight className='text-2xl' /></Button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default DiscoverArtists;
