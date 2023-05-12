"use client";
import Image from "next/image";
import Blocks from "../../public/assets/images/blocks.svg";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="h-[72px] top-0 flex flex-col w-full bg-surface-25 border-b border-solid border-b-surface-75">
      <nav className="flex items-center w-full h-full max-w-screen-xl px-4 mx-auto">
        <div>
          <Link href="/" title="Stackly Home" className="flex items-center">
            <Logo />
          </Link>
        </div>
        <div className="h-8 ml-5 border-r border-solid border-b-gray-100 md:ml-10"></div>
        <div className="items-center justify-end hidden w-full gap-4 md:flex">
          <Link href="#" className="flex items-center py-3 text-med-em">
            <Image alt="your stacks" src={Blocks} width={18} height={18} />
            <span className="px-2 py-3 text-sm">Your Stacks</span>
          </Link>
          <div className="h-8 ml-5 border-r border-solid border-b-gray-100 md:ml-2"></div>
          <div className="p-2 text-xs rounded-sm ring ring-gray-100 ring-offset-0">
            Placeholder1
          </div>
          <div className="p-2 text-xs rounded-sm ring ring-gray-100 ring-offset-0">
            Placeholder2
          </div>
        </div>
        <MobileMenu />
      </nav>
    </header>
  );
}
