import Link from "next/link";
import Blocks from "../../public/assets/images/blocks.svg";
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
        className="fixed top-[72px] bottom-0 left-0 right-0 bg-gray-alpha-75"
        onClick={toggle}
      ></div>
      <div className="w-full bg-surface-25 rounded-lg absolute top-[72px] left-0 border-b border-solid border-surface-75 gap-2 py-2 px-6">
        <Link href="#" className="flex py-3 items-center text-med-em">
          <Image
            alt="your stacks"
            src={Blocks}
            className="w-[18px] h-[18px] mr-2"
          />
          <span>Your Stacks</span>
        </Link>
        <hr className="border-b border-solid border-surface-75 h-0 -ml-6 -mr-6 text-med-em" />
        <Link href="#" className="block py-3">
          How it works
        </Link>
        <Link href="#" className="block py-3 text-med-em">
          FAQ&apos;s
        </Link>
      </div>
    </>
  );
}
