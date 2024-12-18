"use client";

import Link from "next/link";
import Image from "next/image";
import { trackEvent } from "fathom-client";

import {
  BodyText,
  ButtonLink,
  DisplayText,
  HeadingText,
  Icon,
  TitleText,
} from "@/ui";
import { EVENTS } from "@/analytics";
import { STACKLY_APP_URL } from "@/constants";

export const SUPPORTED_NETWORKS = [
  {
    name: "Ethereum",
    image: "/assets/images/ethereum-logo.svg",
  },
  {
    name: "Gnosis",
    image: "/assets/images/gnosis-logo.svg",
  },
  {
    name: "Arbitrum",
    image: "/assets/images/arbitrum-logo.svg",
  },
  {
    name: "Base",
    image: "/assets/images/base-logo.svg",
  },
];

export const HeroBanner = () => {
  return (
    <section className="px-6 pt-16 border-b border-gray-100 md:pt-20">
      <div className="flex items-center px-3 py-2 mx-auto mb-3 space-x-2 rounded-3xl border border-surface-75 w-fit hover:border-primary-300">
        <p className="text-xs text-em-med">Live on:</p>
        <div className="flex items-center space-x-1">
          {SUPPORTED_NETWORKS.map((network) => (
            <Image
              key={network.name}
              src={network.image}
              alt={network.name}
              width={20}
              height={20}
              title={`live on ${network.name} mainnet network`}
              className="hover:scale-125"
            />
          ))}
        </div>
      </div>
      <div className="space-y-4 text-center md:space-y-6">
        <DisplayText>Empower your portfolio</DisplayText>
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
          trackEvent(EVENTS.SECTIONS.HERO_BANNER.STACK_NOW_CLICK);
        }}
      >
        Start stacking now
      </ButtonLink>
      <div className="relative mx-auto mt-12 mb-24 max-w-4xl md:my-20">
        <Link
          passHref
          href={STACKLY_APP_URL}
          className="block relative mx-auto w-fit"
        >
          <div className="invisible sm:visible absolute w-[3px] h-[26px] bg-em-med bottom-[60px] left-[17px] animate-cursor-blink"></div>
          <Image
            className="mx-auto rounded-2xl border shadow-xl hover:shadow-2xl border-surface-50"
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
