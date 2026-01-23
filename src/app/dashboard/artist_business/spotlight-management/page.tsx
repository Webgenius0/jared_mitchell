import {
  EyeSvg,
  GonkSvg,
  GroupSvg,
  LeftSvg,
  LoveSvg,
  SaveSvg,
  ShareSvg,
  WatchSvg,
} from "@/Components/Svg/SvgContainer2";


const data2 = [
  {
    icon: <WatchSvg />,
    title: "Current Status",
    time: "Live Featured",
  },
  {
    icon: <GonkSvg />,
    title: "Submission Date",
    time: "December 10, 2024",
  },
  {
    icon: <GonkSvg />,
    title: "Current Rank",
    time: "15 min off, 247",
  },
];

const data3 = [
  { icon: <EyeSvg />, title: "Views", count: "12,847" },
  { icon: <LoveSvg />, title: "Claps", count: "23,42" },
  { icon: <SaveSvg />, title: "Saved", count: "#12" },
  { icon: <ShareSvg />, title: "Share", count: "#12" },
];

const page = () => {
  return (
    <>
      <div className="p-5 rounded-lg bg-white border border-gray-100 flex gap-5 items-center mb-6">
        <p className="grid place-items-center size-12 rounded-lg border border-gray-200">
          <LeftSvg />
        </p>

        <div>
          <h3 className="text-2xl mb-1 font-medium">
            Congratulations! You're featured tHs week
          </h3>

          <p className="text-[#5C5C5C]">
            Your spotlight is visible on the homepage. Feature period ends in 5
            days
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-medium mb-5">Performance Metrics</h3>

      <div className="grid grid-cols-4 gap-5 mb-5">
        {data3?.map(item => (
          <div
            key={item?.count}
            className="bg-white border border-gray-100 p-5 rounded-lg"
          >
            <p className="bg-[#155DFC1A] size-12 rounded-full grid place-items-center mb-3">
              {item?.icon}
            </p>

            <p className="text-gray-500 font-medium">{item?.title}</p>

            <h2 className="text-3xl font-semibold pt-4 pb-3">{item?.count}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white border border-gray-100 p-5 rounded-lg">
          <h3 className="text-2xl font-medium mb-5">Spotlight Status</h3>

          <div className="space-y-5">
            {data2?.map(item => (
              <div
                key={item?.title}
                className="p-5 rounded-xl bg-[#E8EFFF] flex gap-5 items-center"
              >
                <p className="bg-[#155DFC1A] size-14 rounded-full grid place-items-center">
                  {item?.icon}
                </p>

                <div className="space-y-1.5">
                  <h3 className="text-lg">{item?.title}</h3>
                  <p className="text-gray-500 text-sm">{item?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-lg">
          <h3 className="text-2xl font-medium mb-5">Promotion Checklist</h3>

          <div className="space-y-5">
            {data2?.map(item => (
              <div
                key={item?.title}
                className="p-5 rounded-xl bg-[#E8EFFF] flex gap-5 items-center"
              >
                <p className="bg-[#155DFC1A] size-14 rounded-full grid place-items-center">
                  {item?.icon}
                </p>

                <h3 className="text-lg">{item?.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
