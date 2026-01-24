import { BlueBadgeSvg, ClockSvg } from "@/Components/Svg/SvgContainer";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuCircleCheckBig } from "react-icons/lu";

const LeaderBoard = () => {
  return (
    <div>
      <div className="bg-tertiary-blue py-14 px-10 text-white space-y-6">
        <div className="flex items-center gap-4 text-[32px] font-medium">
          <IoCalendarClearOutline className="size-10" />
          Q1 2025 Timeline
        </div>
        <p className="text-2xl">
          Track the current quarter's progress and see what's happening when.
        </p>
      </div>
      <div className="py-8 px-6 rounded-2xl custom_border custom_shadow mt-[120px] mb-[40px]">
        <div className="flex gap-4 justify-between mb-6">
          <div>
            <h5 className="text-[32px] font-medium text-primary-black mb-1">
              Quarter Progress
            </h5>
            <p className="text-secondary-black text-lg">
              January 1 - March 31, 2025
            </p>
          </div>
          <div className="flex items-center px-4 py-2 gap-2 rounded-lg bg-[#EFF6FF] h-fit text-tertiary-blue text-lg">
            <ClockSvg />
            -258 days remaining
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-xl text-primary-black">
          <span>Overall Progress</span>
          <span className="text-tertiary-blue text-base">100%</span>
        </div>
        <div className="w-full h-3 bg-tertiary-blue rounded-full mt-4 mb-3" />
        <p className="text-secondary-black text-lg">Week 50 of 12</p>
      </div>
      <section className="space-y-4">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="py-8 px-6 flex gap-3 justify-between rounded-2xl border-2 border-[#00A63E] custom_shadow"
            >
              <div className="flex gap-3">
                <div className="size-[48px] flex items-center justify-center rounded-[14px] bg-[#00A63E1F]">
                  <IoCalendarClearOutline className="text-[#00A63E] size-7" />
                </div>
                <div>
                  <h5 className="text-primary-black text-[32px] font-medium mb-1">
                    Open Nominations
                  </h5>
                  <p className="text-secondary-black text-2xl">
                    Weeks 1–2 (2 Weeks Total)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#0082361F] text-[#00A63E] text-lg h-fit">
                <LuCircleCheckBig className="size-6" />
                Completed
              </div>
            </div>
          ))}
      </section>
      <section className="section">
        <div className="py-[60px] px-6 custom_border custom_shadow rounded-2xl">
          <h5 className="text-primary-black text-[32px] font-medium mb-6">
            Key Dates
          </h5>
          <div>
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="py-[32px] flex gap-3 border-b border-neutral-200"
                >
                  <IoCalendarClearOutline className="text-tertiary-blue size-6" />
                  <div>
                    <h6 className="text-primary-black text-2xl font-medium mb-1">
                      January 1, 2025
                    </h6>
                    <p className="text-xl text-primary-black">
                      Q1 quarter begins, nominations open
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="py-[60px] px-6 rounded-xl custom_border custom_shadow bg-[#EFF6FF]">
        <h5 className="text-primary-black text-2xl font-medium mb-4">
          What Happens After the Winner is Announced?
        </h5>
        <div className="space-y-3">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xl text-secondary-black"
              >
                <BlueBadgeSvg />
                Winner receives professional media coverage and photography
              </div>
            ))}
        </div>
      </section>
      <section className="section">
        <h5 className="text-[32px] text-[#101828] font-semibold">
          2025 Quarterly Cycle
        </h5>
        <div className="mt-[44px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="py-[30px] bg-[#F5F5F7] px-7 rounded-xl custom_border custom_shadow flex flex-col gap-7"
              >
                <div>
                  <h6 className="text-primary-black text-2xl font-semibold mb-1">
                    Q1 2025
                  </h6>
                  <p className="text-secondary-black text-lg">Jan 1 - Mar 31</p>
                </div>
                <div className="py-2 px-4 bg-tertiary-blue rounded-lg inline-flex w-fit items-center gap-2 text-white text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.9987 5.83301C8.89363 5.83301 7.83382 6.27199 7.05242 7.0534C6.27102 7.8348 5.83203 8.89461 5.83203 9.99967C5.83203 11.1047 6.27102 12.1646 7.05242 12.946C7.83382 13.7274 8.89363 14.1663 9.9987 14.1663C11.1038 14.1663 12.1636 13.7274 12.945 12.946C13.7264 12.1646 14.1654 11.1047 14.1654 9.99967C14.1654 8.89461 13.7264 7.8348 12.945 7.0534C12.1636 6.27199 11.1038 5.83301 9.9987 5.83301Z"
                      fill="white"
                    />
                  </svg>
                  Active Now
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default LeaderBoard;
