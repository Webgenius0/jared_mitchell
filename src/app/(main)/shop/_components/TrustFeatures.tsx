import Container from "@/Components/Common/Container";

const trustFeaturesData = [
  {
    id: 1,
    title: "Secure Checkout",
    description: "Your payment info is safe and encrypted",
  },
  {
    id: 2,
    title: "Instant Digital Delivery",
    description: "Get your digital products immediately",
  },
  {
    id: 3,
    title: "Community-First Purchases",
    description: "Every sale supports real people",
  },
  {
    id: 4,
    title: "Transparent Impact",
    description: "See exactly where your money goes",
  },
];

const TrustFeatures = () => {
  return (
    <section className="section">
      <Container>
        <div className="bg-white rounded-2xl custom_border pb-6 pt-15 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeaturesData?.map((data)=>(
              <div key={data.id} className="bg-secondary-gray rounded-xl px-6 py-6 custom_border">
                <h3 className="text-2xl font-semibold text-primary-black mb-2 text-center">{data.title}</h3>
                <p className="text-[21px] text-center text-[#4A5565]">{data.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xl text-[#101828] text-center my-4">Powered by OSI. Built for the culture.</p>
        </div>
      </Container>
    </section>
  );
};

export default TrustFeatures;
