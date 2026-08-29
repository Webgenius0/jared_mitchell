"use client";

import ShopCard from "./ShopCard";
import { FeaturedProductItem } from "@/Types/cms";
import { mapProductToCardProps } from "./product-utils";
import Container from "@/Components/Common/Container";

interface LimitedDropsProps {
  products?: FeaturedProductItem[];
  isLoading?: boolean;
}

const LimitedDropsSkeleton = () => (    <div className="container section rounded-[20px] custom_border bg-secondary-gray space-y-8">
    <h2 className="section_title">Limited Drops</h2>      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 px-6">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="pb-5 overflow-hidden custom_border custom_shadow bg-white animate-pulse"
        >
          <div className="w-full h-[378px] bg-gray-200" />
          <div className="py-4 space-y-5 px-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-10 bg-gray-200 rounded-full w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LimitedDrops = ({ products, isLoading }: LimitedDropsProps) => {
  if (isLoading) return <LimitedDropsSkeleton />;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container>
      <div className=" section rounded-[20px] custom_border bg-secondary-gray space-y-11">
        <div>
          <h2 className="section_title">Limited Drops</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:px-8 px-4">
          {products.map(product => (
            <ShopCard
              data={mapProductToCardProps(product)}
              key={product.id}
              itemKey={product.id}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LimitedDrops;
