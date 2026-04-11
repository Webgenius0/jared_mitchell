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

  const ownerPhoto = watch("headshot")?.[0];
  const workspacePhoto = watch("artwork_photos")?.[0];
  const servicePhoto = watch("behind_scenes_photo")?.[0];
  const teamPhoto = watch("intro_video")?.[0];

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

            {errors.headshot?.message && (
              <p className="text-red-500">
                {errors.headshot.message as string}
              </p>
            )}
          </div>

          <label htmlFor="headshot">
            <input
              type="file"
              id="headshot"
              className="hidden"
              {...register("headshot", {
                required: "Owner portrait is required",
              })}
              onChange={e => {
                register("headshot").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.headshot ? "border-red-500" : "border-[#99a1af8a] "
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

            {errors.artwork_photos?.message && (
              <p className="text-red-500">
                {errors.artwork_photos.message as string}
              </p>
            )}
          </div>

          <label htmlFor="artwork_photos">
            <input
              type="file"
              id="artwork_photos"
              multiple
              className="hidden"
              {...register("artwork_photos", {
                required: "Workspace photo is required",
              })}
              onChange={e => {
                register("artwork_photos").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.artwork_photos ? "border-red-500" : "border-[#99a1af8a] "
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

            {errors.behind_scenes_photo?.message && (
              <p className="text-red-500">
                {errors.behind_scenes_photo.message as string}
              </p>
            )}
          </div>

          <label htmlFor="behind_scenes_photo">
            <input
              type="file"
              id="behind_scenes_photo"
              className="hidden"
              {...register("behind_scenes_photo", {
                required: "Product photo is required",
              })}
              onChange={e => {
                register("behind_scenes_photo").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.behind_scenes_photo
                  ? "border-red-500"
                  : "border-[#99a1af8a] "
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

            {errors.intro_video?.message && (
              <p className="text-red-500">
                {errors.intro_video.message as string}
              </p>
            )}
          </div>

          <label htmlFor="intro_video">
            <input
              type="file"
              accept="video/mp4"
              id="intro_video"
              className="hidden"
              {...register("intro_video", {
                required: "Team photo is required",
              })}
              onChange={e => {
                register("intro_video").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.intro_video ? "border-red-500" : "border-[#99a1af8a] "
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
