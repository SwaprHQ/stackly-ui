import Link from "next/link";
import Blocks from "../../public/assets/icons/blocks.svg";
import Image from "next/image";

interface MobileMenuListProps {
  open: boolean;
  toggle: () => void;
}

export default function MobileMenuList({ open, toggle }: MobileMenuListProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 top-nav-height bg-gray-alpha-75"
        onClick={toggle}
      ></div>
      <div className="absolute left-0 w-full gap-2 px-6 py-2 border-b border-solid rounded-lg bg-surface-25 top-nav-height border-surface-75">
        <Link href="#" className="flex items-center py-3 text-text-med-em">
          <Image
            alt="your stacks"
            src={Blocks}
            width={18}
            height={18}
            className="mr-2"
          />
          <span>Your Stacks</span>
        </Link>
        <hr className="h-0 -mx-6 border-b border-solid border-surface-75" />
        <Link href="#" className="block py-3 text-em-med">
          How it works
        </Link>
        <Link href="#" className="block py-3 text-em-med">
          FAQ&apos;s
        </Link>
      </div>
    </>
  );
}
