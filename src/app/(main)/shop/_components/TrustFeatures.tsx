import Container from "@/Components/Common/Container";
import { CMSShopPageFooterFeatures } from "@/Types/cms";

const fallbackData = [
  {
    title: "Secure Checkout",
    description: "Your payment info is safe and encrypted",
  },
  {
    title: "Instant Digital Delivery",
    description: "Get your digital products immediately",
  },
  {
    title: "Community-First Purchases",
    description: "Every sale supports real people",
  },
  {
    title: "Transparent Impact",
    description: "See exactly where your money goes",
  },
];

interface TrustFeaturesProps {
  data?: CMSShopPageFooterFeatures;
}

const TrustFeatures = ({ data }: TrustFeaturesProps) => {
  const items = data?.metadata?.length ? data.metadata : fallbackData;

  return (
    <section className="section">
      <Container>
        <div className="bg-white rounded-2xl custom_border pb-6 pt-15 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-secondary-gray rounded-xl px-6 py-6 custom_border"
              >
                <h3 className="text-2xl font-semibold text-primary-black mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-[21px] text-center text-[#4A5565]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xl text-[#101828] text-center my-4">
            {data?.sub_title ?? "Powered by OSI. Built for the culture."}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default TrustFeatures;
