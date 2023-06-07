import { PropsWithChildren } from "react";
import { Navbar } from "@/components";
import { Providers } from "@/providers";
import "../styles/global.css";

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
