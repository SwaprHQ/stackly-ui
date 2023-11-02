"use client";

import Link from "next/link";
import Image from "next/image";

import {
  BodyText,
  ButtonLink,
  DisplayText,
  HeadingText,
  Icon,
  TitleText,
} from "@/ui";
import { EVENTS } from "@/analytics/constants";
import { STACKLY_APP_URL } from "@/constants";
import { useFathomAnalytics } from "@/contexts";

export const HeroBanner = () => {
  const { trackClick } = useFathomAnalytics();

  return (
    <section className="px-6 pt-16 border-b border-gray-100 md:pt-20">
      <div className="space-y-4 text-center md:space-y-6 ">
        <DisplayText>DCA simplified</DisplayText>
        <HeadingText className="!font-medium text-em-med max-w-2xl mx-auto">
          Say goodbye to market timing and hello to effortless recurrent swaps.
        </HeadingText>
      </div>
      <ButtonLink
        target="_blank"
        href={STACKLY_APP_URL}
        size="lg"
        width="fit"
        className="!py-4 mx-auto text-lg !px-16 md:!px-28 mt-8"
        onClick={() => {
          trackClick(EVENTS.SECTIONS.HERO_BANNER.STACK_NOW_CLICK);
        }}
      >
        Stack now
      </ButtonLink>
      <div className="relative max-w-4xl mx-auto mt-12 mb-24 md:my-20">
        <Link
          passHref
          href={STACKLY_APP_URL}
          className="relative block mx-auto w-fit"
        >
          <div className="invisible sm:visible absolute w-[3px] h-[26px] bg-em-med bottom-[60px] left-[17px] animate-cursor-blink"></div>
          <Image
            className="mx-auto border shadow-xl hover:shadow-2xl rounded-2xl border-surface-50"
            alt="amount widget"
            src="/assets/images/landing-widget.png"
            height={200}
            width={512}
          />
        </Link>
        <div className="absolute w-full -top-36 -z-10 h-[460px] md:bg-radial-gradient"></div>
      </div>
      <Link
        href="https://ipfs.io/ipfs/QmUmmFkKvktZ14iA3237WuDrzNuhi4BMb4MoYMJHeFFbey"
        target="_blank"
      >
        <div className="mx-auto flex items-center px-5 py-3 bg-primary-50 rounded-[20px] w-fit space-x-3 my-20 shadow-sm hover:shadow-md hover:bg-primary-75">
          <Icon name="check" className="text-primary-600" />
          <TitleText>Stackly has undergone an audit by Omega.</TitleText>
          <Image
            alt="omega team logo"
            src="/assets/images/omega-team-logo.svg"
            height={30}
            width={30}
          />
        </div>
      </Link>

      {false && (
        <div className="mx-auto flex items-center px-5 py-2 bg-black/5 rounded-[20px] w-fit space-x-6 mt-20">
          <div className="flex items-center space-x-2">
            <BodyText size={3} weight="medium" className="text-em-med">
              Total Stacks created:
            </BodyText>
            <BodyText size={3} weight="bold">
              732
            </BodyText>
          </div>
          <div className="flex items-center space-x-2">
            <BodyText size={3} weight="medium" className="text-em-med">
              Total transactions:
            </BodyText>
            <BodyText size={3} weight="bold">
              1232
            </BodyText>
          </div>
        </div>
      )}
    </section>
  );
};
