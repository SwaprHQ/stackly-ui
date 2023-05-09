// These styles apply to every route in the application
import "../styles/global.css";

export const metadata = {
  title: "Stackly UI",
  description:
    "Stackly is a Next.js Cloudflare mono repo project that implements Dollar Cost Averaging using CoW protocol.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
