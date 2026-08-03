import {
  DOBSvg,
  EmailSvg,
  LocationSvg,
  PhoneSvg,
  UserIconSvg,
  WorldSvg,
} from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const StepOne = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <div className="flex gap-2 text-primary-black">
        <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF] text-2xl text-primary-blue">
          1
        </p>
        <h2 className="text-3xl font-semibold mb-2">Artist Identification</h2>
      </div>

      <p className="text-[#364153] text-xl mb-5">
        Verify who you are and create your clean profile. All required fields
        must be completed.
      </p>

      <hr className="text-gray-200 mb-10 block" />

      <div className="grid grid-cols-2 gap-x-7 gap-y-8">
        {/* Full Legal Name */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="artist_label">
              <UserIconSvg />
              <label htmlFor="full_legal_name">
                Full Legal Name <span>*</span>
              </label>
            </p>

            {errors.full_legal_name?.message && (
              <p className="text-red-500">
                {errors.full_legal_name.message as string}
              </p>
            )}
          </div>

          <input
            type="text"
            id="full_legal_name"
            className={`step_input ${
              errors.full_legal_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="John Doe"
            {...register("full_legal_name", {
              required: "Full name is required",
            })}
          />
        </div>

        {/* Artist / Stage Name */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="artist_label">
              <UserIconSvg />
              <label htmlFor="artist_stage_name">
                Artist / Stage Name <span>*</span>
              </label>
            </p>

            {errors.artist_stage_name?.message && (
              <p className="text-red-500">
                {errors.artist_stage_name.message as string}
              </p>
            )}
          </div>

          <input
            type="text"
            id="artist_stage_name"
            className={`step_input ${
              errors.artist_stage_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="The name that will appear publicly"
            {...register("artist_stage_name", {
              required: "Artist name is required",
            })}
          />
        </div>

        {/* Email Address */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="artist_label">
              <EmailSvg />
              <label htmlFor="email">
                Email Address <span>*</span>
              </label>
            </p>

            {errors.email?.message && (
              <p className="text-red-500">{errors.email.message as string}</p>
            )}
          </div>

          <input
            type="email"
            id="email"
            className={`step_input ${
              errors.email ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="artist@example.com"
            {...register("email", {
              required: "Email address is required",
            })}
          />
        </div>

        {/* Phone */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="artist_label">
              <PhoneSvg />
              <label htmlFor="phone_number">
                Phone <span>*</span>
              </label>
            </p>

            {errors.phone_number?.message && (
              <p className="text-red-500">
                {errors.phone_number.message as string}
              </p>
            )}
          </div>

          <input
            type="text"
            id="phone_number"
            className={`step_input ${
              errors.phone_number ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="(555) 123-4567"
            {...register("phone_number", {
              required: "Phone number is required",
            })}
          />
        </div>

        <div className="col-span-2 flex gap-7 items-center">
          {/* Date of Birth */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2.5">
              <p className="artist_label">
                <DOBSvg />
                <label htmlFor="date_of_birth">
                  Date of Birth <span>*</span>
                </label>
              </p>

              {errors.date_of_birth?.message && (
                <p className="text-red-500">
                  {errors.date_of_birth.message as string}
                </p>
              )}
            </div>

            <input
              type="date"
              id="date_of_birth"
              className={`step_input ${
                errors.date_of_birth ? "border-red-500" : "border-[#D1D5DC] "
              }`}
              placeholder="01/01/25"
              {...register("date_of_birth", {
                required: "Date of Birth is required",
              })}
            />
          </div>

          {/* City */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2.5">
              <p className="artist_label">
                <LocationSvg />
                <label htmlFor="city">
                  City <span>*</span>
                </label>
              </p>

              {errors.city?.message && (
                <p className="text-red-500">{errors.city.message as string}</p>
              )}
            </div>

            <input
              type="text"
              id="city"
              className={`step_input ${
                errors.city ? "border-red-500" : "border-[#D1D5DC] "
              }`}
              placeholder="Los Angeles"
              {...register("city", {
                required: "City is required",
              })}
            />
          </div>

          {/* State */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2.5">
              <p className="artist_label">
                <LocationSvg />
                <label htmlFor="state">
                  State <span>*</span>
                </label>
              </p>

              {errors.state?.message && (
                <p className="text-red-500">{errors.state.message as string}</p>
              )}
            </div>

            <input
              type="text"
              id="state"
              className={`step_input ${
                errors.state ? "border-red-500" : "border-[#D1D5DC] "
              }`}
              placeholder="CA"
              {...register("state", {
                required: "State is required",
              })}
            />
          </div>
        </div>

        <div className="mb-5 mt-10 col-span-2">
          <div className="flex gap-3 items-center mb-1">
            <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF]">
              <WorldSvg />
            </p>
            <h2 className="text-[22px]">Social Media Handles</h2>
          </div>

          <p className="text-[#364153] text-xl">
            At least one social media handle is required
          </p>
        </div>

        {/* Instagram */}
        <div>
          <label htmlFor="instagram_handle" className="auth_label mb-2">
            Instagram <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="instagram_handle"
            className={`step_input border-[#D1D5DC]`}
            placeholder="@yourbusiness"
            {...register("instagram_handle")}
          />
        </div>

        {/* TikTok */}
        <div>
          <label htmlFor="tiktok_handle" className="auth_label mb-2">
            TikTok <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="tiktok_handle"
            className={`step_input border-[#D1D5DC]`}
            placeholder="@yourbusiness"
            {...register("tiktok_handle")}
          />
        </div>

        {/* Facebook */}
        <div>
          <label htmlFor="facebook_url" className="auth_label mb-2">
            Facebook <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
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
          <label htmlFor="youtube_url" className="auth_label mb-2">
            YouTube <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="url"
            id="youtube_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="youtube.com/@yourchannel"
            {...register("youtube_url")}
          />
        </div>

        {/* Website */}
        <div className="col-span-2">
          <label htmlFor="website_portfolio_url" className="auth_label mb-2">
            Website or Portfolio Link
            <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="url"
            id="website_portfolio_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="https://yourportfolio.com"
            {...register("website_portfolio_url")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
