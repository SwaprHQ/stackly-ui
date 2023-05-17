import Image from "next/image";
import PlusIcon from "../../public/assets/icons/plus.svg";
import HamburgerIcon from "../../public/assets/icons/hamburger.svg";
import CloseIcon from "../../public/assets/icons/close.svg";
import BlocksIcon from "../../public/assets/icons/blocks.svg";
import CaretLeftIcon from "../../public/assets/icons/caret-left.svg";
import CaretDownIcon from "../../public/assets/icons/caret-down.svg";
import CaretRightIcon from "../../public/assets/icons/caret-right.svg";
import SwapIcon from "../../public/assets/icons/swap.svg";
import WarningIcon from "../../public/assets/icons/warning.svg";
import CheckIcon from "../../public/assets/icons/check.svg";
import ArrowLeftIcon from "../../public/assets/icons/arrow-left.svg";
import ArrowExternalIcon from "../../public/assets/icons/arrow-external.svg";

export type IconName =
  | "close"
  | "plus"
  | "menu"
  | "blocks"
  | "check"
  | "arrow-left"
  | "arrow-external"
  | "warning"
  | "swap"
  | "caret-down"
  | "caret-left"
  | "caret-right";

export const iconMap: Record<IconName, any> = {
  close: CloseIcon,
  plus: PlusIcon,
  menu: HamburgerIcon,
  blocks: BlocksIcon,
  check: CheckIcon,
  "arrow-left": ArrowLeftIcon,
  "arrow-external": ArrowExternalIcon,
  warning: WarningIcon,
  swap: SwapIcon,
  "caret-down": CaretDownIcon,
  "caret-left": CaretLeftIcon,
  "caret-right": CaretRightIcon,
};

const getIcon = (name: IconName) => iconMap[name] || null;

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
