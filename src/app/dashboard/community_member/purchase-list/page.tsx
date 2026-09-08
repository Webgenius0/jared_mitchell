import type { Metadata } from "next";
import PurchaseList from "../../boss_beginning/purchase-list/page";

export const metadata = {
  title: "Purchase List - My Orders & Transactions | OSI Community Dashboard",
  description:
    "View your purchase history on OSI as a community member. Track orders, ticket purchases, vote purchases, and transactions in the Open Spotlight Initiative.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <PurchaseList />;
};

export default page;
