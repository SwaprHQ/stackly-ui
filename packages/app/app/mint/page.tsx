"use client";

import { useState } from "react";
import Image from "next/image";
import { StacklyBetaNFTImg } from "@/public/assets";
import { BodyText, Button, ButtonLink, HeadingText } from "@/ui";

export default function Page() {
  const [hasMinted, setHasMinted] = useState(false);

  return (
    <div className="flex flex-col-reverse items-center lg:items-start justify-center w-full lg:flex-row space-x-0 lg:space-x-10 xl:space-x-[72px] my-12 lg:my-24">
      <div className="p-4 bg-white rounded-3xl shadow-xl mt-8 lg:mt-0 space-y-4">
        <Image
          src={StacklyBetaNFTImg}
          width={420}
          height={420}
          className="shadow-2xl"
          alt="Stackly Beta NFT"
        />
        <HeadingText className="text-em-med"># 2741</HeadingText>
      </div>
      <div className="flex flex-col max-w-md lg:mt-6 space-y-16">
        <div className="flex flex-col space-y-8 items-center">
          <HeadingText className="text-em-high text-center" size={5}>
            Stackly Closed Beta NFT
          </HeadingText>
          <div className="rounded-full bg-surface-75 py-2 px-5">
            <HeadingText className="text-em-high text-center">
              2740/3000{" "}
              <span className="text-primary-700 inline-block sm:inline">
                NFT minted so far.
              </span>
            </HeadingText>
          </div>
        </div>
        <div className="flex flex-col space-y-6 w-full">
          {hasMinted && (
            <div className="text-center">
              <HeadingText className="text-em-high">
                Congratulations 🎉
              </HeadingText>
              <BodyText weight="medium" className="text-em-high">
                You hold the Stackly Beta NFT!
              </BodyText>
            </div>
          )}
          {hasMinted ? (
            <ButtonLink size="lg" href="/" width="full">
              Create a Stack
            </ButtonLink>
          ) : (
            <Button size="lg" width="full" onClick={() => setHasMinted(true)}>
              Mint for free
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
