import { PropsWithChildren } from "react";
import { Metadata } from "next";
import localFont from "next/font/local";

import { Navbar } from "@/components";
import { Providers } from "@/providers";
import "@/styles/global.css";
import { STACKLY_APP_URL } from "@/constants";

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
  metadataBase: new URL(STACKLY_APP_URL),
  title: "Stackly | Stack crypto over time.",
  description:
    "Stackly is a simple, non-custodial tool that uses the CoW protocol to place recurring swaps based on DCA.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={stabilGrotesk.variable}>
      <body className="font-sans bg-fixed bg-surface-25 bg-auto-100 bg-matrix-and-green-gradient text-em-high">
        <Providers>
          <Navbar />
          <div className="px-4 py-12 md:py-16 mx-auto md:px-0">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
