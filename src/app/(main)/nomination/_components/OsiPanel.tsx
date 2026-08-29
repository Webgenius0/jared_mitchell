import React from "react";

const OsiPanel = () => {
  // No CMS data is wired into this page — show an empty state instead of
  // fabricated round content.
  return (
    <div>
      <div className="custom_border custom_shadow bg-white p-10 sm:p-16 flex flex-col items-center text-center">
        <h4 className="text-[#101828] text-xl md:text-2xl font-medium mb-2">
          No OSI Panel Information Yet
        </h4>
        <p className="text-secondary-black text-lg max-w-md">
          The OSI panel rounds and details will appear here once they are
          published.
        </p>
      </div>
    </div>
  );
};

export default OsiPanel;
