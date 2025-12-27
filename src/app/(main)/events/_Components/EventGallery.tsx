import p1 from "@/Assets/p1.png";
import p2 from "@/Assets/p2.png";
import p3 from "@/Assets/p3.png";
import p4 from "@/Assets/p4.png";
import p5 from "@/Assets/p5.png";
import Image from "next/image";
const data = [p1, p2, p3, p4, p5, p2];

const EventGallery = () => {
  return (
    <section className="py-20 container">
      <h2 className="section_title 2xl:text-7xl 2xl:font-bold">
        Event Gallery
      </h2>

      <p className="text-xl text-[#1D1D1F] text-center mb-12">
        Explore photos and videos from past OSI events. See the energy,
        creativity, and community that makes each gathering special.
      </p>

      <div className="grid grid-cols-3 gap-5">
        {data?.map((item, idx) => (
          <figure key={idx} className="h-[369px] rounded-xl">
            <Image
              src={item}
              alt="img"
              className="w-full h-full object-cover rounded-xl"
            />
          </figure>
        ))}
      </div>
    </section>
  );
};

export default EventGallery;
