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
              <label htmlFor="full_name">
                Full Legal Name <span>*</span>
              </label>
            </p>

            {errors.full_name?.message && (
              <p className="text-red-500">
                {errors.full_name.message as string}
              </p>
            )}
          </div>

          <input
            type="text"
            id="full_name"
            className={`step_input ${
              errors.full_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="John Doe"
            {...register("full_name", {
              required: "Full name is required",
            })}
          />
        </div>

        {/* Artist / Stage Name */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <p className="artist_label">
              <UserIconSvg />
              <label htmlFor="artist_name">
                Artist / Stage Name <span>*</span>
              </label>
            </p>

            {errors.artist_name?.message && (
              <p className="text-red-500">
                {errors.artist_name.message as string}
              </p>
            )}
          </div>

          <input
            type="text"
            id="artist_name"
            className={`step_input ${
              errors.artist_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="The name that will appear publicly"
            {...register("artist_name", {
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
              <label htmlFor="phone">
                Phone <span>*</span>
              </label>
            </p>

            {errors.phone?.message && (
              <p className="text-red-500">{errors.phone.message as string}</p>
            )}
          </div>

          <input
            type="text"
            id="phone"
            className={`step_input ${
              errors.phone ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="(555) 123-4567"
            {...register("phone", {
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
                <label htmlFor="dob">
                  Date of Birth <span>*</span>
                </label>
              </p>

              {errors.dob?.message && (
                <p className="text-red-500">{errors.dob.message as string}</p>
              )}
            </div>

            <input
              type="text"
              id="dob"
              className={`step_input ${
                errors.dob ? "border-red-500" : "border-[#D1D5DC] "
              }`}
              placeholder="01/01/25"
              {...register("dob", {
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
          <label htmlFor="instagram" className="auth_label mb-2">
            Instagram <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="instagram"
            className={`step_input border-[#D1D5DC]`}
            placeholder="@yourbusiness"
            {...register("instagram")}
          />
        </div>

        {/* TikTok */}
        <div>
          <label htmlFor="tiktok" className="auth_label mb-2">
            TikTok <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="tiktok"
            className={`step_input border-[#D1D5DC]`}
            placeholder="@yourbusiness"
            {...register("tiktok")}
          />
        </div>

        {/* Facebook */}
        <div>
          <label htmlFor="facebook" className="auth_label mb-2">
            Facebook <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="facebook"
            className={`step_input border-[#D1D5DC]`}
            placeholder="facebook.com/yourbusiness"
            {...register("facebook")}
          />
        </div>

        {/* YouTube */}
        <div>
          <label htmlFor="youtube" className="auth_label mb-2">
            YouTube <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="youtube"
            className={`step_input border-[#D1D5DC]`}
            placeholder="youtube.com/@yourchannel"
            {...register("youtube")}
          />
        </div>

        {/* Website */}
        <div className="col-span-2">
          <label htmlFor="website" className="auth_label mb-2">
            Website or Portfolio Link
            <span className="text-sm !text-gray-300">(Optional)</span>
          </label>
          <input
            type="text"
            id="website"
            className={`step_input border-[#D1D5DC]`}
            placeholder="https://yourportfolio.com"
            {...register("website")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
