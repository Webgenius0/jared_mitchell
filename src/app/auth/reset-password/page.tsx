"use client";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from "react-hook-form";
import PasswordInput from "@/Components/Common/PasswordInput";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/Hooks/api/auth_api";
import { TbLoader2 } from "react-icons/tb";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { mutateAsync: resetPasswordMutation, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: {
    password: string;
    password_confirmation: string;
  }) => {
    const payload = { ...data, email, token };
    await resetPasswordMutation(payload);
  };

  return (
    <AuthFlexBox
      title={"Welcome Back"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
      }
    >
      <div>
        <button
          onClick={() => router.back()}
          className="absolute -top-5 left-0 flex items-center gap- text-2xl"
        >
          <MdKeyboardArrowLeft className="size-10" />
          Back
        </button>

        <h5 className="text-[56px] text-primary-black capitalize">
          Create new password
        </h5>

        <p className="text-secondary-black text-xl capitalize">
          Choose a strong password to secure your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="text-xl text-primary-black">Password*</div>
              <div>
                <PasswordInput
                  name="password"
                  placeholder="Password..."
                  register={register}
                />
                {errors?.password && (
                  <p className="text-red-600">Password is required</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xl text-primary-black">
                Confirm Password*
              </div>
              <div>
                <PasswordInput
                  name="password_confirmation"
                  placeholder="Confirm Password..."
                  register={register}
                />
                {errors?.password_confirmation && (
                  <p className="text-red-600">
                    Password confirmation is required
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="text-center rounded-2xl custom_shadow px-6 py-3 mt-3 text-white text-xl bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? (
              <span className="flex gap-2 items-center">
                <TbLoader2 className="animate-spin" /> Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </AuthFlexBox>
  );
};

export default Page;
