import { HiOutlineDotsVertical } from "react-icons/hi";

// No live billing data is wired into this page yet — these stay empty and
// the sections render empty states instead of fabricated history.
const tableData: {
  id: string;
  date: string;
  amount: string;
  status: string;
}[] = [];

const data2: { title: string; time: string }[] = [];

const page = () => {
  return (
    <>
      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-5">Upcoming Events</h3>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-gray-100 text-center">
            <p className="text-gray-500">No active subscription yet.</p>
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
              {tableData?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-sm text-gray-400"
                  >
                    No billing history yet.
                  </td>
                </tr>
              ) : (
                tableData?.map(item => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card mb-5">
        <h3 className="text-2xl font-medium mb-5">Support Vote Purchases</h3>

        <div className="space-y-4">
          {data2?.length === 0 ? (
            <div className="p-5 rounded-xl bg-white border border-gray-100 text-center">
              <p className="text-gray-500">No support vote purchases yet.</p>
            </div>
          ) : (
            data2?.map(item => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default page;
