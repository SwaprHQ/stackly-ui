import { PropsWithChildren } from "react";

export const metadata = {
  title: "Your stacks | Stackly",
};

export default function YourStacksLayout({ children }: PropsWithChildren) {
  return <div className="max-w-5xl pt-12 mx-auto md:py-24">{children}</div>;
}
