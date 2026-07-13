"use client";
import { featuredShopData } from "@/Components/Data/data";
import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const SingproductId = Array.isArray(params.id) ? params.id[0] : params.id;

  const productdetails = featuredShopData.find(
    item => item?.id === SingproductId,
  );
  

  return <div>{productdetails?.title}</div>;
}
