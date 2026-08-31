

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
    <section className="section py-6 md:py-8 bg-[#F5F5F7] md:w-[80%] 2xl:w-full mx-auto">
      <div className="container">
        <div className="w-full md:w-[700px] mx-auto lg:w-full overflow-x-auto">
          <table className="w-full border-collapse text-nowrap shadow-[0_4px_20px_0_rgba(0,0,0,0.07)]">
            <thead className=" text-sm md:text-base lg:text-base xl:text-xl">
              <tr className="border-b border-gray-200 bg-white">
                <th className="font-bold text-left py-2.5 md:py-3 lg:py-3.5 xl:py-5 ">
                  Feature
                </th>
                <th className="font-bold py-2.5 md:py-3 lg:py-3.5 xl:py-5">{tableHeaders.basic}</th>
                <th className="font-bold py-2.5 md:py-3 lg:py-3.5 xl:py-5">{tableHeaders.growth}</th>
                <th className="font-bold py-2.5 md:py-3 lg:py-3.5 xl:py-5 ">
                  {tableHeaders.pro}
                </th>
              </tr>
            </thead>

            <tbody className="[&>tr:last-child>td:first-child] [&>tr:last-child>td:last-child] [&>tr:last-child]:border-none">
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
