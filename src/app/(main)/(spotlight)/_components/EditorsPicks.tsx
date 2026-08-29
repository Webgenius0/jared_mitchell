"use client";
import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import {
  getArtistSpotlights,
  getBusinessSpotlights,
} from "@/Hooks/api/cms_api";

const EditorsPicks = ({
  type = "artist",
  data: cmsData
}: {
  type?: "artist" | "business";
  data?: any;
}) => {
  const { data: artistData, isLoading: artistLoading } = getArtistSpotlights();
  const { data: businessData, isLoading: businessLoading } =
    getBusinessSpotlights();

  const rawData = type === "artist" ? artistData?.data : businessData?.data;
  const data = Array.isArray(rawData)
    ? rawData.slice(0, 3)
    : rawData?.spotlights?.slice(0, 3);
  const isLoading = type === "artist" ? artistLoading : businessLoading;

  return (
    <>
      <section className="section">
        <Container>
          <div className="">
            <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
              {cmsData?.title || "Editor's Picks"}
            </h2>
            <p className="section_sub_title">
              {cmsData?.sub_title || "Celebrating our community's achievements and creative milestones"}
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-10 lg:mt-11">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-[300px] md:h-[350px] lg:h-[400px] bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : !data || data.length === 0 ? (
            <div className="mt-8 md:mt-10 lg:mt-11 border border-dashed border-gray-200 bg-gray-50 py-10 md:py-12 lg:py-16 px-5 md:px-6 text-center">
              <p className="text-4xl mb-4">🎨</p>
              <h4 className="text-xl font-semibold text-primary-black mb-2">
                No {type === "artist" ? "artists" : "businesses"} available yet
              </h4>
              <p className="text-secondary-black max-w-md mx-auto">
                There are no picks to display right now. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-10 lg:mt-11">
              {data?.map((item: any, index: number) => (
                <div
                  key={item.id || index}
                  className="bg-white p-5 md:p-6 lg:p-[30px] custom_border custom_shadow"
                >
                  <figure className="w-full">
                    <Image
                      src={
                        type === "artist"
                          ? item.media?.headshot
                          : item.images?.portrait_photo
                      }
                      alt={
                        type === "artist"
                          ? item.artist_stage_name
                          : item.business_name
                      }
                      width={500}
                      height={290}
                      className="w-full h-[200px] md:h-[240px] lg:h-[290px] object-cover"
                    />
                  </figure>

                  {/* Content */}
                  <div className="pt-4 md:pt-5 lg:pt-6 space-y-4 md:space-y-5 lg:space-y-6">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary-black">
                      {type === "artist"
                        ? item.artist_stage_name
                        : item.business_name}
                    </h3>

                    <div className="bg-[#8F8F8F2E] px-3.5 py-[7px] rounded-full inline-block">
                      {type === "artist" ? item.city : item.business_category}
                    </div>

                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-[#909090] line-clamp-2">
                      {type === "artist" ? item.short_bio : item.business_story}
                    </p>

                    <div className="pt-2">
                      <Button asChild size="xl">
                        <Link href={`#`}>
                          View Spotlight
                          <BsArrowRight className="text-2xl" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default EditorsPicks;
