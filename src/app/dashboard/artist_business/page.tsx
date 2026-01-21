import {
  CurrentSvg,
  GroupSvg,
  LoveSvg,
  RankSvg,
  SaveSvg,
  ShareSvg,
  TotalSvg,
} from "@/Components/Svg/SvgContainer2";
import EngagementOverview from "./_Components/EngagementOverview";

const data = [
  { icon: <LoveSvg />, title: "Total Votes", count: "2,847" },
  { icon: <RankSvg />, title: "Current Rank", count: "#23" },
  { icon: <TotalSvg />, title: "Total Claps", count: "5,234" },
  { icon: <ShareSvg />, title: "Shares", count: "892" },
  { icon: <SaveSvg />, title: "Saves", count: "11456" },
];

const data2 = [
  {
    icon: <GroupSvg />,
    title: "You received 12 new votes",
    time: "2 hours ago",
  },
  {
    icon: <GroupSvg />,
    title: "New comment from @artlover23",
    time: "2 hours ago",
  },
  {
    icon: <GroupSvg />,
    title: "Your spotlight was shared 5 times",
    time: "2 hours ago",
  },
];

const page = () => {
  return (
    <>
      <h3 className="text-2xl font-medium mb-5">Welcome back, John</h3>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-5 mb-5">
        {data?.map(item => (
          <div
            key={item?.count}
            className="bg-white border border-gray-100 p-5 rounded-lg"
          >
            <div className="flex gap-3 items-center">
              <p className="bg-[#155DFC1A] size-12 rounded-full grid place-items-center">
                {item?.icon}
              </p>
              <h3 className="font-medium text-lg">{item?.title}</h3>
            </div>

            <h2 className="text-3xl font-semibold pt-4 pb-3">{item?.count}</h2>

            <div className="flex gap-3 items-center">
              <p className="flex gap-1 items-center px-2.5 py-1 rounded-full bg-[#155DFC1A] w-fit text-primary-blue">
                <CurrentSvg />
                <span>0.1%</span>
              </p>

              <p className="text-gray-500 font-medium">vs Last Week</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <EngagementOverview />

        <div className="bg-white border border-gray-100 p-5 rounded-lg">
          <h3 className="text-2xl font-medium mb-5">Recent Activity</h3>

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
      </div>

      <h3 className="text-2xl font-medium mb-5">Spotlight Status</h3>
    </>
  );
};

export default page;
