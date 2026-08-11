// import { pricingTableData } from "@/Components/Data/data";

// const PricingTable = () => {
//   return (
//     <section className="section bg-[#F5F5F7]">
//       <div className="container">
//         <div className="w-full md:w-[700px] mx-auto lg:w-full overflow-x-auto xl:p-5">
//           <table className="w-full border-collapse text-nowrap shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
//             <thead className="rounded-2xl text-xl xl:text-2xl">
//               <tr className="border-b border-gray-200 bg-white">
//                 <th className="font-bold py-4 md:py-5 xl:py-[26px] rounded-tl-xl">
//                   Feature
//                 </th>
//                 <th className="font-bold py-4 md:py-5 xl:py-[26px]">
//                   Basic ($25)
//                 </th>
//                 <th className="font-bold py-5 xl:py-[26px]">Growth ($50)</th>
//                 <th className="font-bold py-4 md:py-5 xl:py-[26px] rounded-tr-xl">
//                   Pro Business ($100)
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="rounded-2xl [&>tr:last-child>td:first-child]:rounded-bl-2xl [&>tr:last-child>td:last-child]:rounded-br-2xl [&>tr:last-child]:border-none">
//               {pricingTableData.map((row, index) => (
//                 <tr
//                   key={index}
//                   className="text-sm md:text-base lg:text-lg 2xl:text-2xl border-b border-gray-200 text-center bg-white"
//                 >
//                   <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">
//                     {row.feature}
//                   </td>
//                   <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">
//                     {row.basic}
//                   </td>
//                   <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">
//                     {row.growth}
//                   </td>
//                   <td className="px-2 py-4 lg:py-5 2xl:py-[26px]">{row.pro}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingTable;

import { pricingTableData as staticTableData } from "@/Components/Data/data";

export interface TableRow {
  feature: string;
  basic: string | boolean;
  growth: string | boolean;
  pro: string | boolean;
}

export interface PricingTableProps {
  data?: TableRow[];
  headers?: {
    basic: string;
    growth: string;
    pro: string;
  };
}

const DEFAULT_HEADERS = {
  basic: "Basic ($25)",
  growth: "Growth ($50)",
  pro: "Pro Business ($100)",
};

const PricingTable = ({ data, headers }: PricingTableProps) => {
  const pricingTableData = data ?? staticTableData;
  const tableHeaders = headers ?? DEFAULT_HEADERS;

  if (!pricingTableData.length) return null;

  return (
    <section className="section py-8 md:py-12 bg-[#F5F5F7]">
      <div className="container">
        <div className="w-full md:w-[700px] mx-auto lg:w-full overflow-x-auto">
          <table className="w-full border-collapse text-nowrap shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
            <thead className="rounded-2xl text-lg xl:text-xl">
              <tr className="border-b border-gray-200 bg-white">
                <th className="font-bold text-left py-3 md:py-4 xl:py-5 rounded-tl-xl">
                  Feature
                </th>
                <th className="font-bold py-3 md:py-4 xl:py-5">{tableHeaders.basic}</th>
                <th className="font-bold py-3 md:py-4 xl:py-5">{tableHeaders.growth}</th>
                <th className="font-bold py-3 md:py-4 xl:py-5 rounded-tr-xl">
                  {tableHeaders.pro}
                </th>
              </tr>
            </thead>

            <tbody className="rounded-2xl [&>tr:last-child>td:first-child]:rounded-bl-2xl [&>tr:last-child>td:last-child]:rounded-br-2xl [&>tr:last-child]:border-none">
              {pricingTableData.map((row, index) => (
                <tr
                  key={index}
                  className="text-xs md:text-sm lg:text-base xl:text-lg border-b border-gray-200 text-center bg-white"
                >
                  <td className="px-2 py-2.5 lg:py-3.5 xl:py-4 text-left font-medium">
                    {row.feature}
                  </td>
                  <td className="px-2 py-2.5 lg:py-3.5 xl:py-4">
                    {typeof row.basic === "boolean" ? (row.basic ? "✓" : "—") : row.basic}
                  </td>
                  <td className="px-2 py-2.5 lg:py-3.5 xl:py-4">
                    {typeof row.growth === "boolean" ? (row.growth ? "✓" : "—") : row.growth}
                  </td>
                  <td className="px-2 py-2.5 lg:py-3.5 xl:py-4">
                    {typeof row.pro === "boolean" ? (row.pro ? "✓" : "—") : row.pro}
                  </td>
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
