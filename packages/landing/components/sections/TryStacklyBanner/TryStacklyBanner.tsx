"use client";

import { EVENTS } from "@/analytics";
import { ButtonLink, HeadingText } from "@/ui";
import { STACKLY_APP_URL } from "@/constants";

export const TryStacklyBanner = () => {
  return (
    <div
      className={`
      bg-[bottom_0rem_right_-4.4rem] bg-no-repeat bg-green-folders bg-primary-900
      sm:bg-[bottom_0rem_right_-1.5rem]
      md:bg-[top_-2rem_right_-16rem] md:bg-[length:63%] md:bg-coins md:p-14 md:rounded-[40px] 
      lg:bg-[top_-2rem_right_-12rem] lg:bg-[length:65%]
      xl:bg-[top_-7rem_right_-6rem]
      mx-auto 
      p-6 pb-1
      relative 
      rounded-[20px]
      shadow-lg
      `}
    >
      <div className="z-20 max-w-xs md:max-w-xl">
        <HeadingText className="text-white" size={3}>
          {`Don't let market volatility scare you from investing in cryptocurrencies.`}
        </HeadingText>
        <HeadingText className="text-primary-300" size={3}>
          Try Stackly today and start building your wealth with confidence.
        </HeadingText>
        <ButtonLink
          target="_blank"
          size="lg"
          href={STACKLY_APP_URL}
          width="fit"
          className="px-6 mt-8 md:px-8 md:mt-20"
        >
          Try Stackly Now
        </ButtonLink>
      </div>
    </div>
  );
};
