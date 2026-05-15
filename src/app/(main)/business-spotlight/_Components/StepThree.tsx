import { WorldSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const StepThree = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Contact Information</h2>
      <p className="text-[#364153] text-xl mb-5">How can we reach you?</p>
      <hr className="text-gray-200 mb-10 block" />

      <div className="grid grid-cols-2 gap-7">
        {/* Email */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="email" className="auth_label">
              Email <span>*</span>
            </label>
            {errors.email?.message && (
              <p className="text-red-500">{errors.email.message as string}</p>
            )}
          </p>

          <input
            type="email"
            id="email"
            className={`step_input ${
              errors.Email ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="your@email.com"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>

        {/* Phone Number */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="phone_number" className="auth_label">
              Phone Number{" "}
              <span className="!text-gray-500 text-sm">(Optional)</span>
            </label>
          </p>
          <input
            type="text"
            id="phone_number"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Your name"
            {...register("phone_number")}
          />
        </div>

        {/* Contact Time */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="best_contact_time" className="auth_label">
              Best time to contact you <span>*</span>
            </label>
            {errors.best_contact_time?.message && (
              <p className="text-red-500">
                {errors.best_contact_time.message as string}
              </p>
            )}
          </p>
          <select
            id="best_contact_time"
            className={`step_input ${
              errors.best_contact_time ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            {...register("best_contact_time", {
              required: "Contact time is required",
            })}
          >
            <option value="">Select a time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="mb-5 mt-10 col-span-2">
          <div className="flex gap-3 items-center mb-1">
            <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF]">
              <WorldSvg />
            </p>
            <h2 className="text-[22px]">Social Media Links</h2>
          </div>

          <p className="text-[#364153] text-xl">Connect your social profiles</p>
        </div>

        {/* Instagram */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="instagram_url" className="auth_label">
              Instagram
            </label>
          </p>

          <input
            type="url"
            id="instagram_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="@yourbusiness"
            {...register("instagram_url")}
          />
        </div>

        {/* TikTok */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="tiktok_url" className="auth_label">
              TikTok
            </label>
          </p>
          <input
            type="url"
            id="tiktok_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="@yourbusiness"
            {...register("tiktok_url")}
          />
        </div>

        {/* Facebook */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="facebook_url" className="auth_label">
              Facebook
            </label>
          </p>
          <input
            type="url"
            id="facebook_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="facebook.com/yourbusiness"
            {...register("facebook_url")}
          />
        </div>

        {/* YouTube */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="youtube_url" className="auth_label">
              YouTube
            </label>
          </p>
          <input
            type="url"
            id="youtube_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="youtube.com/@yourchannel"
            {...register("youtube_url")}
          />
        </div>

        {/* Google Business Profile */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="google_business_profile_url" className="auth_label">
              Google Business Profile
            </label>
          </p>
          <input
            type="url"
            id="google_business_profile_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="Google Business URL"
            {...register("google_business_profile_url")}
          />
        </div>

        {/* LinkedIn */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="linkedin_url" className="auth_label">
              LinkedIn
            </label>
          </p>
          <input
            type="url"
            id="linkedin_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="linkedin.com/company/yourbusiness"
            {...register("linkedin_url")}
          />
        </div>

        {/* Fanbase */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="fanbase_url" className="auth_label">
              Fanbase
            </label>
          </p>
          <input
            type="url"
            id="fanbase_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="fanbase.app/yourbusiness"
            {...register("fanbase_url")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
