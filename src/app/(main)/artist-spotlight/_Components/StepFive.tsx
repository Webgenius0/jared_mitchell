import { ImportantSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext, useWatch } from "react-hook-form";

const StepFive = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const selected = useWatch({ name: "artistCategory" }) || [];
  const isChecked = (value: any) => selected?.includes(value);

  return (
    <div className="step_box">
      <div className="flex gap-2 text-primary-black">
        <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF] text-2xl text-primary-blue">
          5
        </p>

        <h2 className="text-3xl font-semibold mb-2">Consent & Rights</h2>
      </div>

      <p className="text-[#364153] text-xl mb-10">
        Legal protection and content permission. Please read carefully before
        agreeing.
      </p>

      <div className="rounded-xl bg-[#F5F5F7] p-7">
        {/* Info */}
        <div className="mb-7">
          <div className="flex gap-3 items-center mb-1">
            <ImportantSvg />
            <h2 className="text-[22px]">Important Legal Information</h2>
          </div>

          <p className="text-[#364153cb] text-xl">
            By checking the boxes below, you grant OSI permission to feature
            your work. You still keep ownership of your content.
          </p>
        </div>

        <div className="space-y-5">
          {/* Checkbox 1 */}
          <label
            className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
              isChecked("public_release")
                ? "border-primary-blue bg-[#EFF6FF]"
                : "border-gray-100 hover:border-primary-blue bg-white"
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                {...register("consent_public_release")}
              />

              <h3 className="text-xl font-medium">Public Release Agreement</h3>
            </div>

            <p className="text-[#6A7282] text-lg">
              I agree that OSI can publish my photos, videos, story, and
              likeness across platforms.
            </p>
          </label>

          {/* Checkbox 2 */}
          <label
            className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
              isChecked("ownership")
                ? "border-primary-blue bg-[#EFF6FF]"
                : "border-gray-100 hover:border-primary-blue bg-white"
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                {...register("consent_ownership_declaration")}
              />

              <h3 className="text-xl font-medium">Ownership Declaration</h3>
            </div>

            <p className="text-[#6A7282] text-lg">
              I confirm that I own all submitted content and have full rights to
              share it.
            </p>
          </label>

          {/* Checkbox 3 */}
          <label
            className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
              isChecked("interview")
                ? "border-primary-blue bg-[#EFF6FF]"
                : "border-gray-100 hover:border-primary-blue bg-white"
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                {...register("consent_interview_permission")}
              />

              <h3 className="text-xl font-medium">Interview Permission</h3>
            </div>

            <p className="text-[#6A7282] text-lg">
              I agree to participate in interviews and allow OSI to publish
              them.
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
