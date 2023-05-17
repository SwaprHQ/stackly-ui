import Image from "next/image";
import LogoImage from "../../public/assets/images/logo.svg";
import Stackly from "../../public/assets/images/stackly.svg";

export default function Logo() {
  return (
    <>
      <Image aria-label="Stackly logo" src={LogoImage} alt="Stackly Logo" />
      <Image
        aria-label="Stackly"
        src={Stackly}
        alt="Stackly Logo"
        className="hidden ml-3 md:block"
      />
    </>
  );
}
