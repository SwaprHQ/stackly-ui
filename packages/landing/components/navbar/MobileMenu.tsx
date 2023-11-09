"use client";

import { useState } from "react";

import Link from "next/link";

import { Button, ButtonLink } from "@/ui";
import { EVENTS } from "@/analytics";
import { STACKLY_APP_URL } from "@/constants";

export default function MobileMenu({
  passedThresholdHeight,
}: {
  passedThresholdHeight: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="z-10 flex items-center justify-end w-full gap-4 md:hidden">
      <ButtonLink
        target="_blank"
        variant={passedThresholdHeight ? "primary" : "secondary"}
        href={STACKLY_APP_URL}
      >
        Launch app
      </ButtonLink>

      <Button
        variant="secondary"
        iconLeft={isOpen ? "close" : "menu"}
        size="icon"
        className="md:invisible"
        onClick={toggle}
      />
      {isOpen && (
        <>
          <div
            className="fixed bottom-0 left-0 right-0 top-nav-height bg-gray-alpha-75"
            onClick={toggle}
          ></div>
          <div className="absolute left-0 w-full gap-2 px-6 py-2 border-b border-solid rounded-lg bg-surface-25 top-nav-height border-surface-75">
            <Link
              href="#how-it-works"
              className="block py-3 text-em-med"
              onClick={toggle}
            >
              How it works
            </Link>
            <Link
              href="#faqs"
              className="block py-3 text-em-med"
              onClick={toggle}
            >
              FAQ&apos;s
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
