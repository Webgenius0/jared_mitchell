import { useFormContext } from "react-hook-form";

const StepFive = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Service Details</h2>
      <p className="text-[#364153] text-xl mb-5">
        How do you serve your customers?
      </p>
      
      <hr className="text-gray-200 mb-10 block" />

      {/* Do you offer in-person visits or online services? */}
      <div>
        <p className="flex justify-between items-center mb-5">
          <label className="auth_label">
            Do you offer in-person visits or online services? <span>*</span>
          </label>
          {errors.service_type?.message && (
            <p className="text-red-500">
              {errors.service_type.message as string}
            </p>
          )}
        </p>

        <p className="flex gap-3 items-center rounded-full px-5 py-3 border border-gray-300">
          <input
            type="radio"
            value="in_person"
            className="size-4"
            {...register("service_type", {
              required: "Service type is required",
            })}
          />
          <span>In-person only</span>
        </p>

        <p className="flex gap-3 items-center rounded-full px-5 py-3 border border-gray-300 my-5">
          <input
            type="radio"
            value="online"
            className="size-4"
            {...register("service_type", {
              required: "Service type is required",
            })}
          />
          <span>Online only</span>
        </p>

        <p className="flex gap-3 items-center rounded-full px-5 py-3 border border-gray-300">
          <input
            type="radio"
            value="both"
            className="size-4"
            {...register("service_type", {
              required: "Service type is required",
            })}
          />
          <span>Both in-person and online</span>
        </p>
      </div>
    </div>
  );
};

export default StepFive;
