import { PropsWithChildren } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Stack | Stacky",
  description:
    "Create a Stack (recurring buy) every hour/day/week/month of any token. Available on Gnosis.",
};

export default function StackLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
