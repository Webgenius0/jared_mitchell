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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
      }
    >
      <div>
        <h5 className="text-[56px] text-primary-black capitalize">
          Login your account
        </h5>

        <p className="text-secondary-black text-xl capitalize">
          Sign in to continue to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-3">
            {/* Email */}
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

            {/* Password */}
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

          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 text-secondary-black cursor-pointer">
              <input type="checkbox" />
              Remember me
            </label>
            <Link
              href={"/auth/forget-password"}
              className="underline text-secondary-black font-medium"
            >
              Forget Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="text-center rounded-2xl custom_shadow px-6 py-3 text-white text-xl bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
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

        <div className="h-[1px] my-5 bg-[#00000029] max-w-[482px] w-full mx-auto" />
        <p className="text-center text-lg text-secondary-black">
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
