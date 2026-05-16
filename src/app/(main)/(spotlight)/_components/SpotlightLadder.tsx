import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const SpotlightLadder = ({
  title,
  subTitle,
  buttonHref,
  data
}: {
  title: string;
  subTitle: string;
  buttonHref: string;
  data?: any;
}) => {
  return (
    <section className="section bg-primary-gray">
      <Container>
        <h2 className="section_title">{title}</h2>
        <p className="section_sub_title">{subTitle}</p>
        <div className="text-center mt-10">
          <Button asChild size="xl">
            <Link href={buttonHref}>
              Explore Spotlight Ladder
              <BsArrowRight className="text-2xl" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default SpotlightLadder;
