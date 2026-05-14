import { pricingTableData } from "@/Components/Data/data";

const PricingTable = () => {
  return (
    <section className="section bg-[#F5F5F7]">
      <div className="container">
        <div className="w-full md:w-[700px] mx-auto lg:w-full overflow-x-auto xl:p-5">
          <table className="w-full border-collapse text-nowrap shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
            <thead className="rounded-2xl text-xl xl:text-2xl">
              <tr className="border-b border-gray-200 bg-white">
                <th className="font-bold py-4 md:py-5 xl:py-[26px] rounded-tl-xl">
                  Feature
                </th>
                <th className="font-bold py-4 md:py-5 xl:py-[26px]">
                  Basic ($25)
                </th>
                <th className="font-bold py-5 xl:py-[26px]">Growth ($50)</th>
                <th className="font-bold py-4 md:py-5 xl:py-[26px] rounded-tr-xl">
                  Pro Business ($100)
                </th>
              </tr>
            </thead>

            <tbody className="rounded-2xl [&>tr:last-child>td:first-child]:rounded-bl-2xl [&>tr:last-child>td:last-child]:rounded-br-2xl [&>tr:last-child]:border-none">
              {pricingTableData.map((row, index) => (
                <tr
                  key={index}
                  className="text-sm md:text-base lg:text-lg 2xl:text-2xl border-b border-gray-200 text-center bg-white"
                >
                  <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">
                    {row.feature}
                  </td>
                  <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">
                    {row.basic}
                  </td>
                  <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">
                    {row.growth}
                  </td>
                  <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
