import { CMSFeature } from "@/Types/cms";

const Features = ({ data }: { data?: CMSFeature }) => {
  return (
    <section className="section container">
      <h2 className="section_title md:font-bold 2xl:text-7xl max-w-[768px] mx-auto">
        {data?.title || "This is where your membership delivers real value."}
      </h2>

      <p className="text-gray-500 text-xl text-center">
        {data?.description || "Not features — but consistent visibility, credibility, and support working together."}
      </p>
    </section>
  );
};

export default Features;
