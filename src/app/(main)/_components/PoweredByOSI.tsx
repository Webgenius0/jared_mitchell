import Image from "next/image";

const PoweredByOSI = () => {
  return (
    <section className="w-full h-[360px] md:h-[480px] xl:h-[580px] overflow-hidden flex items-center relative">
      <Image
        src={"/home/home-banner-1.jpg"}
        fill
        alt="home banner"
        className="object-cover w-full"
      />

      <div className="w-full h-full absolute top-0 bg-black/70">
        <div className="flex flex-col container w-full mx-auto h-full items-center justify-center">
          <h2 className="section_title !text-white">
            Everything You Need to Grow Your Business — Powered by OSI.
          </h2>

          <p className="section_sub_title max-w-[1280px] mx-auto !text-[#F5F5F7]">
            Marketing support, visibility, tools, and community — all in one
            membership built for real creators and small businesses. Unlock
            professional exposure, business tools, spotlight features, and
            hands-on support — at a price any startup can afford.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PoweredByOSI;
