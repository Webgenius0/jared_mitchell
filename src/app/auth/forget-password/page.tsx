"use client";
import React from "react";
import { useLogin } from "@/Hooks/api/auth_api";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from 'react-hook-form'
import { MailSvg } from "@/Components/Svg/SvgContainer";
import Link from "next/link";
import PasswordInput from "@/Components/Common/PasswordInput";
import { LoginProps } from "@/Types/type";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = async (data: { email: string }) => {
    console.log(data)
    const formData = new FormData();

    formData.append("email", data?.email)

    router.push("/auth/verify-email")

  };

  return (
    <AuthFlexBox title={"Welcome Back"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."}>
      <div className="my-auto">
        <Link href={`/auth/login`} className="absolute -top-5 left-0 flex items-center gap- text-2xl">
          <MdKeyboardArrowLeft className="size-10" />
          Back
        </Link>
        <h5 className="text-[56px] text-primary-black capitalize">Forget Password</h5>
        <p className="text-secondary-black text-xl capitalize">No worries, we’ll help you reset it</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-3">
            <div className="text-xl text-primary-black">Email address*</div>
            <div>

              <div className="auth_input">
                <MailSvg />
                <input type="text" {...register("email", { required: true })} placeholder="Type your email address..." className="placeholder:text-[#364153]" />
              </div>
              {errors?.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>
          </div>
          <button type="submit" className="text-center rounded-2xl custom_shadow px-6 mt-3 py-3 text-white text-xl bg-tertiary-blue w-full">Send Reset Link</button>
        </form>
      </div>
    </AuthFlexBox>
  );
};

export default Login;
