"use client";
import Link from "next/link";
import { useRegister } from "@/Hooks/api/auth_api";
import AuthFlexBox from "../_components/AuthFlexBox";
import { useForm } from "react-hook-form";
import { MailSvg, UserAuthSvg } from "@/Components/Svg/SvgContainer";
import PasswordInput from "@/Components/Common/PasswordInput";
import { RegisterProps } from "@/Types/type";
import { useRouter } from "next/navigation";
import { TbLoader2 } from "react-icons/tb";

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>();
  const { mutateAsync: registrationMutation, isPending } = useRegister();

  const onSubmit = async (data: RegisterProps) => {
    registrationMutation(data, {
      onSuccess: (res: any) => {
        if (res?.success) {
          router.push(`/auth/verify-otp?email=${res?.data?.user?.email}`);
        }
      },
    });
  };

  return (
    <AuthFlexBox
      title={"Welcome Back"}
      description={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
      }
    >
      <>
        <h5 className="text-[56px] text-primary-black capitalize">
          Create your account
        </h5>

        <p className="text-secondary-black text-xl capitalize">
          Join our community and start your journey
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-3">
          <div className="space-y-3">
            {/* First name */}
            <div>
              <h3 className="text-xl text-primary-black mb-3">Full Name*</h3>
              <div>
                <div className="auth_input">
                  <UserAuthSvg />
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Type your name... "
                    className="placeholder:text-[#364153]"
                  />
                </div>
                {errors?.name && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-xl text-primary-black mb-3">
                Email address*
              </h3>
              <div>
                <div className="auth_input">
                  <MailSvg />
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Type your email address..."
                    className="placeholder:text-[#364153]"
                  />
                </div>
                {errors?.email && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <h3 className="text-xl text-primary-black mb-3">Password*</h3>
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

            {/* Confirm password */}
            <div>
              <h3 className="text-xl text-primary-black mb-3">
                Confirm Password*
              </h3>
              <div>
                <PasswordInput
                  name="password_confirmation"
                  placeholder="Confirm Password..."
                  register={register}
                />
                {errors?.password_confirmation && (
                  <p className="text-red-600">Confirm Password is required</p>
                )}
              </div>
            </div>

            {/* Role */}
            <div>
              <h3 className="text-xl text-primary-black mb-3">
                Choose Your Role*
              </h3>
              <div>
                <p className="border border-[#00000029] bg-[#f5f5f7] pe-3 rounded-2xl">
                  <select
                    {...register("role", { required: true })}
                    className="w-full h-full border-none outline-none capitalize py-5 px-6"
                  >
                    <option value="">Choose your role</option>
                    <option value="5">artisan</option>
                    <option value="6">member</option>
                    <option value="7">sponsor</option>
                    <option value="8">boss</option>
                  </select>
                </p>
                {errors?.role && (
                  <p className="text-red-600">Role is required</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-1 text-primary-black">
            Use at least 8 characters with a mix of letters & numbers
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="text-center rounded-2xl custom_shadow px-6 py-3 text-white text-xl bg-tertiary-blue w-full disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? (
              <span className="flex gap-2 items-center">
                <TbLoader2 className="animate-spin" /> Creating...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="h-[1px] my-5 bg-[#00000029] max-w-[482px] w-full mx-auto" />
        <p className="text-center text-lg text-secondary-black">
          Already have an account?{" "}
          <Link
            href={"/auth/login"}
            className="text-tertiary-blue font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </>
    </AuthFlexBox>
  );
};

export default Register;
