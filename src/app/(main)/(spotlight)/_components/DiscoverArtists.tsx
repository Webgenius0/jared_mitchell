"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Common/Container";
import { LikeSvg } from "@/Components/Svg/SvgContainer";

import { getArtists, getBusinessSpotlights } from "@/Hooks/api/cms_api";

const DiscoverArtists = ({
  type = "artist",
  data: cmsData,
}: {
  type?: "artist" | "business";
  data?: any;
}) => {
  const { data: artistData, isLoading: artistLoading } = getArtists();
  const { data: businessData, isLoading: businessLoading } =
    getBusinessSpotlights();

  const artists = artistData?.data?.artists;
  const data = type === "artist" ? artists : businessData?.data;
  const isLoading = type === "artist" ? artistLoading : businessLoading;

  const getDetailsHref = (item: any) => {
    const basePath =
      type === "artist" ? "/spotlight-artist" : "/spotlight-business";
    return `${basePath}/${item.id}`;
  };

  return (
    <section className="section">
      <Container>
        <h2 className="section_title">
          {cmsData?.title ||
            `Discover More ${type === "artist" ? "Artists" : "Businesses"}`}
        </h2>
        <p className="section_sub_title">
          {cmsData?.sub_title || (
            <>
              Meet the {type === "artist" ? "creatives" : "businesses"} shaping
              our neighborhoods.
              <br />
              From innovative startups to community anchors, these stories
              highlight the courage, creativity, and commitment behind every
              brand.
            </>
          )}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[300px] bg-gray-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {data?.map((item: any, index: number) => {
              const image =
                type === "artist" ? item.avatar : item.images?.portrait_photo;
              const name = type === "artist" ? item.name : item.business_name;
              const description =
                type === "artist" ? item.biography : item.business_story;

              return (
                <Link
                  key={item.id || index}
                  href={getDetailsHref(item)}
                  className="group relative block rounded-2xl overflow-hidden custom_shadow bg-white transition-shadow duration-300 hover:shadow-lg cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay for text legibility - strongest at bottom, fades toward top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>

                  {/* Text content */}
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                    <h4 className="text-lg text-white font-semibold drop-shadow-sm">
                      {name}
                    </h4>
                    <p className="text-sm text-white/85 line-clamp-2 mt-1 pr-8 drop-shadow-sm">
                      {description}
                    </p>
                  </div>

                  {/* Like icon - stopPropagation so click doesn't navigate */}
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 z-10 size-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                    aria-label="Like"
                  >
                    <LikeSvg size={18} className="text-white" />
                  </button>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default DiscoverArtists;
