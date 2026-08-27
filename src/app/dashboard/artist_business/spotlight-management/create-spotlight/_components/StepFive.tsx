import { ImportantSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext, useWatch } from "react-hook-form";

const StepFive = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const publicRelease = useWatch({ name: "consent_public_release" });
  const ownershipDeclaration = useWatch({
    name: "consent_ownership_declaration",
  });
  const interviewPermission = useWatch({ name: "consent_interview_permission" });

  return (
    <div className="step_box">
      <h2 className="text-xl md:text-3xl font-semibold mb-2">Consent & Rights</h2>

      <p className="text-[#364153] text-sm md:text-xl mb-6 md:mb-10">
        Legal protection and content permission. Please read carefully before
        agreeing.
      </p>

      <div className="rounded-xl bg-[#F5F5F7] p-4 md:p-7">
        {/* Info */}
        <div className="mb-7">
          <div className="flex gap-3 items-center mb-1">
            <ImportantSvg />          <h2 className="text-lg md:text-[22px]">Important Legal Information</h2>
        </div>

          <p className="text-[#364153cb] text-sm md:text-xl">
            By checking the boxes below, you grant OSI permission to feature
            your work. You still keep ownership of your content.
          </p>
        </div>

        <div className="space-y-5">
          {/* Checkbox 1 */}
          <label
            className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
              publicRelease
                ? "border-primary-blue bg-[#EFF6FF]"
                : "border-gray-100 hover:border-primary-blue bg-white"
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                {...register("consent_public_release", {
                  required: "You must consent to the public release agreement.",
                })}
              />

              <h3 className="text-base md:text-xl font-medium">Public Release Agreement</h3>
            </div>

            <p className="text-[#6A7282] text-sm md:text-lg">
              I agree that OSI can publish my photos, videos, story, and
              likeness across platforms.
            </p>
          </label>
          {errors.consent_public_release?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.consent_public_release.message as string}
            </p>
          )}

          {/* Checkbox 2 */}
          <label
            className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
              ownershipDeclaration
                ? "border-primary-blue bg-[#EFF6FF]"
                : "border-gray-100 hover:border-primary-blue bg-white"
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                {...register("consent_ownership_declaration", {
                  required: "You must declare ownership of your work.",
                })}
              />

              <h3 className="text-base md:text-xl font-medium">Ownership Declaration</h3>
            </div>

            <p className="text-[#6A7282] text-sm md:text-lg">
              I confirm that I own all submitted content and have full rights to
              share it.
            </p>
          </label>
          {errors.consent_ownership_declaration?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.consent_ownership_declaration.message as string}
            </p>
          )}

          {/* Checkbox 3 */}
          <label
            className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 cursor-pointer transition-all ${
              interviewPermission
                ? "border-primary-blue bg-[#EFF6FF]"
                : "border-gray-100 hover:border-primary-blue bg-white"
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                {...register("consent_interview_permission", {
                  required: "You must grant permission for an interview.",
                })}
              />

              <h3 className="text-base md:text-xl font-medium">Interview Permission</h3>
            </div>

            <p className="text-[#6A7282] text-sm md:text-lg">
              I agree to participate in interviews and allow OSI to publish
              them.
            </p>
          </label>
          {errors.consent_interview_permission?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.consent_interview_permission.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFive;
