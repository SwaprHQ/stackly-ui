import Image from "next/image";
import Logo from "../../public/assets/images/logo.svg";
import Stackly from "../../public/assets/images/stackly.svg";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-[72px] sticky top-0 z-50 flex flex-col w-full border-b border-solid border-b-stackly-border">
      <nav className="h-full flex items-center w-full max-w-screen-xl px-4 mx-auto">
        <div>
          <Link href="/" title="Stackly Home" className="flex items-center">
            <Image aria-label="Stackly logo" src={Logo} alt="Stackly Logo" />
            <Image
              aria-label="Stackly"
              src={Stackly}
              alt="Stackly Logo"
              className="ml-[12px] hidden md:block"
            />
          </Link>
        </div>
        <div className="border-r border-solid border-b-gray-100 h-[31px] ml-[20px] md:ml-[40px]"></div>
        <div className="flex justify-end items-center gap-4 w-full md:hidden">
          <button className="space-y-1.5 md:invisible px-[12px] py-[12px] rounded-md  bg-[#F3F4F2] active:bg-[#ECEDEB]">
            <div className="w-[15px] h-0.5 bg-gray-900 "></div>
            <div className="w-[15px] h-0.5 bg-gray-900"></div>
            <div className="w-[15px] h-0.5 bg-gray-900"></div>
          </button>
        </div>
      </nav>
    </header>
  );
}
