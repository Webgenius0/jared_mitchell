// import React from "react";
// import { cn } from "@/lib/utils";

// type ButtonProps = {
//   text: string;
//   className?: string;
//   animation?: boolean;
//   onClick?: () => void;
//   type?: "reset" | "submit";
//   variant?: "primary_btn" | "secondary_btn";
// };

// const Button: React.FC<ButtonProps> = ({
//   type,
//   text,
//   onClick,
//   className,
//   animation = true,
//   variant = "primary_btn",
//   ...props
// }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       data-aos={animation ? "fade-up" : undefined}
//       className={cn(
//         "text-black text-lg font-bold", // Default/Common Class
//         variant === "primary_btn" && "text-red-500",
//         variant === "secondary_btn" && "text-green-500",
//         className
//       )}
//       {...props}
//     >
//       {text}
//     </button>
//   );
// };

// export default Button;

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center gap-2 tracking-wide justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-blue text-white border border-primary-blue hover:bg-primary-blue/95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "text-primary-blue border border-[#D1D5DC] hover:border-primary-blue bg-background",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-2 rounded-full text-lg",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-9 rounded-full px-3",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
