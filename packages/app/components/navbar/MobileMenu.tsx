"use client";

import { useState } from "react";
import MenuButton from "./MenuButton";
import MobileMenuList from "./MobileMenuList";
import { ConnectButton, SelectNetwork } from "@/components";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-end w-full gap-4 md:hidden">
      <SelectNetwork />
      <ConnectButton />
      <MenuButton open={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <MobileMenuList open={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </div>
  );
}
