import { ConnectButton } from "@/components";
import { HeadingText } from "@/ui";
import NoWalletStateImage from "@/public/assets/images/no-wallet-state.svg";

export const NoWalletState = () => (
  <div className="max-w-xl mx-auto space-y-8">
    <div className="flex flex-col items-center space-y-6 md:space-y-8">
      <NoWalletStateImage />
      <div className="space-y-3 text-center">
        <HeadingText size={2}>You need to connect your wallet</HeadingText>
        <HeadingText size={1} weight="medium" className="text-em-med">
          Click the button below to connect your wallet and check your stacks or
          create new ones.
        </HeadingText>
      </div>
    </div>
    <ConnectButton className="mx-auto w-fit" text="Connect your wallet" />
  </div>
);
