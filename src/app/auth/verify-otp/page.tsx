"use client";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useRouter, useSearchParams } from "next/navigation";
import OTPInput from "react-otp-input";

type OtpForm = {
  otp: string;
};

const OTP_LENGTH = 4;

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>();

  const onSubmit = (data: OtpForm) => {
    const payload = { ...data, email };
  };

  return (
    <AuthFlexBox
      title="Welcome Back"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div>
        {/* Back Button */}
        <Link
          href="/auth/login"
          className="absolute -top-5 left-0 flex items-center text-2xl"
        >
          <MdKeyboardArrowLeft className="size-10" />
          Back
        </Link>

        {/* Heading */}
        <h5 className="text-[56px] text-primary-black capitalize">
          Verify your email
        </h5>
        <p className="text-secondary-black text-xl">
          We’ve sent a verification code to your email {email}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* OTP Input */}
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: {
                value: OTP_LENGTH,
                message: "OTP must be 4 digits",
              },
            }}
            render={({ field }) => (
              <OTPInput
                {...field}
                value={field.value || ""}
                onChange={field.onChange}
                numInputs={OTP_LENGTH}
                shouldAutoFocus
                inputType="tel"
                renderInput={props => <input {...props} />}
                containerStyle="flex justify-center gap-4"
                inputStyle={`
                  !w-full
                  !h-[68px]
                  rounded-xl
                  border border-gray-300
                  text-center
                  text-2xl
                  font-semibold
                  outline-none
                  focus:border-tertiary-blue
                  focus:ring-2
                  focus:ring-tertiary-blue/30
                `}
              />
            )}
          />

          {/* Error */}
          {errors.otp && (
            <p className="text-red-500 text-sm text-center">
              {errors.otp.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-tertiary-blue py-4 text-xl text-white custom_shadow"
          >
            Verify
          </button>
        </form>

        {/* Divider */}
        <div className="h-[1px] my-6 bg-[#00000029] max-w-[482px] mx-auto" />

        {/* Resend */}
        <p className="text-center text-lg text-secondary-black">
          Didn&apos;t receive code?{" "}
          <button className="text-tertiary-blue font-medium hover:underline">
            Resend Now
          </button>
        </p>
      </div>
    </AuthFlexBox>
  );
};

export default Page;
