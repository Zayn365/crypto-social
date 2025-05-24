import { Label as LabelUI } from "../ui/label";
import { cn } from "../../lib/utils";
import { ComponentProps } from "react";

interface LabelProps extends ComponentProps<typeof LabelUI> {
  className?: string;
  children?: any;
}

const Label = ({ className, children, ...props }: LabelProps) => {
  const baseClasses =
    "text-[#5F6C7D] text-[15px] font-[400] dark:text-neutral-50";

  return (
    <LabelUI className={cn(baseClasses, className)} {...props}>
      {children}
    </LabelUI>
  );
};

export default Label;
