import { Button, Link } from "@stackly/ui";
import Head from "next/head";

export default function Index() {
  return (
    <div className="prose m-4">
      <Head>
        <title>Stackly App</title>
      </Head>
      <h1 className="mt-6">Hello Stackly UI</h1>
      <Link href="/test">Test</Link>
      <hr />
      <Button action="primary">Stackly Button</Button>
    </div>
  );
}
