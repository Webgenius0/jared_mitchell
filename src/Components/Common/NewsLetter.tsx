import { Button } from "@/Components/Common/Button";
import { CMSNewsletter } from "@/Types/cms";

type NewsletterProps = {
  title?: string;
  sub_title?: string;
  data?: CMSNewsletter;
};

const NewsLetter = ({ title, sub_title, data }: NewsletterProps) => {
  return (
    <section className="bg-[#F5F5F7] section mt-14">
      <div className="container space-y-8">
        <h2 className="section_title font-bold leading-[130%] max-w-[1200px] mx-auto">
          {data?.title || title}
        </h2>

        {(data?.sub_title || sub_title) && (
          <p className="section_sub_title 2xl:!my-8">{data?.sub_title || sub_title}</p>
        )}

        <form className="flex items-center justify-between max-w-[870px] w-full py-1 md:py-3 px-3 md:px-5 rounded-full bg-white mx-auto">
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full outline-none md:text-lg"
          />
          <Button>Get started now</Button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
