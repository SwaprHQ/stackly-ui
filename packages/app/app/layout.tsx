// These styles apply to every route in the application
import "../styles/global.css";
import Header from "@/components/Header/Header";

export const metadata = {
  title: "Stackly | Stack crypto over time.",
  description:
    "Stackly is a simple, non-custodial tool that uses the CoW protocol to place recurring swaps based on DCA..",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-sans bg-surface-25">
        <Header />
        {children}
      </body>
    </html>
  );
}
