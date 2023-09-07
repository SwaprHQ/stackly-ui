import "@/styles/globals.css";
import type { Metadata } from "next";
import { STACKLY_LANDING_URL } from "@/constants";
import { Navbar } from "@/components";

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
    <html lang="en">
      <body className="font-sans bg-surface-25 text-em-high">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
