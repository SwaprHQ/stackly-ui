import localFont from "next/font/local";
import { Metadata } from "next";
import Script from "next/script";

import { Navbar } from "@/components";
import { Providers } from "@/providers";
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

const siteId = process.env.NEXT_PUBLIC_FATHOM_SITE_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={stabilGrotesk.variable}>
      <body className="font-sans bg-surface-25 text-em-high">
        <Script
          src="https://cdn.usefathom.com/script.js"
          data-auto
          data-site={siteId}
          data-spa="hash"
          defer
        />

        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
