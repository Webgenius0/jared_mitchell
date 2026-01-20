import { BookSvg, GoalSvg, MsgSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const StepThree = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="step_box">
      <div className="flex gap-2 text-primary-black">
        <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF] text-2xl text-primary-blue">
          3
        </p>
        <h2 className="text-3xl font-semibold mb-2">Artist Story</h2>
      </div>

      <p className="text-[#364153] text-xl mb-5">
        This is the most important section. Share your authentic story - this
        content will be used for spotlight pages and interviews.
      </p>

      <hr className="text-gray-200 mb-10 block" />

      <div className="space-y-7">
        {/* Short Bio (2-4 sentences) */}
        <div>
          <p className="artist_label mb-1">
            <BookSvg />
            <label htmlFor="short_bio">
              Short Bio (2-4 sentences) <span>*</span>
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              This appears on your spotlight card. Describe who you are as an
              artist and what your work represents.
            </p>

            {errors.short_bio?.message && (
              <p className="text-red-500">
                {errors.short_bio.message as string}
              </p>
            )}
          </div>

          <textarea
            id="short_bio"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.short_bio ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="I'm a visual artist from Los Angeles who creates vibrant murals that celebrate community and culture..."
            {...register("short_bio", {
              required: "Short bio is required",
            })}
          ></textarea>
        </div>

        {/* Full Artist Story (5-20 sentences) */}
        <div>
          <p className="artist_label mb-1">
            <BookSvg />
            <label htmlFor="artist_story">
              Full Artist Story (5-20 sentences) <span>*</span>
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              This is your long-form story for the main spotlight page. How did
              you get started? What struggles shaped you? What does your work
              stand for? How do you want your art to impact the community?
            </p>

            {errors.artist_story?.message && (
              <p className="text-red-500">
                {errors.artist_story.message as string}
              </p>
            )}
          </div>

          <textarea
            id="artist_story"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.artist_story ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="My journey as an artist began when I was 15 years old..."
            {...register("artist_story", {
              required: "Artist story is required",
            })}
          ></textarea>
        </div>

        {/* Why Should Your Story Be Spotlighted? (3-6 sentences) */}
        <div>
          <p className="artist_label mb-1">
            <GoalSvg />
            <label htmlFor="why_story">
              Why Should Your Story Be Spotlighted? (3-6 sentences)
              <span>*</span>
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              Explain your uniqueness, impact, message, and authenticity.
            </p>

            {errors.why_story?.message && (
              <p className="text-red-500">
                {errors.why_story.message as string}
              </p>
            )}
          </div>

          <textarea
            id="why_story"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.why_story ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="My work deserves to be spotlighted because..."
            {...register("why_story", {
              required: "Why story is required",
            })}
          ></textarea>
        </div>

        {/* What Message Do You Want to Share with the Community? */}
        <div>
          <p className="artist_label mb-1">
            <MsgSvg />
            <label htmlFor="what_story">
              What Message Do You Want to Share with the Community?
              <span>*</span>
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              This will be used for the "pull quote" section of your spotlight.
            </p>

            {errors.what_story?.message && (
              <p className="text-red-500">
                {errors.what_story.message as string}
              </p>
            )}
          </div>

          <textarea
            id="what_story"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.what_story ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="I want to inspire others to..."
            {...register("what_story", {
              required: "What story is required",
            })}
          ></textarea>
        </div>

        {/* What Are Your Current Goals as an Artist? */}
        <div>
          <p className="artist_label mb-1">
            <GoalSvg />
            <label htmlFor="current_goal">
              What Are Your Current Goals as an Artist?
              <span>*</span>
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              This creates the "what's next" section of your spotlight page.
            </p>

            {errors.current_goal?.message && (
              <p className="text-red-500">
                {errors.current_goal.message as string}
              </p>
            )}
          </div>

          <textarea
            id="current_goal"
            rows={5}
            className={`step_input !rounded-xl ${
              errors.current_goal ? "border-red-500" : "border-[#D1D5DC] "
            }`}
            placeholder="In the next year, I plan to..."
            {...register("current_goal", {
              required: "Current goal is required",
            })}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
