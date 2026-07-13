import p1 from "@/Assets/p1.png";
import p2 from "@/Assets/p2.png";
import p3 from "@/Assets/p3.png";
import p4 from "@/Assets/p4.png";
import p5 from "@/Assets/p5.png";
import { Button } from "@/Components/Common/Button";
import Image from "next/image";
const data = [p1, p2, p3, p4, p5, p2];

const EventGallery = () => {
  return (
    <section className="py-10 md:py-16 xl:py-20 container">
      <h2 className="section_title text-2xl md:text-4xl xl:text-6xl 2xl:text-7xl 2xl:font-bold">
        Event Gallery
      </h2>

      <p className="text-base md:text-lg xl:text-xl text-[#1D1D1F] text-center mb-6 md:mb-8 xl:mb-12 max-w-[90%] md:max-w-[70%] mx-auto">
        Explore photos and videos from past OSI events. See the energy,
        creativity, and community that makes each gathering special.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
        {data?.map((item, idx) => (
          <figure key={idx} className="h-[180px] sm:h-[250px] md:h-[300px] xl:h-[369px] rounded-xl overflow-hidden">
            <Image
              src={item}
              alt="img"
              className="w-full h-full object-cover rounded-xl"
            />
          </figure>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button size="xl">View Full Gallery</Button>
      </div>
    </section>
  );
};

export default EventGallery;
