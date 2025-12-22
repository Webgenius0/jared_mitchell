import { Button } from "@/Components/Common/Button"
import Container from "@/Components/Common/Container"
import Image from "next/image"
import { FaRegHeart } from "react-icons/fa"
import { FiBookmark } from "react-icons/fi"
import { GrLocation } from "react-icons/gr"
import { MdOutlineAccessTime } from "react-icons/md"
import { PiCalendarBlank } from "react-icons/pi"
import { RxShare1 } from "react-icons/rx"

const FeaturedEvent = () => {
  return (
    <section className="section">
      <Container>
        <div className="flex gap-14 max-lg:flex-col">
          <figure className="lg:basis-1/2 relative w-[716px] h-[627px] rounded-[40px]">
            <Image src={"/home/featured-event-img.jpg"} width={716} height={627} alt="featured image" className="size-full object-cover rounded-[40px]" />
            <div className="absolute top-7 left-7 text-xl px-5 py-4 rounded-full text-primary-blue bg-[#eff6ff]">Featured Event</div>
          </figure>
          <div className="lg:basis-1/2">
            <h2 className="section_title !text-left 2xl:font-bold 2xl:text-6xl tracking-tight mb-9 leading-[90px]">Boss Beginnings – Westside Beauty Lounge</h2>
            <div className="space-y-4">
              <div className="flex items-center text-2xl gap-3">
                <PiCalendarBlank className="text-primary-blue" />
                <p className="text-primary-black">
                  March 22, 2025
                </p>
              </div>
              <div className="flex items-center text-2xl gap-3">
                <MdOutlineAccessTime className="text-primary-blue" />
                <p className="text-primary-black">
                  6:00 PM - 9:00 PM
                </p>
              </div>
              <div className="flex items-center text-2xl gap-3">
                <GrLocation className="text-primary-blue" />
                <p className="text-primary-black">
                  Indianapolis, IN
                </p>
              </div>
            </div>
            <p className="text-2xl text-primary-black mt-3">Join us as we celebrate the grand beginning of Westside Beauty Lounge, featuring gifts, interviews, and community support.</p>
            <div className="py-5 mt-3 mb-7 border-b border-gray-200 text-secondary-black flex items-center gap-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center size-[48px] aspect-square rounded-full bg-white custom_shadow custom_border">
                  <FaRegHeart className="size-[28px]" />
                </div>
                <span className="text-2xl">1,204</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center size-[48px] aspect-square rounded-full bg-white custom_shadow custom_border">
                  <FiBookmark className="size-[28px]" />
                </div>
                <span className="text-2xl">Save</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center size-[48px] aspect-square rounded-full bg-white custom_shadow custom_border">
                  <RxShare1 className="size-[28px]" />
                </div>
                <span className="text-2xl">Share</span>
              </div>
            </div>
            <div className="space-x-4">
              <Button>
                Get Tickets
              </Button>
              <Button variant={"outline"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedEvent
