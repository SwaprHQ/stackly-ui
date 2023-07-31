import { PropsWithChildren } from "react";
import { Navbar } from "@/components";
import { Metadata } from "next";
import { Providers } from "@/providers";
import "../styles/global.css";

const defaultStacklyUrl = "https://stackly.eth.limo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.STACKLY_URL ?? defaultStacklyUrl),
  title: "Stackly | Effortless DCA.",
  description:
    "Stackly is a non-custodial tool that places recurring swaps based on dollar cost average (DCA) investment strategy.",
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
