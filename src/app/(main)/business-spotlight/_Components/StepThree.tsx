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
            <label htmlFor="phone" className="auth_label">
              Phone Number{" "}
              <span className="!text-gray-500 text-sm">(Optional)</span>
            </label>
          </p>
          <input
            type="text"
            id="phone"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Your name"
            {...register("phone")}
          />
        </div>

        {/* Contact Time */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="contact_time" className="auth_label">
              Best time to contact you <span>*</span>
            </label>
            {errors.contact_time?.message && (
              <p className="text-red-500">
                {errors.contact_time.message as string}
              </p>
            )}
          </p>
          <select
            id="contact_time"
            className={`step_input ${
              errors.contact_time ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            {...register("contact_time", {
              required: "Contact time is required",
            })}
          >
            <option value="">Select a time</option>
            <option value="1">10 PM</option>
            <option value="2">11 PM</option>
            <option value="3">12 PM</option>
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
            <label htmlFor="instagram" className="auth_label">
              Instagram <span>*</span>
            </label>
            {errors.instagram?.message && (
              <p className="text-red-500">
                {errors.instagram.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="instagram"
            className={`step_input ${
              errors.instagram ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="@yourbusiness"
            {...register("instagram", {
              required: "Instagram is required",
            })}
          />
        </div>

        {/* TikTok */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="tiktok" className="auth_label">
              TikTok <span>*</span>
            </label>
            {errors.tiktok?.message && (
              <p className="text-red-500">{errors.tiktok.message as string}</p>
            )}
          </p>
          <input
            type="text"
            id="tiktok"
            className={`step_input ${
              errors.tiktok ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="@yourbusiness"
            {...register("tiktok", {
              required: "TikTok is required",
            })}
          />
        </div>

        {/* Facebook */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="facebook" className="auth_label">
              Facebook <span>*</span>
            </label>
            {errors.facebook?.message && (
              <p className="text-red-500">
                {errors.facebook.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="facebook"
            className={`step_input ${
              errors.facebook ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="facebook.com/yourbusiness"
            {...register("facebook", {
              required: "Facebook is required",
            })}
          />
        </div>

        {/* YouTube */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="youtube" className="auth_label">
              YouTube <span>*</span>
            </label>
            {errors.youtube?.message && (
              <p className="text-red-500">{errors.youtube.message as string}</p>
            )}
          </p>
          <input
            type="text"
            id="youtube"
            className={`step_input ${
              errors.youtube ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="youtube.com/@yourchannel"
            {...register("youtube", {
              required: "YouTube is required",
            })}
          />
        </div>

        {/* Google Business Profile */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="google_profile" className="auth_label">
              Google Business Profile <span>*</span>
            </label>
            {errors.google_profile?.message && (
              <p className="text-red-500">
                {errors.google_profile.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="google_profile"
            className={`step_input ${
              errors.google_profile ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Google Business URL"
            {...register("google_profile", {
              required: "Google business profile is required",
            })}
          />
        </div>

        {/* LinkedIn */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="linkedin" className="auth_label">
              LinkedIn <span>*</span>
            </label>
            {errors.linkedin?.message && (
              <p className="text-red-500">
                {errors.linkedin.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="linkedin"
            className={`step_input ${
              errors.linkedin ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="linkedin.com/company/yourbusiness"
            {...register("linkedin", {
              required: "LinkedIn is required",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default StepThree;
