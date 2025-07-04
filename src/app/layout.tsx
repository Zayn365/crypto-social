import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AppKitProvider } from "@/context/WalletContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import Footer from "@/components/common/Footer";

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
    <html lang="en" className="dark">
      <body className={`${jetBrainsMono.variable} suppressHydrationWarning`}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" enableSystem={false}>
              <AppKitProvider>
                <div className="dark:bg-[#1d1c34] flex justify-center">
                  <div className="max-w-[1300px] w-full">
                    {children}
                    <Footer />
                  </div>
                </div>
                <Toaster />
              </AppKitProvider>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
