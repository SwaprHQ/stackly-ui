import { PropsWithChildren } from "react";

import { Navbar } from "@/components";
import { Metadata } from "next";
import { Providers } from "@/providers";
import "@/styles/global.css";

const defaultStacklyUrl = "https://stackly.eth.limo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.STACKLY_URL ?? defaultStacklyUrl),
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
    <html lang="en">
      <body className="font-sans bg-fixed bg-surface-25 bg-auto-100 bg-matrix-gradient">
        <Providers>
          <Navbar />
          <div className="px-4 mx-auto md:px-0">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
