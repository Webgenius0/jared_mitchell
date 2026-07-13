"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, FreeMode } from "swiper/modules";
import {
  HiOutlineThumbUp,
  HiOutlineHeart,
  HiOutlineFire,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineLocationMarker,
  HiTrendingUp,
} from "react-icons/hi";
import { CMSBossBeginningsSteps } from "@/Types/cms";

import "swiper/css";
import "swiper/css/navigation";
import brewBloomImg from "../../../../Assets/Image (Brew & Bloom Café).png";
import techstartYouthImg from "../../../../Assets/d472ae9e704c53b818eec4a826a3881a074abd33.jpg";
import rhythmThreadsImg from "../../../../Assets/e4ca7635affe18ca84c1cd05cf5c99860375ce4e.jpg";

interface BusinessChosenChartProps {
  data: CMSBossBeginningsSteps;
}

interface PointRule {
  icon: React.ReactNode;
  label: string;
  points: number;
  frequency: string;
}

interface BusinessCard {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  image: string | StaticImageData;
  totalPoints: number;
  claps: number;
  loves: number;
  fires: number;
}

const pointRules: PointRule[] = [
  {
    icon: <HiOutlineThumbUp />,
    label: "Clap",
    points: 1,
    frequency: "1 per nominee per day",
  },
  {
    icon: <HiOutlineHeart />,
    label: "Love",
    points: 3,
    frequency: "Once per nominee",
  },
  {
    icon: <HiOutlineFire />,
    label: "Fire",
    points: 5,
    frequency: "Once per day per platform",
  },
];

// Replace with real CMS/API data
const sampleBusinesses: BusinessCard[] = [
  {
    id: "1",
    name: "Brew & Bloom Café",
    category: "Nonprofit",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: brewBloomImg,
    totalPoints: 1724,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "2",
    name: "TechStart Youth",
    category: "Food & Beverage",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: techstartYouthImg,
    totalPoints: 1004,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "3",
    name: "Rhythm Threads",
    category: "Nonprofit",
    description: "Handcrafted streetwear with soul",
    location: "Mass Ave, Indianapolis",
    image: rhythmThreadsImg,
    totalPoints: 1724,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "4",
    name: "TechStart Youth",
    category: "Fashion & Apparel",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: techstartYouthImg,
    totalPoints: 839,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "5",
    name: "TechStart Youth",
    category: "Fashion & Apparel",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: techstartYouthImg,
    totalPoints: 839,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "6",
    name: "TechStart Youth",
    category: "Fashion & Apparel",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: techstartYouthImg,
    totalPoints: 839,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "7",
    name: "TechStart Youth",
    category: "Fashion & Apparel",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: techstartYouthImg,
    totalPoints: 839,
    claps: 1,
    loves: 3,
    fires: 5,
  },
  {
    id: "8",
    name: "TechStart Youth",
    category: "Fashion & Apparel",
    description: "Artisan coffee meets local florals",
    location: "Fountain Square, Indianapolis",
    image: techstartYouthImg,
    totalPoints: 839,
    claps: 1,
    loves: 3,
    fires: 5,
  },
];

const BusinessChosenChart = ({ data }: BusinessChosenChartProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="py-20 overflow-x-hidden">
      <div className="container">
        <h2 className="section_title text-center">
          {data?.title ?? "How Winners Are Chosen"}
        </h2>
        <p className="section_sub_title text-center">
          {data?.sub_title ??
            "Boss Beginnings is decided by the community, with OSI guardrails for fairness."}
        </p>

        {/* Point rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {pointRules.map(rule => (
            <div
              key={rule.label}
              className="border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="size-12 rounded-full bg-blue-100 text-blue-500 grid place-items-center text-xl mb-3">
                {rule.icon}
              </div>
              <p className="font-medium text-slate-700">{rule.label}</p>
              <p className="text-2xl font-bold mt-1">{rule.points} PT</p>
              <p className="text-sm text-slate-500 mt-1">{rule.frequency}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business carousel — Swiper, breaks out of container to bleed full width */}
      <div className="relative mt-16 w-screen mx-[calc(50%-50vw)]">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Scroll left"
          className="hidden sm:grid absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-white shadow-md place-items-center hover:bg-slate-50"
        >
          <HiChevronLeft className="text-lg" />
        </button>

        <Swiper
          modules={[Navigation, FreeMode]}
          onSwiper={swiper => (swiperRef.current = swiper)}
          slidesPerView="auto"
          spaceBetween={24}
          freeMode
          className="!px-4 sm:!px-8 lg:!pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:!pr-8"
        >
          {sampleBusinesses.map(biz => (
            <SwiperSlide key={biz.id} className="!w-[320px]">
              <BusinessCardItem biz={biz} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Scroll right"
          className="hidden sm:grid absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 size-9 rounded-full bg-white shadow-md place-items-center hover:bg-slate-50"
        >
          <HiChevronRight className="text-lg" />
        </button>
      </div>
    </section>
  );
};

const BusinessCardItem = ({ biz }: { biz: BusinessCard }) => (
  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
    {/* Image */}
    <div className="relative h-44 w-full">
      <Image src={biz.image} alt={biz.name} fill className="object-cover" />
      <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 rounded-full px-3 py-1">
        {biz.category}
      </span>
    </div>

    {/* Content */}
    <div className="p-4">
      <p className="font-semibold text-lg">{biz.name}</p>
      <p className="text-sm text-slate-500">{biz.description}</p>
      <p className="flex items-center gap-1 text-xs text-slate-400 mt-1">
        <HiOutlineLocationMarker />
        {biz.location}
      </p>

      {/* Total points */}
      <div className="flex items-center justify-between mt-4 bg-slate-50 rounded-xl px-3 py-2">
        <span className="text-sm text-slate-500">Total Points</span>
        <span className="flex items-center gap-1 font-semibold">
          {biz.totalPoints.toLocaleString()}
          <HiTrendingUp className="text-green-500" />
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <ActionButton
          icon={<HiOutlineThumbUp />}
          label="Clap"
          count={biz.claps}
        />
        <ActionButton
          icon={<HiOutlineHeart />}
          label="Love"
          count={biz.loves}
        />
        <ActionButton icon={<HiOutlineFire />} label="Fire" count={biz.fires} />
      </div>

      <button className="text-blue-500 text-sm font-normal mt-3 flex items-center gap-1 hover:underline mx-auto">
        Learn More <span aria-hidden>→</span>
      </button>
    </div>
  </div>
);

const ActionButton = ({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
}) => (
  <button className="flex flex-col items-center justify-center gap-1 border border-slate-200 rounded-lg py-2 hover:bg-slate-50">
    <span className="text-slate-500">{icon}</span>
    <span className="text-[10px] text-slate-500">{label}</span>
    <span className="text-xs font-semibold">{count}</span>
  </button>
);

export default BusinessChosenChart;
