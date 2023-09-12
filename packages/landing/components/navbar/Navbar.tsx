"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { ButtonLink } from "@/ui";
import Logo from "./Logo";
import { STACKLY_APP_URL } from "@/constants";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const buttonRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(600);

  useEffect(() => {
    if (window.innerHeight) setViewportHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const passedViewportHeight = scrollY > viewportHeight;

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
            ref={buttonRef}
            target="_blank"
            variant={passedViewportHeight ? "primary" : "quaternary"}
            href={STACKLY_APP_URL}
          >
            Launch app
          </ButtonLink>
        </div>
        <MobileMenu passedViewportHeight={passedViewportHeight} />
      </nav>
    </header>
  );
}
