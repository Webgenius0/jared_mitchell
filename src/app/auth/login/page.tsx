"use client";
import { useLogin } from "@/Hooks/api/auth_api";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from "react-hook-form";
import { MailSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import PasswordInput from "@/Components/Common/PasswordInput";
import { LoginProps } from "@/Types/type";
import { TbLoader2 } from "react-icons/tb";

const Login = () => {
  const { mutateAsync: loginMutation, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    await loginMutation(data);
  };

  return (
    <AuthFlexBox
      title={"Welcome Back"}
      description={
        ""
      }
    >
      <div>
        <h5 className="text-3xl md:text-4xl xl:text-5xl mb-2 xl:mb-3 text-primary-black capitalize">
          Login your account
        </h5>

        <p className="text-secondary-black md:text-lg xl:text-xl capitalize">
          Sign in to continue to your account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 xl:mt-8 space-y-3"
        >
          <div className="space-y-3">
            {/* Email */}
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

            {/* Password */}
            <div className="label">Password*</div>
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

          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 text-secondary-black cursor-pointer">
              <input type="checkbox" />
              Remember me
            </label>
            <Link
              href={"/auth/forget-password"}
              className="underline text-secondary-black font-medium text-sm md:text-base"
            >
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="text-center xl:text-xl rounded-xl xl:rounded-2xl custom_shadow px-6 py-2.5 xl:py-3 text-white bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? (
              <span className="flex gap-2 items-center">
                <TbLoader2 className="animate-spin" /> Logging in...
              </span>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="h-[1px] my-3 xl:my-5 bg-[#00000029] max-w-[482px] w-full mx-auto" />
        <p className="text-center md:text-lg text-secondary-black">
          Don’t have an account?{" "}
          <Link
            href={"/auth/register"}
            className="text-tertiary-blue font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthFlexBox>
  );
};

export default Login;
