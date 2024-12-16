"use client";

import Link from "next/link";

import { ButtonLink } from "@/ui";
import { ConnectButton, SelectNetwork } from "@/components";
import { useNetworkContext } from "@/contexts";
import { PATHNAMES } from "@/constants";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export function Navbar() {
  const { chainId } = useNetworkContext();

  return (
    <header className="flex top-0 flex-col px-4 w-full border-b border-solid h-nav-height bg-surface-25 border-b-surface-75">
      <nav className="flex items-center w-full h-full">
        <div>
          <Link
            passHref
            tabIndex={0}
            href={{
              pathname: PATHNAMES.HOME,
              query: `chainId=${chainId}`,
            }}
            title="Stackly Home"
            className="flex items-center w-14 outline-none md:w-40"
          >
            <Logo />
          </Link>
        </div>
        <Divider />
        <div className="hidden gap-4 justify-end items-center w-full md:flex">
          <ButtonLink
            variant="quaternary"
            size="sm"
            iconLeft="blocks"
            href={PATHNAMES.STACKS}
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
