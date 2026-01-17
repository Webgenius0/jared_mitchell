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

const Page = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    console.log("login data", data)
    const formData = new FormData();

    formData.append("password", data?.password)
    formData.append("password_confirmation", data?.confirmPassword)

    router.push("/auth/login")
    // await loginMutation(data as any);
  };

  return (
    <AuthFlexBox title={"Welcome Back"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."}>
      <div>
        <Link href={`/auth/login`} className="absolute -top-5 left-0 flex items-center gap- text-2xl">
          <MdKeyboardArrowLeft className="size-10" />
          Back
        </Link>
        <h5 className="text-[56px] text-primary-black capitalize">Create new password</h5>
        <p className="text-secondary-black text-xl capitalize">Choose a strong password to secure your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="text-xl text-primary-black">Password*</div>
              <div>
                <PasswordInput name="password" placeholder="Password..." register={register} />
                {errors?.password && (
                  <p className="text-red-600">Password is required</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xl text-primary-black">Confirm Password*</div>
              <div>
                <PasswordInput name="confirmPassword" placeholder="Confirm Password..." register={register} />
                {errors?.confirmPassword && (
                  <p className="text-red-600">Password confirmation is required</p>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="text-center rounded-2xl custom_shadow px-6 py-3 mt-3 text-white text-xl bg-tertiary-blue w-full">Reset Password</button>
        </form>
      </div>
    </AuthFlexBox>
  );
};

export default Page;
