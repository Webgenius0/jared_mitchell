import { ShareSvg, WatchSvg } from "@/Components/Svg/SvgContainer2";
import qr from "@/Assets/qr.png";
import Image from "next/image";

const data2 = [
  {
    icon: <WatchSvg />,
    title: "Twitter",
    time: "Check out my spotlight on @OSI_Platform! I'm competing for featured artist this week. Your vote means the world!  #OSISpotlight #ArtistLife",
  },
  {
    icon: <WatchSvg />,
    title: "Instagram",
    time: "Big news! I'm featured on @osi_platform this week! Head to the link in bio to vote for me. Every vote counts!  #OSISpotlight #ArtistLife",
  },
];

const data3 = [
  { icon: <ShareSvg />, title: "Instagram Story" },
  { icon: <ShareSvg />, title: "Facebook Post" },
  { icon: <ShareSvg />, title: "Twitter Banner" },
  { icon: <ShareSvg />, title: "Profile Badge" },
];

const page = () => {
  return (
    <>
      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-1">Performance Metrics</h3>
        <div className="flex gap-3 items-center justify-between mb-5">
          <p className="text-gray-500">
            Download ready-to-use graphics for social media
          </p>
          <button className="bg-primary-blue text-white cursor-pointer px-4 py-2 rounded-full text-sm">
            Download All
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {data3?.map(item => (
            <div
              key={item?.title}
              className="border bg-[#E8EFFF] border-gray-100 p-5 rounded-lg"
            >
              <p className="bg-[#155DFC1A] size-12 rounded-full grid place-items-center mb-3">
                {item?.icon}
              </p>

              <h2 className="text-2xl font-semibold">{item?.title}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="col-span-4 card">
          <h3 className="text-2xl font-medium text-center mb-1">
            Spotlight QR Code
          </h3>
          <p className="text-gray-500 text-center text-sm">
            Scan to visit your spotlight directly
          </p>
          <figure className="relative w-[111px] h-[95px] mx-auto my-5 block">
            <Image
              alt="img"
              unoptimized
              src={qr}
              fill
              className="w-full h-full object-cover"
            />
          </figure>
          <button className="bg-primary-blue text-white cursor-pointer px-4 py-2 rounded-full text-sm block w-fit mx-auto">
            Download OR Code
          </button>
        </div>

        <div className="col-span-8 card">
          <h3 className="text-2xl font-medium mb-4">Your Spotlight Link</h3>

          <div className="space-y-4">
            <p className="p-5 rounded-full text-gray-600 bg-[#F9F9F9]">
              https : //osi . app/spotlight/johndoe
            </p>

            <p className="p-5 rounded-full text-gray-600 bg-[#F9F9F9]">
              Download OR Code
            </p>

            <p className="p-5 rounded-full text-gray-600 bg-[#F9F9F9]">
              Download OR Code
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white border border-gray-100 p-5 rounded-lg">
          <h3 className="text-2xl font-medium mb-5">Social Media Captions</h3>

          <div className="space-y-5">
            {data2?.map(item => (
              <div
                key={item?.title}
                className="p-5 rounded-xl bg-[#F9F9F9] flex gap-5 items-center"
              >
                <p className="bg-[#155DFC1A] size-12 rounded-full grid place-items-center shrink-0">
                  {item?.icon}
                </p>

                <div className="space-y-1.5">
                  <p className="text-gray-500 text-sm">{item?.time}</p>
                  <h3 className="text-lg">{item?.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-lg">
          <h3 className="text-2xl font-medium mb-5">Email Template</h3>

          <p className="text-gray-500">
            Hi [Name],
            <br />
            <br />I hope this message finds you well! I'm reaching out because
            I'm currently competing for the featured artist spot on OSI (Open
            Spotlight Initiative).
            <br />
            <br />
            1. Visit: [Your Spotlight Link]
            <br /> 2. Click the "Vote" button
            <br /> 3. That's it!
            <br />
            <br />
            Thank you so much for your support!
            <br />
            Best,
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
