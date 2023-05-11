"use client";
import Image from "next/image";
import Logo from "../../public/assets/images/logo.svg";
import Stackly from "../../public/assets/images/stackly.svg";
import Blocks from "../../public/assets/images/blocks.svg";

import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="h-[72px] sticky top-0 z-50 flex flex-col w-full bg-surface-25 border-b border-solid border-b-stackly-border">
      <nav className="h-full flex items-center w-full max-w-screen-xl px-4 mx-auto">
        <div>
          <Link href="/" title="Stackly Home" className="flex items-center">
            <Image aria-label="Stackly logo" src={Logo} alt="Stackly Logo" />
            <Image
              aria-label="Stackly"
              src={Stackly}
              alt="Stackly Logo"
              className="ml-[12px] hidden md:block"
            />
          </Link>
        </div>
        <div className="border-r border-solid border-b-gray-100 h-[31px] ml-[20px] md:ml-[40px]"></div>
        <div className="justify-end items-center gap-4 w-full hidden md:flex">
          <Link href="#" className="flex py-3 items-center text-med-em">
            <Image
              alt="your stacks"
              src={Blocks}
              className="w-[18px] h-[18px]"
            />
            <span className="px-2 py-3 text-sm">Your Stacks</span>
          </Link>
          <div className="border-r border-solid border-b-gray-100 h-[31px] ml-[20px] md:ml-2"></div>
          <div className="rounded-sm ring ring-gray-100 ring-offset-0 text-xs p-2">
            Placeholder1
          </div>
          <div className="rounded-sm ring ring-gray-100 ring-offset-0 text-xs p-2">
            Placeholder2
          </div>
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
}
