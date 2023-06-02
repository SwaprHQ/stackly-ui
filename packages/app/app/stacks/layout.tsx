export const metadata = {
  title: "Your stacks | Stackly",
};

interface YourStacksLayoutProps {
  children: React.ReactNode;
}

export default function YourStacksLayout({ children }: YourStacksLayoutProps) {
  return <div className="max-w-5xl pt-24 mx-auto">{children}</div>;
}
