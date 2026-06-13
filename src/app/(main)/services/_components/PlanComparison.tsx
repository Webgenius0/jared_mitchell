import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import { planComparisonTableData } from "@/Components/Data/data";
import { GoCheck } from "react-icons/go";
import { TfiClose } from "react-icons/tfi";

const PlanComparison = () => {
  return (
    <section className="section bg-primary-gray">
      <Container>
        <div className="px-14">
          <h2 className="section_title 2xl:text-7xl 2xl:font-bold leading-[150%]">
            Compare Plans — Find the best path for your growth
          </h2>
          <p className="section_sub_title">
            Below is a breakdown of exactly what each membership provides so you
            can make the best choice for your goals.
          </p>
        </div>
        <div className="overflow-x-auto my-12">
          <table className="w-full border-collapse text-nowrap shadow-[0_4px_20px_0_rgba(0,0,0,0.07)] text-primary-black">
            <thead className="rounded-2xl md:text-2xl">
              <tr className="border-b border-gray-200 bg-white">
                <th className="font-bold pl-10 pr-2.5 pb-[26px] pt-10 md:pt-14 text-left rounded-tl-xl">
                  Feature
                </th>
                <th className="font-bold px-2.5 pb-[26px] pt-10 md:pt-14">
                  Basic
                </th>
                <th className="font-bold px-2.5 pb-[26px] pt-10 md:pt-14">
                  Growth
                </th>
                <th className="font-bold px-2.5 pb-[26px] pt-10 md:pt-14 rounded-tr-xl">
                  Pro Business
                </th>
              </tr>
            </thead>
            <tbody className="rounded-2xl [&>tr:last-child>td:first-child]:rounded-bl-2xl [&>tr:last-child>td:last-child]:rounded-br-2xl [&>tr:last-child]:border-none">
              {planComparisonTableData.map((row, index) => (
                <tr
                  key={index}
                  className="md:text-2xl border-b border-gray-200 text-center bg-white"
                >
                  <td className="py-[26px] w-1/4 text-left pl-10 pr-2.5">
                    {row.feature}
                  </td>
                  <td className="py-[26px] w-1/4 px-2.5">
                    {row.basic === true ? (
                      <GoCheck className="mx-auto text-primary-blue text-[28px]" />
                    ) : row.basic === false ? (
                      <TfiClose className="mx-auto text-[#919EAB]" />
                    ) : (
                      row.basic
                    )}
                  </td>
                  <td className="py-[26px] w-1/4 px-2.5">
                    {row.growth === true ? (
                      <GoCheck className="mx-auto text-primary-blue text-[28px]" />
                    ) : row.growth === false ? (
                      <TfiClose className="mx-auto text-[#919EAB]" />
                    ) : (
                      row.growth
                    )}
                  </td>
                  <td className="py-[26px] w-1/4 px-2.5">
                    {row.pro_business === true ? (
                      <GoCheck className="mx-auto text-primary-blue text-[28px]" />
                    ) : row.pro_business === false ? (
                      <TfiClose className="mx-auto text-[#919EAB]" />
                    ) : (
                      row.pro_business
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className='text-center space-x-4'>
          <Button>Join OSI</Button>
          <Button variant={"outline"} className='border-2 border-primary-blue'>Ask a Question</Button>
        </div> */}
      </Container>
    </section>
  );
};

export default PlanComparison;
