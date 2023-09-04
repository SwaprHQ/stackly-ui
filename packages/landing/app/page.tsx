import Link from "next/link";
import Image from "next/image";
import { BodyText, ButtonLink, DisplayText, HeadingText } from "@/ui";

const STACKLY_APP_URL = "https://stackly.eth.limo/";

export default function Home() {
  return (
    <main className="w-full mx-auto mt-14">
      <div className="space-y-6 text-center ">
        <DisplayText>Stack crypto over time</DisplayText>
        <HeadingText className="!font-medium text-em-med max-w-2xl mx-auto">
          Stackly is a simple, non-custodial tool that does recurring buys of a
          token at a choosen frequency. Making it easy to DCA.
        </HeadingText>
      </div>
      <ButtonLink
        href={STACKLY_APP_URL}
        size="lg"
        width="fit"
        className="!py-4 mx-auto text-lg !px-28 mt-7"
      >
        Launch app
      </ButtonLink>
      <div className="mt-20 ">
        <Link passHref href={STACKLY_APP_URL}>
          <Image
            className="mx-auto border shadow-xl hover:shadow-2xl rounded-2xl border-surface-50"
            alt="amount widget"
            src="/assets/images/landing-amount-widget.png"
            height={200}
            width={512}
          />
        </Link>
      </div>
      <div className="mx-auto flex items-center px-5 py-2 bg-black/5 rounded-[20px] w-fit space-x-6 mt-12">
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
      <div className="h-[1px] bg-gray-100 mt-10"></div>
    </main>
  );
}
