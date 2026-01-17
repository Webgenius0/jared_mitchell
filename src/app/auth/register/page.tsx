"use client";
import React from "react";
import Link from "next/link";
import { useRegister } from "@/Hooks/api/auth_api";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from "react-hook-form";
import { MailSvg, UserAuthSvg } from "@/Components/Svg/SvgContainer";
import PasswordInput from "@/Components/Common/PasswordInput";
import { RegisterProps } from "@/Types/type";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })
  const { mutateAsync: registrationMutation, isPending } = useRegister();

  const onSubmit = async (data: RegisterProps) => {
    console.log("data", data)
    const formData = new FormData();

    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("password_confirm", data?.confirmPassword)

    router.push("/auth/verify-otp")
  }

  return (
    <AuthFlexBox title={"Welcome Back"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."}>
      <>
        <h5 className="text-[56px] text-primary-black capitalize">Create your account</h5>
        <p className="text-secondary-black text-xl capitalize">Join our community and start your journey</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-3">
            <div className="text-xl text-primary-black">Full Name*</div>
            <div>
              <div className="auth_input">
                <UserAuthSvg />
                <input type="text" {...register("name", { required: true })} placeholder="Type your name... " className="placeholder:text-[#364153]" />
              </div>
              {errors?.name && (
                <p className="text-red-600">Name is required</p>
              )}
            </div>

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
            <div className="text-xl text-primary-black">Password*</div>
            <div>
              <PasswordInput name="password" placeholder="Password..." register={register}/>
              {errors?.password && (
                <p className="text-red-600">Password is required</p>
              )}
            </div>
            <div className="text-xl text-primary-black">Confirm Password*</div>
            <div>
              <PasswordInput name="confirmPassword" placeholder="Confirm Password..." register={register}/>
              {errors?.confirmPassword && (
                <p className="text-red-600">Confirm Password is required</p>
              )}
            </div>
          </div>
          <div className="mt-1 text-primary-black">
            Use at least 8 characters with a mix of letters & numbers
          </div>
          <button type="submit" className="text-center rounded-2xl custom_shadow px-6 py-3 text-white text-xl bg-tertiary-blue w-full">Create Account</button>
        </form>
        <div className="h-[1px] my-5 bg-[#00000029] max-w-[482px] w-full mx-auto" />
        <p className="text-center text-lg text-secondary-black">Already have an account? <Link href={'/auth/login'} className="text-tertiary-blue font-medium hover:underline">Log in</Link></p>
      </>
    </AuthFlexBox>
  );
};

export default Register;
