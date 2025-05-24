import { Input as InputUI } from "../ui/input";
import { cn } from "../../lib/utils"; // Assuming cn utility from Shadcn for className merging
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<typeof InputUI> {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  const baseClasses =
    "border border-[#2a323b7e] text-[14px] text-[#5F6C7D] placeholder:text-[#5F6C7D] dark:bg-[#13151A] rounded-md";

  return <InputUI className={cn(baseClasses, className)} {...props} />;
};

export default Input;
