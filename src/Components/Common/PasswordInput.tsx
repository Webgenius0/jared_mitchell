import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { PasswordSvg } from "../Svg/SvgContainer";
import { IoEyeOutline } from "react-icons/io5";
import { VscEyeClosed } from "react-icons/vsc";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
};

const PasswordInput = <T extends FieldValues>({
  name,
  placeholder,
  register,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth_input relative flex items-center">
      <PasswordSvg />

      <input
        type={showPassword ? "text" : "password"}
        {...register(name, { required: true })}
        placeholder={placeholder}
        className="placeholder:text-[#364153] w-full pr-10"
      />

      <button
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
        className="absolute right-3"
        aria-label="Toggle password visibility"
      >
        {showPassword ? (
          <IoEyeOutline className="size-5 xl:size-6" />
        ) : (
          <VscEyeClosed className="size-5 xl:size-6" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
