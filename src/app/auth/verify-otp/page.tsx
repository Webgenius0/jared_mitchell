"use client";
import { useForm, Controller } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useRouter, useSearchParams } from "next/navigation";
import OTPInput from "react-otp-input";
import {
  useOtpVerification,
  useResendOtp,
  useVerifyEmail,
  useVerifyOtp,
} from "@/Hooks/api/auth_api";
import { TbLoader2 } from "react-icons/tb";

type OtpForm = {
  otp: string;
};

const OTP_LENGTH = 4;

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  const { mutateAsync: otpVerificationMutation, isPending } =
    useOtpVerification();
  const { mutateAsync: verifyOtp, isPending: isSending } = useVerifyOtp();
  const { mutate: resendOtpMutation, isPending: isResending } = useResendOtp();
  const { mutate: sendOtpMutation, isPending: isProcessing } = useVerifyEmail();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>();

  const onSubmit = async (data: OtpForm) => {
    const payload = { ...data, email };

    if (type === "create_account") {
      return await otpVerificationMutation(payload);
    }

    return await verifyOtp(payload, {
      onSuccess: (res: any) => {
        if (res?.success) {
          router.push(
            `/auth/reset-password?email=${email}&token=${res?.data?.reset_token}`,
          );
        }
      },
    });
  };

  return (
    <AuthFlexBox
      title="Welcome Back"
      description=""
    >
      <div>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-[17px] md:text-xl flex gap-0.5 md:gap-1 items-center mb-3 md:mb-5 2xl:mb-10"
        >
          <MdKeyboardArrowLeft className="text-xl md:text-2xl" /> Back
        </button>

        {/* Heading */}
        <h5 className="text-3xl md:text-4xl xl:text-5xl mb-2 xl:mb-3 text-primary-black capitalize">
          Verify your email
        </h5>
        <p className="text-secondary-black md:text-lg xl:text-xl capitalize">
          We’ve sent a verification code to your email {email}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 xl:mt-8 space-y-6"
        >
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
            disabled={isPending || isSending}
            className="text-center xl:text-xl rounded-xl xl:rounded-2xl custom_shadow px-6 py-2.5 xl:py-3 text-white bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending || isSending ? (
              <span className="flex gap-2 items-center">
                <TbLoader2 className="animate-spin" /> Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="h-[1px] my-3 xl:my-5 bg-[#00000029] max-w-[482px] mx-auto" />

        <p className="text-center md:text-lg text-secondary-black">
          Didn&apos;t receive code?{" "}
          <button
            disabled={isResending || isProcessing}
            onClick={() => {
              if (type === "create_account") {
                return resendOtpMutation({ email });
              }
              sendOtpMutation({ email });
            }}
            className="text-tertiary-blue font-medium enabled:hover:underline disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isResending || isProcessing ? "Resending..." : "Resend Now"}
          </button>
        </p>
      </div>
    </AuthFlexBox>
  );
};

export default Page;
