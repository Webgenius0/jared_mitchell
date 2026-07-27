import Image from "next/image";
import React from "react";
import Spornsorimage from "../../../../Assets/spossor.png";

export default function EventSponsors() {
  return (
    <section>
      <div className="container mx-auto">
        <h2 className="section_title text-center mb-6 md:mb-10">
          Sponsor the event
        </h2>
        <p className="text-black font-normal text-center text-lg">
          Take a look back at some of our most memorable events and
          celebrations.
        </p>
        <div className="pt-10">
          <Image
            src={Spornsorimage}
            alt="sponsor"
            height={500}
            width={500}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
