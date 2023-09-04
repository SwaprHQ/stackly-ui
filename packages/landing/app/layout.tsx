import "./globals.css";
import type { Metadata } from "next";

const DEFAULT_STACKLY_URL = "https://stackly.eth.limo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.STACKLY_URL ?? DEFAULT_STACKLY_URL),
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
        <div className="px-4 mx-auto md:px-0">{children}</div>
      </body>
    </html>
  );
}
