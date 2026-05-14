import { PrivacySvg } from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const StepSix = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Spotlight Consideration</h2>
      <p className="text-[#364153] text-xl mb-5">
        Help us understand your goals
      </p>

      <div className="space-y-7">
        {/* Business featured? */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="why_featured" className="auth_label">
              1. Why do you want your business featured? <span>*</span>
            </label>
            {errors.why_featured?.message && (
              <p className="text-red-500">
                {errors.why_featured.message as string}
              </p>
            )}
          </p>

          <textarea
            id="why_featured"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.why_featured ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Tell us what drives your interest in being featured..."
            {...register("why_featured", {
              required: "Business featured is required",
            })}
          ></textarea>
        </div>

        {/* Business grow? */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="growth_vision" className="auth_label">
              2. How would a spotlight help your business grow? <span>*</span>
            </label>
            {errors.growth_vision?.message && (
              <p className="text-red-500">
                {errors.growth_vision.message as string}
              </p>
            )}
          </p>

          <textarea
            id="growth_vision"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.growth_vision ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Share your vision for how this exposure could benefit you..."
            {...register("growth_vision", {
              required: "Business grow is required",
            })}
          ></textarea>
        </div>

        <div className="mb-5 mt-10 col-span-2">
          <div className="flex gap-3 items-center mb-1">
            <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF]">
              <PrivacySvg />
            </p>
            <h2 className="text-[22px]">Permissions</h2>
          </div>

          <p className="text-[#364153] text-xl">
            Please review and accept the following
          </p>
        </div>

        <hr className="text-gray-200 mb-10 block" />

        <div className="space-y-4">
          <p className="flex gap-3 items-center text-lg text-[#1D1D1F]">
            <input
              type="checkbox"
              className="size-4"
              {...register("permission_feature_on_osi")}
            />
            <span>I give permission to feature my business on OSI</span>
          </p>

          <p className="flex gap-3 items-center text-lg text-[#1D1D1F]">
            <input
              type="checkbox"
              className="size-4"
              {...register("permission_use_submitted_photos")}
            />
            <span>
              I give permission to use submitted photos on OSI channels
            </span>
          </p>

          <p className="flex gap-3 items-center text-lg text-[#1D1D1F]">
            <input
              type="checkbox"
              className="size-4"
              {...register("permission_share_business_story")}
            />
            <span>
              I give permission to share my business story on OSI channels
              (website, social media, newsletters)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSix;
