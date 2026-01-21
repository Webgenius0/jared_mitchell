import React from "react";
import { FaBars } from "react-icons/fa";

const DashboardHeader = ({
  title,
  setOpen,
}: {
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header className="bg-white border-b h-[84px] flex justify-between items-center">
      <h3 className="text-3xl font-medium text-black">{title}</h3>

      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden w-9 md:w-10 h-8.5 md:h-9.5 cursor-pointer grid place-items-center rounded text-white bg-secondary-blue"
      >
        <FaBars className="text-xl md:text-2xl" />
      </button>
    </header>
  );
};

export default DashboardHeader;
