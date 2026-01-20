import { SelectSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const data = [
  { title: "Musician", desc: "Rap / R&B / Hip-Hop / Pop / Indie / Other" },
  { title: "Visual Artist", desc: "Painter / Sketch / Mixed Media / etc." },
  { title: "Photographer" },
  { title: "Model" },
  { title: "Videographer" },
  { title: "Digital Creator" },
  { title: "Designer", desc: "Fashion / Graphic" },
  { title: "Poet / Writer" },
  { title: "Other", desc: "Please describe below" },
];

const StepTwo = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedCategory = watch("artistCategory");

  return (
    <div className="step_box">
      <div className="flex gap-2 text-primary-black">
        <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF] text-2xl text-primary-blue">
          2
        </p>
        <h2 className="text-3xl font-semibold mb-2">Artist Category</h2>
      </div>

      <p className="text-[#364153] text-xl mb-5">
        Select your primary category. This determines your voting pool and
        spotlight placement.
      </p>

      <hr className="text-gray-200 mb-10 block" />

      <div className="mb-5 mt-10 col-span-2">
        <div className="flex gap-3 items-center mb-1">
          <SelectSvg />
          <h2 className="text-[22px]">Select Your Category</h2>
        </div>

        <p className="text-[#364153] text-xl">
          At least one social media handle is required
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {data.map((item, idx) => {
          const id = `artistCategory-${idx}`;
          const isActive = selectedCategory === item?.title;

          return (
            <label
              key={id}
              htmlFor={id}
              className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 justify-center cursor-pointer transition-all min-h-[80px] hover:bg-[#EFF6FF] relative
                ${
                  isActive
                    ? "border-primary-blue bg-[#EFF6FF]"
                    : "border-gray-200 hover:border-primary-blue bg-white"
                }`}
            >
              <h3 className="text-xl font-medium text-[#101828]">
                {item.title}
              </h3>

              {item.desc && <p className="text-[#6A7282]">{item.desc}</p>}

              <input
                type="radio"
                id={id}
                value={item?.title}
                className="absolute top-3 right-3"
                {...register("artistCategory", {
                  required: "Please select a category",
                })}
              />
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
  );
};

export default StepTwo;
