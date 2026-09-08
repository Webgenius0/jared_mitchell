import type { Metadata } from "next";
import VotePurchase from "../../boss_beginning/vote-purchase/page";

const page = () => {
  return <VotePurchase />;
};

export const metadata = {
  title: "Vote Purchase - Support Your Spotlight | OSI Artist Dashboard",
  description:
    "Purchase support votes for your artist spotlight on OSI. Buy vote packages to increase your visibility and compete in the Open Spotlight Initiative community.",
  robots: {
    index: false,
    follow: false,
  },
};

export default page;
