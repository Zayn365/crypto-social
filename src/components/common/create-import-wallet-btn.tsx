import React from "react";
import { Button } from "../ui/button";

type CreateImportWalletBtnProps = React.ComponentProps<typeof Button> & {
  handleClick?: () => void;
};

export default function CreateImportWalletBtn({
  handleClick,
  ...props
}: CreateImportWalletBtnProps) {
  return (
    <Button
      onClick={handleClick}
      className="bg-[#32bd91] dark:bg-[#32bd91] hover:bg-transparent hover:border hover:border-[#32bd91] hover:text-[#32bd91] dark:hover:bg-[#15293A] dark:hover:border-[#32bd91] dark:hover:text-[#32bd91] text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
      {...props}
    >
      Create or Import Wallet
    </Button>
  );
}
