import { ImportantSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext, useWatch } from "react-hook-form";

const data = [
  {
    title: "Public Release Agreement:",
    desc: "I agree that OSI can publish my photos, videos, story, interview, name, and likeness for spotlight features, social media posts, and promotional materials. I understand this content may be shared across multiple platforms.",
  },
  {
    title: "Ownership Declaration",
    desc: "I confirm that I own the rights to all submitted artwork, photos, videos, and content. I have not infringed on any copyrights, trademarks, or other intellectual property rights. I am legally authorized to grant OSI permission to use this content.",
  },
  {
    title: "Interview Permission",
    desc: "I agree to participate in video interviews and grant OSI permission to record, edit, and publish these interviews. I understand that interviews may be used for spotlight features, social media, and promotional content.",
  },
];

const StepFive = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const selectedCategory = useWatch({
    name: "artistCategory",
  });

  const selectedArray = Array.isArray(selectedCategory)
    ? selectedCategory
    : selectedCategory
      ? [selectedCategory]
      : [];

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
        <div className="mb-7">
          <div className="flex gap-3 items-center mb-1">
            <ImportantSvg />
            <h2 className="text-[22px]">Important Legal Information</h2>
          </div>

          <p className="text-[#364153cb] text-xl">
            By checking the boxes below, you grant OSI (Our Spotlight
            Initiative) permission to feature your work and story across our
            platform, social media, and promotional materials. You retain all
            ownership rights to your original work.
          </p>
        </div>

        <div className="space-y-5">
          {data.map((item, idx) => {
            const id = `artistCategory-${idx}`;
            const isActive = selectedArray.includes(item?.title);

            return (
              <label
                key={id}
                htmlFor={id}
                className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 justify-center cursor-pointer transition-all min-h-[80px] ${
                  isActive
                    ? "border-primary-blue bg-[#EFF6FF]"
                    : "border-gray-100 hover:border-primary-blue bg-white"
                }`}
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id={id}
                    value={item?.title}
                    className="size-4"
                    {...register("artistCategory", {
                      validate: value =>
                        value?.length > 0 ||
                        "Please select at least one option",
                    })}
                  />

                  <h3 className="text-xl font-medium text-[#101828]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-[#6A7282] text-lg">{item.desc}</p>
              </label>
            );
          })}
        </div>

        {errors.artistCategory && (
          <p className="text-red-500 mt-4">
            {errors.artistCategory.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepFive;
