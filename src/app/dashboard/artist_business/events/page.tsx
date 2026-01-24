const data2 = [
  {
    title: "OSI Winter Showcase 2024",
  },
  {
    title: "OSI Founder Networking Night",
  },
  {
    title: "OSI Founder Networking Night",
  },
];

const data3 = [
  { count: "20%", title: "Event Discount" },
  { count: "High", title: "Vendor Priority" },
  { count: "5", title: "Free Events/Year" },
  { count: "2", title: "Guest Passes" },
];

const page = () => {
  return (
    <>
      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-5">Upcoming Events</h3>

        <div className="space-y-4">
          {data2?.map((item, idx) => (
            <div
              key={item?.title}
              className="p-5 rounded-xl bg-[#E8EFFF] flex justify-between gap-5 items-center"
            >
              <div>
                <h3 className="text-lg mb-2">{item?.title}</h3>

                <p className="flex items-center text-sm text-gray-500">
                  <span className="border-r border-gray-300 pr-5">
                    December 20, 2024
                  </span>
                  <span className="border-r border-gray-300 px-5">
                    6:00 PM - 10:00 PM
                  </span>
                  <span className="pl-5">Downtown Gallery, LA</span>
                </p>
              </div>

              <button className="text-sm px-5 py-2 bg-[#155DFC1A] rounded-full cursor-pointer text-primary-blue font-medium">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-5">Partnership Opportunities</h3>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-[#F9F9F9] p-5 rounded-lg">
            <div className="flex gap-3 items-center justify-between mb-2">
              <h4 className="text-xl">Featured Vendor Spot</h4>
              <button className="text-sm px-4 py-1.5 bg-[#155DFC1A] rounded-full cursor-pointer text-primary-blue font-medium">
                Applied
              </button>
            </div>

            <p className="text-gray-500 mb-3">Premium booth placement</p>

            <div className="flex gap-3 items-center justify-between">
              <button className="underline font-medium">View Details</button>
              <p className="text-gray-500">December 20, 2024</p>
            </div>
          </div>

          <div className="bg-[#F9F9F9] p-5 rounded-lg">
            <div className="flex gap-3 items-center justify-between mb-2">
              <h4 className="text-xl">Collaborative Project</h4>
              <button className="text-sm px-4 py-1.5 bg-[#155DFC1A] rounded-full cursor-pointer text-primary-blue font-medium">
                Applied
              </button>
            </div>

            <p className="text-gray-500 mb-3">Cross-promotion opportunity</p>

            <div className="flex gap-3 items-center justify-between">
              <button className="underline font-medium">View Details</button>
              <p className="text-gray-500">December 20, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-medium mb-5">Spotlight Status</h3>

        <div className="grid grid-cols-4 gap-5">
          {data3?.map(item => (
            <div
              key={item?.count}
              className="bg-white border border-gray-100 p-5 rounded-lg"
            >
              <p className="bg-[#155DFC1A] size-12 text-primary-blue rounded-full grid place-items-center">
                {item?.count}
              </p>

              <h2 className="text-2xl font-semibold pt-4">
                {item?.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
