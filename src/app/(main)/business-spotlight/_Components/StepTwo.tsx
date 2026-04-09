import { useFormContext } from "react-hook-form";

const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Business Story</h2>
      <p className="text-[#364153] text-xl mb-5">
        Help us understand your journey and what makes you special
      </p>
      <hr className="text-gray-200 mb-10 block" />

      <div className="grid grid-cols-2 gap-7">
        {/* Business Story */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="business_story" className="auth_label">
              1. Tell us your business story <span>*</span>
            </label>
            {errors.business_story?.message && (
              <p className="text-red-500">
                {errors.business_story.message as string}
              </p>
            )}
          </p>

          <textarea
            id="business_story"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.business_story ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Where it started, why it exists, and the mission behind it..."
            {...register("business_story", {
              required: "Business Story is required",
            })}
          ></textarea>
        </div>

        {/* Product Offer */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="products_services" className="auth_label">
              2. What products or services do you offer? <span>*</span>
            </label>
            {errors.products_services?.message && (
              <p className="text-red-500">
                {errors.products_services.message as string}
              </p>
            )}
          </p>

          <textarea
            id="products_services"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.products_services ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="List what customers can purchase or experience..."
            {...register("products_services", {
              required: "Product Offer is required",
            })}
          ></textarea>
        </div>

        {/* Business Outcome */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="challenges_overcome" className="auth_label">
              3. What challenges has your business overcome? <span>*</span>
            </label>
            {errors.challenges_overcome?.message && (
              <p className="text-red-500">
                {errors.challenges_overcome.message as string}
              </p>
            )}
          </p>

          <textarea
            id="challenges_overcome"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.challenges_overcome
                ? "border-red-500"
                : "border-[#D1D5DC] "
            }`}
            placeholder="Share the milestones, struggles, or turning points..."
            {...register("challenges_overcome", {
              required: "Business outcome is required",
            })}
          ></textarea>
        </div>

        {/* Business Unique */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="unique_factor" className="auth_label">
              4. What makes your business unique?<span>*</span>
            </label>
            {errors.unique_factor?.message && (
              <p className="text-red-500">
                {errors.unique_factor.message as string}
              </p>
            )}
          </p>

          <textarea
            id="unique_factor"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.unique_factor ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="What separates you from competitors..."
            {...register("unique_factor", {
              required: "Business unique is required",
            })}
          ></textarea>
        </div>

        {/* Target Customer */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="target_customer" className="auth_label">
              5. Who is your target customer?<span>*</span>
            </label>
            {errors.target_customer?.message && (
              <p className="text-red-500">
                {errors.target_customer.message as string}
              </p>
            )}
          </p>

          <textarea
            id="target_customer"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.target_customer ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Describe their demographics, needs, or interests..."
            {...register("target_customer", {
              required: "Target customer is required",
            })}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
