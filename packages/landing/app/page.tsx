import Link from "next/link";
import Image from "next/image";
import { BodyText, ButtonLink, DisplayText, HeadingText } from "@/ui";
import { STACKLY_APP_URL } from "@/constants";

export default function Home() {
  return (
    <main>
      <section className="px-6 pt-20 pb-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6 text-center ">
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
            className="!py-4 mx-auto text-lg !px-28 mt-7"
          >
            Launch app
          </ButtonLink>
          <div className="relative max-w-4xl mx-auto mt-16">
            <Link passHref href={STACKLY_APP_URL}>
              <Image
                className="mx-auto border shadow-xl hover:shadow-2xl rounded-2xl border-surface-50"
                alt="amount widget"
                src="/assets/images/landing-amount-widget.png"
                height={200}
                width={512}
              />
            </Link>
            <div className="absolute w-full -top-36 -z-10 h-[460px] bg-radial-gradient"></div>
          </div>
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
        </div>
      </section>
      <section className="py-20 bg-white md:py-32">
        <div className="mx-auto md:max-w-6xl">
          <div className="px-6 md:pb-28">
            <HeadingText size={4}>Using Stackly is super easy.</HeadingText>
            <HeadingText weight="regular" className="text-em-med">
              Create a stack in 3 steps. Create and cancel anytime.
            </HeadingText>
          </div>
          <div className="px-6 space-y-12 md:space-y-32">
            <StepSection
              step={1}
              description="Choose the token you want to swap from and then choose the token you want to stack."
            />
            <StepSection
              step={2}
              description="Choose how often you want to stack - Hourly, daily, weekly or monthly."
            />
            <StepSection
              step={3}
              description="Confirm your order and get stacking!"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

interface StepProps {
  step: number;
  description: string;
}

const StepSection = ({ step, description }: StepProps) => (
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
