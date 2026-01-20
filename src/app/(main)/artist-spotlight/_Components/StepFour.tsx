import {
  CheckSvg,
  DownloadIconSvg,
  ImgSvg,
} from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

const StepFour = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const ownerPhoto = watch("owner_portrait")?.[0];
  const workspacePhoto = watch("workstation")?.[0];
  const servicePhoto = watch("product_photos")?.[0];
  const teamPhoto = watch("team_photo")?.[0];

  return (
    <div className="step_box">
      <div className="flex gap-2 text-primary-black mb-2">
        <p className="size-10 rounded-full grid place-items-center bg-[#EFF6FF] text-2xl text-primary-blue">
          4
        </p>
        <h2 className="text-3xl font-semibold">Media Uploads</h2>
      </div>

      <p className="text-[#364153] text-xl mb-5">
        Upload photos and videos for your spotlight card, video intro, and page
        visuals. High-quality images make a better impression!
      </p>

      <div className="space-y-7">
        {/* Professional Headshot / Portrait */}
        <div>
          <p className="artist_label mb-1">
            <ImgSvg />
            <span>
              Professional Headshot / Portrait <span>*</span>
            </span>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              A clear, professional photo of you. This will be your main
              spotlight image.
            </p>

            {errors.owner_portrait?.message && (
              <p className="text-red-500">
                {errors.owner_portrait.message as string}
              </p>
            )}
          </div>

          <label htmlFor="owner_portrait">
            <input
              type="file"
              id="owner_portrait"
              className="hidden"
              {...register("owner_portrait", {
                required: "Owner portrait is required",
              })}
              onChange={e => {
                register("owner_portrait").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.owner_portrait ? "border-red-500" : "border-[#99a1af8a] "
              }`}
            >
              {ownerPhoto ? (
                <p className="size-10 rounded-full grid place-items-center bg-green-600  text-white">
                  <CheckSvg />
                </p>
              ) : (
                <DownloadIconSvg />
              )}
              {ownerPhoto ? (
                <h4 className="text-lg text-gray-500">{ownerPhoto?.name}</h4>
              ) : (
                <h4 className="text-lg text-gray-500">Click to upload image</h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Photos of Your Art / Work (3-5 photos) */}
        <div>
          <p className="artist_label mb-1">
            <ImgSvg />
            <span>
              Photos of Your Art / Work (3-5 photos) <span>*</span>
            </span>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              High-quality photos showcasing your best work. These will appear
              in your spotlight gallery.
            </p>

            {errors.workstation?.message && (
              <p className="text-red-500">
                {errors.workstation.message as string}
              </p>
            )}
          </div>

          <label htmlFor="workstation">
            <input
              type="file"
              id="workstation"
              className="hidden"
              {...register("workstation", {
                required: "Workspace photo is required",
              })}
              onChange={e => {
                register("workstation").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.workstation ? "border-red-500" : "border-[#99a1af8a] "
              }`}
            >
              {workspacePhoto ? (
                <p className="size-10 rounded-full grid place-items-center bg-green-600  text-white">
                  <CheckSvg />
                </p>
              ) : (
                <DownloadIconSvg />
              )}
              {workspacePhoto ? (
                <h4 className="text-lg text-gray-500">
                  {workspacePhoto?.name}
                </h4>
              ) : (
                <h4 className="text-lg text-gray-500">Click to upload image</h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Product or Service Photos */}
        <div>
          <p className="artist_label mb-1">
            <ImgSvg />
            <span>
              Behind-the-Scenes Photo <span>*</span>
            </span>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              Show your creative process! This adds authenticity to your story.
            </p>

            {errors.product_photos?.message && (
              <p className="text-red-500">
                {errors.product_photos.message as string}
              </p>
            )}
          </div>

          <label htmlFor="product_photos">
            <input
              type="file"
              id="product_photos"
              className="hidden"
              {...register("product_photos", {
                required: "Product photo is required",
              })}
              onChange={e => {
                register("product_photos").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.product_photos ? "border-red-500" : "border-[#99a1af8a] "
              }`}
            >
              {servicePhoto ? (
                <p className="size-10 rounded-full grid place-items-center bg-green-600  text-white">
                  <CheckSvg />
                </p>
              ) : (
                <DownloadIconSvg />
              )}
              {servicePhoto ? (
                <h4 className="text-lg text-gray-500">{servicePhoto?.name}</h4>
              ) : (
                <h4 className="text-lg text-gray-500">Click to upload image</h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Short Intro Video (15-30 seconds) */}
        <div>
          <p className="artist_label mb-1">
            <ImgSvg />
            <span>
              Short Intro Video (15-30 seconds) <span>*</span>
            </span>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              Introduce yourself on camera! This helps the community connect
              with you.
            </p>

            {errors.team_photo?.message && (
              <p className="text-red-500">
                {errors.team_photo.message as string}
              </p>
            )}
          </div>

          <label htmlFor="team_photo">
            <input
              type="file"
              id="team_photo"
              className="hidden"
              {...register("team_photo", {
                required: "Team photo is required",
              })}
              onChange={e => {
                register("team_photo").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.team_photo ? "border-red-500" : "border-[#99a1af8a] "
              }`}
            >
              {teamPhoto ? (
                <p className="size-10 rounded-full grid place-items-center bg-green-600  text-white">
                  <CheckSvg />
                </p>
              ) : (
                <DownloadIconSvg />
              )}
              {teamPhoto ? (
                <h4 className="text-lg text-gray-500">{teamPhoto?.name}</h4>
              ) : (
                <h4 className="text-lg text-gray-500">Click to upload image</h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
