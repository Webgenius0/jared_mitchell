"use client";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from "react-hook-form";
import PasswordInput from "@/Components/Common/PasswordInput";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/Hooks/api/auth_api";
import { TbLoader2 } from "react-icons/tb";
import { validateStrongPassword } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const { mutateAsync: resetPasswordMutation, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
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
        ""
      }
    >
      <div>
        <button
          onClick={() => router.back()}
          className="text-[17px] md:text-xl flex gap-0.5 md:gap-1 items-center mb-3 md:mb-5 2xl:mb-10"
        >
          <MdKeyboardArrowLeft className="text-xl md:text-2xl" /> Back
        </button>

        <h5 className="text-3xl md:text-4xl xl:text-5xl mb-2 xl:mb-3 text-primary-black capitalize">
          Create new password
        </h5>

        <p className="text-secondary-black md:text-lg xl:text-xl capitalize">
          Choose a strong password to secure your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 xl:mt-8 space-y-3"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="label">Password*</div>
              <div>
                <PasswordInput
                  name="password"
                  placeholder="Password..."
                  register={register}
                  rules={{
                    required: "Password is required",
                    validate: (value: string) =>
                      validateStrongPassword(value),
                  }}
                />
                {errors?.password && (
                  <p className="text-red-600">
                    {errors.password.message ?? "Password is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="label">Confirm Password*</div>
              <div>
                <PasswordInput
                  name="password_confirmation"
                  placeholder="Confirm Password..."
                  register={register}
                  rules={{
                    required: "Password confirmation is required",
                    validate: (value: string) =>
                      value === watch("password") ||
                      "Passwords do not match",
                  }}
                />
                {errors?.password_confirmation && (
                  <p className="text-red-600">
                    {errors.password_confirmation.message ??
                      "Password confirmation is required"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="text-center xl:text-xl rounded-xl xl:rounded-2xl custom_shadow px-6 py-2.5 xl:py-3 text-white bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
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