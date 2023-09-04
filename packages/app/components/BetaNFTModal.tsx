import {
  BodyText,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  HeadingText,
  ButtonLink,
  ModalFooter,
} from "@/ui";
import { ModalId, useModalContext } from "@/contexts";
import { useDisconnect } from "wagmi";
import { StacklyBetaNFTImg } from "@/public/assets";
import Image from "next/image";

export const BetaNFTModal = () => {
  const { isModalOpen } = useModalContext();
  const { disconnect } = useDisconnect();

  const isOpen = isModalOpen(ModalId.BETA_NFT_GATEKEEPING);

  const discordLink = process.env.NEXT_PUBLIC_DISCORD_WAITLIST_LINK as string;

  return (
    <Modal
      className="bg-green-gradient text-center"
      maxWidth="xl"
      isOpen={isOpen}
      closeAction={disconnect}
    >
      <ModalHeader className="flex-col pt-8 pb-4 space-y-2">
        <HeadingText size={3}>Stackly beta is here</HeadingText>
        <HeadingText className="text-em-med" weight="medium">
          Stackly beta is exclusive for our NFT holders.
        </HeadingText>
        <Button
          variant="quaternary"
          iconLeft="close"
          size="icon"
          onClick={disconnect}
          className="absolute top-1 right-2 md:top-5 md:right-5"
        />
      </ModalHeader>
      <ModalContent className="border-b border-surface-50 py-10 mt-0">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute -top-3 -right-2 bg-primary-400 rounded-lg px-2 py-1">
              <BodyText weight="medium" size={1}>
                FREE
              </BodyText>
            </div>
            <Image
              src={StacklyBetaNFTImg}
              width={135}
              height={135}
              className="shadow-2xl"
              alt="Stackly Beta NFT"
            />
          </div>
          <HeadingText>Mint your free NFT via our Discord.</HeadingText>
          <div className="flex flex-col items-center w-full px-6 space-y-2">
            <ButtonLink
              href={discordLink}
              passHref={true}
              width="full"
              target="_blank"
              iconRight="discord"
            >
              Go to Discord
            </ButtonLink>
            <BodyText size={2} className="text-em-low">
              You have another wallet?{" "}
              <button
                className="text-black hover:underline"
                onClick={() => disconnect()}
              >
                Disconnect Wallet
              </button>
            </BodyText>
          </div>
        </div>
      </ModalContent>
      <ModalFooter className="flex-col pt-4 pb-8">
        <BodyText size={1} className="text-em-med">
          Made with 💜 from Swapr
        </BodyText>
      </ModalFooter>
    </Modal>
  );
};
