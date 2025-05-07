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
      className="bg-[#0062FF] dark:bg-[#59B4FF] hover:bg-transparent hover:border hover:border-[#0062FF] hover:text-[#0062FF] dark:hover:bg-[#15293A] dark:hover:border-[#59B4FF] dark:hover:text-[#59B4FF] text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
      {...props}
    >
      Create or Import Wallet
    </Button>
  );
}
