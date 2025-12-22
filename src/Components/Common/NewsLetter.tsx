import { Button } from "@/Components/Common/Button";

type NewsletterProps = {
  title: string;
  sub_title?: string;
};

const NewsLetter = ({ title, sub_title }: NewsletterProps) => {
  return (
    <section className="bg-[#F5F5F7] section">
      <div className="container space-y-8">
        <h2 className="section_title font-bold leading-[130%] max-w-[1200px] mx-auto">
          {title}
        </h2>

      {sub_title && <p className="section_sub_title 2xl:!my-8">{sub_title}</p>}

        <form className="flex items-center justify-between max-w-[870px] w-full py-3 px-5 rounded-full bg-white mx-auto">
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full outline-none text-lg"
          />
          <Button>Get started now</Button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
