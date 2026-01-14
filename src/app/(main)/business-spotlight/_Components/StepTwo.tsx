import { useFormContext } from "react-hook-form";

const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Business Information</h2>
      <p className="text-[#364153] text-xl mb-5">
        Tell us the basics about your business
      </p>
      <hr className="text-gray-200 mb-10 block" />

      <div className="grid grid-cols-2 gap-7">
        {/* Business name */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="business_name" className="auth_label">
              Business Name <span>*</span>
            </label>
            {errors.business_name?.message && (
              <p className="text-red-500">
                {errors.business_name.message as string}
              </p>
            )}
          </p>

          <input
            type="text"
            id="business_name"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Enter your business name"
            {...register("business_name", {
              required: "Business Name is required",
            })}
          />
        </div>

        {/* Owner Name */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="owner_name" className="auth_label">
              Owner / Founder Name <span>*</span>
            </label>
            {errors.owner_name?.message && (
              <p className="text-red-500">
                {errors.owner_name.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="owner_name"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Your name"
            {...register("owner_name", {
              required: "Owner Name is required",
            })}
          />
        </div>

        {/* Business Category */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="business_category" className="auth_label">
              Business Category <span>*</span>
            </label>
            {errors.business_category?.message && (
              <p className="text-red-500">
                {errors.business_category.message as string}
              </p>
            )}
          </p>
          <select
            id="business_category"
            className={`step_input ${
              errors.business_category ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            {...register("business_category", {
              required: "Business category is required",
            })}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div>

        {/* Year Foundation */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="founded_year" className="auth_label">
              Year Founded <span>*</span>
            </label>
            {errors.founded_year?.message && (
              <p className="text-red-500">
                {errors.founded_year.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="founded_year"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="2020"
            {...register("founded_year", {
              required: "Founded year is required",
            })}
          />
        </div>

        {/* Business Website */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="business_website" className="auth_label">
              Business Website <span>*</span>
            </label>
            {errors.business_website?.message && (
              <p className="text-red-500">
                {errors.business_website.message as string}
              </p>
            )}
          </p>
          <input
            type="text"
            id="business_website"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="https://yourbusiness.com"
            {...register("business_website", {
              required: "Business website is required",
            })}
          />
        </div>

        {/* City */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="city" className="auth_label">
              City <span>*</span>
            </label>
            {errors.city?.message && (
              <p className="text-red-500">{errors.city.message as string}</p>
            )}
          </p>
          <input
            type="text"
            id="city"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="https://yourbusiness.com"
            {...register("city", {
              required: "City is required",
            })}
          />
        </div>

        {/* State */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="state" className="auth_label">
              State <span>*</span>
            </label>
            {errors.state?.message && (
              <p className="text-red-500">{errors.state.message as string}</p>
            )}
          </p>
          <input
            type="text"
            id="state"
            className={`step_input ${
              errors.business_name ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="https://yourbusiness.com"
            {...register("state", {
              required: "State is required",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
