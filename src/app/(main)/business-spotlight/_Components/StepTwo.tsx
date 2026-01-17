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
            <label htmlFor="product_offer" className="auth_label">
              2. What products or services do you offer? <span>*</span>
            </label>
            {errors.product_offer?.message && (
              <p className="text-red-500">
                {errors.product_offer.message as string}
              </p>
            )}
          </p>

          <textarea
            id="product_offer"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.product_offer ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="List what customers can purchase or experience..."
            {...register("product_offer", {
              required: "Product Offer is required",
            })}
          ></textarea>
        </div>

        {/* Business Outcome */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="business_outcome" className="auth_label">
              3. What challenges has your business overcome? <span>*</span>
            </label>
            {errors.business_outcome?.message && (
              <p className="text-red-500">
                {errors.business_outcome.message as string}
              </p>
            )}
          </p>

          <textarea
            id="business_outcome"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.business_outcome ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="Share the milestones, struggles, or turning points..."
            {...register("business_outcome", {
              required: "Business outcome is required",
            })}
          ></textarea>
        </div>

        {/* Business Unique */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="business_unique" className="auth_label">
              4. What makes your business unique?<span>*</span>
            </label>
            {errors.business_unique?.message && (
              <p className="text-red-500">
                {errors.business_unique.message as string}
              </p>
            )}
          </p>

          <textarea
            id="business_unique"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.business_unique ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="What separates you from competitors..."
            {...register("business_unique", {
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
