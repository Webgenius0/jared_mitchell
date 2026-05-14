import Image from "next/image";
import profile from "@/Assets/profile.png";
import { EditSvg, ProfileEditSvg } from "@/Components/Svg/SvgContainer2";

const page = () => {
  return (
    <div className="card">
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-2xl font-medium">Profile</h2>
        <button className="flex gap-2 items-center text-primary-blue font-medium text-lg">
          <ProfileEditSvg />
          Edit
        </button>
      </div>

      <figure className="size-20 rounded-full relative mb-7">
        <Image
          src={profile}
          alt="profile"
          className="size-full object-cover rounded-full"
          fill
        />

        <label
          htmlFor="upload"
          className="absolute bottom-0 right-0 size-7 rounded-full grid place-items-center bg-primary-blue cursor-pointer"
        >
          <EditSvg />
          <input id="upload" type="file" className="hidden" />
        </label>
      </figure>

      <div className="space-y-5">
        <div className="flex gap-28 items-center border-b border-gray-200 pb-4">
          <h3 className="font-medium min-w-[180px]">Display Name</h3>
          <p className="text-gray-700">Arthur Taylor</p>
        </div>
        <div className="flex gap-28 items-center border-b border-gray-200 pb-4">
          <h3 className="font-medium min-w-[180px]">Username</h3>
          <p className="text-gray-700">arthooo11</p>
        </div>
        <div className="flex gap-28 items-center border-b border-gray-200 pb-4">
          <h3 className="font-medium min-w-[180px]">Email</h3>
          <p className="text-gray-700">john@example.com</p>
        </div>
        <div className="flex gap-28 items-center border-b border-gray-200 pb-4">
          <h3 className="font-medium min-w-[180px]">Bio</h3>
          <p className="text-gray-700">
            Contemporary artist exploring the intersection of digital and
            traditional media.
          </p>
        </div>
        <div className="flex gap-28 items-center">
          <h3 className="font-medium min-w-[180px]">Business Description</h3>
          <p className="text-gray-700">
            Describe your business or creative practice...
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
