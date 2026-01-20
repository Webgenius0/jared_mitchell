import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";

const BecomeAPart = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section_title max-w-[1300px] mx-auto">
          Become part of a growing network that celebrates art, business, and
          community.
        </h2>
        <div className="text-center mt-10 space-x-4">
          <Button>Join OSI</Button>
          <Button variant={"outline"}>Become a Sponsor</Button>
        </div>
      </Container>
    </section>
  );
};

export default BecomeAPart;
