const page = () => {
  return (
    <>
      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-5">Upcoming Events</h3>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#E8EFFF] flex justify-between gap-5 items-center">
            <div>
              <h3 className="text-xl mb-1">Pro Artist plan</h3>

              <p className="text-gray-500 mb-2">
                Billed monthly · Next billing date: January 1, 2025
              </p>

              <p className="flex items-center text-sm text-gray-500">
                <span className="border-r border-gray-300 pr-5">
                  December 20, 2024
                </span>
                <span className="border-r border-gray-300 px-5">
                  6:00 PM - 10:00 PM
                </span>
                <span className="border-r border-gray-300 px-5">
                  Downtown Gallery, LA
                </span>
                <span className="pl-5">Downtown Gallery, LA</span>
              </p>
            </div>

            <div>
              <h3 className="text-4xl mb-4">
                $55<span className="text-lg text-gray-500">/month</span>
              </h3>

              <div className="flex gap-3 items-center">
                <button className="text-sm px-5 py-2 bg-white rounded-full cursor-pointer text-black font-medium">
                  Cancel plan
                </button>

                <button className="text-sm px-5 py-2 bg-primary-blue rounded-full cursor-pointer text-white font-medium">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
