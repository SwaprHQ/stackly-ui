import HamburgerIcon from "../../public/assets/icons/hamburger.svg";
import CloseIcon from "../../public/assets/icons/close.svg";
import Image from "next/image";
import { Icon } from "@/ui/Icon/Icon";
import { Button } from "@/ui";

interface MenuButtonProps {
  open: boolean;
  toggle: () => void;
}

export default function MenuButton({ open, toggle }: MenuButtonProps) {
  return open ? (
    <Button
      action="secondary"
      iconLeft="close"
      size="icon"
      className="md:invisible"
      onClick={toggle}
    />
  ) : (
    <Button
      action="secondary"
      iconLeft="menu"
      size="icon"
      className="md:invisible"
      onClick={toggle}
    />
  );
}
