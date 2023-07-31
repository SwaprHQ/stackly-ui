import { PropsWithChildren } from "react";
import { Navbar } from "@/components";
import { Providers } from "@/providers";
import "../styles/global.css";

export const metadata = {
  title: "Stackly | Stack crypto over time.",
  description:
    "Stackly is a simple, non-custodial tool that uses the CoW protocol to place recurring swaps based on DCA..",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0,
  },
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
