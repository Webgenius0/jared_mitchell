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
    <section className="py-20 container">
      <div className="flex gap-16  items-center">
        {/* Left */}
        <div className="w-[600px] h-[550px] rounded-lg relative overflow-hidden shrink-0">
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
          <p className="text-primary-blue rounded-full w-fit bg-[#EFF6FF] px-4 py-1 mb-5">
            Featured Event
          </p>

          <h3 className="text-primary-black text-5xl font-bold leading-[140%] mb-5">
            Indianapolis Creator Market
          </h3>

          <div className="mb-5 space-y-2 text-[#1D1D1F] text-xl">
            <p className="flex gap-2 items-center">
              <CalenderSvg />
              <span>Monday, December 15, 2025</span>
            </p>
            <p className="flex gap-2 items-center">
              <VideoSvg />
              <span>Highlight Video Available</span>
            </p>
          </div>

          <p className="text-2xl text-[#1D1D1F] leading-[150%] max-w-[80%] mb-12">
            Join us for an evening of celebration, networking, and community
            building. This year's gala features live performances, a silent
            auction, and special guest speakers from across the region.
          </p>

          <div className="">
            <button className="flex-1 rounded-full cursor-pointer bg-primary-blue text-white py-3 font-normal text-lg !w-fit px-5">
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
