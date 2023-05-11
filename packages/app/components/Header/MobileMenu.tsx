import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import MobileMenuList from "./MobileMenuList";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end items-center gap-4 w-full md:hidden">
      <div className="rounded-sm ring ring-gray-100 ring-offset-0 text-xs p-2">
        Placeholder1
      </div>
      <div className="rounded-sm ring ring-gray-100 ring-offset-0 text-xs p-2">
        Placeholder2
      </div>
      <HamburgerButton open={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <MobileMenuList open={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </div>
  );
}
