import type { Metadata } from "next";

"use client";
import { usePurchaseList } from "@/Hooks/api/dashboard_api";
import { useState } from "react";
import PurchaseList from "../../artist_business/purchase-list/_components/PurchaseList";

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
  title: "Purchase List - My Orders & Transactions | OSI Business Dashboard",
  description:
    "View your purchase history on OSI. Track orders, ticket purchases, vote purchases, and subscription transactions in the business dashboard of Open Spotlight Initiative.",
  robots: {
    index: false,
    follow: false,
  },
};

export default Page;
