import { InstagramSvg, TwitterSvg } from "@/Components/Svg/SvgContainer2";

const page = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-medium pb-5">Connected Accounts</h2>

      <div className="flex gap-5 items-center justify-between pb-5 border-b border-gray-200">
        <div className="flex gap-3 items-center">
          <p className="size-13 rounded-full grid place-items-center bg-[#1977DD29]">
            <TwitterSvg />
          </p>

          <div>
            <h3 className="text-lg font-medium">Twitter</h3>
            <p className="text-gray-500">@johndoe_art</p>
          </div>
        </div>

        <button className="text-[#1FC16B] bg-[#1FC16B1C] rounded-full px-4 py-1.5 text-sm">
          Connected
        </button>
      </div>

      <div className="flex gap-5 items-center justify-between pt-5">
        <div className="flex gap-3 items-center">
          <p className="size-13 rounded-full grid place-items-center bg-[#1977DD29]">
            <InstagramSvg />
          </p>

          <div>
            <h3 className="text-lg font-medium">Instagram</h3>
            <p className="text-gray-500">Not Connect</p>
          </div>
        </div>

        <button className="text-[#696969] bg-gray-300 rounded-full px-4 py-1.5 text-sm">
          Connect
        </button>
      </div>
    </div>
  );
};

export default page;
