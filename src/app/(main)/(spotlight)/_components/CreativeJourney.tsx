import Container from "@/Components/Common/Container";
import { LikeSvg, ShareSvg } from "@/Components/Svg/SvgContainer";
import Image from "next/image";
import { CMSArtistSpotlightInterview } from "@/Types/cms";

const CreativeJourney = ({ data }: { data?: CMSArtistSpotlightInterview }) => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title">{data?.title || "Behind the Creative Journey"}</h2>
        <p className="section_sub_title">
          {data?.sub_title || "Celebrating our community's achievements and creative milestones"}
        </p>
        <div className="max-w-[1048px] w-full mx-auto rounded-xl custom_border custom_shadow bg-white space-y-8 p-5 md:p-[30px]">
          <figure className="w-full h-[300px] md:h-[400px]">
            <Image
              src={data?.image || "/spotlight/artist-pick-img.jpg"}
              width={988}
              height={400}
              alt=""
              className="size-full object-cover rounded-3xl"
            />
          </figure>
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold max-w-[600px] text-left">
              {data?.metadata?.card_title || "Artist Interview: Behind the Creative Journey"}
            </h3>
            <p className="text-lg md:text-2xl xl:text-3xl text-[#909090]">
              {data?.description || `GO deeper into the stories behind the artists. Hear firsthand
              perspectives on creativity, challenges, culture, and the
              inspiration that drives their work.`}
            </p>
            {!data?.description && (
              <ul className="text-lg md:text-2xl xl:text-3xl font-medium list-disc ml-8">
                <li>Early inspirations</li>
                <li>Defining creative challenges</li>
                <li>Their "why" as an artist</li>
                <li>The role of community</li>
                <li>Their message to future creators</li>
              </ul>
            )}
          </div>
          <div className="px-5 md:px-[120px] py-4 flex justify-between items-start self-stretch rounded-[42px] custom_border">
            <LikeSvg size={38} />
            <ShareSvg size={38} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreativeJourney;
