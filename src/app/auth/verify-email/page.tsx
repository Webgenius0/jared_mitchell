"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useRouter } from "next/navigation";

type OtpForm = {
  otp: string[];
};

const OTP_LENGTH = 4;

const Page = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<OtpForm>({
    defaultValues: {
      otp: Array(OTP_LENGTH).fill(""),
    },
  });

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const otpValues = watch("otp");

  const onSubmit = (data: OtpForm) => {
    const otpCode = data.otp.join("");
    console.log("OTP:", otpCode);

    router.push("/auth/reset-password")
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setValue(`otp.${index}`, value);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasteData)) return;

    pasteData.split("").forEach((char, index) => {
      setValue(`otp.${index}`, char);
      inputsRef.current[index]?.focus();
    });
  };

  return (
    <AuthFlexBox
      title="Welcome Back"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div>
        <Link
          href="/auth/login"
          className="absolute -top-5 left-0 flex items-center text-2xl"
        >
          <MdKeyboardArrowLeft className="size-10" />
          Back
        </Link>

        <h5 className="text-[56px] text-primary-black capitalize">
          Verify your email
        </h5>
        <p className="text-secondary-black text-xl">
          We’ve sent a verification code to your email
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          <div className="grid grid-cols-4 justify-center gap-4">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                {...register(`otp.${index}`)}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="h-[68px] rounded-xl border border-gray-300 text-center text-2xl font-semibold outline-none focus:border-tertiary-blue focus:ring-2 focus:ring-tertiary-blue/30"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-tertiary-blue py-4 text-xl text-white custom_shadow">
            Verify
          </button>
        </form>

        <div className="h-[1px] my-6 bg-[#00000029] max-w-[482px] mx-auto" />

        <p className="text-center text-lg text-secondary-black">
          Didn&apos;t receive code?{" "}
          <button
            className="text-tertiary-blue font-medium hover:underline"
          >
            Resend Now
          </button>
        </p>
      </div>
    </AuthFlexBox>
  );
};

export default Page;
