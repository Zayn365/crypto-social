import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AppKitProvider } from "@/context/WalletContext";
// import localFont from "next/font/local";
// import { WalletProvider } from "@/context/WalletContext";

export const metadata: Metadata = {
  title: "Crypto Social",
  description: "Crypto Social",
};

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${jetBrainsMono.variable} suppressHydrationWarning`}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <AppKitProvider>
            {/* <WalletProvider> */}
            <div className="dark:bg-[#040609]">{children}</div>
            <Toaster />
            {/* </WalletProvider> */}
          </AppKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
