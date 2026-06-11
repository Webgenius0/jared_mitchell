import SponsorSlider from "@/Components/Common/SponsorSlider";
import { sponsorsData } from "@/Components/Data/data";
import { CMSPartner } from "@/Types/cms";

const Sponsors = ({ data }: { data?: CMSPartner }) => {
  const logos =
    data?.metadata?.map((m, i) => ({
      id: i + 1,
      image: m.image,
      link: m.link,
    })) || sponsorsData;

  return (
    <section className="section">
      <h2 className="section_title container">
        {data?.title || "Powered by our community partners"}
      </h2>

      <div className="xl:space-y-5 md:mt-5 xl:mt-10">
        <SponsorSlider logos={logos} />
        <SponsorSlider logos={logos} reverse={true} />
      </div>

      {/* <div className="text-center mt-8">
        <Button>
          Become a Sponsor
          <FaArrowRightLong />
        </Button>
      </div> */}
    </section>
  );
};

export default Sponsors;
