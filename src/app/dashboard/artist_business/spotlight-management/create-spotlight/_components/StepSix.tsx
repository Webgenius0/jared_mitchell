import { useFormContext } from "react-hook-form";

const StepSix = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <h2 className="text-xl md:text-3xl font-semibold mb-2">Optional Information</h2>

      <p className="text-[#364153] text-sm md:text-xl mb-6 md:mb-10">
        Help us Score This Business about you! While optional, this information can
        enhance your spotlight profile and help us serve you better.
      </p>

      <div className="space-y-5 md:space-y-7">
        <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-stretch md:items-center">
          {/* Talent Management Contact */}
          <div className="flex-1">
            <p className="flex justify-between items-center mb-2">
              <label htmlFor="talent_manager_contact" className="auth_label">
                Talent Management Contact{" "}
                <span className="text-sm !text-gray-300">(Optional)</span>
              </label>
            </p>

            <input
              type="text"
              id="talent_manager_contact"
              className={`step_input border-[#D1D5DC]`}
              placeholder="Manager name and email"
              {...register("talent_manager_contact")}
            />
          </div>

          {/* Agent's Contact */}
          <div className="flex-1">
            <p className="flex justify-between items-center mb-2">
              <label htmlFor="agent_contact" className="auth_label">
                Agent's Contact{" "}
                <span className="text-sm !text-gray-300">(Optional)</span>
              </label>
            </p>

            <input
              type="text"
              id="agent_contact"
              className={`step_input border-[#D1D5DC]`}
              placeholder="Agent name and email"
              {...register("agent_contact")}
            />
          </div>
        </div>

        {/* Link to Press Kit */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="press_kit_url" className="auth_label">
              Link to Press Kit{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153] text-sm md:text-base mb-2.5">
            If you have a press kit or media kit, share the link here
          </p>

          <input
            type="url"
            id="press_kit_url"
            className={`step_input border-[#D1D5DC]`}
            placeholder="https://yourportfolio.com"
            {...register("press_kit_url")}
          />
        </div>

        {/* Previous Interviews */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="previous_interviews" className="auth_label">
              Previous Interviews{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153] text-sm md:text-base mb-2.5">
            Links to any previous interviews, podcasts, or features
          </p>

          <textarea
            id="previous_interviews"
            rows={5}
            className={`step_input !rounded-xl border-[#D1D5DC]`}
            placeholder="Link 1, Link 2, Link 3..."
            {...register("previous_interviews")}
          ></textarea>
        </div>

        {/* Awards or Recognition */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="awards_recognition" className="auth_label">
              Awards or Recognition{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153] text-sm md:text-base mb-2.5">
            List any awards, recognitions, or notable achievements
          </p>

          <textarea
            id="awards_recognition"
            rows={5}
            className={`step_input !rounded-xl border-[#D1D5DC]`}
            placeholder="e.g., Best New Artist 2024, Featured in X Magazine..."
            {...register("awards_recognition")}
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-stretch md:items-center">
          {/* Preferred Pronouns */}
          <div className="flex-1">
            <p className="flex justify-between items-center mb-2">
              <span className="auth_label">
                Preferred Pronouns{" "}
                <span className="text-sm !text-gray-300">(Optional)</span>
              </span>
            </p>

            <input
              type="text"
              id="preferred_pronouns"
              className={`step_input border-[#D1D5DC]`}
              {...register("preferred_pronouns")}
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="flex-1">
            <p className="flex justify-between items-center mb-2">
              <span className="auth_label">
                Preferred Contact Method{" "}
                <span className="text-sm !text-gray-300">(Optional)</span>
              </span>
            </p>

            <input
              type="text"
              id="preferred_contact_method"
              className={`step_input border-[#D1D5DC]`}
              {...register("preferred_contact_method")}
            />
          </div>
        </div>

        {/* Interview Availability */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="interview_availability" className="auth_label">
              Interview Availability{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153] text-sm md:text-base mb-2.5">
            List any awards, recognitions, or notable achievements
          </p>

          <textarea
            id="interview_availability"
            rows={5}
            className={`step_input !rounded-xl border-[#D1D5DC]`}
            placeholder="e.g., Available weekday evenings after 6pm, or weekend mornings..."
            {...register("interview_availability")}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default StepSix;
