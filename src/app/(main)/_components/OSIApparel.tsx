"use client";
import Image from "next/image";
import { Button } from "@/Components/Common/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

import a1 from "@/Assets/a1.png";
import a2 from "@/Assets/a2.png";
import a3 from "@/Assets/a3.png";
import a4 from "@/Assets/about.jpg";

const products = [
  {
    id: 1,
    title: "Promotion Credit",
    price: "$99",
    image: a1,
  },
  {
    id: 2,
    title: "Boss Beginnings Toolkit",
    price: "$49",
    image: a2,
    tag: "Digital",
  },
  {
    id: 3,
    title: "OSI Signature Hoodie",
    price: "$79",
    image: a3,
  },
  {
    id: 4,
    title: "OSI Cap",
    price: "$39",
    image: a4,
  },
];

const OSIApparel = () => {
  return (
    <section className="container mx-auto py-16 text-center">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
        Shop OSI Apparel, Ebooks, and Digital
      </h2>

      <p className="mt-4 text-xl max-w-3xl mx-auto text-secondary-black">
        Explore exclusive merchandise, creative tools, and digital resources
        designed to help you build your brand and elevate your craft.
      </p>

      {/* Swiper */}
      <div className="mt-16">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides={true} // Crucial for the center effect
          slidesPerView={"auto"} // Allows CSS to define the width
          initialSlide={1}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 80, // Pulls the side slides closer or pushes them away
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="osi-coverflow"
        >
          {products.map(item => (
            <SwiperSlide key={item.id} className="osi-slide">
              <div className="osi-card">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Tag */}
                {item.tag && (
                  <span className="absolute top-4 right-4 bg-white text-xs px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                )}

                {/* Content */}
                <div className="absolute bottom-0 p-6 text-left text-white">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm opacity-80">{item.price}</p>

                  <button className="mt-3 bg-primary px-4 py-2 rounded-full text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      <h3 className="mt-20 section_title max-w-4xl mx-auto">
        Become part of a growing network that celebrates art, business, and
        community.
      </h3>

      <div className="mt-10 flex justify-center gap-6">
        <Button>Join OSI</Button>
        <Button variant="outline">Become a Sponsor</Button>
      </div>
    </section>
  );
};

export default OSIApparel;
