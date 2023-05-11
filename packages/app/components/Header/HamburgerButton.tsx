import HamburgerIcon from "../../public/assets/images/hamburger.svg";
import CrossIcon from "../../public/assets/images/cross.svg";
import Image from "next/image";

interface HamburgerButtonProps {
  open: boolean;
  setOpen: () => void;
}

export default function HamburgerButton({
  open,
  setOpen,
}: HamburgerButtonProps) {
  return (
    <button
      className="space-y-1.5 md:invisible px-[10px] py-[10px] rounded-md  bg-[#F3F4F2] active:bg-[#ECEDEB]"
      onClick={setOpen}
    >
      {open ? (
        <Image
          aria-label="close-menu"
          alt="close-menu"
          src={CrossIcon}
          className="h-[20px] w-[20px] p-[4px]"
        />
      ) : (
        <Image
          aria-label="menu"
          alt="menu"
          src={HamburgerIcon}
          className="h-[20px] w-[20px]"
        />
      )}
    </button>
  );
}
