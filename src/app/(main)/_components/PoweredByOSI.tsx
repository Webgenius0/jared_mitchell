import Image from "next/image";

const PoweredByOSI = () => {
  return (
    // Reduced heights across all screen sizes
    <section className="w-full h-[280px] md:h-[360px] xl:h-[420px] overflow-hidden flex items-center relative">
      <Image
        src={"/home/home-banner-1.jpg"}
        fill
        alt="home banner"
        className="object-cover w-full"
      />

      <div className="w-full h-full absolute top-0 bg-black/70">
        {/* Added text-center and px-4 to prevent text from hitting the edges on smaller heights */}
        <div className="flex flex-col container w-full mx-auto h-full items-center justify-center text-center px-4">
          <h2 className="section_title !text-white">
            Everything You Need to Grow Your Business — Powered by OSI.
          </h2>

          <p className="section_sub_title max-w-[1280px] mx-auto !text-[#F5F5F7] mt-2 md:mt-4">
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
