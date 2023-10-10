import { PropsWithChildren } from "react";

export const metadata = {
  title: "Your stacks | Stackly",
};

export default function YourStacksLayout({ children }: PropsWithChildren) {
  return <div className="max-w-5xl mx-auto md:pt-24">{children}</div>;
}
