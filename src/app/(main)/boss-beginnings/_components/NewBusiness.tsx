import Container from "@/Components/Common/Container";
import Link from "next/link";

const NewBusiness = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title 2xl:!text-[76px]">
          Know a New Business That Deserves Recognition?
        </h2>
        <p className="section_sub_title">
          Nominate an entrepreneur in our community who is launching a new
          business and deserves to be celebrated.
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
