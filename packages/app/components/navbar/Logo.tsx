"use client";

import { StacklyLogoIcon, StacklyLogoNameImg } from "@/public/assets";

export default function Logo() {
  return (
    <>
      <StacklyLogoIcon title="Stackly logo icon" />
      <StacklyLogoNameImg
        title="Stackly logo name"
        className="hidden ml-3 md:block"
      />
    </>
  );
}
