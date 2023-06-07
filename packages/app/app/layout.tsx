import { PropsWithChildren } from "react";
import { Navbar } from "@/components";
import "../styles/global.css";
import { Providers } from "@/providers";

export const metadata = {
  title: "Stackly | Stack crypto over time.",
  description:
    "Stackly is a simple, non-custodial tool that uses the CoW protocol to place recurring swaps based on DCA..",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="max-w-screen-xl px-4 mx-auto font-sans bg-surface-25">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
