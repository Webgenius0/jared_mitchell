"use client";
import { usePurchaseList } from "@/Hooks/api/dashboard_api";
import { useState } from "react";
import PurchaseList from "../../artist_business/purchase-list/_components/PurchaseList";

const Page = () => {
  const [page, setPage] = useState(1);
  const { data: purchaseList, isLoading } = usePurchaseList({
    page,
    per_page: 1,
  });

  return (
    <PurchaseList
      data={purchaseList?.data}
      isLoading={isLoading}
      setPage={setPage}
    />
  );
};

export default Page;
