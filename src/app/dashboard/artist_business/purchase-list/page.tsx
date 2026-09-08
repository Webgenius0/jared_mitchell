import type { Metadata } from "next";

"use client";
import { usePurchaseList } from "@/Hooks/api/dashboard_api";
import PurchaseList from "./_components/PurchaseList";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const { data: purchaseList, isLoading } = usePurchaseList({
    page,
    per_page: 10,
  });

  return (
    <PurchaseList
      data={purchaseList?.data}
      isLoading={isLoading}
      setPage={setPage}
    />
  );
};

export const metadata = {
  title: "Purchase List - My Orders & Transactions | OSI Artist Dashboard",
  description:
    "View your purchase history on OSI. Track orders, ticket purchases, vote purchases, and subscription transactions in the artist dashboard of Open Spotlight Initiative.",
  robots: {
    index: false,
    follow: false,
  },
};

export default Page;
