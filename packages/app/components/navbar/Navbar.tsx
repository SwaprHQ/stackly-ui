"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import { ButtonLink } from "@/ui";
import { ConnectButton, SelectNetwork } from "@/components";

export function Navbar() {
  return (
    <header className="top-0 flex flex-col w-full border-b border-solid h-nav-height bg-surface-25 border-b-surface-75">
      <nav className="flex items-center w-full h-full">
        <div>
          <Link
            passHref
            tabIndex={0}
            href="/"
            title="Stackly Home"
            className="flex items-center outline-none w-14 md:w-40"
          >
            <Logo />
          </Link>
        </div>
        <Divider />
        <div className="items-center justify-end hidden w-full gap-4 md:flex">
          <ButtonLink
            variant="quaternary"
            size="sm"
            iconLeft="blocks"
            href="/stacks"
          >
            Your stacks
          </ButtonLink>
          <Divider />
          <SelectNetwork />
          <ConnectButton />
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
}

const Divider = () => (
  <div className="h-8 border-r border-solid border-b-gray-100"></div>
);
