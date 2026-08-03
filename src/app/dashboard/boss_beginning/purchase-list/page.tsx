"use client";
import { usePurchaseList } from "@/Hooks/api/dashboard_api";
import PurchaseList from "../../artist_business/purchase-list/_components/PurchaseList";

const Page = () => {
  const { data: purchaseList, isLoading } = usePurchaseList();
  return <PurchaseList data={purchaseList?.data} isLoading={isLoading} />;
};

export default Page;
