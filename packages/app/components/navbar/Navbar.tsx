"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { Button, ButtonLink } from "@/ui";

const Divider = () => (
  <div className="h-8 border-r border-solid border-b-gray-100"></div>
);

export default function Navbar() {
  return (
    <header className="top-0 flex flex-col w-full border-b border-solid h-nav-height bg-surface-25 border-b-surface-75">
      <nav className="flex items-center w-full h-full max-w-screen-xl px-4 mx-auto">
        <div>
          <Link
            tabIndex={0}
            href="/"
            title="Stackly Home"
            className="flex items-center outline-none w-14 md:w-40 focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
          >
            <Logo />
          </Link>
        </div>
        <Divider />
        <div className="items-center justify-end hidden w-full gap-4 md:flex">
          <ButtonLink
            action="quaternary"
            size="sm"
            iconLeft="blocks"
            href="/stacks"
          >
            Your stacks
          </ButtonLink>
          <Divider />
          <Button
            action="tertiary"
            size="sm"
            iconRight="caret-down"
            onClick={() => console.log("change network")}
          >
            Gnosis
          </Button>
          <Button size="sm" onClick={() => console.log("connect wallet")}>
            Connect wallet
          </Button>
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
}
