"use client";
import Container from "@/Components/Common/Container";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { CMSBossBeginningsSection5 } from "@/Types/cms";

const CREATE_BUSINESS_URL = "/dashboard/boss_beginning/business/create-business";

interface NewBusinessProps {
  data: CMSBossBeginningsSection5;
}

const NewBusiness = ({ data }: NewBusinessProps) => {
  const { token } = useAuth();
  const router = useRouter();

  const handleNominate = () => {
    if (token) {
      router.push(CREATE_BUSINESS_URL);
    } else {
      toast.error("Please login to submit a nomination");
      router.push(
        `/auth/login?redirect=${encodeURIComponent(CREATE_BUSINESS_URL)}`,
      );
    }
  };

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
          <button
            onClick={handleNominate}
            className="inline-flex items-center justify-center w-full sm:w-auto py-3.5 px-8 sm:px-[67px] bg-primary-blue text-white rounded-full text-base sm:text-lg lg:text-xl font-medium cursor-pointer hover:opacity-90 transition-opacity"
          >
            Submit a Nomination
          </button>
        </div>
      </Container>
    </section>
  );
};

export default NewBusiness;
