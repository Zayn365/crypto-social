import { Input as InputUI } from "../ui/input";
import { cn } from "../../lib/utils"; // Assuming cn utility from Shadcn for className merging
import { ComponentProps, ReactNode } from "react";

interface InputProps extends ComponentProps<typeof InputUI> {
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  startIconClassName?: string;
  endIconClassName?: string;
  onEndIconClick?: (event: any) => void;
}

const InputWithIcons = ({
  className,
  startIcon,
  endIcon,
  startIconClassName,
  endIconClassName,
  onEndIconClick,
  ...props
}: InputProps) => {
  const baseClasses =
"border border-[#2a323b7e] text-[14px] text-[#5F6C7D] placeholder:text-[#5F6C7D] dark:bg-[#13151A] rounded-full";

  return (
    <div className="relative flex items-center px-2 w-full">
      {startIcon && (
        <div
          className={cn(
            "absolute left-5 top-2 text-[#5F6C7D]",
            startIconClassName
          )}
        >
          {startIcon}
        </div>
      )}
      <InputUI
        className={cn(baseClasses, className, {
          "pl-12": startIcon,
          "pr-12": endIcon,
        })}
        {...props}
      />
      {endIcon && (
        <div
          className={cn(
            "absolute right-5 top-2 text-[#5F6C7D]",
            endIconClassName
          )}
          onClick={onEndIconClick}
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default InputWithIcons;