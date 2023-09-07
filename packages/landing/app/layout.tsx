import { Metadata } from "next";
import localFont from "next/font/local";

import { Navbar } from "@/components";
import { STACKLY_LANDING_URL } from "@/constants";
import "@/styles/global.css";

const stabilGrotesk = localFont({
  src: [
    {
      path: "./fonts/StabilGrotesk-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/StabilGrotesk-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/StabilGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--sans-font",
});

export const metadata: Metadata = {
  metadataBase: new URL(STACKLY_LANDING_URL),
  title: "Stackly | Stack crypto over time.",
  description:
    "Stackly is a simple, non-custodial tool that uses the CoW protocol to place recurring swaps based on DCA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={stabilGrotesk.variable}>
      <body className="font-sans bg-surface-25 text-em-high">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
