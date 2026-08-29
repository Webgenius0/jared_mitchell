"use client";

const Voting = () => {
  // No live contest data is wired into this page — show an empty state
  // instead of fabricated rounds and a fake leaderboard.
  return (
    <div>
      <div className="custom_border custom_shadow bg-white p-10 sm:p-16 flex flex-col items-center text-center">
        <h4 className="text-[#101828] text-xl md:text-2xl font-medium mb-2">
          No Voting Round Available
        </h4>
        <p className="text-secondary-black text-lg max-w-md">
          Voting rounds and leaderboards will appear here once the contest
          season is live.
        </p>
      </div>
    </div>
  );
};

export default Voting;
