import {
  AwardSvg,
  DateSvg,
  StarSvg,
  UserIconSvg,
} from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const StepSix = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <div className="flex gap-2 text-primary-black mb-2">
        <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF] text-2xl text-primary-blue">
          6
        </p>

        <h2 className="text-3xl font-semibold =">Optional Information</h2>
      </div>

      <p className="text-[#364153] text-xl mb-10">
        Help us learn more about you! While optional, this information can
        enhance your spotlight profile and help us serve you better.
      </p>

      <div className="space-y-7">
        <div className="flex gap-7 items-center">
          {/* Talent Management Contact */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2.5">
              <p className="artist_label">
                <UserIconSvg />
                <label htmlFor="talent_manager_contact">
                  Talent Management Contact{" "}
                  <span className="text-sm !text-gray-300">(Optional)</span>
                </label>
              </p>
            </div>

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
            <div className="flex justify-between items-center mb-2.5">
              <p className="artist_label">
                <UserIconSvg />
                <label htmlFor="agent_contact">
                  Agent's Contact{" "}
                  <span className="text-sm !text-gray-300">(Optional)</span>
                </label>
              </p>
            </div>

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
          <p className="artist_label mb-1">
            <StarSvg />
            <label htmlFor="press_kit_url">
              Link to Press Kit{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153]  mb-2.5">
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
          <p className="artist_label mb-1">
            <StarSvg />
            <label htmlFor="previous_interviews">
              Previous Interviews{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153]  mb-2.5">
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
          <p className="artist_label mb-1">
            <AwardSvg />
            <label htmlFor="awards_recognition">
              Awards or Recognition{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153]  mb-2.5">
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

        <div className="flex gap-7 items-center">
          {/* Preferred Pronouns */}
          <div className="flex-1">
            <p className="artist_label mb-2.5">
              Preferred Pronouns{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </p>

            <input
              type="text"
              id="pronounce"
              className={`step_input border-[#D1D5DC]`}
              {...register("pronounce")}
            />
          </div>

          {/* Preferred Contact Method */}
          <div className="flex-1">
            <p className="artist_label mb-2.5">
              Preferred Contact Method{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
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
          <p className="artist_label mb-1">
            <DateSvg />
            <label htmlFor="interview_availability">
              Interview Availability{" "}
              <span className="text-sm !text-gray-300">(Optional)</span>
            </label>
          </p>

          <p className="text-[#364153]  mb-2.5">
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
