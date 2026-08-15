import { CheckSvg, DownloadIconSvg } from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";

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

  const existingHeadshot = useWatch({ name: "existing_headshot" });
  const existingArtworkPhotos: string[] =
    useWatch({ name: "existing_artwork_photos" }) ?? [];
  const existingBehindScenes = useWatch({
    name: "existing_behind_scenes_photo",
  });
  const existingIntroVideo = useWatch({ name: "existing_intro_video" });

  /* File inputs lose their DOM value when the step unmounts/remounts (navigating
     to a previous step and back), so react-hook-form's `required` rule fails even
     though a file was already selected and is still stored in form state.
     We clear `required` and validate against the stored value instead.
     `existingCount` = how many images already exist (edit mode), `minCount` =
     the minimum number of images required (e.g. 3 for artwork photos). */
  const requiredRule = (
    message: string,
    existingCount: number,
    minCount = 1,
  ): any => ({
    required: false,
    validate: (value: unknown) => {
      const newCount =
        value instanceof FileList
          ? value.length
          : Array.isArray(value)
            ? value.length
            : 0;
      // Newly uploaded files replace the existing set
      const total = newCount > 0 ? newCount : existingCount;
      return total >= minCount ? true : message;
    },
  });

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Media Uploads</h2>

      <p className="text-[#364153] text-xl mb-5">
        Upload photos and videos for your spotlight card, video intro, and page
        visuals. High-quality images make a better impression!
      </p>

      <div className="space-y-7">
        {/* Professional Headshot / Portrait */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="headshot" className="auth_label">
              Professional Headshot / Portrait{" "}
              {!existingHeadshot && <span>*</span>}
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              A clear, professional photo of you. This will be your main
              spotlight image.
              {existingHeadshot && " Leave blank to keep your current photo."}
            </p>

            {errors.headshot?.message && (
              <p className="text-red-500">
                {errors.headshot.message as string}
              </p>
            )}
          </div>

          {existingHeadshot && !ownerPhoto && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden mb-3 border border-gray-200">
              <Image
                src={existingHeadshot}
                alt="Current headshot"
                fill
                className="object-cover"
              />
            </div>
          )}

          <label htmlFor="headshot">
            <input
              type="file"
              id="headshot"
              className="hidden"
              {...register(
                "headshot",
                requiredRule(
                  "Owner portrait is required",
                  existingHeadshot ? 1 : 0,
                ),
              )}
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
                <h4 className="text-lg text-gray-500">
                  {existingHeadshot
                    ? "Click to replace image"
                    : "Click to upload image"}
                </h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Photos of Your Art / Work (3-5 photos) */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="artwork_photos" className="auth_label">
              Photos of Your Art / Work (3-5 photos){" "}
              {existingArtworkPhotos.length === 0 && <span>*</span>}
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              High-quality photos showcasing your best work. These will appear
              in your spotlight gallery.
              {existingArtworkPhotos.length > 0 &&
                " Uploading new photos will replace the current set."}
            </p>

            {errors.artwork_photos?.message && (
              <p className="text-red-500">
                {errors.artwork_photos.message as string}
              </p>
            )}
          </div>

          {existingArtworkPhotos.length > 0 && !workspacePhoto && (
            <div className="grid grid-cols-3 gap-3 mb-3">
              {existingArtworkPhotos.map((src, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-xl overflow-hidden border border-gray-200"
                >
                  <Image
                    src={src}
                    alt={`Artwork ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <label htmlFor="artwork_photos">
            <input
              type="file"
              id="artwork_photos"
              multiple
              className="hidden"
              {...register(
                "artwork_photos",
                requiredRule(
                  "Please upload at least 3 photos of your artwork.",
                  existingArtworkPhotos.length,
                  3,
                ),
              )}
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
                <h4 className="text-lg text-gray-500">
                  {existingArtworkPhotos.length > 0
                    ? "Click to replace photos"
                    : "Click to upload image"}
                </h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Behind-the-Scenes Photo */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="behind_scenes_photo" className="auth_label">
              Behind-the-Scenes Photo {!existingBehindScenes && <span>*</span>}
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              Show your creative process! This adds authenticity to your story.
              {existingBehindScenes &&
                " Leave blank to keep your current photo."}
            </p>

            {errors.behind_scenes_photo?.message && (
              <p className="text-red-500">
                {errors.behind_scenes_photo.message as string}
              </p>
            )}
          </div>

          {existingBehindScenes && !servicePhoto && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden mb-3 border border-gray-200">
              <Image
                src={existingBehindScenes}
                alt="Current behind-the-scenes photo"
                fill
                className="object-cover"
              />
            </div>
          )}

          <label htmlFor="behind_scenes_photo">
            <input
              type="file"
              id="behind_scenes_photo"
              className="hidden"
              {...register(
                "behind_scenes_photo",
                requiredRule(
                  "Product photo is required",
                  existingBehindScenes ? 1 : 0,
                ),
              )}
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
                <h4 className="text-lg text-gray-500">
                  {existingBehindScenes
                    ? "Click to replace image"
                    : "Click to upload image"}
                </h4>
              )}

              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Short Intro Video (15-30 seconds) */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="intro_video" className="auth_label">
              Short Intro Video (15-30 seconds){" "}
              {!existingIntroVideo && <span>*</span>}
            </label>
          </p>

          <div className="flex justify-between items-center mb-3">
            <p className="text-[#364153]">
              Introduce yourself on camera! This helps the community connect
              with you.
              {existingIntroVideo && " Leave blank to keep your current video."}
            </p>

            {errors.intro_video?.message && (
              <p className="text-red-500">
                {errors.intro_video.message as string}
              </p>
            )}
          </div>

          {existingIntroVideo && !teamPhoto && (
            <video
              src={existingIntroVideo}
              controls
              className="w-full max-w-sm rounded-xl bg-slate-900 mb-3"
            />
          )}

          <label htmlFor="intro_video">
            <input
              type="file"
              accept="video/mp4"
              id="intro_video"
              className="hidden"
              {...register(
                "intro_video",
                requiredRule("Team photo is required", existingIntroVideo ? 1 : 0),
              )}
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
                <h4 className="text-lg text-gray-500">
                  {existingIntroVideo
                    ? "Click to replace video"
                    : "Click to upload image"}
                </h4>
              )}

              {/* <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p> */}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
