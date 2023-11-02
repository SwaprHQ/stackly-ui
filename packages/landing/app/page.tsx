import { PropsWithChildren } from "react";

import Link from "next/link";
import Image from "next/image";

import { BodyText, ButtonLink, HeadingText, Icon } from "@/ui";
import {
  STACKLY_DISCORD_URL,
  STACKLY_TWITTER_URL,
  SWAPR_URL,
} from "@/constants";
import { StacklyLogoIcon } from "@/public/assets";
import { FAQ, HeroBanner, TryStacklyBanner } from "@/components";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <section
        className="py-20 bg-white border-b border-gray-100 md:py-32"
        id="how-it-works"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl px-6 space-y-2 md:pb-28">
            <HeadingText size={4}>Using Stackly is super easy</HeadingText>
            <HeadingText weight="regular" className="text-em-med">
              Create a stack (aka recurring swaps) in 3 steps.
            </HeadingText>
          </div>
          <div className="px-6 space-y-12 md:space-y-32">
            <Step
              step={1}
              description="Choose the token you want to swap from and then choose the token you want to stack."
            />
            <Step
              step={2}
              description="Choose how often you want to stack - Hourly, daily, weekly or monthly."
            />
            <Step step={3} description="Confirm your order and get stacking!" />
          </div>
        </div>
      </section>
      <section className="px-6 pt-12 pb-20 bg-white border-b border-gray-100 md:py-32">
        <div className="max-w-6xl mx-auto">
          <HeadingText size={4}>
            A new way to stack your crypto with DCA strategy.
          </HeadingText>
          <div className="space-y-16">
            <DCAfeature title="Neutralizing Short-Term Volatility">
              Stackly dollar-cost averaging strategy neutralizes short-term
              volatility and reduces the need for market timing, making it an
              ideal tool for investors who want to minimize risk while building
              wealth.
            </DCAfeature>
            <DCAfeature title="Greater Control Over Investments">
              With Stackly, you can choose the token you want to stack, the
              frequency of the stacks, and when to start and end them, giving
              you greater control over your investments.
            </DCAfeature>
          </div>
        </div>
      </section>
      <FAQ />
      <section className="px-6 mx-auto mb-20 max-w-7xl lg:px-0 md:mb-32">
        <TryStacklyBanner />
      </section>
      <section className="px-6 mx-auto my-8 max-w-7xl lg:px-0">
        <SocialBanner />
      </section>
      <Footer />
    </main>
  );
}

interface StepProps {
  step: number;
  description: string;
}

const Step = ({ step, description }: StepProps) => (
  <div className="flex flex-col justify-between md:flex-row">
    <div className="max-w-md mb-10 space-y-10 md:space-y-14 md:mb-0">
      <div className="w-fit px-5 py-2 bg-primary-100 rounded-[56px] text-em-med  text-xl font-semibold mt-10">
        <span className="text-black/30">Step</span> {step}/3
      </div>
      <HeadingText weight="regular" size={2} className="text-em-med">
        {description}
      </HeadingText>
    </div>
    <Image
      alt={`step ${step} for stacking`}
      src={`/assets/images/step${step}.png`}
      height={200}
      width={512}
    />
  </div>
);

const SocialBanner = () => (
  <div className="flex flex-col items-center justify-between py-6 bg-white border md:flex-row px-7 rounded-[20px]">
    <div className="flex flex-col items-center md:space-y-0 md:space-x-5 md:flex-row">
      <StacklyLogoIcon title="Stackly logo icon" />
      <HeadingText
        weight="medium"
        size={3}
        className="text-center md:text-left"
      >
        Join our awesome community
      </HeadingText>
    </div>
    <div className="flex flex-col items-center w-full mt-5 space-y-4 md:mt-0 md:w-auto md:space-x-4 md:space-y-0 md:flex-row">
      <ButtonLink
        className="w-full md:w-fit"
        size="lg"
        variant="secondary"
        iconLeft="discord"
        href={STACKLY_DISCORD_URL}
        target="_blank"
      >
        Join our Discord
      </ButtonLink>
      <ButtonLink
        className="w-full md:w-fit"
        size="lg"
        variant="secondary"
        iconLeft="twitter"
        href={STACKLY_TWITTER_URL}
        target="_blank"
      >
        Follow us on Twitter
      </ButtonLink>
    </div>
  </div>
);

interface DCAFeatureProps extends PropsWithChildren {
  title: string;
}

const DCAfeature = ({ title, children }: DCAFeatureProps) => (
  <div className="flex flex-col pt-4 mt-12 border-t border-gray-100 md:mt-32 md:pt-8 md:flex-row md:justify-between">
    <HeadingText size={2} className="mb-6 mr-3 md:mb-0 lg:mr-0">
      {title}
    </HeadingText>
    <HeadingText size={1} weight="medium" className="max-w-xl text-em-med">
      {children}
    </HeadingText>
  </div>
);

const Footer = () => (
  <footer>
    <div className="flex flex-col items-center px-3 py-2 mx-auto my-4 space-x-4 sm:flex-row sm:bg-surface-75 w-fit rounded-xl">
      <BodyText weight="medium" className="text-em-low">
        ©{new Date().getFullYear()} Stackly All Rights Reserved
      </BodyText>
      <div className="my-1 sm:my-0 sm:h-4 sm:w-[1.5px] bg-em-low"></div>
      <div className="flex items-center space-x-1.5">
        <BodyText weight="medium" className="text-em-low">
          A product from{" "}
          <Link
            className="hover:text-[#2e17f2]"
            target="_blank"
            href={SWAPR_URL}
          >
            Swapr
          </Link>
        </BodyText>
        <Icon size={16} name="swapr" />
      </div>
    </div>
  </footer>
);
