import DigitalResources from './_components/DigitalResources';
import FeaturedShop from './_components/FeaturedShop';
import IconSection from './_components/IconSection';
import LimitedDrops from './_components/LimitedDrops';
import PurchaseSupports from './_components/PurchaseSupports';

const page = () => {
  return (
    <>
      <IconSection />
      <FeaturedShop />
      <PurchaseSupports />
      <DigitalResources />
      <LimitedDrops />
    </>
  );
};

export default page;