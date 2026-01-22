import { IoCalendarClearOutline } from "react-icons/io5";

const LeaderBoard = () => {
  return (
    <div>
      <div className="bg-tertiary-blue py-14 px-10 text-white space-y-6">
        <div className="flex items-center gap-4 text-[32px] font-medium">
          <IoCalendarClearOutline className="size-10"/>
          Q1 2025 Timeline
        </div>
        <p className="text-2xl">Track the current quarter's progress and see what's happening when.</p>
      </div>
    </div>
  );
};

export default LeaderBoard;
