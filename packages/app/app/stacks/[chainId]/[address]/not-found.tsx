"use client";

import { ButtonLink, HeadingText } from "@/ui";
import Link from "next/link";
import StacksImg from "@/public/assets/images/stacks.svg";

export default function NotFound() {
  const discordLink = process.env.DISCORD_URL ? process.env.DISCORD_URL : "#";

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto space-y-7">
      <StacksImg />
      <HeadingText size={3}>Page not found</HeadingText>
      <HeadingText className="text-center text-em-med">
        {`We're sorry, but the page you are looking for cannot be found. Please
        check the URL and try again. If you believe this is an error, please
        contact us on our`}{" "}
        <Link
          href={discordLink}
          className="cursor-pointer hover:underline underline-offset-2 text-em-high"
        >
          discord
        </Link>
        .
      </HeadingText>
      <div>
        <ButtonLink href="/">Go back to homepage</ButtonLink>
      </div>
    </div>
  );
}
