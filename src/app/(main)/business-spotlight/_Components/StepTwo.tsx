import { useFormContext } from "react-hook-form";

const MAX_CHARS = 500;

const StepTwo = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const fieldValues: Record<string, string> = {
    business_story: (watch("business_story") || "") as string,
    products_services: (watch("products_services") || "") as string,
    challenges_overcome: (watch("challenges_overcome") || "") as string,
    unique_factor: (watch("unique_factor") || "") as string,
    target_customer: (watch("target_customer") || "") as string,
  };

  // True once the field has hit the 500-char limit (typing is then blocked).
  const isLimitReached = (name: string) =>
    (fieldValues[name] || "").length >= MAX_CHARS;

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
            <span
              className={`text-xs font-medium ${
                isLimitReached("business_story")
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {fieldValues.business_story.length}/{MAX_CHARS}
            </span>
          </p>

          {(errors.business_story?.message ||
            isLimitReached("business_story")) && (
            <p className="text-red-500 mb-2">
              {errors.business_story?.message
                ? (errors.business_story.message as string)
                : "Business story cannot exceed 500 characters"}
            </p>
          )}

          <textarea
            id="business_story"
            rows={5}
            maxLength={MAX_CHARS}
            className={`step_input !rounded-xl ${
              errors.business_story || isLimitReached("business_story")
                ? "border-red-500"
                : "border-[#D1D5DC]"
            }`}
            placeholder="Where it started, why it exists, and the mission behind it..."
            {...register("business_story", {
              required: "Business Story is required",
              maxLength: {
                value: MAX_CHARS,
                message: "Business story cannot exceed 500 characters",
              },
            })}
          ></textarea>
        </div>

        {/* Product Offer */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="products_services" className="auth_label">
              2. What products or services do you offer? <span>*</span>
            </label>
            <span
              className={`text-xs font-medium ${
                isLimitReached("products_services")
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {fieldValues.products_services.length}/{MAX_CHARS}
            </span>
          </p>

          {(errors.products_services?.message ||
            isLimitReached("products_services")) && (
            <p className="text-red-500 mb-2">
              {errors.products_services?.message
                ? (errors.products_services.message as string)
                : "Product Offer cannot exceed 500 characters"}
            </p>
          )}

          <textarea
            id="products_services"
            rows={5}
            maxLength={MAX_CHARS}
            className={`step_input !rounded-xl ${
              errors.products_services || isLimitReached("products_services")
                ? "border-red-500"
                : "border-[#D1D5DC]"
            }`}
            placeholder="List what customers can purchase or experience..."
            {...register("products_services", {
              required: "Product Offer is required",
              maxLength: {
                value: MAX_CHARS,
                message: "Product Offer cannot exceed 500 characters",
              },
            })}
          ></textarea>
        </div>

        {/* Business Outcome */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="challenges_overcome" className="auth_label">
              3. What challenges has your business overcome? <span>*</span>
            </label>
            <span
              className={`text-xs font-medium ${
                isLimitReached("challenges_overcome")
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {fieldValues.challenges_overcome.length}/{MAX_CHARS}
            </span>
          </p>

          {(errors.challenges_overcome?.message ||
            isLimitReached("challenges_overcome")) && (
            <p className="text-red-500 mb-2">
              {errors.challenges_overcome?.message
                ? (errors.challenges_overcome.message as string)
                : "Business outcome cannot exceed 500 characters"}
            </p>
          )}

          <textarea
            id="challenges_overcome"
            rows={5}
            maxLength={MAX_CHARS}
            className={`step_input !rounded-xl ${
              errors.challenges_overcome ||
              isLimitReached("challenges_overcome")
                ? "border-red-500"
                : "border-[#D1D5DC]"
            }`}
            placeholder="Share the milestones, struggles, or turning points..."
            {...register("challenges_overcome", {
              required: "Business outcome is required",
              maxLength: {
                value: MAX_CHARS,
                message: "Business outcome cannot exceed 500 characters",
              },
            })}
          ></textarea>
        </div>

        {/* Business Unique */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="unique_factor" className="auth_label">
              4. What makes your business unique? <span>*</span>
            </label>
            <span
              className={`text-xs font-medium ${
                isLimitReached("unique_factor") ? "text-red-500" : "text-gray-400"
              }`}
            >
              {fieldValues.unique_factor.length}/{MAX_CHARS}
            </span>
          </p>

          {(errors.unique_factor?.message ||
            isLimitReached("unique_factor")) && (
            <p className="text-red-500 mb-2">
              {errors.unique_factor?.message
                ? (errors.unique_factor.message as string)
                : "Business unique cannot exceed 500 characters"}
            </p>
          )}

          <textarea
            id="unique_factor"
            rows={5}
            maxLength={MAX_CHARS}
            className={`step_input !rounded-xl ${
              errors.unique_factor || isLimitReached("unique_factor")
                ? "border-red-500"
                : "border-[#D1D5DC]"
            }`}
            placeholder="What separates you from competitors..."
            {...register("unique_factor", {
              required: "Business unique is required",
              maxLength: {
                value: MAX_CHARS,
                message: "Business unique cannot exceed 500 characters",
              },
            })}
          ></textarea>
        </div>

        {/* Target Customer */}
        <div className="col-span-2">
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="target_customer" className="auth_label">
              5. Who is your target customer? <span>*</span>
            </label>
            <span
              className={`text-xs font-medium ${
                isLimitReached("target_customer")
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {fieldValues.target_customer.length}/{MAX_CHARS}
            </span>
          </p>

          {(errors.target_customer?.message ||
            isLimitReached("target_customer")) && (
            <p className="text-red-500 mb-2">
              {errors.target_customer?.message
                ? (errors.target_customer.message as string)
                : "Target customer cannot exceed 500 characters"}
            </p>
          )}

          <textarea
            id="target_customer"
            rows={5}
            maxLength={MAX_CHARS}
            className={`step_input !rounded-xl ${
              errors.target_customer || isLimitReached("target_customer")
                ? "border-red-500"
                : "border-[#D1D5DC]"
            }`}
            placeholder="Describe their demographics, needs, or interests..."
            {...register("target_customer", {
              required: "Target customer is required",
              maxLength: {
                value: MAX_CHARS,
                message: "Target customer cannot exceed 500 characters",
              },
            })}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
