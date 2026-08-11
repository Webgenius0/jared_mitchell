import { CheckSvg, DownloadIconSvg } from "@/Components/Svg/SvgContainer";
import { useFormContext } from "react-hook-form";

/* ------------------------------------------------------------------ */
/*  ExistingImages interface (mirrors the one in create-spotlights)    */
/* ------------------------------------------------------------------ */

export interface ExistingImages {
  portrait_photo: string | null;
  storefront_workspace_photo: string | null;
  product_service_photos: string[];
  team_photo: string | null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const StepFour = ({
  existingImages,
}: {
  existingImages?: ExistingImages | null;
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const ownerPhoto = watch("portrait_photo")?.[0];
  const workspacePhoto = watch("storefront_workspace_photo")?.[0];
  const servicePhoto = watch("product_service_photos")?.[0];
  const teamPhoto = watch("team_photo")?.[0];

  const isEditing = !!existingImages;

  const hasExistingPortrait = !!existingImages?.portrait_photo;
  const hasExistingWorkspace = !!existingImages?.storefront_workspace_photo;
  const hasExistingProduct =
    (existingImages?.product_service_photos?.length ?? 0) > 0;
  const hasExistingTeam = !!existingImages?.team_photo;

  /* When editing, images are optional — user can keep existing or upload new.
     Note: we must NOT rely on `required: false` alone — react-hook-form keeps a
     previously registered `required` rule when re-registering with `false`,
     which would make the step fail even though existing images are present.
     So we explicitly clear `required` and validate instead. */
  const requiredRule = (message: string, hasExisting: boolean): any => ({
    required: false,
    validate: (value: unknown) => {
      // Existing image satisfies the requirement (edit mode)
      if (hasExisting) return true;
      // A newly selected file satisfies the requirement
      if (value instanceof FileList && value.length > 0) return true;
      if (Array.isArray(value) && value.length > 0) return true;
      return message;
    },
  });

  return (
    <div className="step_box">
      <h2 className="text-3xl font-semibold mb-2">Images</h2>
      <p className="text-[#364153] text-xl mb-5">
        Show us your business through photos
      </p>

      <div className="space-y-7">
        {/* Business Owner Portrait */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Business Owner Portrait{" "}
              {!isEditing && <span>*</span>}
            </label>
            {errors.portrait_photo?.message && (
              <p className="text-red-500">
                {errors.portrait_photo.message as string}
              </p>
            )}
          </p>

          <label htmlFor="portrait_photo">
            <input
              type="file"
              id="portrait_photo"
              className="hidden"
              {...register("portrait_photo", requiredRule("Owner portrait is required", hasExistingPortrait))}
              onChange={e => {
                register("portrait_photo").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.portrait_photo ? "border-red-500" : "border-[#99a1af8a] "
              }`}
            >
              {ownerPhoto ? (
                <>
                  <img
                    src={URL.createObjectURL(ownerPhoto)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    {ownerPhoto?.name}
                  </h4>
                </>
              ) : hasExistingPortrait ? (
                <>
                  <img
                    src={existingImages!.portrait_photo!}
                    alt="Existing portrait"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    Existing image — click to replace
                  </h4>
                </>
              ) : (
                <>
                  <DownloadIconSvg />
                  <h4 className="text-lg text-gray-500">
                    Click to upload image
                  </h4>
                </>
              )}
              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Storefront / Workspace Photo */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Storefront / Workspace Photo{" "}
              {!isEditing && <span>*</span>}
            </label>
            {errors.storefront_workspace_photo?.message && (
              <p className="text-red-500">
                {errors.storefront_workspace_photo.message as string}
              </p>
            )}
          </p>

          <label htmlFor="storefront_workspace_photo">
            <input
              type="file"
              id="storefront_workspace_photo"
              className="hidden"
              {...register(
                "storefront_workspace_photo",
                requiredRule("Workspace photo is required", hasExistingWorkspace),
              )}
              onChange={e => {
                register("storefront_workspace_photo").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.storefront_workspace_photo
                  ? "border-red-500"
                  : "border-[#99a1af8a] "
              }`}
            >
              {workspacePhoto ? (
                <>
                  <img
                    src={URL.createObjectURL(workspacePhoto)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    {workspacePhoto?.name}
                  </h4>
                </>
              ) : hasExistingWorkspace ? (
                <>
                  <img
                    src={existingImages!.storefront_workspace_photo!}
                    alt="Existing storefront"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    Existing image — click to replace
                  </h4>
                </>
              ) : (
                <>
                  <DownloadIconSvg />
                  <h4 className="text-lg text-gray-500">
                    Click to upload image
                  </h4>
                </>
              )}
              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Product or Service Photos */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Product or Service Photos{" "}
              {!isEditing && <span>*</span>}
            </label>
            {errors.product_service_photos?.message && (
              <p className="text-red-500">
                {errors.product_service_photos.message as string}
              </p>
            )}
          </p>

          <label htmlFor="product_service_photos">
            <input
              type="file"
              multiple
              id="product_service_photos"
              className="hidden"
              {...register(
                "product_service_photos",
                requiredRule("Product photo is required", hasExistingProduct),
              )}
              onChange={e => {
                register("product_service_photos").onChange(e);
              }}
            />

            <div
              className={`border rounded-xl w-full py-8 text-center flex flex-col gap-3.5 justify-center items-center cursor-pointer hover:bg-gray-100 duration-300 transition-all ${
                errors.product_service_photos
                  ? "border-red-500"
                  : "border-[#99a1af8a] "
              }`}
            >
              {servicePhoto ? (
                <>
                  <img
                    src={URL.createObjectURL(servicePhoto)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    {servicePhoto?.name}
                  </h4>
                </>
              ) : hasExistingProduct ? (
                <>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {existingImages!.product_service_photos
                      .slice(0, 4)
                      .map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`Existing product ${i + 1}`}
                          className="h-16 w-16 object-cover rounded-lg border border-slate-200"
                        />
                      ))}
                    {existingImages!.product_service_photos.length > 4 && (
                      <span className="h-16 w-16 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 text-xs font-medium">
                        +{existingImages!.product_service_photos.length - 4}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg text-gray-500">
                    {existingImages!.product_service_photos.length}{" "}
                    existing image
                    {existingImages!.product_service_photos.length !== 1
                      ? "s"
                      : ""}{" "}
                    — click to add/replace
                  </h4>
                </>
              ) : (
                <>
                  <DownloadIconSvg />
                  <h4 className="text-lg text-gray-500">
                    Click to upload image
                  </h4>
                </>
              )}
              <p className="text-gray-500 -mt-1">PNG, JPG up to 10MB</p>
            </div>
          </label>
        </div>

        {/* Team Photo */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Team Photo {!isEditing && <span>*</span>}
            </label>
            {errors.team_photo?.message && (
              <p className="text-red-500">
                {errors.team_photo.message as string}
              </p>
            )}
          </p>

          <label htmlFor="team_photo">
            <input
              type="file"
              id="team_photo"
              className="hidden"
              {...register("team_photo", requiredRule("Team photo is required", hasExistingTeam))}
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
                <>
                  <img
                    src={URL.createObjectURL(teamPhoto)}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    {teamPhoto?.name}
                  </h4>
                </>
              ) : hasExistingTeam ? (
                <>
                  <img
                    src={existingImages!.team_photo!}
                    alt="Existing team"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <h4 className="text-lg text-gray-500">
                    Existing image — click to replace
                  </h4>
                </>
              ) : (
                <>
                  <DownloadIconSvg />
                  <h4 className="text-lg text-gray-500">
                    Click to upload image
                  </h4>
                </>
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
