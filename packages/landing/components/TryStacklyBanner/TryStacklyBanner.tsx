import { STACKLY_APP_URL } from "@/constants";
import { ButtonLink, HeadingText } from "@/ui";

export const TryStacklyBanner = () => (
  <div className="relative bg-green-folders bg-[bottom_0rem_right_-2.5rem] mx-auto md:bg-[length:63%] lg:bg-[length:65%] md:bg-[top_-2rem_right_-16rem] lg:bg-[top_-2rem_right_-12rem]  xl:bg-[top_-7rem_right_-6rem] bg-no-repeat shadow-lg p-6 pb-12 md:p-14 bg-primary-900 rounded-[20px] md:rounded-[40px] md:bg-coins">
    <div className="z-20 max-w-xs md:max-w-xl">
      <HeadingText className="text-white" size={3}>
        {`Don't let market volatility scare you from investing in
cryptocurrencies.`}
      </HeadingText>
      <HeadingText className="text-primary-300" size={3}>
        Try Stackly today and start building your wealth with confidence.
      </HeadingText>
      <ButtonLink
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
