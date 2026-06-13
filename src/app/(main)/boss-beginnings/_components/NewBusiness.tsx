import Container from "@/Components/Common/Container";
import Link from "next/link";
import { CMSBossBeginningsSection5 } from "@/Types/cms";

interface NewBusinessProps {
  data: CMSBossBeginningsSection5;
}

const NewBusiness = ({ data }: NewBusinessProps) => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title ">
          {data?.title ?? "Know a New Business That Deserves Recognition?"}
        </h2>
        <p className="section_sub_title">
          {data?.description ??
            "Nominate an entrepreneur in our community who is launching a new business and deserves to be celebrated."}
        </p>
        <div className="text-center mt-9">
          <Link
            href="/nomination"
            className="py-3.5 px-[67px] bg-primary-blue text-white rounded-full text-xl font-medium"
          >
            Submit a Nomination
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NewBusiness;
