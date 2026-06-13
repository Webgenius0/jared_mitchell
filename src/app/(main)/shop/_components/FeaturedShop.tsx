import { featuredShopData } from "@/Components/Data/data";
import ShopCard from "./ShopCard";

const FeaturedShop = () => {
  return (
    <div className="container section rounded-[20px] custom_border bg-secondary-gray space-y-11">
      <h2 className="section_title ">
      {/* <h2 className="section_title 2xl:!text-7xl"> */}
        Featured from the OSI Shop
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-8 mt-10">
        {featuredShopData?.map((data, index) => (
          <ShopCard data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedShop;
