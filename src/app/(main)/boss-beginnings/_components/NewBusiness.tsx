"use client";
import Container from "@/Components/Common/Container";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { CMSBossBeginningsSection5 } from "@/Types/cms";
import { isBusinessUser } from "@/lib/utils";
import { isUserSubscribed } from "@/Hooks/api/subscription_api";

const CREATE_BUSINESS_URL = "/dashboard/boss_beginning/business/create-business";

interface NewBusinessProps {
  data: CMSBossBeginningsSection5;
}

const NewBusiness = ({ data }: NewBusinessProps) => {
  const { token, user } = useAuth();
  const router = useRouter();

  const isBusiness = isBusinessUser(user);
  // Logged-in non-business accounts are not allowed to submit nominations.
  const restricted = Boolean(token) && !isBusiness;

  const handleNominate = () => {
    if (!token) {
      toast.error("Please login to submit a nomination");
      router.push(
        `/auth/login?redirect=${encodeURIComponent(CREATE_BUSINESS_URL)}`,
      );
      return;
    }
    if (!isBusiness) {
      toast.error("Only business accounts can submit a nomination");
      return;
    }
    if (!isUserSubscribed(user)) {
      toast.error(
        "An active subscription is required to submit a nomination",
      );
      router.push("/pricing");
      return;
    }
    router.push(CREATE_BUSINESS_URL);
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
            title={
              restricted
                ? "Only business accounts can submit a nomination"
                : undefined
            }
            className={`inline-flex items-center justify-center w-full sm:w-auto py-3.5 px-8 sm:px-[67px] bg-primary-blue text-white rounded-full text-base sm:text-lg lg:text-xl font-medium transition-opacity ${
              restricted
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90"
            }`}
          >
            Submit a Nomination
          </button>
        </div>
      </Container>
    </section>
  );
};

export default NewBusiness;
