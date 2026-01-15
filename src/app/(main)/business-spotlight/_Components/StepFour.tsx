import { CheckSvg, DownloadIconSvg } from "@/Components/Svg/SvgContainer";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const StepFour = () => {
  const [ownerPhoto, setOwnerPhoto] = useState<null | File>(null);
  const [workspacePhoto, setWorkspacePhoto] = useState<null | File>(null);
  const [servicePhoto, setServicePhoto] = useState<null | File>(null);
  const [teamPhoto, setTeamPhoto] = useState<null | File>(null);

  const {
    register,
    formState: { errors },
  } = useFormContext();

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
              Business Owner Portrait <span>*</span>
            </label>
            {errors.owner_portrait?.message && (
              <p className="text-red-500">
                {errors.owner_portrait.message as string}
              </p>
            )}
          </p>

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
                if (e.target.files) {
                  setOwnerPhoto(e.target.files[0]);
                }
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

        {/* Storefront / Workspace Photo */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Storefront / Workspace Photo <span>*</span>
            </label>
            {errors.workstation?.message && (
              <p className="text-red-500">
                {errors.workstation.message as string}
              </p>
            )}
          </p>

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
                if (e.target.files) {
                  setWorkspacePhoto(e.target.files[0]);
                }
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
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Product or Service Photos <span>*</span>
            </label>
            {errors.product_photos?.message && (
              <p className="text-red-500">
                {errors.product_photos.message as string}
              </p>
            )}
          </p>

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
                if (e.target.files) {
                  setServicePhoto(e.target.files[0]);
                }
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

        {/* Team Photo */}
        <div>
          <p className="flex justify-between items-center mb-2">
            <label htmlFor="" className="auth_label">
              Team Photo <span>*</span>
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
              {...register("team_photo", {
                required: "Team photo is required",
              })}
              onChange={e => {
                register("team_photo").onChange(e);
                if (e.target.files) {
                  setTeamPhoto(e.target.files[0]);
                }
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
