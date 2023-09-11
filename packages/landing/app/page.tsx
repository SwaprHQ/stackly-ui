import Link from "next/link";
import Image from "next/image";
import { BodyText, ButtonLink, DisplayText, HeadingText, Icon } from "@/ui";
import {
  STACKLY_APP_URL,
  STACKLY_DISCORD_URL,
  STACKLY_TWITTER_URL,
  SWAPR_URL,
} from "@/constants";
import { StacklyLogoIcon } from "@/public/assets";
import { PropsWithChildren } from "react";
import { QAndAAccordion, TryStacklyBanner } from "@/components";

export default function Home() {
  return (
    <main>
      <section className="px-6 pt-16 border-b border-gray-100 md:pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 text-center md:space-y-6 ">
            <DisplayText>Stack crypto over time</DisplayText>
            <HeadingText className="!font-medium text-em-med max-w-2xl mx-auto">
              Stackly is a simple, non-custodial tool that does recurring buys
              of a token at a choosen frequency. Making it easy to DCA.
            </HeadingText>
          </div>
          <ButtonLink
            target="_blank"
            href={STACKLY_APP_URL}
            size="lg"
            width="fit"
            className="!py-4 mx-auto text-lg !px-16 md:!px-28 mt-8"
          >
            Try Stackly now
          </ButtonLink>
          <div className="relative max-w-4xl mx-auto mt-12 mb-24 md:my-20">
            <Link passHref href={STACKLY_APP_URL}>
              <Image
                className="mx-auto border shadow-xl hover:shadow-2xl rounded-2xl border-surface-50"
                alt="amount widget"
                src="/assets/images/landing-amount-widget.png"
                height={200}
                width={512}
              />
            </Link>
            <div className="absolute w-full -top-36 -z-10 h-[460px] md:bg-radial-gradient"></div>
          </div>
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
        </div>
      </section>
      <section className="py-20 bg-white border-b border-gray-100 md:py-32">
        <div className="mx-auto md:max-w-6xl">
          <div className="px-6 space-y-2 md:pb-28">
            <HeadingText size={4}>Using Stackly is super easy.</HeadingText>
            <HeadingText weight="regular" className="text-em-med">
              Create a stack in 3 steps. Create and cancel anytime.
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
            A new way to stack your crypto over time with DCA.
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
      <section className="px-6 py-12 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between">
            <HeadingText size={4} className="pb-10 md:pb-0">
              Frequently asked questions
            </HeadingText>
            <div className="w-full max-w-lg space-y-4">
              <QAndAAccordion question="What is Stackly?">
                Stackly is a simple non-custodial DCA app that makes it easy to
                do recurring buys of any token.
              </QAndAAccordion>
              <QAndAAccordion question="How does Stackly work?">
                When you stack a token, stackly creates a contract for you with
                the funds and uses CoW protocol to place recurring orders
                (stacks) at the frequency you choose.
              </QAndAAccordion>
              <QAndAAccordion question="What is DCA?">
                DCA stands for Dollar-Cost Averaging, which is an investment
                strategy used in the financial markets. DCA involves regularly
                investing a fixed amount of money at predetermined intervals,
                regardless of the {"asset's"} price.
              </QAndAAccordion>
              <QAndAAccordion question="Why one should do DCA?">
                <ul className="px-4 pb-4 list-decimal">
                  <li>Regular Investing.</li>
                  <li>Reduced Market Timing Risk.</li>
                  <li>Risk Mitigation.</li>
                  <li> Psychological Benefits.</li>
                  <li> Long-Term Investment.</li>
                  <li> Automatic Investing.</li>
                </ul>
                <p className="text-lg font-medium text-em-med">
                  {`While DCA has its advantages, it's
                  important to note that it may not always yield the highest
                  returns compared to lump-sum investing if the market
                  experiences significant gains over a short period.`}
                </p>
                <p className="text-lg font-medium text-em-med">
                  {`The choice between DCA and lump-sum investing depends on an individual's
                  financial goals, risk tolerance, and market outlook.
                  Ultimately, DCA is a strategy that can help individuals build
                  wealth steadily over time while reducing the risks associated
                  with market timing and volatility. However, like all
                  investment strategies, it should be carefully considered in
                  the context of one's financial situation and objectives.`}
                </p>
                <p className="text-lg font-medium text-em-med">
                  {`Ultimately, DCA is a strategy that can help individuals build
                  wealth steadily over time while reducing the risks associated
                  with market timing and volatility. However, like all
                  investment strategies, it should be carefully considered in
                  the context of one's financial situation and objectives.`}
                </p>
              </QAndAAccordion>
              <QAndAAccordion question="Can I cancel my stacks?">
                Yes. You can cancel your stacks anytime. Your funds will be
                widrawn immidiatly to your wallet. To do it, you have to connect
                your wallet, go to your stacks, choose a stack, click cancel and
                confirm transaction with your wallet.
              </QAndAAccordion>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 mb-20 md:mb-32">
        <TryStacklyBanner />
      </section>
      <section className="max-w-6xl px-6 mx-auto my-8">
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
  <div className="flex flex-col items-center justify-between py-6 bg-white border md:flex-row px-7 rounded-3xl">
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
