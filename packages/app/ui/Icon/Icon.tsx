import Image from "next/image";
import PlusIcon from "../../public/assets/icons/plus.svg";
import HamburgerIcon from "../../public/assets/icons/hamburger.svg";
import CloseIcon from "../../public/assets/icons/close.svg";
import BlocksIcon from "../../public/assets/icons/blocks.svg";

export type IconName = "close" | "plus" | "menu" | "blocks";

const getIcon = (name: IconName) => {
  switch (name) {
    case "plus":
      return PlusIcon;
    case "close":
      return CloseIcon;
    case "menu":
      return HamburgerIcon;
    case "blocks":
      return BlocksIcon;
    default:
      return null;
  }
};

export const Icon = ({
  name,
  size = 20,
  alt,
  className,
}: {
  name: IconName;
  size?: number;
  alt?: string;
  className?: string;
}) => {
  return (
    <Image
      className={className}
      aria-label={name}
      alt={alt ? alt : name}
      src={getIcon(name)}
      width={size}
      height={size}
    />
  );
};
