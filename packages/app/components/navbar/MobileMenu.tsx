import { useState } from "react";
import MenuButton from "./MenuButton";
import MobileMenuList from "./MobileMenuList";
import { Button } from "@/ui";
import { ConnectButton } from "@/components";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-end w-full gap-4 md:hidden">
      <Button
        iconRight="caret-down"
        action="tertiary"
        size="sm"
        onClick={() => console.log("change network")}
      >
        Gnosis
      </Button>
      <ConnectButton />
      <MenuButton open={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <MobileMenuList open={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </div>
  );
}
