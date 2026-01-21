import {
  NotificationIconSvg,
  OkaySvg,
  SearchIconSvg,
} from "@/Components/Svg/SvgContainer";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const DashboardHeader = ({
  setOpen,
  dashboardNavLinks,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardNavLinks: {
    label: string;
    path: string;
  }[];
}) => {
  const pathname = usePathname();
  const activeLink = dashboardNavLinks?.find(link => link?.path === pathname);

  return (
    <header className="border-b border-gray-200 flex justify-between items-center py-4 px-5">
      <h3 className="text-3xl font-medium text-black capitalize">
        {activeLink?.label}
      </h3>

      <div className="flex gap-3 items-center bg-white px-3 py-3.5 rounded-xl shadow">
        <button className="size-12 rounded-full grid place-items-center border border-gray-200">
          <SearchIconSvg />
        </button>

        <button className="size-12 rounded-full grid place-items-center border border-gray-200">
          <NotificationIconSvg />
        </button>

        <button className="size-12 rounded-full grid place-items-center border border-gray-200">
          <FaUser className="text-xl text-gray-500" />
        </button>

        <p className="flex flex-col">
          <span className="text-[#1D1D1F] font-semibold flex gap-1 items-center">
            Arthur Taylor
            <OkaySvg />
          </span>
          <span className="text-sm  text-gray-500">arthur@alignui.com</span>
        </p>

        <button className="self-end px-4 text-sm py-1.5 font-medium rounded-full text-primary-blue bg-[#155DFC26] capitalize">
          Pro Plan
        </button>
        <button className="self-end px-4 text-sm py-1.5 font-medium rounded-full text-[#1FC16B] bg-[#1FC16B1C] capitalize">
          Active
        </button>
      </div>

      {/* <button
        onClick={() => setOpen(!open)}
        className="xl:hidden w-9 md:w-10 h-8.5 md:h-9.5 cursor-pointer grid place-items-center rounded text-white bg-secondary-blue"
      >
        <FaBars className="text-xl md:text-2xl" />
      </button> */}
    </header>
  );
};

export default DashboardHeader;
