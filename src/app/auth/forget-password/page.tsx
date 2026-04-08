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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
      }
    >
      <div className="my-auto">
        <button
          onClick={() => router.back()}
          className="absolute -top-5 left-0 flex items-center gap- text-2xl"
        >
          <MdKeyboardArrowLeft className="size-10" />
          Back
        </button>
        <h5 className="text-[56px] text-primary-black capitalize">
          Forget Password
        </h5>
        <p className="text-secondary-black text-xl capitalize">
          No worries, we’ll help you reset it
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-3">
            <div className="text-xl text-primary-black">Email address*</div>
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
            className="text-center rounded-2xl custom_shadow px-6 mt-3 py-3 text-white text-xl bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
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
