import { AOneSvg } from "@/Components/Svg/SvgContainer";

const Mission = () => {
  return (
    <section className="container py-14">
      <h2 className="text-primary-black text-5xl font-bold leading-[140%] text-center mb-5">
        Mission & Purpose
      </h2>

      <div className="flex gap-10">
        <div className="bg-[#DB0F190A] py-10 w-[762px] text-center">
          <span className="mx-auto">
            <AOneSvg />
          </span>
          <h3 className="text-primary-black text-4xl font-bold">Mission</h3>
          <p className="text-[#364153] text-xl">
            To empower individuals, artists, and small businesses by giving them
            visibility, celebration, and support — creating a platform where
            culture and community shine together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
