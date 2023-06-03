import { PropsWithChildren } from "react";
import "../styles/global.css";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Stackly | Stack crypto over time.",
  description:
    "Stackly is a simple, non-custodial tool that uses the CoW protocol to place recurring swaps based on DCA..",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="max-w-screen-xl px-4 mx-auto font-sans bg-surface-25">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
