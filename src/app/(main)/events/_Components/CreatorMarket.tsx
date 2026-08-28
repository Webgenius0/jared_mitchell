"use client";
import { useRef, useState } from "react";
import { PlayIcon } from "@/Components/Svg/SvgContainer";
import { CalenderSvg, VideoSvg } from "@/Components/Svg/SvgContainer";

const CreatorMarket = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-10 md:py-14 lg:py-16 xl:py-20 container">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16 items-center">
        {/* Left */}
        <div className="w-full lg:w-[500px] xl:w-[600px] h-[300px] md:h-[400px] lg:h-[450px] xl:h-[550px] rounded-lg relative overflow-hidden shrink-0">
          <video
            ref={videoRef}
            src="/hero-video.mp4"
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover rounded-lg"
            onClick={togglePlay}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Overlay (only when paused) */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            >
              <PlayIcon />
            </div>
          )}
        </div>

        {/* Right */}
        <div className="">
          <p className="text-primary-blue rounded-full w-fit bg-[#EFF6FF] px-3 py-0.5 md:py-1 text-xs md:text-sm mb-3 md:mb-4">
            Featured Event
          </p>

          <h3 className="text-primary-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[140%] mb-3 md:mb-4">
            Indianapolis Creator Market
          </h3>

          <div className="mb-3 md:mb-4 space-y-1.5 text-[#1D1D1F] text-sm md:text-base lg:text-lg">
            <p className="flex gap-2 items-center">
              <CalenderSvg />
              <span>Monday, December 15, 2025</span>
            </p>
            <p className="flex gap-2 items-center">
              <VideoSvg />
              <span>Highlight Video Available</span>
            </p>
          </div>

          <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-[#1D1D1F] leading-[150%] max-w-full xl:max-w-[80%] mb-6 md:mb-8">
            Join us for an evening of celebration, networking, and community
            building. This year's gala features live performances, a silent
            auction, and special guest speakers from across the region.
          </p>

          <div className="">
            <button className="flex-1 rounded-full cursor-pointer bg-primary-blue text-white py-2 md:py-2.5 font-normal text-sm md:text-base !w-fit px-4">
              Booking Event Ticket
            </button>
            {/* <button className="flex-1 rounded-full cursor-pointer text-primary-blue bg-transparent border-2 border-[#1977DD] py-3 font-bold text-lg">
              Apply as Vendor
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorMarket;
