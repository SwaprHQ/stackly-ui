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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/assets/favicons/safari-pinned-tab.svg"
          color="#F8F8F7"
        />
        <meta name="msapplication-TileColor" content="#F8F8F7" />
        <meta name="theme-color" content="#A2E771" />
      </head>
      <body>{children}</body>
    </html>
  );
}
