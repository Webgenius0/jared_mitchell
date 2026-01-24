import { HiOutlineDotsVertical } from "react-icons/hi";

const tableData = [
  { id: "INV-001", date: "Dec1, 2024", amount: "$29.00", status: "paid" },
  { id: "INV-001", date: "Dec1, 2024", amount: "$29.00", status: "paid" },
  { id: "INV-001", date: "Dec1, 2024", amount: "$29.00", status: "paid" },
  { id: "INV-001", date: "Dec1, 2024", amount: "$29.00", status: "paid" },
];

const data2 = [
  {
    title: "50 Support Votes Bundle",
    time: "Dec 10, 2024",
  },
  {
    title: "50 Support Votes Bundle",
    time: "Dec 10, 2024",
  },
];

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

      <div className="card mb-5">
        <div className="flex gap-3 items-center justify-between mb-3">
          <h3 className="text-2xl font-medium mb-5">Billing History</h3>
          <button className="text-sm px-5 py-2 bg-primary-blue rounded-full cursor-pointer text-white font-medium">
            Export All
          </button>
        </div>

        <div className="rounded-lg overflow-hidden">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-[#E8EFFF]">
                <td className="p-4 font-medium">Invoice</td>
                <td className="p-4 font-medium">Date</td>
                <td className="p-4 font-medium">Amount</td>
                <td className="p-4 font-medium">Status</td>
                <td className="p-4 font-medium">Action</td>
              </tr>
            </thead>

            <tbody>
              {tableData?.map(item => (
                <tr
                  className="border-b last:border-b-0 border-gray-200 text-gray-700"
                  key={item?.id}
                >
                  <td className="p-4">{item?.id}</td>
                  <td className="p-4">{item?.date}</td>
                  <td className="p-4">{item?.amount}</td>
                  <td className="p-4">
                    <p className="text-[#1FC16B] bg-[#32A47929] px-4 py-1 text-sm w-fit rounded-full capitalize">
                      {item?.status}
                    </p>
                  </td>
                  <td className="p-4">
                    <button>
                      <HiOutlineDotsVertical className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-5">Support Vote Purchases</h3>

        <div className="space-y-4">
          {data2?.map(item => (
            <div
              key={item?.title}
              className="p-5 rounded-xl bg-[#E8EFFF] flex gap-5 items-center justify-between"
            >
              <div className="space-y-1.5">
                <h3 className="text-lg">{item?.title}</h3>
                <p className="text-gray-500 text-sm">{item?.time}</p>
              </div>

              <p className="text-black text-xl font-medium">$25.00</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
