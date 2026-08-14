"use client";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from "react-hook-form";
import { MailSvg } from "@/Components/Svg/SvgContainer";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/Hooks/api/auth_api";
import { TbLoader2 } from "react-icons/tb";

const page = () => {
  const router = useRouter();
  const { mutateAsync: verifyEmailMutation, isPending } = useVerifyEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    await verifyEmailMutation(data, {
      onSuccess: (res: any) => {
        if (res?.success) {
          router.push(
            `/auth/verify-otp?email=${res?.data?.email}&type=${"forget_pass"}`,
          );
        }
      },
    });
  };

  return (
    <AuthFlexBox
      title={"Welcome Back"}
      description={
        ""
      }
    >
      <div className="my-auto">
        <button
          onClick={() => router.back()}
          className="text-[17px] md:text-xl flex gap-0.5 md:gap-1 items-center mb-3 md:mb-5 2xl:mb-10"
        >
          <MdKeyboardArrowLeft className="text-xl md:text-2xl" /> Back
        </button>

        <h5 className="text-3xl md:text-4xl xl:text-5xl mb-2 xl:mb-3 text-primary-black capitalize">
          Forget Password
        </h5>

        <p className="text-secondary-black md:text-lg xl:text-xl capitalize">
          No worries, we’ll help you reset it
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 xl:mt-8 space-y-3"
        >
          <div className="space-y-3">
            <div className="label">Email address*</div>
            <div>
              <div className="auth_input">
                <MailSvg />
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="Type your email address..."
                  className="placeholder:text-[#364153]"
                />
              </div>
              {errors?.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="text-center xl:text-xl rounded-xl xl:rounded-2xl custom_shadow px-6 py-2.5 xl:py-3 text-white bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? (
              <span className="flex gap-2 items-center">
                <TbLoader2 className="animate-spin" /> Sending...
              </span>
            ) : (
              " Send OTP"
            )}
          </button>
        </form>
      </div>
    </AuthFlexBox>
  );
};

export default page;
