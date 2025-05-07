import React from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useWallet } from "@/context/WalletContext";

export default function WalletButton() {
  const { connection, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = async (walletType: "metamask" | "phantom") => {
    try {
      await connectWallet(walletType);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  function copyToClipboard(text: string): void {
    if (!navigator.clipboard) {
      console.warn("Clipboard API not supported.");
      return;
    }

    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`Copied successfully`);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  }
  return (
    <div>
      {connection.address ? (
        <div className="flex flex-col items-center gap-2">
          <p
            className="flex items-center gap-2 bg-[#0062FF] dark:bg-[#59B4FF] hover:bg-transparent hover:border hover:border-[#0062FF] hover:text-[#0062FF] dark:hover:bg-[#15293A] dark:hover:border-[#59B4FF] dark:hover:text-[#59B4FF] text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
            onClick={() => copyToClipboard(String(connection.address))}
          >
            {" "}
            {`${connection.address.slice(0, 5)}...${connection.address.slice(
              connection.address.length - 5,
              connection.address.length
            )}`}
            <Copy size={14} />
          </p>
          <Button
            onClick={disconnectWallet}
            className="bg-red-500 text-white hover:bg-red-700 cursor-pointer"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => handleConnect("metamask")}
            className="bg-[#0062FF] dark:bg-[#59B4FF] hover:bg-transparent hover:border hover:border-[#0062FF] hover:text-[#0062FF] dark:hover:bg-[#15293A] dark:hover:border-[#59B4FF] dark:hover:text-[#59B4FF] text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
          >
            Connect MetaMask
          </Button>
          <Button
            onClick={() => handleConnect("phantom")}
            className="bg-[#0062FF] dark:bg-[#59B4FF] hover:bg-transparent hover:border hover:border-[#0062FF] hover:text-[#0062FF] dark:hover:bg-[#15293A] dark:hover:border-[#59B4FF] dark:hover:text-[#59B4FF] text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer"
          >
            Connect Phantom
          </Button>
        </div>
      )}
      {connection.error && <p>Error: {connection.error}</p>}
    </div>
  );
}
