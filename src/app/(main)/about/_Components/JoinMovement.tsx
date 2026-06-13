import { CMSAboutJoin } from "@/Types/cms";

const JoinMovement = ({ data }: { data?: CMSAboutJoin }) => {
  return (
    <section className="pt-5 xl:pt-25 pb-10 container">
      <h2 className="section_title !mb-7 xl:!mb-10">
        {data?.title || "Join the Movement. Be Seen. Be Heard. Be Supported."}
      </h2>

      <div className="flex justify-center items-center gap-4">
        <button className="text-sm bg-primary-blue text-white border border-primary-blue rounded-full px-5 md:px-8 xl:px-12 py-2 xl:py-3 md:text-xl font-medium">
          Join OSI
        </button>

        <button className="text-sm bg-white text-[#101828] border border-[#D1D5DC] rounded-full px-5 md:px-8 xl:px-12 py-2 xl:py-3 md:text-xl font-medium">
          Become a Sponsor
        </button>
      </div>
    </section>
  );
};

export default JoinMovement;
