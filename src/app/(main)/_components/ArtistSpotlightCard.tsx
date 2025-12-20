import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { FiBookmark } from "react-icons/fi";
import { RxShare1 } from "react-icons/rx";

export default function ArtistSpotlightCard() {
    return (
        <Container >
            <h2 className="section_title 2xl:text-7xl 2xl:font-bold">Featured Spotlight</h2>
            <p className="section_sub_title">A story from our community making an impact.</p>
            <div className="overflow-hidden max-w-[1396px] w-full mx-auto rounded-2xl bg-white custom_shadow custom_border">
                <figure className="w-full h-[871px] overflow-hidden">
                    <Image
                        src="/home/artist-spotlight.jpg"
                        width={1396}
                        height={871}
                        alt="Artist painting"
                        className="object-cover size-full"
                    />
                </figure>
                <div className="m-6 xl:m-10 2xl:m-12">
                    <span className="inline-block rounded-full bg-[#EFF6FF] px-5 py-4 text-xl text-primary-blue tracking-wider">
                        Artist Spotlight
                    </span>

                    <h2 className="section_title text-left mb-4 mt-6 2xl:font-semibold 2xl:text-[56px]">
                        How Aaliyah Monet Uses Art to Heal and Inspire
                    </h2>

                    <p className="text-2xl text-secondary-black">
                        Aaliyah Monet blends abstract artistry with personal storytelling to
                        amplify voices often unheard. Her journey is a powerful reminder how
                        creativity can heal and unite a community. Through vibrant murals and
                        intimate portraits, she creates spaces for connection and healing.
                    </p>

                    <div className="mt-8 mb-6 py-5 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-5 text-gray-500">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center justify-center size-[48px] aspect-square rounded-full bg-white custom_shadow">
                                    <FaRegHeart className="size-[28px] text-primary-black" />
                                </div>
                                <span className="text-secondary-black text-xl md:text-2xl">1,204</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center justify-center size-[48px] aspect-square rounded-full bg-white custom_shadow">
                                    <FiBookmark className="size-[28px] text-primary-black" />
                                </div>
                                <span className="text-secondary-black text-xl md:text-2xl">Save</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center justify-center size-[48px] aspect-square rounded-full bg-white custom_shadow">
                                    <RxShare1 className="size-[28px] text-primary-black" />
                                </div>
                                <span className="text-secondary-black text-xl md:text-2xl">Share</span>
                            </div>
                        </div>
                    </div>
                    <Button>
                        View Spotlight
                    </Button>
                </div>
            </div>
        </Container>
    );
}
