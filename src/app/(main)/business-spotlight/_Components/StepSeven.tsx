import { SuccessfulSvg } from "@/Components/Svg/SvgContainer";

const StepSeven = () => {
  return (
    <div className="text-center space-y-5 py-10">
      <p className="size-24 rounded-full bg-[#DCFCE7] grid place-items-center mx-auto">
        <SuccessfulSvg />
      </p>

      <h3 className="text-[#1D1D1F] text-4xl font-semibold">
        Submission Successful!
      </h3>

      <p className="text-[#1D1D1F] text-2xl max-w-5xl mx-auto leading-[164%]">
        Thank you for submitting your Business Spotlight application. We’re
        excited to review your brand, story, and the work you’re building
      </p>

      <button className="px-12 py-3 text-lg rounded-full bg-primary-blue text-white cursor-pointer">
        Done
      </button>
    </div>
  );
};

export default StepSeven;
