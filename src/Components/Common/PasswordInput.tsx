import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeCloseSvg, PasswordSvg } from "../Svg/SvgContainer";
import { IoEyeOutline } from "react-icons/io5";


const PasswordInput = ({ name, placeholder }: { name: string, placeholder: string }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register } = useForm()

  return (
    <div className="auth_input relative flex items-center">
      <PasswordSvg />

      <input
        type={showPassword ? "text" : "password"}
        {...register(name)}
        placeholder={placeholder}
        className="placeholder:text-[#364153] w-full pr-10"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3"
        aria-label="Toggle password visibility"
      >
        {showPassword ? <IoEyeOutline className="size-6"/> : <EyeCloseSvg />}
      </button>
    </div>
  );
};

export default PasswordInput;
