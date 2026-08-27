import { ArtistCategorySkeleton } from "@/Components/Loader/Loader";
import { SelectSvg } from "@/Components/Svg/SvgContainer";
import { getArtistCategories } from "@/Hooks/api/cms_api";
import { useFormContext } from "react-hook-form";

type categoryItem = {
  id: number;
  name: string;
  description: string;
};

const StepTwo = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedCategory = watch("artist_category_id");
  const { data: categories, isLoading } = getArtistCategories();

  return (
    <div className="step_box">
      <h2 className="text-xl md:text-3xl font-semibold mb-2">Artist Category</h2>

      <p className="text-[#364153] text-sm md:text-xl mb-5">
        Select your primary category. This determines your voting pool and
        spotlight placement.
      </p>

      <hr className="text-gray-200 mb-6 md:mb-10 block" />

      <div className="mb-5 mt-6 md:mt-10 col-span-2">
        <div className="flex gap-3 items-center mb-1">
          <SelectSvg />
          <h2 className="text-lg md:text-[22px]">Select Your Category</h2>
        </div>

        <p className="text-[#364153] text-sm md:text-xl">
          At least one social media handle is required
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {isLoading
          ? Array.from({ length: 4 })?.map((_, idx) => (
              <ArtistCategorySkeleton key={idx} />
            ))
          : categories?.data?.map((item: categoryItem) => {
              const isActive = Number(selectedCategory) === item?.id;

              return (
                <label
                  key={item?.id}
                  htmlFor={item?.name}
                  className={`border shadow py-3 px-4 rounded-lg flex flex-col gap-2 justify-center cursor-pointer transition-all min-h-[80px] hover:bg-[#EFF6FF] relative
                ${
                  isActive
                    ? "border-primary-blue bg-[#EFF6FF]"
                    : "border-gray-200 hover:border-primary-blue bg-white"
                }`}
                >
                  <h3 className="text-xl font-medium text-[#101828]">
                    {item?.name}
                  </h3>

                  {item?.description && (
                    <p className="text-[#6A7282]">{item?.description}</p>
                  )}

                  <input
                    type="radio"
                    id={item?.name}
                    value={item?.id}
                    className="absolute top-3 right-3"
                    {...register("artist_category_id", {
                      required: "Please select a category",
                    })}
                  />
                </label>
              );
            })}
      </div>

      {errors.artist_category_id && (
        <p className="text-red-500 mt-4">
          {errors.artist_category_id.message as string}
        </p>
      )}

      {/* Category Other Description */}
      <div className="mt-10">
        <label htmlFor="category_other_description" className="auth_label mb-2.5">
          Other Category Description <span className="text-sm !text-gray-300">(Optional)</span>
        </label>
        <textarea
          id="category_other_description"
          rows={3}
          className="step_input !rounded-xl border-[#D1D5DC]"
          placeholder="If you selected 'Other' or want to provide more detail about your category..."
          {...register("category_other_description")}
        ></textarea>
      </div>
    </div>
  );
};

export default StepTwo;
