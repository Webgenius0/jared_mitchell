import { Button } from "@/Components/Common/Button";
import { BsArrowRight } from "react-icons/bs";

const BecomeSponsor = () => {
  return (
    <section className="py-20 bg-primary-blue text-center">
      <div className="container">
        <h2 className="text-white text-5xl font-bold leading-[140%] mb-5">
          Become a Sponsor Today
        </h2>

        <p className="text-2xl text-white leading-[150%] max-w-[1200px] mx-auto">
          Partner with Our Social Image and let us broadcast your message across our community. Whether you want weekly promotion or full-scale visibility, our sponsorships give your brand a powerful place in culture, creativity, and community growth.
        </p>
        <button className="bg-white border-2 border-[#D1D5DC] rounded-full flex items-center justify-center px-12 py-4 gap-1 text-primary-blue text-xl font-medium mx-auto mt-6">
          Sign Up as a Sponsor
          <BsArrowRight className="size-6"/>
        </button>
      </div>
    </section>
  );
};

export default BecomeSponsor;
