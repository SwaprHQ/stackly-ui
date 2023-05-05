import type { AppProps } from "next/app";
import "@vercel/examples-ui/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps}/>
    </>
  );
}
