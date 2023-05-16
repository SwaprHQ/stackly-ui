"use client";

import { Button, ButtonLink } from "@/ui";

export default function Page() {
  return (
    <div className="m-10">
      <h1 className="text-3xl">Stackly UI</h1>
      <div className="my-12 space-y-5">
        <h2 className="text-lg font-bold">Buttons</h2>
        <h3 className="font-semibold">Primary</h3>
        <div className="flex flex-wrap items-start space-x-6 space-y-3">
          <Button size="lg" onClick={() => console.log("hey")}>
            Try Stackly now
          </Button>

          <Button iconLeft="plus" onClick={() => console.log("hey")}>
            Stack now
          </Button>
          <Button
            iconLeft="plus"
            iconRight="close"
            onClick={() => console.log("hey")}
          >
            Stack now
          </Button>
          <Button
            size="icon"
            iconRight="close"
            onClick={() => console.log("hey")}
          ></Button>
          <Button size="sm" onClick={() => console.log("hey")}>
            Connect wallet
          </Button>
          <Button size="sm" disabled={true} onClick={() => console.log("hey")}>
            button disabled
          </Button>
          <ButtonLink size="sm" href="/">
            soy un ButtonLink
          </ButtonLink>
          <Button size="sm" active={true} onClick={() => console.log("hey")}>
            active
          </Button>
        </div>
        <h3 className="font-semibold">Secondary</h3>
        <div className="flex flex-wrap items-start space-x-6 space-y-3">
          <Button action="secondary" onClick={() => console.log("hey")}>
            Try Stackly now
          </Button>
        </div>
      </div>
    </div>
  );
}
