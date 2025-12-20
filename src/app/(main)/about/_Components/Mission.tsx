import { AOneSvg, ATwoSvg } from "@/Components/Svg/SvgContainer";

const Mission = () => {
  return (
    <section className="container py-20">
      <h2 className="text-primary-black text-5xl font-bold leading-[140%] text-center mb-12">
        Mission & Purpose
      </h2>

      <div className="flex gap-5">
        {/* Left */}
        <div className="flex-1 bg-[#DB0F190A] py-12 flex flex-col justify-center items-center rounded-xl space-y-5 text-center px-20 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#0000000e]">
          <AOneSvg />
          <h3 className="text-primary-black text-4xl font-bold">Mission</h3>
          <p className="text-[#364153] text-[22px]">
            To empower individuals, artists, and small businesses by giving them
            visibility, celebration, and support — creating a platform where
            culture and community shine together.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1 bg-[#FFCE290A] py-12 flex flex-col justify-center items-center rounded-xl space-y-5 text-center px-20 shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] border border-[#0000000e]">
          <ATwoSvg />
          <h3 className=" text-primary-black text-4xl font-bold">Purpose</h3>
          <p className="text-[#364153] text-[22px]">
            To build a united community that encourages collaboration, inspires
            creativity, and supports the dreams of those shaping the future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
