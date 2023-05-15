import HamburgerIcon from "../../public/assets/images/hamburger.svg";
import CloseIcon from "../../public/assets/images/close.svg";
import Image from "next/image";

interface MenuButtonProps {
  open: boolean;
  toggle: () => void;
}

export default function MenuButton({ open, toggle }: MenuButtonProps) {
  return (
    <button
      className="space-y-1.5 md:invisible p-2.5 rounded-xl  bg-surface-50 active:bg-surface-75"
      onClick={toggle}
    >
      {open ? (
        <Image
          aria-label="close-menu"
          alt="close-menu"
          src={CloseIcon}
          width={20}
          height={20}
          className="p-1"
        />
      ) : (
        <Image
          aria-label="menu"
          alt="menu"
          src={HamburgerIcon}
          width={20}
          height={20}
        />
      )}
    </button>
  );
}
