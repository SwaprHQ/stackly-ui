import { useState } from "react";
import MenuButton from "./MenuButton";
import MobileMenuList from "./MobileMenuList";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-end w-full gap-4 md:hidden">
      <div className="p-2 text-xs rounded-sm ring ring-gray-100 ring-offset-0">
        Placeholder1
      </div>
      <div className="p-2 text-xs rounded-sm ring ring-gray-100 ring-offset-0">
        Placeholder2
      </div>
      <MenuButton open={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <MobileMenuList open={isOpen} toggle={() => setIsOpen(!isOpen)} />
    </div>
  );
}
