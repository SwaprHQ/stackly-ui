import StacklyLogoIcon from "../../public/assets/images/stackly-logo-icon.svg";
import StacklyLogoName from "../../public/assets/images/stackly-logo-name.svg";

export default function Logo() {
  return (
    <>
      <StacklyLogoIcon title="Stackly logo icon" />
      <StacklyLogoName
        title="Stackly logo name"
        className="hidden ml-3 md:block"
      />
    </>
  );
}
