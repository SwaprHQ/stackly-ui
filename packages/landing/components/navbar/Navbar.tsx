"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { ButtonLink } from "@/ui";
import Logo from "./Logo";
import { STACKLY_APP_URL } from "@/constants";
import { useEffect, useRef, useState } from "react";

const THRESHOLD_HEIGHT = 320;

export function Navbar() {
  const [scrollYPos, setScrollYPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollYPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const passedThresholdHeight = scrollYPos > THRESHOLD_HEIGHT;

  return (
    <header className="sticky top-0 z-20 flex flex-col w-full px-4 border-b border-solid h-nav-height bg-surface-25/80 md:bg-surface-25/60 backdrop-blur-md border-b-surface-75">
      <nav className="flex items-center w-full h-full mx-auto max-w-7xl">
        <div>
          <Link
            passHref
            tabIndex={0}
            href="/"
            title="Stackly Home"
            className="flex items-center outline-none"
          >
            <Logo />
          </Link>
        </div>
        <div className="items-center justify-end hidden w-full gap-4 md:flex">
          <ButtonLink variant="quaternary" size="sm" href="#how-it-works">
            How it works
          </ButtonLink>
          <ButtonLink variant="quaternary" size="sm" href="#faqs">
            FAQs
          </ButtonLink>
          <ButtonLink
            target="_blank"
            variant={passedThresholdHeight ? "primary" : "quaternary"}
            href={STACKLY_APP_URL}
          >
            Launch app
          </ButtonLink>
        </div>
        <MobileMenu passedThresholdHeight={passedThresholdHeight} />
      </nav>
    </header>
  );
}
